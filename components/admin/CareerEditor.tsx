"use client";
import ImageUpload from "./ImageUpload";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  MapPin,
  Eye,
  X,
  Save,
  Send,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { z } from "zod";
import { editorValidationMessage } from "@/lib/editor-validation";
import { careerInput } from "@/lib/admin-validation";
import { useToast } from "@/components/ToastProvider";
import { Field, LinesField } from "./FormFields";

import useUnsavedChanges from "./useUnsavedChanges";
import { articleSlug } from "@/lib/article-editor";

type CareerValues = z.infer<typeof careerInput>;
const emptyCareer: CareerValues = {
  id: "",
  slug: "",
  title: "",
  location: "",
  region: "",
  salary: "",
  salaryMin: 0,
  salaryMax: 0,
  contractTypes: [],
  office: "",
  phone: "",
  phoneHref: "tel:",
  email: "info@zentogroup.co.uk",
  image: "",
  referralBonus: "",
  highlights: [],
  overview: "",
  responsibilities: [],
  whatWeOffer: [],
  requirements: [],
  isOpen: false,
};

export default function CareerEditor({
  initial = emptyCareer,
  id,
}: {
  initial?: CareerValues;
  id?: string;
}) {
  const [values, setValues] = useState(initial);
  const preview = useRef<HTMLDialogElement>(null);
  const [dirty, setDirty] = useState(false);
  useUnsavedChanges(dirty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();
  function update<K extends keyof CareerValues>(
    key: K,
    value: CareerValues[K],
  ) {
    setDirty(true);
    setValues((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "title" && !id
        ? {
            slug:
              previous.slug === articleSlug(previous.title) || !previous.slug
                ? articleSlug(String(value))
                : previous.slug,
            id:
              previous.id === articleSlug(previous.title) || !previous.id
                ? articleSlug(String(value))
                : previous.id,
          }
        : {}),
      ...(key === "phone"
        ? { phoneHref: "tel:" + String(value).replace(/[^+\d ()-]/g, "") }
        : {}),
    }));
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.querySelector('[data-uploading="true"]')) {
      setError("Wait for the image upload to finish before saving.");
      return;
    }
    setError("");
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const requested =
      submitter instanceof HTMLButtonElement ? submitter.value : "";
    const isOpen =
      requested === "open"
        ? true
        : requested === "closed"
          ? false
          : values.isOpen;
    const parsed = careerInput.safeParse({ ...values, isOpen });
    if (!parsed.success) {
      setError(editorValidationMessage(parsed.error));
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(
        id ? `/api/admin/careers/${id}` : "/api/admin/careers",
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      showToast({
        type: "success",
        title: "Job saved",
        message: "Your changes have been saved.",
      });
      setDirty(false);
      router.push("/admin/careers");
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={save} className="space-y-6">
      <div className="admin-page-header admin-job-actions">
        <div>
          <Link
            href="/admin/careers"
            className="mb-3 inline-flex items-center gap-1.5 text-[11px] text-[#65705a]"
          >
            <ArrowLeft size={12} />
            Back to careers
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="admin-title">
              {id ? "Edit position" : "New position"}
            </h1>
            <StatusBadge status={values.isOpen ? "open" : "closed"} />
          </div>
          <p className="admin-description">
            Add the role, describe the opportunity and review before publishing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="admin-secondary"
            onClick={() => preview.current?.showModal()}
          >
            <Eye size={14} />
            Preview
          </button>
          {id && initial.isOpen && (
            <a
              href={`/careers/${initial.slug}`}
              target="_blank"
              rel="noreferrer"
              className="admin-secondary"
            >
              View live position
              <ArrowUpRight size={13} />
            </a>
          )}
          <button
            name="availability"
            value="closed"
            className="admin-secondary"
            disabled={busy}
          >
            <Save size={14} />
            Save draft / close
          </button>
          <button
            name="availability"
            value="open"
            className="admin-primary"
            disabled={busy}
          >
            <Send size={14} />
            {busy
              ? "Saving…"
              : id && initial.isOpen
                ? "Update position"
                : "Publish position"}
          </button>
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-4 text-xs text-red-700"
        >
          {error}
        </p>
      )}
      <nav aria-label="Job editor sections" className="admin-job-nav">
        {[
          "Basic information",
          "Location",
          "Responsibilities",
          "Requirements",
          "Benefits",
          "Contact",
        ].map((label, index) => (
          <a key={label} href={"#job-section-" + index}>
            {label}
          </a>
        ))}
      </nav>
      <div className="admin-editor-grid">
        <div className="min-w-0 space-y-6">
          <section
            id="job-section-0"
            className="admin-card admin-job-section space-y-6"
          >
            <div className="admin-panel-heading">
              <div>
                <h2>
                  <span className="admin-section-number">01</span>Basic
                  information
                </h2>
                <p>Start with the role and a clear, welcoming introduction.</p>
              </div>
              <BriefcaseBusiness size={18} className="text-[#67715c]" />
            </div>
            <div className="admin-editor-title">
              <Field
                label="Job title"
                value={values.title}
                onChange={(value) => update("title", value)}
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Job reference"
                value={values.id}
                onChange={(value) => update("id", value)}
                required
                hint="A short reference for this opportunity."
              />
              <Field
                label="Page address"
                value={values.slug}
                onChange={(value) => update("slug", value)}
                required
                disabled={!!id}
                hint={
                  id
                    ? "Fixed to preserve existing links."
                    : "Created automatically from your job title."
                }
              />
            </div>
            <Field
              label="Job description"
              multiline
              value={values.overview}
              onChange={(value) => update("overview", value)}
              hint="Tell candidates what makes this role meaningful and who they’ll be helping."
            />
          </section>
          <section
            id="job-section-1"
            className="admin-card admin-job-section space-y-6"
          >
            <div className="admin-panel-heading">
              <div>
                <h2>
                  <span className="admin-section-number">02</span>Location &
                  employment
                </h2>
                <p>Help people picture where and how they’ll work.</p>
              </div>
              <MapPin size={17} className="text-[#67715c]" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Location"
                value={values.location}
                onChange={(value) => update("location", value)}
                required
              />
              <Field
                label="Region"
                value={values.region}
                onChange={(value) => update("region", value)}
              />
              <Field
                label="Office"
                value={values.office}
                onChange={(value) => update("office", value)}
              />
              <Field
                label="Referral bonus"
                value={values.referralBonus}
                onChange={(value) => update("referralBonus", value)}
              />
            </div>
            <LinesField
              label="Employment types"
              value={values.contractTypes}
              onChange={(value) => update("contractTypes", value)}
            />
          </section>
          {(
            [
              [
                "responsibilities",
                "03",
                "Responsibilities",
                "Describe the responsibilities and the difference this person will make.",
              ],
              [
                "requirements",
                "04",
                "Requirements",
                "List the experience, qualities, and qualifications that matter.",
              ],
              [
                "whatWeOffer",
                "05",
                "Benefits",
                "Show candidates the care, benefits, and support they can expect.",
              ],
              [
                "highlights",
                "06",
                "Role highlights",
                "Add the key highlights that make this opportunity special.",
              ],
            ] as const
          ).map(([key, number, title, description]) => (
            <section
              key={key}
              id={
                "job-section-" +
                {
                  responsibilities: 2,
                  requirements: 3,
                  whatWeOffer: 4,
                  highlights: 6,
                }[key]
              }
              className="admin-card admin-job-section space-y-5"
            >
              <div className="admin-panel-heading">
                <div>
                  <h2>
                    <span className="admin-section-number">{number}</span>
                    {title}
                  </h2>
                  <p>{description}</p>
                </div>
              </div>
              <LinesField
                label={
                  key === "whatWeOffer"
                    ? "Benefits & support"
                    : key === "highlights"
                      ? "Role highlights"
                      : key === "requirements"
                        ? "Requirements"
                        : "Responsibilities"
                }
                value={values[key]}
                onChange={(value) => update(key, value)}
              />
            </section>
          ))}
          <section
            id="job-section-5"
            className="admin-card admin-job-section space-y-5"
          >
            <div className="admin-panel-heading">
              <div>
                <h2>
                  <span className="admin-section-number">07</span>A point of
                  contact
                </h2>
                <p>Make it easy for candidates to ask a question.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Contact email"
                type="email"
                value={values.email}
                onChange={(value) => update("email", value)}
              />
              <Field
                label="Phone number"
                value={values.phone}
                onChange={(value) => update("phone", value)}
              />
            </div>
            <Field
              label="Telephone link"
              value={values.phoneHref}
              onChange={(value) => update("phoneHref", value)}
              hint="Use tel: followed by the full number, for example tel:01312100095."
            />
          </section>
        </div>
        <aside className="admin-editor-sidebar">
          <section className="admin-card space-y-5">
            <h2>Publishing settings</h2>
            <p className="text-[11px] leading-5 text-[#646d5a]">
              Open positions appear on the public careers page and accept new
              applications.
            </p>
            <label className="flex items-center gap-3 rounded-xl border border-[#e3ebd8] bg-[#f7faf1] p-4">
              <input
                type="checkbox"
                checked={values.isOpen}
                onChange={(event) => update("isOpen", event.target.checked)}
              />
              <span>
                <span className="block text-[12px] font-semibold">
                  Accept applications
                </span>
                <span className="text-[10px] text-[#656e58]">
                  {values.isOpen
                    ? "This position is open."
                    : "This position is currently closed."}
                </span>
              </span>
            </label>
            <div className="flex items-start gap-2 text-[11px] leading-5 text-[#67725b]">
              <Check size={14} className="mt-0.5 shrink-0 text-[#60734a]" />
              Closing a position preserves every existing application.
            </div>
          </section>
          <section className="admin-card space-y-5">
            <h2>Pay & rewards</h2>
            <Field
              label="Salary as displayed"
              value={values.salary}
              onChange={(value) => update("salary", value)}
              hint="For example £14.50–£16.50 per hour."
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Minimum hourly pay"
                type="number"
                value={String(values.salaryMin)}
                onChange={(value) => update("salaryMin", Number(value))}
              />
              <Field
                label="Maximum hourly pay"
                type="number"
                value={String(values.salaryMax)}
                onChange={(value) => update("salaryMax", Number(value))}
              />
            </div>
          </section>
          <section className="admin-card space-y-4">
            <h2>Opportunity artwork</h2>
            <p className="text-[11px] leading-5 text-[#646d5a]">
              Upload the advert or image that accompanies this position.
            </p>
            <ImageUpload
              label="Career image"
              value={values.image}
              onChange={(value) => update("image", value)}
            />
          </section>
          <div className="rounded-2xl border border-[#e2ecd6] bg-[#edf5e2] p-5">
            <p className="mb-2 text-[12px] font-semibold text-[#5e7640]">
              Make a great first impression.
            </p>
            <p className="text-[11px] leading-6 text-[#657154]">
              A clear, friendly description helps the right people see
              themselves as part of Zento.
            </p>
          </div>
        </aside>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e2eada] bg-white p-4">
        <p className="text-[11px] text-[#656e5a]">
          A meaningful role deserves a thoughtful description.
        </p>
        <button
          name="availability"
          value={values.isOpen ? "open" : "closed"}
          className="admin-primary"
          disabled={busy}
        >
          <Save size={14} />
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
      <dialog
        ref={preview}
        className="admin-preview"
        aria-label="Position preview"
      >
        <div className="flex justify-between items-center border-b p-5">
          <strong>Position preview</strong>
          <button
            type="button"
            className="admin-secondary"
            aria-label="Close preview"
            onClick={() => preview.current?.close()}
          >
            <X size={16} />
          </button>
        </div>
        <article>
          <p className="admin-eyebrow">Careers at Zento</p>
          <h1>{values.title || "Untitled position"}</h1>
          <p>
            {values.location} · {values.salary}
          </p>
          <p>{values.contractTypes.join(" · ")}</p>
          <p className="whitespace-pre-wrap">{values.overview}</p>
          {(
            [
              ["Responsibilities", values.responsibilities],
              ["Requirements", values.requirements],
              ["Benefits", values.whatWeOffer],
              ["Role highlights", values.highlights],
            ] as const
          ).map(
            ([title, items]) =>
              items.length > 0 && (
                <section key={title}>
                  <h2>{title}</h2>
                  <ul>
                    {items.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                </section>
              ),
          )}
          <p>
            Contact: {values.email} {values.phone}
          </p>
          <p className="admin-field-hint">
            This preview is private. Saving a draft keeps the position closed to
            applications.
          </p>
        </article>
      </dialog>
    </form>
  );
}
