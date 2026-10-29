"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { AuthorProfile } from "@/lib/authors";

export default function ArticlePeopleFields({
  authorId,
  reviewerId,
  verificationStatus,
  onChange,
}: {
  authorId?: string;
  reviewerId?: string;
  verificationStatus?: "unverified" | "verified";
  onChange: (
    key: "authorId" | "reviewerId" | "verificationStatus",
    value: string,
  ) => void;
}) {
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/authors", { cache: "no-store" });
      if (!response.ok)
        throw new Error(
          "Could not load author profiles. Retry before publishing.",
        );
      setAuthors(await response.json());
      setError("");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not load profiles",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void Promise.resolve().then(load);
    const refresh = () => {
      void load();
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [load]);
  const reviewer = authors.find((author) => author.id === reviewerId);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">Authorship & review</h3>
        <Link
          href="/admin/authors"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-secondary underline"
        >
          Manage authors
        </Link>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}{" "}
          <button
            type="button"
            className="underline"
            onClick={() => {
              void load();
            }}
          >
            Retry
          </button>
        </p>
      )}
      <label className="admin-field-label">
        Article author
        <select
          value={authorId || ""}
          disabled={loading}
          onChange={(event) => onChange("authorId", event.target.value)}
        >
          <option value="">
            {loading
              ? "Loading profiles…"
              : "Select author (required to publish)"}
          </option>
          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
              disabled={!author.active && author.id !== authorId}
            >
              {author.fullName}
              {!author.active ? " (inactive)" : ""}
            </option>
          ))}
        </select>
      </label>
      {!loading && authors.length === 0 && !error && (
        <p className="admin-field-hint">
          Create an author profile using Manage authors. Your article stays open
          while you do.
        </p>
      )}
      <label className="admin-field-label">
        Clinical reviewer <span className="font-normal">(optional)</span>
        <select
          value={reviewerId || ""}
          disabled={loading}
          onChange={(event) => onChange("reviewerId", event.target.value)}
        >
          <option value="">No clinical reviewer</option>
          {authors
            .filter(
              (author) => author.clinicalReviewer || author.id === reviewerId,
            )
            .map((author) => (
              <option
                key={author.id}
                value={author.id}
                disabled={
                  (!author.active && author.id !== reviewerId) ||
                  author.id === authorId
                }
              >
                {author.fullName}
                {!author.active ? " (inactive)" : ""}
              </option>
            ))}
        </select>
      </label>
      {reviewer && (
        <div className="space-y-3 rounded-xl bg-[#f5f8ef] p-4">
          <p className="text-xs leading-6 text-[#60705b]">
            {reviewer.role}
            {reviewer.qualifications.length
              ? ` · ${reviewer.qualifications.join(", ")}`
              : " · No credentials recorded"}
          </p>
          <label className="flex items-start gap-2 text-xs leading-6">
            <input
              type="checkbox"
              className="mt-1"
              checked={verificationStatus === "verified"}
              disabled={
                !reviewer.clinicalReviewer ||
                !reviewer.qualifications.length ||
                reviewer.id === authorId
              }
              onChange={(event) =>
                onChange(
                  "verificationStatus",
                  event.target.checked ? "verified" : "unverified",
                )
              }
            />{" "}
            I confirm this reviewer has completed the clinical review of this
            article.
          </label>
          <p className="admin-field-hint">
            Changing article content clears this confirmation until it is
            reviewed again.
          </p>
        </div>
      )}
    </div>
  );
}
