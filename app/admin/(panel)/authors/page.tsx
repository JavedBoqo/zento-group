import { requireAdminPage } from "@/lib/auth";
import { getAuthors } from "@/lib/article-people";
import AuthorsManager from "@/components/admin/AuthorsManager";

export default async function AuthorsPage() {
  await requireAdminPage();
  return <AuthorsManager initial={await getAuthors()} />;
}
