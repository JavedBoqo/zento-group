import { requireAdminPage } from "@/lib/auth";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
export default async function AnalyticsPage() {
  await requireAdminPage();
  return <AnalyticsDashboard />;
}
