import { Users } from "lucide-react";
import Link from "next/link";
import Applicant from "@/models/Applicant";
import { requireAdminPage } from "@/lib/auth";
import { applicantStatuses } from "@/lib/admin-validation";
import StatusBadge from "@/components/admin/StatusBadge";
import RowActions from "@/components/admin/RowActions";
import {
  EmptyState,
  PageHeader,
  SectionHeader,
} from "@/components/admin/AdminUI";
import { ListFilters, Pagination } from "@/components/admin/ListControls";

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdminPage();
  const params = await searchParams;
  const page = Math.floor(
    Math.max(1, Math.min(10000, Number(params.page) || 1)),
  );
  const search = (params.search || "").slice(0, 100);
  const status =
    applicantStatuses.find((value) => value === params.status) || "";
  const job = (params.job || "").slice(0, 180);
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = {
    ...(search
      ? {
          $or: [
            { fullName: { $regex: escaped, $options: "i" } },
            { email: { $regex: escaped, $options: "i" } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
    ...(job ? { jobSlug: job } : {}),
  };
  const [applicants, total] = await Promise.all([
    Applicant.find(filter)
      .select("fullName email role status createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .lean(),
    Applicant.countDocuments(filter),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Recruitment"
        title="Applicants"
        description="Review applications, download CVs and keep candidates moving forward."
        actions={
          <Link href="/admin/careers" className="admin-secondary">
            <Users size={14} />
            Manage careers
          </Link>
        }
      />
      <ListFilters
        search={search}
        status={status}
        statuses={[...applicantStatuses]}
        job={job}
      />
      <section className="admin-card !p-0 overflow-hidden">
        <div className="px-6 pt-6">
          <SectionHeader
            title="Applicant inbox"
            description="Review, shortlist, and follow every application"
            action={<span className="admin-tag">{total} applications</span>}
          />
        </div>
        {applicants.length ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Opportunity</th>
                  <th>Progress</th>
                  <th>Received</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={String(applicant._id)}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="admin-avatar">
                          {applicant.fullName
                            ?.split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <Link
                            className="font-semibold"
                            href={`/admin/applicants/${applicant._id}`}
                          >
                            {applicant.fullName}
                          </Link>
                          <p className="mt-1 text-[10px] text-[#67705e]">
                            {applicant.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-64 truncate text-[12px]">
                      {applicant.role}
                    </td>
                    <td>
                      <StatusBadge status={applicant.status} />
                    </td>
                    <td className="text-[11px]">
                      {applicant.createdAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </td>
                    <td>
                      <RowActions
                        label="application and CV"
                        deleteUrl={`/api/admin/applicants/${applicant._id}`}
                        links={[
                          {
                            label: "View application",
                            href: `/admin/applicants/${applicant._id}`,
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="Your next great hire starts here."
            description={
              search || status || job
                ? "No applications match these filters. Try broadening your search."
                : "Applications will appear here when people apply to an open position. Every great team starts with a hello."
            }
            action={
              <Link href="/admin/careers" className="admin-soft-button">
                View your opportunities
              </Link>
            }
          />
        )}
      </section>
      <Pagination
        page={page}
        total={total}
        base="/admin/applicants"
        search={search}
        status={status}
        job={job}
      />
    </>
  );
}
