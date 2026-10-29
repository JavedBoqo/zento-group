"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Bold, Italic, Link2, List, ListOrdered, Unlink } from "lucide-react";
import type { RichText } from "@/lib/article-content";
import { domToRich, richTextHTML } from "@/lib/rich-text-dom";
import { safeArticleURL } from "@/lib/article-editor";

export default function RichTextEditor({
  label,
  value,
  onChange,
  compact = false,
  headings = false,
}: {
  label: string;
  value: RichText;
  onChange: (value: RichText) => void;
  compact?: boolean;
  headings?: boolean;
}) {
  const id = useId();
  const editable = useRef<HTMLDivElement>(null);
  const selection = useRef<Range | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setURL] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (
      editable.current &&
      !editable.current.contains(document.activeElement)
    ) {
      const html = richTextHTML(value);
      if (editable.current.innerHTML !== html)
        editable.current.innerHTML = html;
    }
  }, [value]);
  const changed = () => {
    if (editable.current) onChange(domToRich(editable.current));
  };
  function command(name: string, argument?: string) {
    editable.current?.focus();
    // Native editing keeps browser selection, undo and keyboard shortcuts without an editor dependency.
    document.execCommand(name, false, argument);
    changed();
  }
  return (
    <div className="space-y-2">
      <label id={`${id}-label`} className="admin-field-label">
        {label}
      </label>
      <div className="overflow-hidden rounded-xl border border-[#dfe7de] bg-white focus-within:ring-2 focus-within:ring-[#79b22f]/25">
        <div
          className="flex flex-wrap gap-1 border-b border-[#e6ece5] bg-[#f8faf5] p-1.5"
          role="toolbar"
          aria-label={`${label} formatting`}
        >
          {headings && (
            <select
              aria-label={`${label}: Text style`}
              value=""
              className="!w-auto !min-h-9 !py-1 !text-xs"
              onMouseDown={() => {
                const current = window.getSelection();
                if (
                  current?.rangeCount &&
                  editable.current?.contains(current.anchorNode)
                )
                  selection.current = current.getRangeAt(0).cloneRange();
              }}
              onChange={(event) => {
                editable.current?.focus();
                const current = window.getSelection();
                if (selection.current) {
                  current?.removeAllRanges();
                  current?.addRange(selection.current);
                }
                command("formatBlock", event.target.value);
              }}
            >
              <option value="" disabled>
                Text style
              </option>
              <option value="p">Paragraph</option>
              <option value="h3">Heading</option>
              <option value="h4">Subheading</option>
            </select>
          )}
          {[
            { name: "Bold", command: "bold", icon: Bold },
            { name: "Italic", command: "italic", icon: Italic },
            {
              name: "Bulleted list",
              command: "insertUnorderedList",
              icon: List,
            },
            {
              name: "Numbered list",
              command: "insertOrderedList",
              icon: ListOrdered,
            },
            { name: "Remove link", command: "unlink", icon: Unlink },
          ].map((tool) => (
            <button
              key={tool.name}
              type="button"
              aria-label={`${label}: ${tool.name}`}
              title={tool.name}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => command(tool.command)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526b46] hover:bg-[#eaf1e0]"
            >
              <tool.icon size={15} />
            </button>
          ))}
          <button
            type="button"
            aria-label={`${label}: Insert link`}
            title="Insert link"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              const current = window.getSelection();
              selection.current =
                current?.rangeCount &&
                editable.current?.contains(current.anchorNode)
                  ? current.getRangeAt(0).cloneRange()
                  : null;
              setLinkOpen(!linkOpen);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526b46] hover:bg-[#eaf1e0]"
          >
            <Link2 size={15} />
          </button>
        </div>
        {linkOpen && (
          <div className="space-y-2 border-b p-3">
            <label className="block text-xs">
              Link URL
              <input
                value={url}
                onChange={(event) => setURL(event.target.value)}
                placeholder="https://… or /contact"
              />
            </label>
            <button
              type="button"
              className="admin-secondary"
              onClick={() => {
                if (!safeArticleURL(url)) {
                  setError("Enter an HTTPS, email, phone or local link.");
                  return;
                }
                editable.current?.focus();
                const current = window.getSelection();
                if (selection.current) {
                  current?.removeAllRanges();
                  current?.addRange(selection.current);
                }
                command("createLink", url);
                setLinkOpen(false);
                setError("");
                setURL("");
              }}
            >
              Apply link
            </button>
            {error && (
              <p role="alert" className="text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        )}
        <div
          ref={editable}
          role="textbox"
          aria-multiline="true"
          aria-labelledby={`${id}-label`}
          contentEditable
          suppressContentEditableWarning
          onInput={changed}
          onBlur={changed}
          onPaste={(event) => {
            event.preventDefault();
            const html = event.clipboardData.getData("text/html");
            if (html) {
              const document = new DOMParser().parseFromString(
                html,
                "text/html",
              );
              command("insertHTML", richTextHTML(domToRich(document.body)));
            } else
              command("insertText", event.clipboardData.getData("text/plain"));
          }}
          className={`admin-rich-editor p-4 text-[14px] leading-7 outline-none ${compact ? "min-h-24" : "min-h-40"}`}
        />
      </div>
    </div>
  );
}
