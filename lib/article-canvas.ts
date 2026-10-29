import {
  newContentId,
  type ArticleContent,
  type ContentBlock,
  type ContentSection,
} from "./article-content";
import { domToRich, richTextHTML } from "./rich-text-dom";
import { safeArticleURL } from "./article-editor";

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

/** The canvas is an editing view of the existing content contract, not a stored HTML format. */
export function articleCanvasHTML(content: ArticleContent): string {
  const block = (item: ContentBlock): string => {
    const key = `data-block-id="${escape(item.id)}"`;
    if (item.type === "image")
      return safeArticleURL(item.src, true)
        ? `<p ${key}><img src="${escape(item.src)}" alt="${escape(item.alt)}"></p>`
        : "";
    if (item.type === "subheading")
      return `<h3 ${key}>${escape(item.text)}</h3>`;
    if (item.type === "list")
      return `<div ${key}>${richTextHTML([{ type: item.ordered ? "orderedList" : "bulletList", items: item.items }])}</div>`;
    if (item.type === "callout")
      return `<blockquote ${key}>${richTextHTML(item.content)}</blockquote>`;
    return `<div ${key}>${richTextHTML(item.content)}</div>`;
  };
  return (
    richTextHTML(content.introduction) +
    (content.summary.length
      ? `<h2 data-summary="true">Quick summary</h2>${richTextHTML(content.summary)}`
      : "") +
    content.sections
      .map(
        (section) =>
          `<h2 data-section-id="${escape(section.id)}">${escape(section.title)}</h2>${section.blocks.map(block).join("")}${section.type === "checklist" ? `<ul data-checklist="true">${section.items.map((item) => `<li data-item-id="${escape(item.id)}">${richTextHTML([{ type: "paragraph", content: item.content }])}</li>`).join("")}</ul>` : ""}`,
      )
      .join("") +
    (content.faqs.length
      ? `<h2 data-faqs="true">Frequently asked questions</h2>${content.faqs.map((faq) => `<h3 data-faq-id="${escape(faq.id)}">${escape(faq.question)}</h3>${richTextHTML(faq.answer)}`).join("")}`
      : "")
  );
}

export function canvasToArticle(
  root: HTMLElement,
  previous: ArticleContent,
): ArticleContent {
  const next: ArticleContent = {
    ...previous,
    introduction: [],
    summary: [],
    sections: [],
    faqs: [],
  };
  let mode: "introduction" | "summary" | "section" | "faqs" = "introduction";
  let section: ContentSection | undefined;
  let faq: ArticleContent["faqs"][number] | undefined;
  const used = new Set<string>();
  const stableId = (value?: string) => {
    const id =
      value && /^[a-zA-Z0-9_-]{1,100}$/.test(value) && !used.has(value)
        ? value
        : newContentId();
    used.add(id);
    return id;
  };
  const nodes: Node[] = [];
  function flatten(node: Node) {
    if (
      node instanceof HTMLElement &&
      /^(DIV|SECTION|ARTICLE)$/.test(node.tagName) &&
      (node.querySelector("h2") ||
        (!node.dataset.blockId && node.querySelector("img")))
    )
      [...node.childNodes].forEach(flatten);
    else nodes.push(node);
  }
  [...root.childNodes].forEach(flatten);
  for (const node of nodes) {
    const element = node instanceof HTMLElement ? node : undefined;
    const title = node.textContent?.trim() || "";
    if (element?.tagName === "H2") {
      faq = undefined;
      if (
        !element.dataset.sectionId &&
        (element.dataset.summary || /^quick summary$/i.test(title))
      ) {
        mode = "summary";
        continue;
      }
      if (
        !element.dataset.sectionId &&
        (element.dataset.faqs ||
          /^(frequently asked questions|faqs?)$/i.test(title))
      ) {
        mode = "faqs";
        continue;
      }
      mode = "section";
      const old = previous.sections.find(
        (item) => item.id === element.dataset.sectionId,
      );
      section = {
        ...(old || { layout: "standard" as const, type: "content" as const }),
        id: stableId(old?.id),
        title,
        blocks: [],
      };
      if (section.type === "checklist") section.items = [];
      element.dataset.sectionId = section.id;
      next.sections.push(section);
      continue;
    }
    const container = document.createElement("div");
    container.append(node.cloneNode(true));
    const rich = domToRich(container);
    const images = element
      ? [
          ...(element.tagName === "IMG"
            ? [element as HTMLImageElement]
            : element.querySelectorAll("img")),
        ].filter((image) =>
          safeArticleURL(image.getAttribute("src") || "", true),
        )
      : [];
    // Images cannot live in the schema's introduction or FAQ rich text. Keep them
    // as ordinary article blocks rather than dropping an uploaded image.
    if (images.length && mode !== "section") {
      section = {
        id: stableId(element?.dataset.sectionId),
        title: "",
        layout: "standard",
        type: "content",
        blocks: [],
      };
      if (element) element.dataset.sectionId = section.id;
      next.sections.push(section);
      if (mode !== "faqs") mode = "section";
      section.blocks.push(
        ...images.map((image) => ({
          id: stableId(element?.dataset.blockId),
          type: "image" as const,
          src: image.getAttribute("src")!,
          alt: image.getAttribute("alt") || "",
        })),
      );
      if (rich.length)
        section.blocks.push({
          id: newContentId(),
          type: "richText",
          content: rich,
        });
      continue;
    }
    if (mode === "faqs") {
      if (element && /^H[3-6]$/.test(element.tagName)) {
        faq = {
          id: stableId(element.dataset.faqId),
          question: title,
          answer: [],
        };
        element.dataset.faqId = faq.id;
        next.faqs.push(faq);
      } else if (faq) faq.answer.push(...rich);
      else next.introduction.push(...rich); // Unmatched content is preserved, never discarded.
      continue;
    }
    if (mode !== "section" || !section) {
      next[mode === "summary" ? "summary" : "introduction"].push(...rich);
      continue;
    }
    if (section.type === "checklist" && element?.dataset.checklist) {
      section.items = [...element.children].map((item) => ({
        id: stableId((item as HTMLElement).dataset.itemId),
        content: domToRich(item).flatMap((part) =>
          part.type === "paragraph" || part.type === "heading"
            ? part.content
            : part.items.flat(),
        ),
      }));
      continue;
    }
    const old = previous.sections
      .flatMap((item) => item.blocks)
      .find((item) => item.id === element?.dataset.blockId);
    const id = stableId(old?.id);
    if (element) element.dataset.blockId = id;
    if (images.length) {
      section.blocks.push(
        ...images.map((image, index) => ({
          id: index === 0 ? id : newContentId(),
          type: "image" as const,
          src: image.getAttribute("src")!,
          alt: image.getAttribute("alt") || "",
        })),
      );
      if (rich.length)
        section.blocks.push({
          id: newContentId(),
          type: "richText",
          content: rich,
        });
    } else if (element && /^H[3-6]$/.test(element.tagName))
      section.blocks.push({
        ...(old?.type === "subheading" ? old : {}),
        id,
        type: "subheading",
        text: title,
      });
    else if (element?.tagName === "BLOCKQUOTE")
      section.blocks.push({
        id,
        type: "callout",
        style: old?.type === "callout" ? old.style : "quote",
        content: rich,
      });
    else if (rich.length)
      section.blocks.push({ id, type: "richText", content: rich });
  }
  return next;
}
