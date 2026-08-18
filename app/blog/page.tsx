import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import BlogCard from "@/components/blog/BlogCard";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import { getAllArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Care Advice & Guides | Nurse-Led Blog",
  description:
    "Practical guidance for families navigating home care in Scotland — written by our nurse-led team in Edinburgh and Perthshire.",
  alternates: {
    canonical: "https://zentogroup.co.uk/blog",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Care Advice & Guides | Nurse-Led Blog | Zento Care",
    description:
      "Practical guidance for families navigating home care in Scotland — written by our nurse-led team in Edinburgh and Perthshire.",
    url: "https://zentogroup.co.uk/blog",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Care Nurse-Led Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Advice & Guides | Nurse-Led Blog | Zento Care",
    description:
      "Practical guidance for families navigating home care in Scotland — written by our nurse-led team.",
    images: ["/brand-image.png"],
  },
};

export default function BlogPage() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a !== featured);

  const blogListingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zento Care Blog",
    description:
      "Practical guidance for families navigating home care in Scotland — written by our nurse-led team.",
    url: "https://zentogroup.co.uk/blog",
    publisher: {
      "@type": "Organization",
      name: "Zento Care",
      logo: "https://zentogroup.co.uk/logo.svg",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* ── Breadcrumb ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
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
                  <span
                    className="font-semibold text-secondary"
                    aria-current="page"
                  >
                    Blog
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── Page header ── */}
        <section className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white py-10 md:py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <AnimateContainer animation="fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Nurse-Led Care Advice
              </span>
              <h1 className="mt-3 text-3xl font-black text-secondary sm:text-4xl md:text-5xl">
                Zento Care Blog
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                Practical guidance for families navigating home care — written by
                our nurse-led team in Edinburgh and Perthshire.
              </p>
            </AnimateContainer>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {articles.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-zinc-400" />
                <h3 className="mt-4 text-lg font-bold text-secondary">
                  No articles yet
                </h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Check back soon for care guides and advice from our nursing
                  team.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Featured article — full-width editorial card */}
                {featured && (
                  <AnimateContainer animation="fade-up">
                    <BlogCard article={featured} featured />
                  </AnimateContainer>
                )}

                {/* Remaining articles — 2-column grid */}
                {rest.length > 0 && (
                  <AnimateContainer animation="stagger" className="grid gap-8 sm:grid-cols-2">
                    {rest.map((article) => (
                      <AnimateItem key={article.slug}>
                        <BlogCard article={article} />
                      </AnimateItem>
                    ))}
                  </AnimateContainer>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up">
              <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 px-8 py-14 text-center text-white shadow-2xl shadow-primary/20 md:py-20">
                {/* Glows */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                  <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                    Need personal advice on home care?
                  </h2>
                  <p className="mx-auto max-w-xl text-base text-white/90">
                    Our registered nurses in Edinburgh and Perthshire are here
                    to help you understand your care options with honest, clinical
                    guidance.
                  </p>
                  <div className="page-cta-group">
                    <ModalButton
                      type="assessment"
                      className="page-cta-on-dark-primary"
                    >
                      Book a free consultation <ArrowRight className="h-5 w-5" />
                    </ModalButton>
                    <ModalButton
                      type="callback"
                      className="page-cta-on-dark-outline cursor-pointer"
                    >
                      Request a callback
                    </ModalButton>
                  </div>
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
