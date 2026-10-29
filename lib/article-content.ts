import { z } from "zod";
import type { Article } from "./blog";
import {
  articleBlocks,
  DEFAULT_BLOG_CTA,
  safeArticleURL,
} from "./article-editor";

const text = z.string().max(20000);
const id = z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/);
const image = z.object({
  src: z
    .string()
    .max(2000)
    .refine(
      (value) => !value || safeArticleURL(value, true),
      "Use a local path or HTTPS image URL",
    ),
  alt: z.string().max(300),
});
export const inlineSchema = z.object({
  text,
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  href: z
    .string()
    .max(2000)
    .refine((value) => safeArticleURL(value), "Use a safe link URL")
    .optional(),
});
const inline = z.array(inlineSchema);
export const richTextSchema = z.array(
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("paragraph"), content: inline }),
    z.object({
      type: z.literal("heading"),
      level: z.union([z.literal(3), z.literal(4)]),
      content: inline,
    }),
    z.object({ type: z.literal("bulletList"), items: z.array(inline) }),
    z.object({ type: z.literal("orderedList"), items: z.array(inline) }),
  ]),
);
export const blockSchema = z.discriminatedUnion("type", [
  z.object({ id, type: z.literal("richText"), content: richTextSchema }),
  z.object({
    id,
    type: z.literal("subheading"),
    text: z.string().max(300),
    number: z.number().optional(),
    icon: image.optional(),
  }),
  z.object({
    id,
    type: z.literal("list"),
    ordered: z.boolean(),
    items: z.array(inline),
  }),
  z.object({ id, type: z.literal("image"), ...image.shape }),
  z.object({
    id,
    type: z.literal("callout"),
    style: z.enum(["info", "quote"]),
    content: richTextSchema,
  }),
]);
export const ctaActionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("consultation"), label: z.string().max(100) }),
  z.object({ type: z.literal("contact"), label: z.string().max(100) }),
  z.object({
    type: z.literal("phone"),
    label: z.string().max(100),
    destination: z
      .string()
      .max(100)
      .regex(/^tel:\+?\d[\d ()-]*$/),
  }),
  z.object({
    type: z.literal("link"),
    label: z.string().max(100),
    destination: z
      .string()
      .max(2000)
      .refine((value) => {
        if (
          /[\s\\\u0000-\u001f\u007f]/.test(value) ||
          !/^(\/(?!\/)|https:\/\/)/.test(value)
        )
          return false;
        try {
          const url = new URL(value, "https://zentogroup.co.uk");
          return url.protocol === "https:" && !url.username && !url.password;
        } catch {
          return false;
        }
      }, "Use a local path or HTTPS URL"),
  }),
]);
const sectionFields = {
  id,
  title: z.string().max(300),
  layout: z.enum(["standard", "numbered", "service"]).default("standard"),
  blocks: z.array(blockSchema),
};
export const sectionSchema = z.discriminatedUnion("type", [
  // Missing type is the existing v1 format; never infer a CTA from its title.
  z.object({ ...sectionFields, type: z.literal("content").optional() }),
  z.object({
    ...sectionFields,
    type: z.literal("cta"),
    variant: z.literal("blue"),
    primaryAction: ctaActionSchema,
    secondaryAction: ctaActionSchema.optional(),
  }),
  z.object({
    ...sectionFields,
    type: z.literal("checklist"),
    items: z.array(z.object({ id, content: inlineSchema.array() })),
  }),
]);
export const articleContentSchema = z
  .object({
    version: z.literal(1),
    introduction: richTextSchema,
    summary: richTextSchema,
    sections: z.array(sectionSchema),
    faqs: z.array(
      z.object({ id, question: z.string().max(300), answer: richTextSchema }),
    ),
    cta: z.enum(["consultation", "support", "original", "none"]),
  })
  .superRefine((content, context) => {
    const ids = [
      ...content.sections.flatMap((section) => [
        section.id,
        ...section.blocks.map((block) => block.id),
        ...(section.type === "checklist"
          ? section.items.map((item) => item.id)
          : []),
      ]),
      ...content.faqs.map((faq) => faq.id),
    ];
    if (new Set(ids).size !== ids.length)
      context.addIssue({
        code: "custom",
        message: "Section, block and FAQ IDs must be unique",
      });
  });

export type InlineText = z.infer<typeof inlineSchema>;
export type RichText = z.infer<typeof richTextSchema>;
export type ContentBlock = z.infer<typeof blockSchema>;
export type ArticleContent = z.infer<typeof articleContentSchema>;
export type ContentSection = ArticleContent["sections"][number];
export type CTAAction = z.infer<typeof ctaActionSchema>;
export type SectionType = "content" | "cta" | "checklist";

export function convertSection(
  section: ContentSection,
  type: SectionType,
): ContentSection {
  const base = {
    id: section.id,
    title: section.title,
    layout:
      section.layout === "service" ? ("standard" as const) : section.layout,
    blocks: structuredClone(section.blocks),
  };
  if (section.type === type) return section;
  if (section.type === "checklist" && section.items.length)
    base.blocks.push({
      id: newContentId(),
      type: "list",
      ordered: false,
      items: section.items.map((item) => item.content),
    });
  if (type === "cta")
    return {
      ...base,
      type,
      variant: "blue",
      primaryAction: {
        type: "consultation",
        label: "Book a Free Consultation",
      },
      secondaryAction: {
        type: "phone",
        label: "Call 0176 479 0095",
        destination: "tel:01764790095",
      },
    };
  if (type === "checklist") return { ...base, type, items: [] };
  return { ...base, type };
}

export const CTA_VARIANTS = {
  consultation: DEFAULT_BLOG_CTA,
  support: {
    heading: "A little support can make a big difference",
    body: "Our nurse-led team can help you explore care at home, at your own pace. Speak to us about the support that is right for you.",
  },
};

export function emptyContent(): ArticleContent {
  return {
    version: 1,
    introduction: [],
    summary: [],
    sections: [],
    faqs: [],
    cta: "consultation",
  };
}
export function newContentId(): string {
  return crypto.randomUUID();
}
export function richTextPlainText(value: RichText): string {
  return value
    .flatMap((node) =>
      node.type === "paragraph" || node.type === "heading"
        ? [node.content.map((part) => part.text).join("")]
        : node.items.map((item) => item.map((part) => part.text).join("")),
    )
    .join("\n\n");
}
export function textToRich(value: string): RichText {
  return value
    ? value
        .split(/\n\s*\n/)
        .map((text) => ({ type: "paragraph", content: [{ text }] }))
    : [];
}
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length)
    return items;
  const copy = [...items];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
export function duplicateSection(section: ContentSection): ContentSection {
  return {
    ...structuredClone(section),
    id: newContentId(),
    title: `${section.title} (copy)`,
    blocks: section.blocks.map((block) => ({
      ...structuredClone(block),
      id: newContentId(),
    })),
    ...(section.type === "checklist"
      ? {
          items: section.items.map((item) => ({
            ...structuredClone(item),
            id: newContentId(),
          })),
        }
      : {}),
  };
}

function legacyInline(value: string, formatted: boolean): InlineText[] {
  if (!formatted) return [{ text: value }];
  const parts: InlineText[] = [];
  let end = 0;
  for (const match of value.matchAll(
    /(\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^\s)]+\))/g,
  )) {
    if (match.index! > end) parts.push({ text: value.slice(end, match.index) });
    const link = match[0].match(/^\[([^\]]+)\]\((.+)\)$/);
    if (link && safeArticleURL(link[2]))
      parts.push({ text: link[1], href: link[2] });
    else if (match[0].startsWith("**"))
      parts.push({ text: match[0].slice(2, -2), bold: true });
    else if (match[0].startsWith("*"))
      parts.push({ text: match[0].slice(1, -1), italic: true });
    else parts.push({ text: match[0] });
    end = match.index! + match[0].length;
  }
  if (end < value.length) parts.push({ text: value.slice(end) });
  return parts;
}
function legacyRich(value: string, formatted: boolean): RichText {
  if (!formatted) return textToRich(value);
  return articleBlocks(value).map((block) =>
    block.type === "list"
      ? {
          type: block.ordered ? "orderedList" : "bulletList",
          items: block.items!.map((item) => legacyInline(item, true)),
        }
      : {
          type: "paragraph",
          content: legacyInline(
            block.type === "heading"
              ? `${"#".repeat(block.level!)} ${block.text}`
              : block.text,
            true,
          ),
        },
  );
}

/** Explicit, in-memory conversion using persisted section boundaries, never editorSource headings. */
export function visualCopy(article: Article): ArticleContent {
  if (article.content) return structuredClone(article.content);
  const formatted = article.editorSource !== undefined;
  const content = emptyContent();
  content.cta = "original";
  content.summary = legacyRich(article.intro[0] || "", formatted);
  content.introduction = article.intro
    .slice(1)
    .flatMap((value) => legacyRich(value, formatted));
  content.faqs = article.faqs.map((faq) => ({
    id: newContentId(),
    question: faq.question,
    answer: legacyRich(faq.answer, formatted),
  }));
  content.sections = article.sections.map((section) => {
    const blocks: ContentBlock[] = [];
    if (section.image?.src)
      blocks.push({ id: newContentId(), type: "image", ...section.image });
    if (section.type === "signs") {
      for (const item of section.items) {
        blocks.push({
          id: newContentId(),
          type: "subheading",
          text: item.title,
          number: item.number,
          ...(item.icon ? { icon: item.icon } : {}),
        });
        blocks.push({
          id: newContentId(),
          type: "richText",
          content: legacyRich(item.body, formatted),
        });
      }
    } else if (section.type === "text_with_list") {
      blocks.push({
        id: newContentId(),
        type: "richText",
        content: legacyRich(section.intro, formatted),
      });
      blocks.push({
        id: newContentId(),
        type: "list",
        ordered: false,
        items: section.list.map((value) => legacyInline(value, formatted)),
      });
      if (section.outro)
        blocks.push({
          id: newContentId(),
          type: "callout",
          style: "info",
          content: legacyRich(section.outro, formatted),
        });
    } else {
      for (const value of section.body) {
        // Preserve mixed Markdown fragments as rich text, without guessing new sections.
        if (formatted)
          for (const block of articleBlocks(value)) {
            if (block.type === "image" && block.image)
              blocks.push({
                id: newContentId(),
                type: "image",
                ...block.image,
              });
            else if (block.type === "heading")
              blocks.push({
                id: newContentId(),
                type: "subheading",
                text: block.text,
              });
            else if (block.type === "list")
              blocks.push({
                id: newContentId(),
                type: "list",
                ordered: !!block.ordered,
                items: block.items!.map((item) => legacyInline(item, true)),
              });
            else
              blocks.push({
                id: newContentId(),
                type: "richText",
                content: legacyRich(block.text, true),
              });
          }
        else
          blocks.push({
            id: newContentId(),
            type: "richText",
            content: textToRich(value),
          });
      }
    }
    return {
      id: newContentId(),
      title: section.heading,
      layout:
        section.type === "signs"
          ? "numbered"
          : section.type === "cta_section"
            ? "service"
            : "standard",
      blocks,
    };
  });
  return content;
}

/** Shared by public SEO, cards and the renderer; stored legacy fields remain unchanged. */
export function articleForDisplay(article: Article): Article {
  if (!article.content) return article;
  return {
    ...article,
    seoTitle: article.seoTitle || article.title,
    metaDescription:
      article.metaDescription ||
      article.excerpt ||
      richTextPlainText(article.content.summary || []).slice(0, 160),
    faqs: article.content.faqs
      .filter(
        (faq) => faq.question.trim() && richTextPlainText(faq.answer).trim(),
      )
      .map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: richTextPlainText(faq.answer),
        richAnswer: faq.answer,
      })),
  };
}
