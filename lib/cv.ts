import "server-only";
import { mongo, type Types } from "mongoose";
import connectDB from "./db";
import { HttpError } from "./api";
import { cleanupMedia, uploadMedia } from "./media";
import getCloudinary from "./cloudinary";

export async function cvBucket() {
  const mongoose = await connectDB();
  if (!mongoose.connection.db) throw new Error("Database unavailable");
  return new mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "privateCVs",
  });
}

export async function storeCV(file: File) {
  if (file.size > 5 * 1024 * 1024)
    throw new HttpError(400, "CV must be at most 5MB");
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop()?.toLowerCase();
  const valid =
    (extension === "pdf" && bytes.subarray(0, 5).toString() === "%PDF-") ||
    (extension === "doc" &&
      bytes.subarray(0, 8).equals(Buffer.from("d0cf11e0a1b11ae1", "hex"))) ||
    (extension === "docx" &&
      bytes.subarray(0, 4).equals(Buffer.from("504b0304", "hex")) &&
      bytes.includes(Buffer.from("word/")) &&
      bytes.includes(Buffer.from("[Content_Types].xml")));
  if (!valid)
    throw new HttpError(400, "Upload a valid PDF, DOC or DOCX document");
  const uploaded = await uploadMedia(bytes, "cv", extension);
  return { ...uploaded, name: `cv.${extension}` };
}

export async function deleteCV(id: Types.ObjectId | string) {
  if (typeof id === "string") {
    await cleanupMedia(id);
    return;
  }
  const bucket = await cvBucket();
  const file = await bucket.find({ _id: id }).next();
  if (file) await bucket.delete(id);
}

export async function readPrivateCV(publicId: string) {
  const cloudinary = getCloudinary();
  const url = cloudinary.utils.private_download_url(publicId, "", {
    resource_type: "raw",
    type: "authenticated",
    expires_at: Math.floor(Date.now() / 1000) + 60,
    attachment: true,
  });
  const response = await fetch(url, {
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new HttpError(502, "CV download is temporarily unavailable");
  const reader = response.body?.getReader();
  if (!reader)
    throw new HttpError(502, "CV download is temporarily unavailable");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.byteLength;
    if (size > 5 * 1024 * 1024) {
      await reader.cancel();
      throw new HttpError(502, "Invalid CV response");
    }
    chunks.push(next.value);
  }
  return Buffer.concat(chunks);
}
