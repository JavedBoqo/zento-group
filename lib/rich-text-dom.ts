import type { InlineText, RichText } from "./article-content";
import { safeArticleURL } from "./article-editor";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

export function richTextHTML(value: RichText): string {
  const inline = (parts: InlineText[]) =>
    parts
      .map((part) => {
        let text = escape(part.text).replace(/\n/g, "<br>");
        if (part.bold) text = `<strong>${text}</strong>`;
        if (part.italic) text = `<em>${text}</em>`;
        if (part.href && safeArticleURL(part.href))
          text = `<a href="${escape(part.href)}">${text}</a>`;
        return text;
      })
      .join("");
  return value
    .map((node) =>
      node.type === "heading"
        ? `<h${node.level}>${inline(node.content)}</h${node.level}>`
        : node.type === "paragraph"
          ? `<p>${inline(node.content) || "<br>"}</p>`
          : `<${node.type === "orderedList" ? "ol" : "ul"}>${node.items.map((item) => `<li>${inline(item)}</li>`).join("")}</${node.type === "orderedList" ? "ol" : "ul"}>`,
    )
    .join("");
}

/** Only text, basic marks, safe links and flat lists cross the editable DOM boundary. */
export function domToRich(root: Node): RichText {
  function inline(
    node: Node,
    marks: Omit<InlineText, "text"> = {},
  ): InlineText[] {
    if (node.nodeType === 3)
      return node.textContent ? [{ ...marks, text: node.textContent }] : [];
    if (
      !(node instanceof Element) ||
      /^(SCRIPT|STYLE|IFRAME|OBJECT|TEMPLATE)$/.test(node.tagName)
    )
      return [];
    if (node.tagName === "BR") return [{ ...marks, text: "\n" }];
    const next = { ...marks };
    if (/^(B|STRONG)$/.test(node.tagName)) next.bold = true;
    if (/^(I|EM)$/.test(node.tagName)) next.italic = true;
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      if (safeArticleURL(href)) next.href = href;
    }
    return [...node.childNodes].flatMap((child) => inline(child, next));
  }
  const result: RichText = [];
  let pending: InlineText[] = [];
  const flush = () => {
    if (pending.some((part) => part.text.trim()))
      result.push({ type: "paragraph", content: pending });
    pending = [];
  };
  for (const node of root.childNodes) {
    if (node instanceof Element && /^(UL|OL)$/.test(node.tagName)) {
      flush();
      result.push({
        type: node.tagName === "OL" ? "orderedList" : "bulletList",
        items: [...node.children]
          .filter((child) => child.tagName === "LI")
          .map((item) => inline(item)),
      });
    } else if (node instanceof Element && /^H[1-6]$/.test(node.tagName)) {
      flush();
      result.push({
        type: "heading",
        level: Number(node.tagName[1]) <= 3 ? 3 : 4,
        content: inline(node),
      });
    } else if (
      node instanceof Element &&
      /^(P|DIV|H[1-6]|BLOCKQUOTE)$/.test(node.tagName)
    ) {
      flush();
      result.push(...domToRich(node));
    } else pending.push(...inline(node));
  }
  flush();
  return result;
}
