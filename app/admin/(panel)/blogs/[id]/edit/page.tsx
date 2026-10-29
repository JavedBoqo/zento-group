import { notFound } from "next/navigation";
import { isObjectIdOrHexString } from "mongoose";
import Blog from "@/models/Blog";
import { requireAdminPage } from "@/lib/auth";
import { blogInput } from "@/lib/admin-validation";
import BlogEditor from "@/components/admin/BlogEditor";
export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  if (!isObjectIdOrHexString(id)) notFound();
  const blog = await Blog.findById(id).lean();
  if (!blog) notFound();
  return (
    <BlogEditor
      id={id}
      initial={blogInput.parse(blog)}
      slugEditable={blog.draftSlugEditable === true}
      publishingEnabled={process.env.CONTENT_SOURCE === "mongodb"}
    />
  );
}
