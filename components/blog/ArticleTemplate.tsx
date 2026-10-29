import {
  estimateReadingTime,
  type Article,
  type ArticleSection,
} from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, ArrowRight, BookOpen } from "lucide-react";
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
import ArticleContent from "./ArticleContent";
import { sectionAnchor } from "@/lib/article-editor";
import { articleForDisplay, CTA_VARIANTS } from "@/lib/article-content";
import RichTextView from "./RichTextView";
import StructuredSection from "./StructuredSection";
import AuthorAttribution from "./AuthorAttribution";

function renderSection(
  section: ArticleSection,
  index: number,
  formatted: boolean,
) {
  switch (section.type) {
    case "signs":
      return (
        <SignsSection key={index} section={section} formatted={formatted} />
      );
    case "text_with_list":
      return (
        <TextWithListSection
          key={index}
          section={section}
          formatted={formatted}
        />
      );
    case "text":
      return (
        <TextSection key={index} section={section} formatted={formatted} />
      );
    case "cta_section":
      return (
        <CtaSectionBlock key={index} section={section} formatted={formatted} />
      );
    default:
      return null;
  }
}

export default function ArticleTemplate({
  article: input,
  relatedArticles = [],
}: {
  article: Article;
  relatedArticles?: Article[];
}) {
  const article = articleForDisplay(input);
  const content = article.content;
  const imgSrc = article.heroImage?.src || "/brand-image.png";
  const imgAlt = article.heroImage?.alt || article.title;
  const readingTime = estimateReadingTime(article);
  const formatted = article.editorSource !== undefined;
  const Paragraph = formatted || content ? "div" : "p";
  return (
    <div className="flex min-h-screen flex-col bg-white">
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
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
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
              <AnimateContainer
                animation="fade-up"
                className="min-w-0 lg:col-span-8 space-y-8 sm:space-y-10"
              >
                {/* Header & Meta */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Care guide
                    </span>
                  </div>

                  <h1 className="text-3xl font-black leading-tight text-secondary sm:text-4xl md:text-5xl">
                    {article.title}
                  </h1>

                  <AuthorAttribution
                    article={article}
                    readingTime={readingTime}
                  />
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
                {(!content || content.summary.length > 0) && (
                  <div className="rounded-2xl border-l-4 border-secondary bg-zinc-50/90 p-6 sm:p-7 shadow-xs">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-secondary">
                      Quick Summary
                    </h2>
                    <Paragraph className="mt-2 text-base leading-relaxed text-zinc-700 font-medium sm:text-lg">
                      {content ? (
                        <RichTextView value={content.summary} />
                      ) : (
                        <ArticleContent
                          text={article.intro[0] || ""}
                          formatted={formatted}
                        />
                      )}
                    </Paragraph>
                  </div>
                )}

                {/* Intro Secondary Paragraphs */}
                {content ? (
                  <div className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                    <RichTextView value={content.introduction} />
                  </div>
                ) : (
                  <>
                    {article.intro.slice(1).map((para, i) => (
                      <Paragraph
                        key={i}
                        className="text-base leading-relaxed text-zinc-600 sm:text-lg"
                      >
                        <ArticleContent text={para} formatted={formatted} />
                      </Paragraph>
                    ))}
                  </>
                )}

                {/* Content Sections */}
                {content && content.sections.length > 0 && (
                  <div className="space-y-12 pt-4">
                    {content.sections.map((section) => (
                      <div
                        key={section.id}
                        id={`section-${section.id}`}
                        className="scroll-mt-28 pt-4 first:pt-0"
                      >
                        <StructuredSection section={section} />
                      </div>
                    ))}
                  </div>
                )}
                {!content && article.sections.length > 0 && (
                  <div className="space-y-12 pt-4">
                    {article.sections.map((section, i) => (
                      <div
                        key={i}
                        id={sectionAnchor(section.heading, i)}
                        className="scroll-mt-28 pt-4 first:pt-0"
                      >
                        {renderSection(section, i, formatted)}
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
                    <FaqAccordion faqs={article.faqs} formatted={formatted} />
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
              <div className="min-w-0 lg:col-span-4">
                <div className="space-y-5 pb-4 lg:sticky lg:top-[calc(5rem+1rem)] lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overscroll-contain">
                  <BlogSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Articles Section ── */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-zinc-100 bg-zinc-50/70 py-16 sm:py-20">
            <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
              <AnimateContainer
                animation="fade-up"
                className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
              >
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

              <AnimateContainer
                animation="stagger"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
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
        {(!content || content.cta !== "none") && (
          <ClosingCta
            cta={
              content &&
              (content.cta === "consultation" || content.cta === "support")
                ? CTA_VARIANTS[content.cta]
                : article.closingCta
            }
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
