import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Inbox } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="admin-page-header">
      <div>
        <p className="admin-eyebrow">{eyebrow}</p>
        <h1 className="admin-title">{title}</h1>
        <p className="admin-description">{description}</p>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-panel-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e3ebda] bg-[#f6f9f0] text-[#5f7248]">
        <Inbox size={21} strokeWidth={1.5} />
      </span>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 max-w-xs text-xs leading-6 text-[#636d60]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  icon,
  featured = false,
  href,
}: {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
  featured?: boolean;
  href?: string;
}) {
  const contents = (
    <>
      <div className="flex items-center justify-between">
        <span className="admin-stat-label">{label}</span>
        <span className="admin-stat-icon">{icon}</span>
      </div>
      <p className="admin-stat-value">{value.toLocaleString("en-GB")}</p>
      <p className="admin-stat-note">
        <span className="h-1 w-1 rounded-full bg-current opacity-60" />
        {detail}
        {href && <ArrowUpRight size={12} className="ml-auto" />}
      </p>
    </>
  );
  const className = `admin-card admin-stat ${featured ? "featured" : ""}`;
  return href ? (
    <Link href={href} className={className}>
      {contents}
    </Link>
  ) : (
    <div className={className}>{contents}</div>
  );
}
