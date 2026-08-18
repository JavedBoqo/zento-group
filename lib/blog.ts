import articlesData from "@/mock/blogs.json";

// ─────────────────────────── Types ───────────────────────────

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
  | SignsSectionData
  | TextWithListSectionData
  | TextSectionData
  | CtaSectionData;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClosingCtaData {
  heading: string;
  body: string;
  image?: BlogImage;
}

export interface Article {
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

const articles = articlesData as Article[];

/** Estimated reading time in minutes at 200 wpm */
export function estimateReadingTime(article: Article): number {
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

/** Returns all articles — used by the listing page and sitemap */
export function getAllArticles(): Article[] {
  return articles;
}

/** Returns the featured article or the first article as fallback */
export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured) ?? articles[0];
}

/** Returns a single article by slug, or undefined if not found */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Returns related articles excluding the current article slug */
export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, count);
}
