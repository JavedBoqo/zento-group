import Link from "next/link";
import { Plus, BriefcaseBusiness, MapPin } from "lucide-react";
import Career from "@/models/Career";
import { requireAdminPage } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import RowActions from "@/components/admin/RowActions";
import {
  EmptyState,
  PageHeader,
  SectionHeader,
} from "@/components/admin/AdminUI";
import { ListFilters, Pagination } from "@/components/admin/ListControls";

export default async function CareersPage({
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
  const status = ["open", "closed"].includes(params.status || "")
    ? params.status!
    : "";
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = {
    ...(search ? { title: { $regex: escaped, $options: "i" } } : {}),
    ...(status ? { isOpen: status === "open" } : {}),
  };
  const [jobs, total] = await Promise.all([
    Career.find(filter)
      .select("title slug location isOpen")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .lean(),
    Career.countDocuments(filter),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Recruitment"
        title="Careers"
        description="Manage your opportunities and find your next team member."
        actions={
          <>
            <Link href="/admin/careers/import" className="admin-secondary">
              Import existing content
            </Link>
            <Link href="/admin/careers/new" className="admin-primary">
              <Plus size={14} />
              Create position
            </Link>
          </>
        }
      />
      <ListFilters
        search={search}
        status={status}
        statuses={["open", "closed"]}
      />
      <section className="admin-card !p-0 overflow-hidden">
        <div className="px-6 pt-6">
          <SectionHeader
            title="All positions"
            description="Manage the positions that build your team"
            action={<span className="admin-tag">{total} positions</span>}
          />
        </div>
        {jobs.length ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={String(job._id)}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e4ecd8] bg-[#f3f8eb] text-[#60704c]">
                          <BriefcaseBusiness size={18} strokeWidth={1.5} />
                        </span>
                        <div>
                          <Link
                            className="font-semibold"
                            href={`/admin/careers/${job._id}/edit`}
                          >
                            {job.title}
                          </Link>
                          <p className="mt-1 text-[10px] text-[#697160]">
                            Zento Care · {job.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="flex items-center gap-1.5 text-[12px]">
                        <MapPin size={12} className="text-[#65715a]" />
                        {job.location}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={job.isOpen ? "open" : "closed"} />
                    </td>
                    <td>
                      <RowActions
                        label="position"
                        deleteUrl={`/api/admin/careers/${job._id}`}
                        links={[
                          {
                            label: "Edit position",
                            href: `/admin/careers/${job._id}/edit`,
                          },
                          {
                            label: "View applicants",
                            href: `/admin/applicants?job=${job.slug}`,
                          },
                          ...(job.isOpen
                            ? [
                                {
                                  label: "View on website",
                                  href: `/careers/${job.slug}`,
                                  external: true,
                                },
                              ]
                            : []),
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
            title="Make room for someone great."
            description={
              search || status
                ? "Try a different search or availability filter."
                : "Your next team member could be one opportunity away. Create your first position."
            }
            action={
              <Link href="/admin/careers/new" className="admin-soft-button">
                <Plus size={13} />
                Create an opportunity
              </Link>
            }
          />
        )}
      </section>
      <Pagination
        page={page}
        total={total}
        base="/admin/careers"
        search={search}
        status={status}
      />
    </>
  );
}
