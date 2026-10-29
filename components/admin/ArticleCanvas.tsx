"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  ImagePlus,
  Quote,
} from "lucide-react";
import { type ArticleContent, richTextPlainText } from "@/lib/article-content";
import { articleCanvasHTML, canvasToArticle } from "@/lib/article-canvas";
import { domToRich, richTextHTML } from "@/lib/rich-text-dom";
import { safeArticleURL } from "@/lib/article-editor";
import ImageUpload from "./ImageUpload";
import { Field } from "./FormFields";

export default function ArticleCanvas({
  value,
  onChange,
}: {
  value: ArticleContent;
  onChange: (value: ArticleContent) => void;
}) {
  const editor = useRef<HTMLDivElement>(null);
  const selection = useRef<Range | null>(null);
  const [panel, setPanel] = useState<"image" | "link" | null>(null);
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [url, setURL] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (editor.current && !editor.current.contains(document.activeElement)) {
      const html = articleCanvasHTML(value) || "<p><br></p>";
      if (editor.current.innerHTML !== html) editor.current.innerHTML = html;
    }
  }, [value]);
  const changed = () => {
    if (editor.current) onChange(canvasToArticle(editor.current, value));
  };
  function remember() {
    const current = window.getSelection();
    if (current?.rangeCount && editor.current?.contains(current.anchorNode))
      selection.current = current.getRangeAt(0).cloneRange();
  }
  function command(name: string, argument?: string) {
    editor.current?.focus();
    if (
      selection.current &&
      editor.current?.contains(selection.current.startContainer)
    ) {
      const current = window.getSelection();
      current?.removeAllRanges();
      current?.addRange(selection.current);
    }
    document.execCommand(name, false, argument);
    remember();
    changed();
  }
  return (
    <section className="admin-writing-sheet">
      <div
        className="admin-canvas-toolbar"
        role="toolbar"
        aria-label="Article formatting"
        onMouseDown={remember}
      >
        <select
          aria-label="Text style"
          defaultValue=""
          onChange={(event) => {
            command("formatBlock", event.target.value);
            event.target.value = "";
          }}
        >
          <option value="" disabled>
            Text style
          </option>
          <option value="p">Paragraph</option>
          <option value="h2">Section heading</option>
          <option value="h3">Subheading / FAQ question</option>
        </select>
        {[
          { label: "Bold", name: "bold", Icon: Bold },
          { label: "Italic", name: "italic", Icon: Italic },
          { label: "Bulleted list", name: "insertUnorderedList", Icon: List },
          {
            label: "Numbered list",
            name: "insertOrderedList",
            Icon: ListOrdered,
          },
          {
            label: "Quote",
            name: "formatBlock",
            argument: "blockquote",
            Icon: Quote,
          },
        ].map((tool) => (
          <button
            type="button"
            key={tool.label}
            aria-label={tool.label}
            title={tool.label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => command(tool.name, tool.argument)}
          >
            <tool.Icon size={17} />
          </button>
        ))}
        <button
          type="button"
          aria-label="Insert link"
          title="Insert link"
          onClick={() => setPanel(panel === "link" ? null : "link")}
        >
          <Link2 size={17} />
        </button>
        <button
          type="button"
          aria-label="Insert image"
          title="Insert image"
          onClick={() => setPanel(panel === "image" ? null : "image")}
        >
          <ImagePlus size={17} />
        </button>
      </div>
      {panel && (
        <div className="admin-canvas-insert space-y-3">
          {panel === "image" ? (
            <>
              <ImageUpload
                label="Article image"
                value={image}
                alt={alt}
                onChange={setImage}
              />
              <Field
                label="Describe this image"
                value={alt}
                onChange={setAlt}
              />
            </>
          ) : (
            <Field label="Link address" value={url} onChange={setURL} />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              className="admin-primary"
              onClick={() => {
                if (panel === "image") {
                  if (!image || !safeArticleURL(image, true)) {
                    setError("Upload an image or enter a valid image address.");
                    return;
                  }
                  const node = document.createElement("img");
                  node.src = image;
                  node.alt = alt;
                  command("insertHTML", `<p>${node.outerHTML}</p><p><br></p>`);
                  setImage("");
                  setAlt("");
                } else {
                  if (!safeArticleURL(url)) {
                    setError("Enter a website, email or phone link.");
                    return;
                  }
                  command("createLink", url);
                  setURL("");
                }
                setPanel(null);
                setError("");
              }}
            >
              Insert {panel}
            </button>
            <button
              type="button"
              className="admin-secondary"
              onClick={() => {
                setPanel(null);
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
          {error && (
            <p role="alert" className="text-red-700">
              {error}
            </p>
          )}
        </div>
      )}
      <div
        ref={editor}
        role="textbox"
        aria-label="Article content"
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        className="admin-canvas admin-rich-editor"
        onInput={changed}
        onKeyUp={remember}
        onMouseUp={remember}
        onPaste={(event) => {
          event.preventDefault();
          const html = event.clipboardData.getData("text/html");
          if (html) {
            const parsed = new DOMParser().parseFromString(html, "text/html");
            // Keep heading hierarchy while stripping external markup and unsafe links.
            const clean = document.createElement("div");
            const sanitize = (node: Node) => {
              if (
                node instanceof HTMLElement &&
                /^(DIV|SECTION|ARTICLE)$/.test(node.tagName)
              ) {
                [...node.childNodes].forEach(sanitize);
                return;
              }
              if (node instanceof HTMLElement && /^H[12]$/.test(node.tagName)) {
                const heading = document.createElement("h2");
                heading.textContent = node.textContent;
                clean.append(heading);
              } else {
                const wrapper = document.createElement("div");
                wrapper.append(node.cloneNode(true));
                const html = richTextHTML(domToRich(wrapper));
                clean.insertAdjacentHTML(
                  "beforeend",
                  node instanceof HTMLElement && node.tagName === "BLOCKQUOTE"
                    ? `<blockquote>${html}</blockquote>`
                    : html,
                );
                for (const image of wrapper.querySelectorAll("img")) {
                  const src = image.getAttribute("src") || "";
                  if (safeArticleURL(src, true)) {
                    const copy = document.createElement("img");
                    copy.src = src;
                    copy.alt = image.getAttribute("alt") || "";
                    clean.append(copy);
                  }
                }
              }
            };
            [...parsed.body.childNodes].forEach(sanitize);
            command("insertHTML", clean.innerHTML);
          } else
            command("insertText", event.clipboardData.getData("text/plain"));
        }}
      />
      <div className="admin-canvas-footer">
        <span>
          Use section headings to organise your article. Add “Quick summary” or
          “FAQs” as a section heading when needed.
        </span>
        <span>
          {richTextPlainText(value.introduction).split(/\s+/).filter(Boolean)
            .length +
            value.sections.reduce(
              (sum, section) =>
                sum +
                section.blocks.reduce(
                  (count, block) =>
                    count +
                    (block.type === "richText" || block.type === "callout"
                      ? richTextPlainText(block.content)
                          .split(/\s+/)
                          .filter(Boolean).length
                      : 0),
                  0,
                ),
              0,
            )}{" "}
          words
        </span>
      </div>
    </section>
  );
}
