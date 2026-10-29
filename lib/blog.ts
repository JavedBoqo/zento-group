// ─────────────────────────── Types ───────────────────────────

import type { ArticleContent, RichText } from "./article-content";
import { richTextPlainText } from "./article-content";
import type { AuthorProfile } from "./authors";

export interface BlogImage {
  src: string;
  alt: string;
}

export interface SignItem {
  number: number;
  title: string;
  body: string;
  icon?: BlogImage;
}

export interface SignsSectionData {
  heading: string;
  type: "signs";
  image?: BlogImage;
  items: SignItem[];
}

export interface TextWithListSectionData {
  heading: string;
  type: "text_with_list";
  image?: BlogImage;
  intro: string;
  list: string[];
  outro?: string;
}

export interface TextSectionData {
  heading: string;
  type: "text";
  image?: BlogImage;
  body: string[];
}

export interface CtaSectionData {
  heading: string;
  type: "cta_section";
  image?: BlogImage;
  body: string[];
}

export type ArticleSection =
  SignsSectionData | TextWithListSectionData | TextSectionData | CtaSectionData;

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  richAnswer?: RichText;
}

export interface ClosingCtaData {
  heading: string;
  body: string;
  image?: BlogImage;
}

export interface Article {
  updatedAt?: string;
  authorId?: string;
  reviewerId?: string;
  verificationStatus?: "unverified" | "verified";
  reviewedAt?: string | null;
  author?: AuthorProfile;
  reviewer?: AuthorProfile;
  content?: ArticleContent;
  excerpt?: string;
  canonicalUrl?: string;
  editorSource?: string;
  slug: string;
  featured?: boolean;
  seoTitle: string;
  metaDescription: string;
  title: string;
  heroImage: BlogImage;
  intro: string[];
  sections: ArticleSection[];
  faqs: FaqItem[];
  closingCta: ClosingCtaData;
}

// ─────────────────────────── Helpers ───────────────────────────

/** Estimated reading time in minutes at 200 wpm */
export function estimateReadingTime(article: Article): number {
  if (article.content) {
    const content = article.content;
    const words = [
      richTextPlainText(content.introduction),
      richTextPlainText(content.summary),
      ...content.sections.flatMap((section) => [
        section.title,
        ...(section.type === "checklist"
          ? section.items.flatMap((item) =>
              item.content.map((part) => part.text),
            )
          : []),
        ...section.blocks.map((block) =>
          block.type === "richText" || block.type === "callout"
            ? richTextPlainText(block.content)
            : block.type === "subheading"
              ? block.text
              : block.type === "list"
                ? block.items
                    .flat()
                    .map((part) => part.text)
                    .join(" ")
                : block.alt,
        ),
      ]),
      ...content.faqs.flatMap((faq) => [
        faq.question,
        richTextPlainText(faq.answer),
      ]),
    ]
      .join(" ")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }
  const chunks: string[] = [
    ...article.intro,
    ...article.sections.flatMap((s) => {
      if (s.type === "signs") return s.items.flatMap((i) => [i.title, i.body]);
      if (s.type === "text") return s.body;
      if (s.type === "text_with_list")
        return [s.intro, ...s.list, s.outro ?? ""];
      if (s.type === "cta_section") return s.body;
      return [];
    }),
    ...article.faqs.flatMap((f) => [f.question, f.answer]),
    article.closingCta.heading,
    article.closingCta.body,
  ];
  const wordCount = chunks.join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}
