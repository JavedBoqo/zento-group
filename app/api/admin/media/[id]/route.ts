import { NextResponse } from "next/server";
import { isObjectIdOrHexString } from "mongoose";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, HttpError } from "@/lib/api";
import Media from "@/models/Media";
import { cleanupMedia } from "@/lib/media";

export const runtime = "nodejs";
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id)) throw new HttpError(404, "Media not found");
    const media = await Media.findOne({ _id: id, kind: "image" }).lean();
    if (!media) throw new HttpError(404, "Media not found");
    if (!(await cleanupMedia(media.public_id)))
      throw new HttpError(
        409,
        "This image is still in use. Remove it from all content and save first.",
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
