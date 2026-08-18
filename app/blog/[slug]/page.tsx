import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsSection from "@/components/blog/SignsSection";
import TextWithListSection from "@/components/blog/TextWithListSection";
import TextSection from "@/components/blog/TextSection";
import CtaSectionBlock from "@/components/blog/CtaSectionBlock";
import FaqAccordion from "@/components/blog/FaqAccordion";
import ClosingCta from "@/components/blog/ClosingCta";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogCard from "@/components/blog/BlogCard";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  estimateReadingTime,
  type ArticleSection,
} from "@/lib/blog";

const FALLBACK_IMAGE = "/brand-image.png";

/* ─────────────────────────── Static generation ─────────────────────────── */

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

/* ─────────────────────────── SEO metadata ─────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

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
      canonical: `https://zentogroup.co.uk/blog/${slug}`,
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
        imgSrc.startsWith("/")
          ? `https://zentogroup.co.uk${imgSrc}`
          : imgSrc,
      ],
    },
  };
}

/* ─────────────────────────── Section renderer ─────────────────────────── */

function renderSection(section: ArticleSection, index: number) {
  switch (section.type) {
    case "signs":
      return <SignsSection key={index} section={section} />;
    case "text_with_list":
      return <TextWithListSection key={index} section={section} />;
    case "text":
      return <TextSection key={index} section={section} />;
    case "cta_section":
      return <CtaSectionBlock key={index} section={section} />;
    default:
      return null;
  }
}

/* ─────────────────────────── Page ─────────────────────────── */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const imgSrc = article.heroImage?.src || FALLBACK_IMAGE;
  const imgAlt = article.heroImage?.alt || article.title;
  const readingTime = estimateReadingTime(article);
  const relatedArticles = getRelatedArticles(slug, 3);

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
    author: {
      "@type": "Organization",
      name: "Zento Care",
      url: "https://zentogroup.co.uk",
    },
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
    article.faqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://zentogroup.co.uk/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://zentogroup.co.uk/blog/${slug}` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* ── Breadcrumbs ── */}
        <div className="border-b border-zinc-100 bg-zinc-50/80">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <li>
                  <Link
                    href="/"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <Link
                    href="/blog"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span
                    className="font-semibold text-secondary line-clamp-1 max-w-[280px] sm:max-w-md md:max-w-lg"
                    aria-current="page"
                  >
                    {article.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── Main Content Area: 2-Column Desktop Grid ── */}
        <div className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">

              {/* ═════════ Left Main Column: Article Content ═════════ */}
              <AnimateContainer animation="fade-up" className="lg:col-span-8 space-y-8 sm:space-y-10">
                {/* Header & Meta */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Nurse-Led Advice
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="h-3.5 w-3.5" />
                      {readingTime} min read
                    </span>
                  </div>

                  <h1 className="text-3xl font-black leading-tight text-secondary sm:text-4xl md:text-5xl">
                    {article.title}
                  </h1>

                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 pt-1 border-b border-zinc-100 pb-4">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    <span>Written &amp; verified by registered nursing specialists</span>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md">
                  <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Quick Summary / Key Takeaways Callout Box (inspired by reference image) */}
                <div className="rounded-2xl border-l-4 border-secondary bg-zinc-50/90 p-6 sm:p-7 shadow-xs">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-secondary">
                    Quick Summary
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-zinc-700 font-medium sm:text-lg">
                    {article.intro[0]}
                  </p>
                </div>

                {/* Intro Secondary Paragraphs */}
                {article.intro.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-zinc-600 sm:text-lg"
                  >
                    {para}
                  </p>
                ))}

                {/* Content Sections */}
                {article.sections.length > 0 && (
                  <div className="space-y-12 pt-4">
                    {article.sections.map((section, i) => (
                      <div key={i} className="pt-4 first:pt-0">
                        {renderSection(section, i)}
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQs Section */}
                {article.faqs.length > 0 && (
                  <div className="border-t border-zinc-100 pt-10 mt-10">
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Common Questions
                      </span>
                      <h2 className="mt-1 text-2xl font-black text-secondary sm:text-3xl">
                        Frequently Asked Questions
                      </h2>
                    </div>
                    <FaqAccordion faqs={article.faqs} />
                  </div>
                )}

                {/* Back to articles link */}
                <div className="border-t border-zinc-100 pt-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to all guides &amp; articles
                  </Link>
                </div>
              </AnimateContainer>

              {/* ═════════ Right Sidebar Column ═════════ */}
              <AnimateContainer animation="fade-left" delay={0.1} className="lg:col-span-4">
                <div className="sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-y-auto pb-4 scrollbar-none">
                  <BlogSidebar />
                </div>
              </AnimateContainer>

            </div>
          </div>
        </div>

        {/* ── Related Articles Section ── */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-zinc-100 bg-zinc-50/70 py-16 sm:py-20">
            <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
              <AnimateContainer animation="fade-up" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    <BookOpen className="h-3.5 w-3.5" />
                    Related Reading
                  </span>
                  <h2 className="mt-2 text-2xl font-black text-secondary sm:text-3xl md:text-4xl">
                    More Care Guides &amp; Advice
                  </h2>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-secondary"
                >
                  View all articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimateContainer>

              <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relArticle) => (
                  <AnimateItem key={relArticle.slug}>
                    <BlogCard article={relArticle} />
                  </AnimateItem>
                ))}
              </AnimateContainer>
            </div>
          </section>
        )}

        {/* ── Closing Full-Width CTA Banner ── */}
        <ClosingCta cta={article.closingCta} />
      </main>

      <Footer />
    </div>
  );
}
