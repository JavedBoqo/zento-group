import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, rateLimit, HttpError } from "@/lib/api";
import { readUpload, uploadMedia, validateImage } from "@/lib/media";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    checkOrigin(request);
    await rateLimit(request, "media-upload", 40, admin.id);
    const form = await readUpload(request);
    const file = form.get("file");
    if (!(file instanceof File))
      throw new HttpError(400, "Choose an image to upload");
    const bytes = Buffer.from(await file.arrayBuffer());
    validateImage(bytes, file.type);
    return NextResponse.json(await uploadMedia(bytes, "image"), {
      status: 201,
    });
  } catch (error) {
    return apiError(error);
  }
}
