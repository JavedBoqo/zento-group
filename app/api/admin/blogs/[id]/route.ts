import { reserveImages, releaseImages } from "@/lib/media";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isObjectIdOrHexString } from "mongoose";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, HttpError, readJSON } from "@/lib/api";
import { blogInput } from "@/lib/admin-validation";
import { validateArticlePeople } from "@/lib/article-people";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Article not found");
    const blog = await Blog.findById(id).lean();
    if (!blog) throw new HttpError(404, "Article not found");
    return NextResponse.json(blog);
  } catch (error) {
    return apiError(error);
  }
}
export async function PUT(request: Request, context: Context) {
  try {
    const admin = await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Article not found");
    const input = blogInput.parse(await readJSON(request));
    const old = await Blog.findById(id).lean();
    if (!old) throw new HttpError(404, "Article not found");
    const review = await validateArticlePeople(input, old, admin.id);
    if (old.slug !== input.slug && !old.draftSlugEditable)
      throw new HttpError(
        400,
        "Existing slugs are fixed to preserve public URLs",
      );
    const changes = await reserveImages(input, old);
    try {
      const result = await Blog.updateOne(
        { _id: id, __v: old.__v ?? { $exists: false } },
        {
          $set: {
            ...input,
            ...review,
            draftSlugEditable:
              !!old.draftSlugEditable && input.status === "draft",
          },
          $inc: { __v: 1 },
        },
        { runValidators: true },
      );
      if (!result.matchedCount)
        throw new HttpError(409, "This record changed. Reload before saving.");
    } catch (error) {
      await releaseImages(changes.added, false);
      throw error;
    }
    await releaseImages(changes.removed);
    revalidatePath("/blog");
    revalidatePath(`/blog/${input.slug}`);
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
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Article not found");
    const blog = await Blog.findById(id).lean();
    if (!blog) throw new HttpError(404, "Article not found");
    const deleted = await Blog.deleteOne({
      _id: id,
      __v: blog.__v ?? { $exists: false },
    });
    if (!deleted.deletedCount)
      throw new HttpError(409, "This record changed. Reload before deleting.");
    const changes = await reserveImages(undefined, blog);
    await releaseImages(changes.removed);
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
