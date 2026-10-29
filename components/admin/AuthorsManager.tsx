"use client";
import "./blog-builder.css";

import { useState } from "react";
import { Plus, Save, X } from "lucide-react";
import { authorInput, type AuthorProfile } from "@/lib/authors";
import { Field } from "./FormFields";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import useUnsavedChanges from "./useUnsavedChanges";
import { PageHeader } from "./AdminUI";

const empty = {
  fullName: "",
  role: "",
  photo: { src: "", alt: "" },
  biography: "",
  qualifications: [] as string[],
  active: true,
  clinicalReviewer: false,
};

export default function AuthorsManager({
  initial,
}: {
  initial: AuthorProfile[];
}) {
  const [authors, setAuthors] = useState(initial);
  const [editing, setEditing] = useState<AuthorProfile | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dirty =
    !!editing &&
    JSON.stringify(editing) !==
      JSON.stringify(
        editing.id
          ? authors.find((author) => author.id === editing.id)
          : { ...empty, id: "" },
      );
  useUnsavedChanges(dirty);
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    if (event.currentTarget.querySelector('[data-uploading="true"]')) {
      setError("Wait for the photograph upload to finish.");
      return;
    }
    const parsed = authorInput.safeParse({
      ...editing,
      qualifications: editing.qualifications.filter((value) => value.trim()),
    });
    if (!parsed.success) {
      setError(parsed.error.issues.map((issue) => issue.message).join("; "));
      return;
    }
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        editing.id ? `/api/admin/authors/${editing.id}` : "/api/admin/authors",
        {
          method: editing.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save this profile");
      const refresh = await fetch("/api/admin/authors", { cache: "no-store" });
      if (!refresh.ok)
        throw new Error(
          "Profile saved, but the list could not refresh. Reload this page.",
        );
      setAuthors(await refresh.json());
      setEditing(null);
      setMessage("Author profile saved. Return to your article to select it.");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not save this profile",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="The people behind the advice"
        title="Authors & reviewers"
        description="Manage author names, biographies and profile photographs."
        actions={
          <button
            type="button"
            className="admin-primary"
            onClick={() => {
              setEditing({ ...structuredClone(empty), id: "" });
              setError("");
            }}
          >
            <Plus size={15} /> Add author
          </button>
        }
      />
      {message && (
        <p
          role="status"
          className="rounded-xl bg-[#edf5e4] p-4 text-sm text-[#42672b]"
        >
          {message}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      {editing && (
        <form
          onSubmit={save}
          className="admin-card admin-author-form space-y-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editing.id ? "Edit contributor" : "New contributor"}
            </h2>
            <button
              type="button"
              aria-label="Close author editor"
              className="admin-builder-icon"
              onClick={() => {
                if (
                  !dirty ||
                  window.confirm("Discard unsaved profile changes?")
                )
                  setEditing(null);
              }}
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full name"
              value={editing.fullName}
              required
              onChange={(fullName) => setEditing({ ...editing, fullName })}
            />
            <Field
              label="Professional title / role"
              value={editing.role}
              onChange={(role) => setEditing({ ...editing, role })}
            />
          </div>
          <Field
            label="Short biography"
            value={editing.biography}
            multiline
            onChange={(biography) => setEditing({ ...editing, biography })}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <ImageUpload
              label="Profile photograph"
              value={editing.photo.src}
              alt={editing.photo.alt}
              onChange={(src) =>
                setEditing((current) =>
                  current
                    ? { ...current, photo: { ...current.photo, src } }
                    : current,
                )
              }
            />
            <Field
              label="Photograph alt text"
              value={editing.photo.alt}
              onChange={(alt) =>
                setEditing({ ...editing, photo: { ...editing.photo, alt } })
              }
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.active}
              onChange={(event) =>
                setEditing({ ...editing, active: event.target.checked })
              }
            />{" "}
            Active — available for new articles
          </label>
          {(editing.qualifications.length > 0 || editing.clinicalReviewer) && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.clinicalReviewer}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    clinicalReviewer: event.target.checked,
                  })
                }
              />{" "}
              Available as a clinical reviewer
            </label>
          )}
          <button className="admin-primary" disabled={busy}>
            <Save size={15} />
            {busy ? "Saving…" : "Save profile"}
          </button>
        </form>
      )}
      <div className="admin-card">
        <h2 className="mb-4 font-semibold">Contributor profiles</h2>
        {authors.length ? (
          <ul className="divide-y divide-[#e6ece5]">
            {authors.map((author) => (
              <li
                key={author.id}
                className="admin-author-row flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div className="flex items-center gap-4">
                  {author.photo.src ? (
                    <Image
                      src={author.photo.src}
                      alt={author.photo.alt || author.fullName}
                      width={44}
                      height={44}
                      unoptimized
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="admin-avatar !rounded-full !h-11 !w-11">
                      {author.fullName
                        .trim()
                        .split(/\s+/)
                        .map((word) => word[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold">
                      {author.fullName}{" "}
                      <span className="ml-2 text-xs font-normal text-[#60705b]">
                        {author.active ? "Active" : "Inactive"}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-[#60705b]">
                      {author.role || "Role not provided"}
                      {author.clinicalReviewer ? " · Clinical reviewer" : ""}
                    </p>
                  </div>
                </div>
                <button
                  className="admin-secondary"
                  onClick={() => {
                    setEditing(structuredClone(author));
                    setError("");
                  }}
                >
                  Edit {author.fullName}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#60705b]">
            No profiles yet. Add a real author before publishing a new article.
          </p>
        )}
      </div>
    </div>
  );
}
