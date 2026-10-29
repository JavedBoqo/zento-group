import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export function ListFilters({
  search,
  status,
  statuses,
  job,
}: {
  search: string;
  status: string;
  statuses: string[];
  job?: string;
}) {
  return (
    <form className="admin-list-filters admin-card flex flex-col gap-3 !p-4 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={15}
          className="absolute left-3.5 top-3.5 text-[#646e59]"
        />
        <input
          type="search"
          name="search"
          aria-label="Search records"
          placeholder="Search by name or title…"
          defaultValue={search}
          className="!border-0 !bg-[#f7faf3] !pl-10"
        />
      </div>
      <select
        name="status"
        aria-label="Filter by status"
        defaultValue={status}
        className="sm:!w-44"
      >
        <option value="">All statuses</option>
        {statuses.map((value) => (
          <option key={value} value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>
      {job !== undefined && (
        <input
          name="job"
          aria-label="Job page address"
          placeholder="Job page address"
          defaultValue={job}
          className="sm:!w-48"
        />
      )}
      <button className="admin-secondary !rounded-xl">
        <SlidersHorizontal size={13} />
        Apply filters
      </button>
    </form>
  );
}

export function Pagination({
  page,
  total,
  base,
  search,
  status,
  job,
}: {
  page: number;
  total: number;
  base: string;
  search: string;
  status: string;
  job?: string;
}) {
  const pages = Math.max(1, Math.ceil(total / 20));
  const href = (next: number) =>
    `${base}?${new URLSearchParams({ page: String(next), search, status, ...(job ? { job } : {}) })}`;
  const start = total ? (page - 1) * 20 + 1 : 0;
  const end = Math.min(page * 20, total);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[11px] text-[#69725f]">
      <span>
        Showing{" "}
        <strong className="font-medium text-[#5c7149]">
          {start}–{end}
        </strong>{" "}
        of <strong className="font-medium text-[#5c7149]">{total}</strong>{" "}
        records
      </span>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            className="admin-secondary !min-h-8 !px-3 !py-1 !text-[11px]"
            href={href(page - 1)}
          >
            <ChevronLeft size={12} />
            Previous
          </Link>
        ) : (
          <span className="flex items-center gap-1 px-2 text-[#686e61]">
            <ChevronLeft size={12} />
            Previous
          </span>
        )}
        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#e1ead5] bg-[#eef5e3] px-2 text-[#5d7342]">
          {page}
        </span>
        <span className="px-1">of {pages}</span>
        {page < pages ? (
          <Link
            className="admin-secondary !min-h-8 !px-3 !py-1 !text-[11px]"
            href={href(page + 1)}
          >
            Next
            <ChevronRight size={12} />
          </Link>
        ) : (
          <span className="flex items-center gap-1 px-2 text-[#686e61]">
            Next
            <ChevronRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}
