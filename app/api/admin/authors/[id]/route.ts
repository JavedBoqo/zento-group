import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isObjectIdOrHexString } from "mongoose";
import Author from "@/models/Author";
import { requireAdmin } from "@/lib/auth";
import { authorInput } from "@/lib/authors";
import { apiError, checkOrigin, HttpError, readJSON } from "@/lib/api";
import { releaseImages, reserveImages } from "@/lib/media";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Author not found");
    const input = authorInput.parse(await readJSON(request, 20000));
    const previous = await Author.findById(id).lean();
    if (!previous) throw new HttpError(404, "Author not found");
    const media = await reserveImages(input, previous);
    try {
      const result = await Author.updateOne(
        { _id: id, __v: previous.__v ?? { $exists: false } },
        { $set: input, $inc: { __v: 1 } },
        { runValidators: true },
      );
      if (!result.matchedCount)
        throw new HttpError(409, "This profile changed. Reload before saving.");
    } catch (error) {
      await releaseImages(media.added, false);
      throw error;
    }
    await releaseImages(media.removed);
    revalidatePath("/blog", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
