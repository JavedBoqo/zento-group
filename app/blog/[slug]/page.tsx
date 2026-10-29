import { confirmedReview } from "@/lib/authors";
import { articleForDisplay } from "@/lib/article-content";
import ArticleTemplate from "@/components/blog/ArticleTemplate";
import { plainArticleText } from "@/lib/article-editor";
export const revalidate = 60;
export const runtime = "nodejs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/content";

const FALLBACK_IMAGE = "/brand-image.png";

/* ─────────────────────────── Static generation ─────────────────────────── */

export async function generateStaticParams() {
  return (await getAllArticles()).map((article) => ({ slug: article.slug }));
}

/* ─────────────────────────── SEO metadata ─────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stored = await getArticleBySlug(slug);
  const article = stored ? articleForDisplay(stored) : undefined;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article could not be found.",
    };
  }

  const imgSrc = article.heroImage?.src || FALLBACK_IMAGE;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical:
        article.canonicalUrl || `https://zentogroup.co.uk/blog/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://zentogroup.co.uk/blog/${slug}`,
      siteName: "Zento Care",
      locale: "en_GB",
      type: "article",
      images: [
        {
          url: imgSrc.startsWith("/")
            ? `https://zentogroup.co.uk${imgSrc}`
            : imgSrc,
          width: 1200,
          height: 630,
          alt: article.heroImage?.alt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [
        imgSrc.startsWith("/") ? `https://zentogroup.co.uk${imgSrc}` : imgSrc,
      ],
    },
  };
}

/* ─────────────────────────── Section renderer ─────────────────────────── */

/* ─────────────────────────── Page ─────────────────────────── */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stored = await getArticleBySlug(slug);
  const article = stored ? articleForDisplay(stored) : undefined;

  if (!article) notFound();

  const imgSrc = article.heroImage?.src || FALLBACK_IMAGE;
  const relatedArticles = await getRelatedArticles(slug, 3);

  /* ── JSON-LD ── */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `https://zentogroup.co.uk/blog/${slug}`,
    image: imgSrc.startsWith("/")
      ? `https://zentogroup.co.uk${imgSrc}`
      : imgSrc,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.fullName,
          jobTitle: article.author.role || undefined,
        }
      : undefined,
    reviewedBy:
      confirmedReview(article) && article.reviewer
        ? {
            "@type": "Person",
            name: article.reviewer.fullName,
            jobTitle: article.reviewer.role || undefined,
          }
        : undefined,
    publisher: {
      "@type": "Organization",
      name: "Zento Care",
      logo: {
        "@type": "ImageObject",
        url: "https://zentogroup.co.uk/logo.svg",
      },
    },
  };

  const faqJsonLd =
    article.faqs.length > 0 &&
    article.faqs.every((faq) => faq.question.trim() && faq.answer.trim())
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text:
                article.content || article.editorSource === undefined
                  ? faq.answer
                  : plainArticleText(faq.answer),
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zentogroup.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://zentogroup.co.uk/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://zentogroup.co.uk/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ArticleTemplate article={article} relatedArticles={relatedArticles} />
    </>
  );
}
