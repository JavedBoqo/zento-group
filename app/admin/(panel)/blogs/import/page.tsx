import { requireAdminPage } from "@/lib/auth";
import BlogImport from "@/components/admin/BlogImport";

export default async function ImportBlogsPage() {
  await requireAdminPage();
  return <BlogImport />;
}
