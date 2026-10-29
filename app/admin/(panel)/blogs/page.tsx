import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import Image from "next/image";
import Blog from "@/models/Blog";
import { requireAdminPage } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import RowActions from "@/components/admin/RowActions";
import {
  EmptyState,
  PageHeader,
  SectionHeader,
} from "@/components/admin/AdminUI";
import { ListFilters, Pagination } from "@/components/admin/ListControls";

export default async function BlogsPage({
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
    (["draft", "published"] as const).find(
      (value) => value === params.status,
    ) || "";
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = {
    ...(search ? { title: { $regex: escaped, $options: "i" } } : {}),
    ...(status ? { status } : {}),
  };
  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select("title slug status updatedAt heroImage")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .lean(),
    Blog.countDocuments(filter),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Publishing"
        title="Blog articles"
        description="Write, review and publish helpful advice for your readers."
        actions={
          <>
            <Link href="/admin/blogs/import" className="admin-secondary">
              Import existing content
            </Link>
            <Link href="/admin/blogs/new" className="admin-primary">
              <Plus size={14} />
              Create article
            </Link>
          </>
        }
      />
      <ListFilters
        search={search}
        status={status}
        statuses={["draft", "published"]}
      />
      <section className="admin-card !p-0 overflow-hidden">
        <div className="px-6 pt-6">
          <SectionHeader
            title="All articles"
            description="Every story, from first idea to published advice"
            action={<span className="admin-tag">{total} articles</span>}
          />
        </div>
        {blogs.length ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Visibility</th>
                  <th>Last updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={String(blog._id)}>
                    <td>
                      <div className="flex items-center gap-4">
                        {blog.heroImage?.src ? (
                          <Image
                            src={blog.heroImage.src}
                            alt={blog.heroImage.alt || ""}
                            width={52}
                            height={46}
                            unoptimized
                            className="h-12 w-14 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <span className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-[#e5edd9] bg-[#f3f8eb] text-[#64744f]">
                            <FileText size={19} strokeWidth={1.5} />
                          </span>
                        )}
                        <div className="min-w-0">
                          <Link
                            className="block max-w-[360px] truncate text-[12px] font-semibold"
                            href={`/admin/blogs/${blog._id}/edit`}
                          >
                            {blog.title || "Untitled article"}
                          </Link>
                          <p className="mt-1.5 max-w-[360px] truncate text-[10px] text-[#67715d]">
                            /blog/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={blog.status} />
                    </td>
                    <td className="text-[11px]">
                      {blog.updatedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </td>
                    <td>
                      <RowActions
                        label="article"
                        deleteUrl={`/api/admin/blogs/${blog._id}`}
                        links={[
                          {
                            label: "Edit article",
                            href: `/admin/blogs/${blog._id}/edit`,
                          },
                          ...(blog.status === "published"
                            ? [
                                {
                                  label: "View on website",
                                  href: `/blog/${blog.slug}`,
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
            title="There’s a story waiting to be told."
            description={
              search || status
                ? "Try another search or change your filters."
                : "Start with helpful advice, a community update, or a story worth sharing."
            }
            action={
              <Link href="/admin/blogs/new" className="admin-soft-button">
                <Plus size={13} />
                Write your first article
              </Link>
            }
          />
        )}
      </section>
      <Pagination
        page={page}
        total={total}
        base="/admin/blogs"
        search={search}
        status={status}
      />
    </>
  );
}
