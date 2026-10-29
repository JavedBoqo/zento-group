import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { SectionHeader } from "@/components/admin/AdminUI";
import { notFound } from "next/navigation";
import { isObjectIdOrHexString } from "mongoose";
import Applicant from "@/models/Applicant";
import { requireAdminPage } from "@/lib/auth";
import ApplicantStatus from "@/components/admin/ApplicantStatus";

export default async function ApplicantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  if (!isObjectIdOrHexString(id)) notFound();
  const applicant = await Applicant.findById(id).lean();
  if (!applicant) notFound();
  const details = [
    ["Email", applicant.email],
    ["Phone", applicant.phone],
    ["Address / postcode", applicant.address],
    ["Location", applicant.location],
    ["Work pattern", applicant.preferredPattern],
    ["Right to work", applicant.rightToWork],
    ["Driving licence", applicant.drivingLicence],
    ["Care experience", applicant.careExperience],
  ];
  return (
    <>
      <Link
        href="/admin/applicants"
        className="inline-flex items-center gap-2 text-[11px] text-[#637056]"
      >
        <ArrowLeft size={13} />
        Back to applicants
      </Link>
      <section className="admin-card flex flex-wrap items-center gap-5 !p-7">
        <span className="admin-avatar !h-16 !w-16 !rounded-2xl !text-xl">
          {applicant.fullName
            ?.split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="admin-eyebrow">A potential member of your team</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="admin-title break-words">{applicant.fullName}</h1>
            <StatusBadge status={applicant.status} />
          </div>
          <p className="mt-2 flex items-center gap-2 text-[12px] text-[#657259]">
            <BriefcaseBusiness size={13} />
            {applicant.role}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {applicant.email && (
              <a href={`mailto:${applicant.email}`} className="admin-secondary">
                <Mail size={13} />
                Email applicant
              </a>
            )}
            {applicant.phone && (
              <a href={`tel:${applicant.phone}`} className="admin-soft-button">
                <Phone size={13} />
                Call
              </a>
            )}
          </div>
          <p className="flex items-center gap-1.5 text-[10px] text-[#66705d]">
            <CalendarDays size={12} />
            Received{" "}
            {applicant.createdAt.toLocaleString("en-GB", {
              timeZone: "UTC",
            })}{" "}
            UTC
          </p>
        </div>
      </section>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <section className="admin-card">
            <SectionHeader
              title="Applicant details"
              description="The details they shared when applying"
            />
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="min-w-0 border-b border-[#edf2e5] pb-5"
                >
                  <dt className="mb-2 text-[11px] text-[#69725f]">{label}</dt>
                  <dd className="break-words text-[12px] font-medium leading-6 text-[#5c724c]">
                    {value || "Not provided"}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="admin-card">
            <SectionHeader
              title="Cover message"
              description="A message from the applicant"
              action={<MessageSquare size={17} className="text-[#667258]" />}
            />
            <p className="whitespace-pre-wrap break-words rounded-xl border border-[#e8efde] bg-[#fafcf7] p-5 text-[12px] leading-7 text-[#647259]">
              {applicant.message ||
                "The applicant didn’t include an additional message."}
            </p>
          </section>
        </div>
        <aside className="admin-applicant-sidebar space-y-6">
          <section className="admin-card space-y-5">
            <SectionHeader
              title="Application progress"
              description="Give every application a thoughtful next step"
            />
            <ApplicantStatus id={id} initial={applicant.status} />
            <p className="text-[11px] leading-6 text-[#666f5c]">
              Status updates are saved to this application and remain visible in
              your applicant inbox.
            </p>
          </section>
          <section className="admin-card">
            <SectionHeader
              title="Documents"
              description="Uploaded with the application"
            />
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#e5edd9] bg-[#f8fbf3] p-4">
              <span className="admin-stat-icon">
                <FileText size={18} />
              </span>
              <div>
                <p className="text-[12px] font-semibold">Curriculum vitae</p>
                <p className="mt-1 text-[10px] text-[#66705a]">
                  {applicant.cvId || applicant.cvPublicId
                    ? "Private document"
                    : "No document uploaded"}
                </p>
              </div>
            </div>
            {applicant.cvId || applicant.cvPublicId ? (
              <a
                className="admin-secondary w-full"
                href={`/api/admin/applicants/${id}/cv`}
              >
                <Download size={14} />
                Download CV
              </a>
            ) : (
              <p className="text-[12px] text-[#666f5c]">
                This applicant has not attached a CV.
              </p>
            )}
          </section>
          <div className="flex gap-3 rounded-2xl border border-[#e2ecd6] bg-[#eef5e5] p-5">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#607545]" />
            <p className="text-[11px] leading-6 text-[#627153]">
              Applicant information is private. Documents are only available to
              signed-in administrators.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
