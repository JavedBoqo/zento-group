import { requireAdminPage } from "@/lib/auth";
import BlogEditor from "@/components/admin/BlogEditor";
export default async function NewBlogPage() {
  await requireAdminPage();
  return (
    <BlogEditor publishingEnabled={process.env.CONTENT_SOURCE === "mongodb"} />
  );
}
