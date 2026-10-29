import { richTextPlainText } from "@/lib/article-content";
import { plainArticleText } from "@/lib/article-editor";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/lib/blog";
import { estimateReadingTime } from "@/lib/blog";

const FALLBACK_IMAGE = "/brand-image.png";

interface BlogCardProps {
  article: Article;
  featured?: boolean;
}

/** Truncates text at the nearest full word boundary before maxLength */
function getCleanExcerpt(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 0) {
    return trimmed.slice(0, lastSpace).replace(/[,.:;!?—\s]+$/, "") + "…";
  }
  return trimmed + "…";
}

export default function BlogCard({ article, featured = false }: BlogCardProps) {
  const imgSrc = article.heroImage?.src || FALLBACK_IMAGE;
  const imgAlt = article.heroImage?.alt || article.title;
  const summary = article.content
    ? richTextPlainText(article.content.summary).trim()
    : article.editorSource === undefined
      ? (article.intro[0] ?? "").trim()
      : plainArticleText(article.intro[0] ?? "").trim();
  const raw =
    summary ||
    article.excerpt?.trim() ||
    (article.content ? richTextPlainText(article.content.introduction) : "");
  const excerpt = getCleanExcerpt(raw, featured ? 200 : 160);
  const readingTime = estimateReadingTime(article);
  const href = `/blog/${article.slug}`;

  /* ── Featured (wide) variant ── */
  if (featured) {
    return (
      <article className="group overflow-hidden rounded-3xl border border-zinc-200/80 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 lg:flex lg:items-stretch">
        {/* Image */}
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[380px] lg:w-[45%] shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              Care guide
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-400">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black leading-snug text-secondary transition-colors duration-200 group-hover:text-primary sm:text-3xl">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-base leading-relaxed text-zinc-600">{excerpt}</p>

          {/* CTA */}
          <div>
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
            >
              Read article <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /* ── Grid variant ── */
  return (
    <article className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
      {/* Rounded Image */}
      <div className="relative h-52 sm:h-60 w-full shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            Care guide
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-400">
            <Clock className="h-3 w-3" />
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-black leading-snug text-secondary transition-colors duration-200 group-hover:text-primary">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-600">
          {excerpt}
        </p>

        {/* Link */}
        <div className="border-t border-zinc-100 pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-secondary"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
