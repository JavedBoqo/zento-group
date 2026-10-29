import { reserveImages, releaseImages } from "@/lib/media";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isObjectIdOrHexString } from "mongoose";
import Career from "@/models/Career";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, HttpError, readJSON } from "@/lib/api";
import { careerInput } from "@/lib/admin-validation";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id)) throw new HttpError(404, "Job not found");
    const career = await Career.findById(id).lean();
    if (!career) throw new HttpError(404, "Job not found");
    return NextResponse.json(career);
  } catch (error) {
    return apiError(error);
  }
}
export async function PUT(request: Request, context: Context) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id)) throw new HttpError(404, "Job not found");
    const input = careerInput.parse(await readJSON(request));
    const old = await Career.findById(id).lean();
    if (!old) throw new HttpError(404, "Job not found");
    if (old.slug !== input.slug)
      throw new HttpError(
        400,
        "Existing slugs are fixed to preserve public URLs",
      );
    const changes = await reserveImages(input, old);
    try {
      const result = await Career.updateOne(
        { _id: id, __v: old.__v ?? { $exists: false } },
        { $set: input, $inc: { __v: 1 } },
        { runValidators: true },
      );
      if (!result.matchedCount)
        throw new HttpError(409, "This record changed. Reload before saving.");
    } catch (error) {
      await releaseImages(changes.added, false);
      throw error;
    }
    await releaseImages(changes.removed);
    revalidatePath("/careers");
    revalidatePath(`/careers/${input.slug}`);
    revalidatePath("/careers/apply");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
export async function DELETE(request: Request, context: Context) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id)) throw new HttpError(404, "Job not found");
    const career = await Career.findById(id).lean();
    if (!career) throw new HttpError(404, "Job not found");
    const deleted = await Career.deleteOne({
      _id: id,
      __v: career.__v ?? { $exists: false },
    });
    if (!deleted.deletedCount)
      throw new HttpError(409, "This record changed. Reload before deleting.");
    const changes = await reserveImages(undefined, career);
    await releaseImages(changes.removed);
    revalidatePath("/careers");
    revalidatePath(`/careers/${career.slug}`);
    revalidatePath("/careers/apply");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
