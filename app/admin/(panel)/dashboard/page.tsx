import Link from "next/link";
import {
  FileText,
  BriefcaseBusiness,
  Users,
  ArrowUpRight,
  MousePointer2,
  Plus,
  ChevronRight,
  Send,
  PenLine,
  Activity,
} from "lucide-react";
import Blog from "@/models/Blog";
import Career from "@/models/Career";
import Applicant from "@/models/Applicant";
import Analytics from "@/models/Analytics";
import { requireAdminPage } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  PageHeader,
  SectionHeader,
  MetricCard,
  EmptyState,
} from "@/components/admin/AdminUI";
import TrafficChart from "@/components/admin/TrafficChart";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const days = [7, 30, 90].includes(Number(params.range))
    ? Number(params.range)
    : 30;
  const admin = await requireAdminPage();
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const [
    published,
    drafts,
    openJobs,
    closedJobs,
    applicants,
    newApplicants,
    events,
    recent,
    activeJobs,
    traffic,
    applicationTrend,
    topPages,
    latestArticles,
  ] = await Promise.all([
    Blog.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: "draft" }),
    Career.countDocuments({ isOpen: true }),
    Career.countDocuments({ isOpen: false }),
    Applicant.countDocuments(),
    Applicant.countDocuments({ status: "New" }),
    Analytics.aggregate([
      { $match: { timestamp: { $gte: start } } },
      {
        $group: {
          _id: { event: "$event", action: "$action" },
          count: { $sum: 1 },
        },
      },
    ]),
    Applicant.find()
      .select("fullName role status createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Career.find({ isOpen: true }).select("title location slug").limit(3).lean(),
    Analytics.aggregate([
      { $match: { timestamp: { $gte: start } } },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$timestamp",
                timezone: "UTC",
              },
            },
            event: "$event",
          },
          count: { $sum: 1 },
        },
      },
    ]),
    Applicant.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]),
    Analytics.aggregate([
      { $match: { event: "page_view", timestamp: { $gte: start } } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]),
    Blog.find()
      .select("title status updatedAt")
      .sort({ updatedAt: -1 })
      .limit(3)
      .lean(),
  ]);
  const count = (event: string, action?: string) =>
    events
      .filter(
        (item) =>
          item._id.event === event && (!action || item._id.action === action),
      )
      .reduce((sum, item) => sum + item.count, 0);
  const series = Array.from({ length: days }, (_, i) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + i);
    const key = date.toISOString().slice(0, 10);
    return {
      date: key,
      views:
        traffic.find(
          (item) => item._id.date === key && item._id.event === "page_view",
        )?.count || 0,
      clicks:
        traffic.find(
          (item) => item._id.date === key && item._id.event === "button_click",
        )?.count || 0,
      applications:
        applicationTrend.find((item) => item._id === key)?.count || 0,
    };
  });
  const views = count("page_view");
  return (
    <>
      <PageHeader
        eyebrow="Workspace overview"
        title={`Welcome back, ${admin.name.split(" ")[0]}.`}
        description="Your website performance, publishing and recruitment in one place."
        actions={
          <>
            <form className="flex gap-2 items-center">
              <label className="sr-only" htmlFor="dashboard-range">
                Reporting period
              </label>
              <select id="dashboard-range" name="range" defaultValue={days}>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button className="admin-secondary">Apply</button>
            </form>
            <Link className="admin-primary" href="/admin/blogs/new">
              <Plus size={14} />
              Create article
            </Link>
          </>
        }
      />
      {process.env.CONTENT_SOURCE !== "mongodb" && (
        <p className="rounded-xl border border-[#e9e1c6] bg-[#faf7ed] px-4 py-3 text-[12px] text-[#77693c]">
          Website publishing needs to be enabled by your website administrator.
          Your saved changes and private previews are available here.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Website page views"
          value={views}
          detail={`Consented page views · last ${days} days`}
          icon={<MousePointer2 size={18} />}
          featured
          href="/admin/analytics"
        />
        <MetricCard
          label="Published articles"
          value={published}
          detail={`${drafts} articles in draft`}
          icon={<FileText size={18} />}
          href="/admin/blogs"
        />
        <MetricCard
          label="Open positions"
          value={openJobs}
          detail={`${closedJobs} closed positions`}
          icon={<BriefcaseBusiness size={18} />}
          href="/admin/careers"
        />
        <MetricCard
          label="Total applicants"
          value={applicants}
          detail={`${newApplicants} waiting for a first review`}
          icon={<Users size={18} />}
          href="/admin/applicants"
        />
        <MetricCard
          label="Contact button clicks"
          value={
            count("button_click", "email") +
            count("button_click", "phone") +
            count("button_click", "consultation")
          }
          detail={`Email, phone and consultation · last ${days} days`}
          icon={<MousePointer2 size={18} />}
          href="/admin/analytics"
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
        <section className="admin-card">
          <SectionHeader
            title="Website traffic"
            description="How your community is finding and exploring Zento"
            action={<span className="admin-tag">Last {days} days</span>}
          />
          <div className="mb-4 flex items-center gap-6">
            <div>
              <span className="text-2xl font-bold tracking-tight">
                {views.toLocaleString("en-GB")}
              </span>
              <span className="ml-2 text-[11px] text-[#697160]">
                total page views
              </span>
            </div>
            <div className="ml-auto flex gap-4 text-[10px] text-[#65705b]">
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-primary" />
                Page views
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Clicks
              </span>
            </div>
          </div>
          <TrafficChart data={series} />
        </section>
        <section className="admin-card">
          <SectionHeader
            title="Application activity"
            description={`New applications · last ${days} days`}
            action={
              <span className="rounded-lg bg-[#f0f6e6] p-2 text-[#5b7736]">
                <Users size={16} />
              </span>
            }
          />
          <p className="text-2xl font-bold">
            {series.reduce((sum, day) => sum + day.applications, 0)}
            <span className="ml-2 text-[11px] font-normal text-[#656d5e]">
              applications received
            </span>
          </p>
          <TrafficChart data={series} applications />
        </section>
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
        <section className="admin-card !p-0 overflow-hidden">
          <div className="px-6 pt-6">
            <SectionHeader
              title="Recent applicants"
              description="The newest people hoping to join your team"
              action={
                <Link
                  href="/admin/applicants"
                  className="text-[11px] font-medium text-[#5f7540]"
                >
                  View all <ArrowUpRight size={12} className="ml-1 inline" />
                </Link>
              }
            />
          </div>
          {recent.length ? (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {recent.map((person) => (
                    <tr key={String(person._id)}>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="admin-avatar">
                            {person.fullName
                              ?.split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <div>
                            <Link
                              href={`/admin/applicants/${person._id}`}
                              className="font-semibold"
                            >
                              {person.fullName}
                            </Link>
                            <p className="mt-0.5 text-[10px] text-[#676e5f]">
                              {person.createdAt.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                timeZone: "UTC",
                              })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-40 truncate text-[12px]">
                        {person.role}
                      </td>
                      <td>
                        <StatusBadge status={person.status} />
                      </td>
                      <td>
                        <Link
                          aria-label={`View ${person.fullName}`}
                          href={`/admin/applicants/${person._id}`}
                        >
                          <ChevronRight size={15} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="Your next team member starts here"
              description="New applications will appear as people apply to your open positions."
              action={
                <Link href="/admin/careers/new" className="admin-soft-button">
                  Create a position <Plus size={13} />
                </Link>
              }
            />
          )}
        </section>
        <section className="admin-card">
          <SectionHeader
            title="Top pages"
            description="Most visited · last 30 days"
            action={<Activity size={17} className="text-[#627152]" />}
          />
          {topPages.length ? (
            <div className="space-y-5">
              {topPages.map((page, index) => (
                <div key={page._id}>
                  <div className="mb-2 flex justify-between gap-3 text-[11px]">
                    <span className="min-w-0 truncate text-[#606e58]">
                      <span className="mr-3 text-[#666d5e]">0{index + 1}</span>
                      {page._id}
                    </span>
                    <strong>{page.count}</strong>
                  </div>
                  <div className="ml-7 h-1 overflow-hidden rounded-full bg-[#f0f5e9]">
                    <div
                      className="h-full rounded-full bg-[#a5c77b]"
                      style={{
                        width: `${(page.count / Math.max(1, topPages[0].count)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No page activity yet"
              description="Consented visits will help you see which pages people find useful."
            />
          )}
          <Link
            href="/admin/analytics"
            className="mt-6 flex items-center justify-between border-t border-[#edf1e6] pt-4 text-[11px] font-medium text-[#5e7340]"
          >
            Explore website analytics <ArrowUpRight size={13} />
          </Link>
        </section>
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-3">
        <section className="admin-card">
          <SectionHeader
            title="Content & careers"
            description="Keep your website welcoming and up to date"
          />
          <div className="space-y-4">
            {[
              [
                "Blog articles",
                `${published} published · ${drafts} drafts`,
                "/admin/blogs",
                FileText,
              ],
              [
                "Career opportunities",
                `${openJobs} open · ${closedJobs} closed`,
                "/admin/careers",
                BriefcaseBusiness,
              ],
            ].map(([title, note, href, Icon]) => {
              const Symbol = Icon as typeof FileText;
              return (
                <Link
                  key={String(href)}
                  href={String(href)}
                  className="flex items-center gap-3 rounded-xl border border-[#e9efdf] p-3"
                >
                  <span className="admin-stat-icon">
                    <Symbol size={17} />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold">{String(title)}</p>
                    <p className="mt-1 text-[10px] text-[#6a7260]">
                      {String(note)}
                    </p>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-[#656f5b]" />
                </Link>
              );
            })}
          </div>
          <div className="mt-6 border-t border-[#edf1e4] pt-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#6a7260]">
              Open positions
            </p>
            {activeJobs.map((job) => (
              <Link
                key={String(job._id)}
                href={`/admin/careers/${job._id}/edit`}
                className="mb-3 flex justify-between text-[11px]"
              >
                <span>
                  <strong className="block font-medium">{job.title}</strong>
                  <span className="text-[10px] text-[#666d5e]">
                    {job.location}
                  </span>
                </span>
                <ArrowUpRight size={12} />
              </Link>
            ))}
            {!activeJobs.length && (
              <p className="text-[12px] text-[#666d5e]">No open positions.</p>
            )}
          </div>
        </section>
        <section className="admin-card">
          <SectionHeader
            title="Recent content activity"
            description="Your latest editorial updates"
          />
          {latestArticles.length ? (
            <div className="space-y-5">
              {latestArticles.map((article) => (
                <Link
                  key={String(article._id)}
                  href={`/admin/blogs/${article._id}/edit`}
                  className="flex gap-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f5e7] text-[#5f7345]">
                    <PenLine size={13} />
                  </span>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[12px] font-medium leading-5">
                      {article.title}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <StatusBadge status={article.status} />
                      <span className="text-[10px] text-[#697160]">
                        {article.updatedAt.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          timeZone: "UTC",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="A fresh start"
              description="Create your first article to start sharing Zento’s story."
            />
          )}
        </section>
        <section className="admin-card">
          <SectionHeader
            title="Make your next move"
            description="A few useful shortcuts"
          />
          <div className="space-y-2">
            {[
              [
                "Write an article",
                "Share helpful advice and stories",
                "/admin/blogs/new",
                FileText,
              ],
              [
                "Create a position",
                "Find your next great team member",
                "/admin/careers/new",
                BriefcaseBusiness,
              ],
              [
                "Review applicants",
                "Give every application a little care",
                "/admin/applicants",
                Users,
              ],
            ].map(([title, note, href, Icon]) => {
              const Symbol = Icon as typeof FileText;
              return (
                <Link
                  key={String(href)}
                  href={String(href)}
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#f8fbf2]"
                >
                  <Symbol size={17} className="text-[#62754c]" />
                  <div>
                    <p className="text-[12px] font-semibold">{String(title)}</p>
                    <p className="mt-1 text-[10px] text-[#697160]">
                      {String(note)}
                    </p>
                  </div>
                  <ArrowUpRight size={13} className="ml-auto text-[#656f5b]" />
                </Link>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl bg-[#f0f6e7] p-4">
            <div className="flex justify-between">
              <span className="text-[11px] text-[#5f714b]">
                Confirmed applications
              </span>
              <Send size={14} className="text-[#5d7044]" />
            </div>
            <p className="mt-2 text-2xl font-bold text-[#597738]">
              {count("job_application_submitted")}
            </p>
            <p className="mt-1 text-[10px] leading-5 text-[#667355]">
              Consented successful submissions · last {days} days. Link clicks
              represent interest, not completed enquiries.
            </p>
          </div>
        </section>
      </div>
      <p className="text-[10px] text-[#6a7162]">
        Page views count visits, not unique people. Reports use UTC and include
        consented events only. Application trends include all stored
        submissions.
      </p>
    </>
  );
}
