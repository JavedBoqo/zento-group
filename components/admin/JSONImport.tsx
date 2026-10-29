"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Copy, FileUp, Sparkles } from "lucide-react";
import { PageHeader } from "./AdminUI";
import type { BlogImportResult } from "@/lib/blog-import";

export default function JSONImport({
  kind,
  prompt,
  example,
  maxBytes,
}: {
  kind: "blogs" | "careers";
  prompt: string;
  example: object;
  maxBytes: number;
}) {
  const careers = kind === "careers";
  const singular = careers ? "position" : "article";
  const plural = careers ? "positions" : "articles";
  const basePath = `/admin/${kind}`;
  const sourceDescription = careers ? "job descriptions" : "blog content";
  const [source, setSource] = useState("");
  const [publish, setPublish] = useState(false);
  const [results, setResults] = useState<BlogImportResult[]>([]);
  const [validated, setValidated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const ready = results.filter((result) => result.status === "ready").length;
  function changeSource(value: string) {
    setSource(value);
    setResults([]);
    setValidated(false);
    setError("");
  }
  async function run(commit: boolean) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api${basePath}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          commit,
          ...(careers ? { open: publish } : { publish }),
        }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.error || "Could not validate the import.");
      setResults(body.results);
      setValidated(!commit);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Import failed. Please try again.",
      );
      setValidated(false);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        eyebrow="Content tools"
        title={`Import ${plural}`}
        description={
          careers
            ? "Upload → Review → Edit → Publish"
            : "Upload → Review → Edit → Publish"
        }
        actions={
          <Link className="admin-secondary" href={basePath}>
            Back to {careers ? "careers" : "articles"}
          </Link>
        }
      />
      <section
        className="admin-card space-y-4"
        id="ai-prompt"
        aria-labelledby="ai-prompt-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="ai-prompt-heading" className="font-semibold">
            <Sparkles size={16} className="mr-2 inline" />
            AI Prompt
          </h2>
          <button
            type="button"
            className="admin-primary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(prompt);
                setPromptMessage(
                  `Prompt copied. Paste it into ChatGPT, Claude or Gemini, then supply your existing ${sourceDescription} separately.`,
                );
              } catch {
                setPromptMessage(
                  "Expand the prompt below, select the text and copy it manually.",
                );
              }
            }}
          >
            <Copy size={14} />
            Copy Prompt
          </button>
        </div>
        <p className="admin-field-hint">
          Copy this fixed conversion prompt into your preferred AI tool, then
          provide your existing {sourceDescription}. No content is sent to an AI
          service from Zento.
        </p>
        <details className="group overflow-hidden rounded-xl border border-[#e1e8dc] bg-[#f8faf5]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            View conversion prompt
            <ChevronDown
              size={16}
              className="shrink-0 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <pre
            tabIndex={0}
            role="region"
            aria-label="JSON conversion prompt"
            className="max-h-96 overflow-auto whitespace-pre-wrap break-words border-t border-[#e1e8dc] bg-white p-4 font-mono text-xs leading-relaxed text-[#40533a]"
          >
            {prompt}
          </pre>
        </details>
        {promptMessage && (
          <p role="status" className="text-sm">
            {promptMessage}
          </p>
        )}
      </section>
      <section
        className="admin-card space-y-4"
        aria-labelledby="json-import-heading"
      >
        <h2 id="json-import-heading" className="font-semibold">
          Upload existing content
        </h2>
        <p className="admin-field-hint">
          Choose your prepared content file, check it, then review each{" "}
          {singular} in the editor. Up to 20 {plural} per file, 1 MB total.
          Existing {plural} are never overwritten.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <label className="admin-field-label">
            <span className="block">Upload .json</span>
            <input
              className="mt-2 block max-w-full text-xs"
              type="file"
              accept=".json,application/json"
              disabled={busy}
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                if (
                  !file.name.toLowerCase().endsWith(".json") ||
                  file.size > maxBytes
                ) {
                  setError("Choose a .json file smaller than 1 MB.");
                  return;
                }
                try {
                  changeSource(await file.text());
                } catch {
                  setError(
                    "Could not read this file. Try pasting its JSON instead.",
                  );
                }
                event.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            className="admin-secondary"
            disabled={busy}
            onClick={() => {
              if (
                !source ||
                window.confirm("Replace the pasted JSON with the example?")
              )
                changeSource(JSON.stringify(example, null, 2));
            }}
          >
            Load example
          </button>
          <a
            className="text-sm text-secondary underline"
            download={`zento-${singular}-example.json`}
            href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(example, null, 2))}`}
          >
            Download example JSON
          </a>
        </div>
        <details className="rounded-lg border border-[#e4e9f0] p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Paste content instead (advanced)
          </summary>
          <label className="admin-field-label mt-4">
            {careers ? "Position JSON" : "Article JSON"}
            <textarea
              spellCheck={false}
              value={source}
              disabled={busy}
              onChange={(event) => changeSource(event.target.value)}
              rows={14}
              className="!min-h-64 font-mono !text-xs"
              placeholder={
                careers
                  ? 'Paste a complete position or {"jobs":[...]}. Use Load example to get started.'
                  : '{"title":"Example article","slug":"example-article","sections":[]}'
              }
            />
          </label>
        </details>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={publish}
            disabled={busy}
            onChange={(event) => {
              setPublish(event.target.checked);
              setResults([]);
              setValidated(false);
            }}
          />
          {careers
            ? "Open positions immediately instead of importing them closed."
            : "Publish immediately instead of importing drafts (requires a valid author and complete publishing fields)."}
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="admin-secondary"
            disabled={busy || !source.trim()}
            onClick={() => void run(false)}
          >
            {busy ? "Processing…" : "Validate JSON"}
          </button>
          <button
            type="button"
            className="admin-primary"
            disabled={busy || !validated || !ready}
            onClick={() => void run(true)}
          >
            <FileUp size={14} />
            {publish ? (careers ? "Open" : "Publish") : "Import"} {ready || ""}{" "}
            ready {ready === 1 ? singular : plural}
          </button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
      </section>
      <section
        className="admin-card space-y-4"
        aria-labelledby="import-results-heading"
        aria-live="polite"
      >
        <h2 id="import-results-heading" className="font-semibold">
          Validation Results
        </h2>
        {!results.length ? (
          <p className="admin-field-hint">
            Validate JSON to review {plural} before anything is saved.
          </p>
        ) : (
          <>
            <p className="text-sm">
              {results.length} {plural} checked ·{" "}
              {results.filter((result) => result.status === "imported").length}{" "}
              imported · {ready} ready ·{" "}
              {
                results.filter(
                  (result) =>
                    result.status === "error" || result.status === "conflict",
                ).length
              }{" "}
              need attention. Only ready {plural} will be imported.
            </p>
            <ol className="divide-y divide-[#e6ece5]">
              {results.map((result) => (
                <li key={result.index} className="space-y-2 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="text-sm">
                      {result.index + 1}. {result.title}
                    </strong>
                    <span className="admin-tag">{result.status}</span>
                  </div>
                  <p className="break-all text-xs text-[#60705b]">
                    {result.slug}
                    {result.sections !== undefined &&
                      ` · ${result.sections} sections · ${result.faqs} FAQs`}
                  </p>
                  {result.messages.map((message, index) => (
                    <p
                      key={index}
                      className={`text-sm ${result.status === "error" || result.status === "conflict" ? "text-red-700" : ""}`}
                    >
                      {message}
                    </p>
                  ))}
                  {result.id && (
                    <Link
                      className="inline-block text-sm font-medium text-secondary underline"
                      href={`${basePath}/${result.id}/edit`}
                    >
                      {result.status === "imported"
                        ? careers
                          ? "Open in career editor"
                          : "Open in visual editor"
                        : `Open existing ${singular} to update`}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
    </div>
  );
}
