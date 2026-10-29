import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, pagination, readJSON } from "@/lib/api";
import { blogInput } from "@/lib/admin-validation";
import { createBlog } from "@/lib/blog-write";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { params, page, skip, search } = pagination(request);
    const status = (["draft", "published"] as const).find(
      (value) => value === params.get("status"),
    );
    const filter = {
      ...(search ? { title: { $regex: search, $options: "i" } } : {}),
      ...(status ? { status } : {}),
    };
    const [items, total] = await Promise.all([
      Blog.find(filter)
        .select("title slug status updatedAt")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(20)
        .lean(),
      Blog.countDocuments(filter),
    ]);
    return NextResponse.json({ items, total, page });
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    checkOrigin(request);
    const input = blogInput.parse(await readJSON(request));
    const blog = await createBlog(input, admin.id);
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ id: String(blog._id) }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
