import type { Article, ArticleSection, BlogImage } from "./blog";

export const DEFAULT_BLOG_CTA = {
  heading: "Speak to Our Nursing Team",
  body: "If any of this feels familiar, you don't need to have all the answers today. Our nurse-led home care team can talk through what you're noticing, explain what support might help, and guide you through funding options for your area — with no pressure and no obligation. No pressure. No obligation. Honest advice from registered nurses.",
};

export function safeArticleURL(value: string, image = false): boolean {
  return (
    /^(https:\/\/|\/(?!\/))/.test(value) ||
    (!image && /^(https?:\/\/|mailto:|tel:|#)/.test(value))
  );
}

export function markdownImages(source: string): BlogImage[] {
  return [
    ...source.matchAll(
      /!\[([^\]\n]*)\]\((https:\/\/[^\s)]+|\/(?!\/)[^\s)]+)\)/g,
    ),
  ]
    .filter((match) => safeArticleURL(match[2], true))
    .map((match) => ({ src: match[2], alt: match[1] }));
}

export function plainArticleText(source: string): string {
  return source
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(^|\n)\s*#{1,6}\s+/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function articleSlug(title: string): string {
  return plainArticleText(title)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180)
    .replace(/-$/, "");
}

export function sectionAnchor(heading: string, index: number): string {
  return `section-${index + 1}-${articleSlug(heading) || "article"}`;
}

export interface MarkdownBlock {
  type: "heading" | "paragraph" | "list" | "image" | "code" | "quote";
  text: string;
  level?: number;
  items?: string[];
  ordered?: boolean;
  image?: BlogImage;
}

/** A deliberately small Markdown grammar. Unsupported syntax remains visible text. */
export function articleBlocks(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index++;
      continue;
    }
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const content = [line];
      index++;
      while (index < lines.length) {
        const next = lines[index++];
        content.push(next);
        if (next.trim().startsWith(fence[1])) break;
      }
      blocks.push({ type: "code", text: content.join("\n") });
      continue;
    }
    const heading = line.match(/^ {0,3}(#{1,6})\s+(.+?)(?:\s+#+)?\s*$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      index++;
      continue;
    }
    const image = markdownImages(line);
    if (
      image.length === 1 &&
      line.trim() === `![${image[0].alt}](${image[0].src})`
    ) {
      blocks.push({ type: "image", text: line, image: image[0] });
      index++;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const content: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index]))
        content.push(lines[index++].replace(/^\s*>\s?/, ""));
      blocks.push({ type: "quote", text: content.join("\n") });
      continue;
    }
    const list = line.match(/^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/);
    if (list) {
      const items: string[] = [];
      while (index < lines.length) {
        const next = lines[index].match(/^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/);
        if (!next || Boolean(next[2]) !== Boolean(list[2])) break;
        items.push(next[3]);
        index++;
      }
      blocks.push({
        type: "list",
        text: items.join("\n"),
        items,
        ordered: Boolean(list[2]),
      });
      continue;
    }
    const content = [line];
    index++;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\s*(?:#{1,6}\s|[-+*]\s|\d+[.)]\s|>|`{3,}|~{3,}|!\[)/.test(lines[index])
    )
      content.push(lines[index++]);
    blocks.push({ type: "paragraph", text: content.join("\n") });
  }
  return blocks;
}

function blockSource(block: MarkdownBlock): string {
  if (block.type === "heading")
    return `${"#".repeat(block.level || 2)} ${block.text}`;
  if (block.type === "list")
    return block
      .items!.map((item, i) => `${block.ordered ? `${i + 1}.` : "-"} ${item}`)
      .join("\n");
  if (block.type === "quote")
    return block.text
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
  return block.text;
}

function joinBlocks(blocks: MarkdownBlock[]): string {
  return blocks.map(blockSource).join("\n\n");
}

function makeSection(
  heading: string,
  input: MarkdownBlock[],
  previous?: ArticleSection,
): ArticleSection {
  const blocks = [...input];
  // Keep image placement in the source unless it is the section's leading image.
  const image = blocks[0]?.type === "image" ? blocks.shift()!.image : undefined;
  const base = { heading, ...(image ? { image } : {}) };
  if (previous?.type === "cta_section")
    return { ...base, type: "cta_section", body: [joinBlocks(blocks)] };
  const subheadings = blocks.filter((block) => block.type === "heading");
  if (
    blocks[0]?.type === "heading" &&
    subheadings.length &&
    subheadings.every(
      (block) => block.level === 3 && /^\d+[.)]\s+/.test(block.text),
    )
  ) {
    const items: Extract<ArticleSection, { type: "signs" }>["items"] = [];
    for (const block of blocks) {
      if (block.type === "heading") {
        const match = block.text.match(/^(\d+)[.)]\s+(.+)$/)!;
        const old =
          previous?.type === "signs"
            ? previous.items.find((item) => item.title === match[2])
            : undefined;
        items.push({
          number: Number(match[1]),
          title: match[2],
          body: "",
          ...(old?.icon ? { icon: old.icon } : {}),
        });
      } else {
        const item = items[items.length - 1];
        item.body += `${item.body ? "\n\n" : ""}${blockSource(block)}`;
      }
    }
    return { ...base, type: "signs", items };
  }
  const lists = blocks.filter((block) => block.type === "list");
  if (
    lists.length === 1 &&
    !lists[0].ordered &&
    blocks.every((block) => ["paragraph", "list"].includes(block.type))
  ) {
    const split = blocks.indexOf(lists[0]);
    return {
      ...base,
      type: "text_with_list",
      intro: joinBlocks(blocks.slice(0, split)),
      list: lists[0].items!,
      outro: joinBlocks(blocks.slice(split + 1)),
    };
  }
  return {
    ...base,
    type: "text",
    body: blocks.length ? [joinBlocks(blocks)] : [],
  };
}

const faqHeading = /^(?:frequently\s+asked\s+questions|faqs?)(?:\s*[:?])?$/i;
const summaryHeading =
  /^(?:quick\s+summary|summary|key\s+takeaways)(?:\s*:)?$/i;

export function parseArticle(source: string, previous?: Article): Article {
  const blocks = articleBlocks(source);
  const titleIndex = blocks.findIndex(
    (block) => block.type === "heading" && block.level === 1,
  );
  const title =
    titleIndex >= 0
      ? plainArticleText(blocks.splice(titleIndex, 1)[0].text)
      : previous?.title ||
        plainArticleText(blocks[0]?.text || "").slice(0, 150);
  const article: Article = {
    title,
    slug: previous?.slug || articleSlug(title),
    featured: previous?.featured || false,
    seoTitle: previous?.seoTitle || title,
    metaDescription: previous?.metaDescription || "",
    heroImage: previous?.heroImage || { src: "", alt: "" },
    intro: [],
    sections: [],
    faqs: [],
    closingCta: previous?.closingCta || DEFAULT_BLOG_CTA,
    editorSource: source,
  };
  let index = 0;
  const intro: MarkdownBlock[] = [];
  while (
    index < blocks.length &&
    !(blocks[index].type === "heading" && (blocks[index].level || 0) <= 2)
  )
    intro.push(blocks[index++]);
  if (intro.length) article.intro.push(joinBlocks(intro));
  while (index < blocks.length) {
    const start = blocks[index++];
    const level = start.level || 2;
    const content: MarkdownBlock[] = [];
    while (
      index < blocks.length &&
      !(blocks[index].type === "heading" && (blocks[index].level || 0) <= level)
    )
      content.push(blocks[index++]);
    if (summaryHeading.test(plainArticleText(start.text))) {
      if (content.length) article.intro.unshift(...content.map(blockSource));
      continue;
    }
    if (faqHeading.test(plainArticleText(start.text))) {
      const remaining: MarkdownBlock[] = [];
      let question: MarkdownBlock | undefined;
      let answer: MarkdownBlock[] = [];
      const finish = () => {
        if (!question) return;
        if (answer.length)
          article.faqs.push({
            question: plainArticleText(question.text),
            answer: joinBlocks(answer),
          });
        else remaining.push(question);
      };
      const questionLevel = content.find(
        (block) => block.type === "heading",
      )?.level;
      for (const block of content) {
        if (block.type === "heading" && block.level === questionLevel) {
          finish();
          question = block;
          answer = [];
        } else if (question) answer.push(block);
        else remaining.push(block);
      }
      finish();
      if (remaining.length)
        article.sections.push(makeSection(start.text, remaining));
      continue;
    }
    const old = previous?.sections.find(
      (section) => section.heading === start.text,
    );
    article.sections.push(makeSection(start.text, content, old));
  }
  if (!article.intro.length && article.sections.length) {
    const first = article.sections[0];
    const text =
      first.type === "signs"
        ? first.items[0]?.body
        : first.type === "text_with_list"
          ? first.intro
          : first.body[0];
    if (text) article.intro = [plainArticleText(text).slice(0, 300)];
  }
  if (!article.metaDescription)
    article.metaDescription = plainArticleText(
      article.intro[0] || source,
    ).slice(0, 160);
  return article;
}

export function articleToSource(article: Article): string {
  if (article.editorSource !== undefined) return article.editorSource;
  const image = (value?: BlogImage) =>
    value?.src ? `![${value.alt}](${value.src})\n\n` : "";
  const sections = article.sections.map((section) => {
    let body: string;
    if (section.type === "signs")
      body = section.items
        .map((item) => `### ${item.number}. ${item.title}\n\n${item.body}`)
        .join("\n\n");
    else if (section.type === "text_with_list")
      body = [
        section.intro,
        section.list.map((item) => `- ${item}`).join("\n"),
        section.outro || "",
      ]
        .filter(Boolean)
        .join("\n\n");
    else body = section.body.join("\n\n");
    return `## ${section.heading}\n\n${image(section.image)}${body}`;
  });
  return [
    `# ${article.title}`,
    "## Quick Summary",
    ...article.intro,
    ...sections,
    ...(article.faqs.length
      ? [
          "## Frequently Asked Questions",
          ...article.faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`),
        ]
      : []),
  ].join("\n\n");
}
