import { requireAdminPage } from "@/lib/auth";
import CareerEditor from "@/components/admin/CareerEditor";
export default async function NewCareerPage() {
  await requireAdminPage();
  return <CareerEditor />;
}
