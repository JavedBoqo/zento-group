import "server-only";
import { randomUUID } from "node:crypto";
import type { UploadApiResponse } from "cloudinary";
import getCloudinary from "./cloudinary";
import connectDB from "./db";
import { HttpError } from "./api";
import Media from "@/models/Media";
import Blog from "@/models/Blog";
import Career from "@/models/Career";
import Applicant from "@/models/Applicant";
import Author from "@/models/Author";
import { markdownImages } from "./article-editor";

export function imageURLs(value: unknown): string[] {
  const urls = new Set<string>();
  function visit(node: unknown) {
    if (!node || typeof node !== "object") return;
    for (const [key, child] of Object.entries(node)) {
      if (
        (key === "src" || key === "image") &&
        typeof child === "string" &&
        child
      )
        urls.add(child);
      else if (typeof child === "string") {
        for (const image of markdownImages(child)) urls.add(image.src);
      } else if (typeof child === "object") visit(child);
    }
  }
  visit(value);
  return [...urls];
}

export function validateImage(bytes: Buffer, mime: string) {
  if (!bytes.length || bytes.length > 5 * 1024 * 1024)
    throw new HttpError(400, "Images must be between 1 byte and 5MB");
  const valid =
    (mime === "image/png" &&
      bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) ||
    (mime === "image/jpeg" &&
      bytes.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"))) ||
    (mime === "image/webp" &&
      bytes.subarray(0, 4).toString() === "RIFF" &&
      bytes.subarray(8, 12).toString() === "WEBP");
  if (!valid)
    throw new HttpError(400, "Upload a valid JPEG, PNG or WebP image");
}

function imageFilter(urls: string[]) {
  const ids = urls.flatMap((url) => {
    try {
      const match = new URL(url).pathname.match(
        /\/(zento\/images\/[a-f0-9-]{36})(?:\.[a-z0-9]+)?$/i,
      );
      return match ? [match[1]] : [];
    } catch {
      return [];
    }
  });
  return {
    kind: "image" as const,
    $or: [{ secure_url: { $in: urls } }, { public_id: { $in: ids } }],
  };
}

export async function uploadMedia(
  bytes: Buffer,
  kind: "image" | "cv",
  extension?: string,
) {
  const cloudinary = getCloudinary();
  await connectDB();
  const public_id = `zento/${kind === "image" ? "images" : "cvs"}/${randomUUID()}${kind === "cv" ? `.${extension}` : ""}`;
  const resource_type = kind === "cv" ? "raw" : "image";
  const deliveryType = kind === "cv" ? "authenticated" : "upload";
  // Register first: even an interrupted upload remains discoverable for cleanup.
  const media = await Media.create({
    public_id,
    kind,
    resource_type,
    deliveryType,
  });
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id,
          resource_type,
          type: deliveryType,
          overwrite: false,
          ...(kind === "image"
            ? { allowed_formats: ["jpg", "png", "webp"] }
            : {}),
          timeout: 60000,
        },
        (error, response) => {
          if (error || !response) reject(new Error("Cloudinary upload failed"));
          else resolve(response);
        },
      );
      stream.on("error", reject);
      stream.end(bytes);
    });
    if (
      result.public_id !== public_id ||
      result.resource_type !== resource_type ||
      result.type !== deliveryType ||
      !result.secure_url?.startsWith("https://")
    )
      throw new Error("Invalid Cloudinary upload response");
    await Media.updateOne(
      { _id: media._id },
      { $set: { secure_url: result.secure_url, state: "ready" } },
    );
    return { id: String(media._id), secure_url: result.secure_url, public_id };
  } catch (error) {
    // A timed-out upload may still be finishing remotely; cleanup retries after a grace period.
    console.error("Unattached media upload pending cleanup");
    throw error;
  }
}

export async function cleanupMedia(public_id: string) {
  await connectDB();
  const media = await Media.findOneAndUpdate(
    {
      public_id,
      references: 0,
      state: { $in: ["ready", "uploading", "deleting"] },
    },
    { $set: { state: "deleting" } },
    { new: true },
  ).lean();
  if (!media) return !!(await Media.exists({ public_id, state: "deleted" }));
  // Also check actual records, including URLs pasted into a second article or job.
  const imageReference = {
    $regex: media.public_id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  };
  const [blog, career, applicant, author] = await Promise.all([
    media.secure_url
      ? Blog.exists({
          $or: [
            "heroImage.src",
            "sections.image.src",
            "sections.items.icon.src",
            "closingCta.image.src",
            "editorSource",
            "intro",
            "sections.body",
            "sections.intro",
            "sections.list",
            "sections.outro",
            "sections.items.body",
            "faqs.answer",
            "content.sections.blocks.src",
            "content.sections.blocks.icon.src",
          ].map((path) => ({ [path]: imageReference })),
        })
      : null,
    media.secure_url ? Career.exists({ image: imageReference }) : null,
    Applicant.exists({ cvPublicId: public_id }),
    media.secure_url ? Author.exists({ "photo.src": imageReference }) : null,
  ]);
  if (blog || career || applicant || author) {
    await Media.updateOne({ _id: media._id }, { $set: { state: "ready" } });
    return false;
  }
  const result = await getCloudinary().uploader.destroy(public_id, {
    resource_type: media.resource_type,
    type: media.deliveryType,
    invalidate: true,
  });
  if (result.result !== "ok" && result.result !== "not found")
    throw new Error("Cloudinary cleanup failed");
  // Retain a tombstone so a stale editor cannot reattach a deleted URL.
  await Media.updateOne(
    { _id: media._id, state: "deleting", references: 0 },
    { $set: { state: "deleted" } },
  );
  return true;
}

export async function reserveImages(next: unknown, previous?: unknown) {
  const nextURLs = imageURLs(next);
  const previousURLs = imageURLs(previous);
  const [nextMedia, previousMedia] = await Promise.all([
    Media.find(imageFilter(nextURLs)).lean(),
    Media.find(imageFilter(previousURLs)).lean(),
  ]);
  const added = nextMedia.filter(
    (media) => !previousMedia.some((old) => old.public_id === media.public_id),
  );
  const removed = previousMedia.filter(
    (media) => !nextMedia.some((next) => next.public_id === media.public_id),
  );
  const reserved: string[] = [];
  try {
    for (const media of added) {
      const result = await Media.updateOne(
        { _id: media._id, state: "ready" },
        { $inc: { references: 1 } },
      );
      if (!result.matchedCount)
        throw new HttpError(
          409,
          "An image is being removed. Upload it again or choose another image.",
        );
      reserved.push(media.public_id);
    }
  } catch (error) {
    await releaseImages(reserved, false);
    throw error;
  }
  return { added: reserved, removed: removed.map((media) => media.public_id) };
}

export async function releaseImages(publicIds: string[], cleanup = true) {
  for (const public_id of publicIds) {
    try {
      await Media.updateOne(
        { public_id, references: { $gt: 0 } },
        { $inc: { references: -1 } },
      );
      if (cleanup) await cleanupMedia(public_id);
    } catch {
      // Keep the media record for retry; a completed content save must not be reported as failed.
      console.error("Media cleanup pending");
    }
  }
}

export async function readUpload(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "Missing upload");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.byteLength;
    if (size > 6 * 1024 * 1024) {
      await reader.cancel();
      throw new HttpError(413, "Upload is too large");
    }
    chunks.push(next.value);
  }
  const bounded = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: Buffer.concat(chunks),
  });
  try {
    return await bounded.formData();
  } catch {
    throw new HttpError(400, "Invalid upload form");
  }
}
