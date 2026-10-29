"use client";
import "./blog-builder.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import { z } from "zod";
import { editorValidationMessage } from "@/lib/editor-validation";
import { blogInput } from "@/lib/admin-validation";
import { articleSlug, DEFAULT_BLOG_CTA } from "@/lib/article-editor";
import {
  emptyContent,
  newContentId,
  richTextPlainText,
  visualCopy,
  type ArticleContent,
} from "@/lib/article-content";
import { useToast } from "@/components/ToastProvider";
import ImageUpload from "./ImageUpload";
import { Field } from "./FormFields";
import StatusBadge from "./StatusBadge";
import ArticleSections from "./ArticleSections";
import ArticleCanvas from "./ArticleCanvas";
import ArticlePeopleFields from "./ArticlePeopleFields";

export type BlogValues = z.infer<typeof blogInput>;
const emptyBlog: BlogValues = {
  title: "",
  slug: "",
  featured: false,
  seoTitle: "",
  metaDescription: "",
  heroImage: { src: "", alt: "" },
  intro: [],
  sections: [],
  faqs: [],
  closingCta: DEFAULT_BLOG_CTA,
  status: "draft",
  content: emptyContent(),
  verificationStatus: "unverified",
};

function EditorArea({
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  title: string;
  summary?: string;
  open: boolean;
  onToggle: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <details open={open} className="admin-editor-area">
      <summary
        onClick={(event) => {
          event.preventDefault();
          onToggle(!open);
        }}
        className="cursor-pointer px-5 py-4"
      >
        <span className="font-semibold">{title}</span>
        {summary && (
          <span className="ml-3 text-xs font-normal text-[#60705b]">
            {summary}
          </span>
        )}
      </summary>
      <div className="space-y-5 border-t border-[#eef2eb] p-5">{children}</div>
    </details>
  );
}

export default function BlogEditor({
  initial = emptyBlog,
  id,
  slugEditable = false,
  publishingEnabled = true,
}: {
  initial?: BlogValues;
  id?: string;
  slugEditable?: boolean;
  publishingEnabled?: boolean;
}) {
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [area, setArea] = useState<string | null>("details");
  const dirtyRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const content = values.content;
  const slugLocked = !!id && !slugEditable;
  function update<K extends keyof BlogValues>(key: K, value: BlogValues[K]) {
    if (JSON.stringify(values[key]) === JSON.stringify(value)) return;
    dirtyRef.current = true;
    setDirty(true);
    const invalidatesReview = [
      "content",
      "title",
      "intro",
      "sections",
      "faqs",
      "heroImage",
      "authorId",
      "reviewerId",
    ].includes(key);
    setValues((previous) => ({
      ...previous,
      [key]: value,
      ...(invalidatesReview
        ? { verificationStatus: "unverified" as const }
        : {}),
    }));
  }
  function editContent<K extends keyof ArticleContent>(
    key: K,
    value:
      ArticleContent[K] | ((current: ArticleContent[K]) => ArticleContent[K]),
  ) {
    if (
      !content ||
      (typeof value !== "function" &&
        JSON.stringify(content[key]) === JSON.stringify(value))
    )
      return;
    dirtyRef.current = true;
    setDirty(true);
    setValues((previous) =>
      previous.content
        ? {
            ...previous,
            content: {
              ...previous.content,
              [key]:
                typeof value === "function"
                  ? value(previous.content[key])
                  : value,
            },
            verificationStatus: "unverified",
          }
        : previous,
    );
  }
  function updateHero(key: "src" | "alt", value: string) {
    dirtyRef.current = true;
    setDirty(true);
    setValues((previous) => ({
      ...previous,
      heroImage: { ...previous.heroImage, [key]: value },
      verificationStatus: "unverified",
    }));
  }
  function toggleArea(name: string, open: boolean) {
    setArea((current) => (open ? name : current === name ? null : current));
  }
  useEffect(() => {
    const leave = (event: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    const navigate = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (
        !dirtyRef.current ||
        !anchor ||
        anchor.target === "_blank" ||
        anchor.closest('[contenteditable="true"]') ||
        anchor.getAttribute("href")?.startsWith("#") ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      if (
        !window.confirm(
          "You have unsaved article changes. Leave without saving?",
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", leave);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("beforeunload", leave);
      document.removeEventListener("click", navigate, true);
    };
  }, []);
  function payload(status: "draft" | "published", preview = false) {
    const description =
      values.metaDescription ||
      values.excerpt ||
      (content
        ? richTextPlainText(
            content.summary.length ? content.summary : content.introduction,
          ).slice(0, 160)
        : "");
    return {
      ...values,
      status,
      title: preview ? values.title || "Untitled article" : values.title,
      slug: slugLocked
        ? initial.slug
        : values.slug ||
          articleSlug(values.title) ||
          (preview ? "draft-preview" : "draft-" + newContentId()),
      seoTitle: values.seoTitle || values.title,
      metaDescription: description,
    };
  }
  async function openPreview() {
    setError("");
    if (formRef.current?.querySelector('[data-uploading="true"]')) {
      setError("Wait for image uploads to finish before previewing.");
      return;
    }
    const parsed = blogInput.safeParse(payload("draft", true));
    if (!parsed.success) {
      setError(editorValidationMessage(parsed.error));
      return;
    }
    const popup = window.open("about:blank", "_blank");
    if (popup) popup.opener = null;
    setPreviewing(true);
    try {
      const response = await fetch("/api/admin/blogs/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: parsed.data, blogId: id }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not prepare the preview");
      if (
        typeof result.url !== "string" ||
        !result.url.startsWith("/admin-preview/blog?token=")
      )
        throw new Error("Invalid preview response");
      setPreviewURL(result.url);
      if (popup) popup.location.replace(result.url);
    } catch (caught) {
      popup?.close();
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not prepare the preview",
      );
    } finally {
      setPreviewing(false);
    }
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (event.currentTarget.querySelector('[data-uploading="true"]')) {
      setError("Wait for image uploads to finish before saving.");
      return;
    }
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const requested =
      submitter instanceof HTMLButtonElement ? submitter.value : values.status;
    const status = requested === "published" ? "published" : "draft";
    if (status === "published" && !values.authorId) {
      setArea("details");
      setError("Select an author in Article details before publishing.");
      return;
    }
    const parsed = blogInput.safeParse(payload(status));
    if (!parsed.success) {
      setError(editorValidationMessage(parsed.error));
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(
        id ? "/api/admin/blogs/" + id : "/api/admin/blogs",
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save the article.");
      dirtyRef.current = false;
      setDirty(false);
      showToast({
        type: "success",
        title:
          status === "published" ? "Article saved as published" : "Draft saved",
        message:
          status === "published"
            ? publishingEnabled
              ? "Your article is ready for readers."
              : "Your changes are saved. Website publishing still needs to be enabled by your website administrator."
            : "Your draft stays private.",
      });
      router.push("/admin/blogs");
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not save the article.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={save}
      className="admin-editor-workspace space-y-5"
    >
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-1.5 text-xs text-[#60705b]"
      >
        <ArrowLeft size={14} /> Back to articles
      </Link>
      <header className="admin-builder-header">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold">
              {id ? "Edit article" : "New article"}
            </h1>
            <StatusBadge status={values.status} />
          </div>
          <p role="status" className="mt-1 text-xs text-[#60705b]">
            {busy ? "Saving…" : dirty ? "Unsaved changes" : "Ready to write"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="admin-secondary"
            disabled={previewing}
            onClick={() => {
              void openPreview();
            }}
          >
            <Eye size={14} />
            {previewing ? "Preparing…" : "Preview"}
          </button>
          <button
            type="submit"
            value="draft"
            disabled={busy}
            className="admin-secondary"
          >
            <Save size={14} /> Save draft
          </button>
          <button
            type="submit"
            value="published"
            disabled={busy}
            className="admin-primary"
          >
            <Send size={14} />
            {values.status === "published" ? "Update article" : "Publish"}
          </button>
        </div>
      </header>
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      {previewURL && (
        <p className="text-xs text-[#60705b]">
          <a
            href={previewURL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-secondary underline"
          >
            Open latest private preview
          </a>{" "}
          · full page, same viewport as the public article · expires in 15
          minutes
        </p>
      )}
      <div className="admin-article-title">
        <Field
          label="Article title"
          value={values.title}
          onChange={(value) => update("title", value)}
        />
      </div>
      <div className="admin-composer-grid">
        <div className="min-w-0 space-y-4">
          {content ? (
            <>
              <ArticleCanvas
                value={content}
                onChange={(value) => update("content", value)}
              />
              <details className="admin-editor-area">
                <summary className="cursor-pointer p-5 font-semibold">
                  Special layouts & callouts
                </summary>
                <div className="space-y-4 border-t p-5">
                  <p className="admin-description">
                    Optional controls for checklists, service sections and
                    branded calls to action.
                  </p>
                  <ArticleSections
                    sections={content.sections}
                    onChange={(value) => editContent("sections", value)}
                  />
                </div>
              </details>
            </>
          ) : (
            <section className="admin-card space-y-4">
              <h2>Start editing this article</h2>
              <p className="admin-description">
                Open a visual copy of your existing content. Review the preview
                before saving; the original content remains stored.
              </p>
              <button
                type="button"
                className="admin-primary"
                onClick={() => update("content", visualCopy(values))}
              >
                Open in writing canvas
              </button>
            </section>
          )}
        </div>
        <aside className="admin-composer-settings space-y-4">
          <EditorArea
            title="Article details"
            open={area === "details"}
            onToggle={(open) => toggleArea("details", open)}
          >
            <Field
              label="Page address"
              value={values.slug || articleSlug(values.title)}
              onChange={(value) => update("slug", value)}
              disabled={slugLocked}
              hint={
                slugLocked
                  ? "Existing links are preserved."
                  : "Created automatically from your title."
              }
            />
            <Field
              label="Short description"
              value={values.excerpt || ""}
              onChange={(value) => update("excerpt", value)}
              hint="Optional introduction for article cards."
            />
            <ArticlePeopleFields
              authorId={values.authorId}
              reviewerId={values.reviewerId}
              verificationStatus={values.verificationStatus}
              onChange={(key, value) => {
                if (key === "verificationStatus")
                  update(key, value as "verified" | "unverified");
                else update(key, value);
              }}
            />
          </EditorArea>
          <div className="space-y-4">
            {!publishingEnabled && (
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Website publishing is not enabled yet. You can save and preview
                your work. Contact your website administrator to enable
                publishing.
              </p>
            )}
            <section className="admin-editor-area space-y-5 p-5">
              <h2 className="font-semibold">Publishing</h2>
              <label className="admin-field-label">
                Publication status
                <select
                  value={values.status}
                  onChange={(event) =>
                    update(
                      "status",
                      event.target.value as "draft" | "published",
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={values.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                />{" "}
                Featured article
              </label>
              <ImageUpload
                label="Featured image"
                value={values.heroImage.src}
                alt={values.heroImage.alt}
                onChange={(src) => updateHero("src", src)}
              />
              <Field
                label="Featured image alt text"
                value={values.heroImage.alt}
                onChange={(alt) => updateHero("alt", alt)}
              />
              {content && (
                <label className="admin-field-label">
                  Closing call to action
                  <select
                    value={content.cta}
                    onChange={(event) =>
                      editContent(
                        "cta",
                        event.target.value as ArticleContent["cta"],
                      )
                    }
                  >
                    <option value="consultation">Find the right care</option>
                    <option value="support">Support at home</option>
                    {id && <option value="original">Keep existing CTA</option>}
                    <option value="none">No closing CTA</option>
                  </select>
                </label>
              )}
            </section>
            <details className="admin-editor-area">
              <summary className="cursor-pointer p-5 font-semibold">
                SEO settings
              </summary>
              <div className="space-y-4 border-t border-[#eef2eb] p-5">
                <Field
                  label="Meta title"
                  value={values.seoTitle}
                  onChange={(value) => update("seoTitle", value)}
                  hint="Uses the article title when blank."
                />
                <Field
                  label="Meta description"
                  value={values.metaDescription}
                  onChange={(value) => update("metaDescription", value)}
                  multiline
                  hint="Uses the excerpt or summary when blank."
                />
                <Field
                  label="Canonical URL"
                  value={values.canonicalUrl || ""}
                  onChange={(value) => update("canonicalUrl", value)}
                  hint="Defaults to the existing article URL."
                />
              </div>
            </details>
          </div>
        </aside>
      </div>
    </form>
  );
}
