import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Clock3,
  User,
  Search,
  Tag,
  Heart,
  ShieldCheck,
  Brain,
  Stethoscope,
  Sparkles,
  ChevronRight,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Care Insights Blog | Nurse-Led Home Care Tips | Zento",
  description:
    "Practical home care advice, dementia support tips, funding guidance in Scotland, and nurse-led care insights from Zento's clinical team in Edinburgh & Perthshire.",
  alternates: {
    canonical: "https://zentogroup.co.uk/blog/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Care Insights Blog | Nurse-Led Home Care Tips | Zento",
    description:
      "Practical home care advice, dementia support tips, funding guidance and nurse-led care insights from Zento's clinical team.",
    url: "https://zentogroup.co.uk/blog/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Care Blog - Nurse-Led Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Insights Blog | Nurse-Led Home Care Tips | Zento",
    description:
      "Home care advice, dementia support, funding guidance and nurse-led insights from Zento's clinical team.",
    images: ["/brand-image.png"],
  },
};

type BlogCategory = {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "secondary" | "zinc";
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  image: string;
  alt: string;
  featured?: boolean;
};

const categories: BlogCategory[] = [
  { name: "All Articles", count: 24, icon: Sparkles, color: "primary" },
  { name: "Dementia Care", count: 7, icon: Brain, color: "primary" },
  { name: "Home Care Tips", count: 8, icon: Heart, color: "secondary" },
  { name: "Nurse Insights", count: 5, icon: Stethoscope, color: "zinc" },
  { name: "Funding & Legal", count: 4, icon: ShieldCheck, color: "secondary" },
];

const blogPosts: BlogPost[] = [
  {
    slug: "understanding-dementia-stages-at-home",
    title:
      "Understanding Dementia Stages at Home: A Nurse's Practical Guide to Daily Support",
    excerpt:
      "Learn how to recognise the early, mid and later stages of dementia, with nurse-approved tips for creating safe, comforting routines at each stage — including managing sundowning, wandering risk and mealtime challenges.",
    date: "12 August 2026",
    readTime: "9 min read",
    author: "Adnan Karim RGN",
    authorRole: "Registered Manager, Zento Group",
    category: "Dementia Care",
    tags: ["Dementia", "Nurse Advice", "Home Safety"],
    image: "/brand-image.png",
    alt: "Nurse supporting person with dementia at home",
    featured: true,
  },
  {
    slug: "free-personal-care-scotland-2026-guide",
    title:
      "Free Personal Care in Scotland 2026: Who Qualifies and How to Apply",
    excerpt:
      "A clear, nurse-written walkthrough of Scotland's Free Personal Care funding for over-65s, Frank's Law for younger adults, and how to navigate the council assessment process without delays or stress.",
    date: "8 August 2026",
    readTime: "7 min read",
    author: "Morven Campbell RGN",
    authorRole: "Care Quality Manager",
    category: "Funding & Legal",
    tags: ["Funding", "Free Personal Care", "Scotland"],
    image: "/about-image.png",
    alt: "Happy senior couple receiving home care support",
  },
  {
    slug: "hospital-discharge-checklist-scotland",
    title:
      "Hospital Discharge Checklist for Scottish Families: What Nurses Check Before You Go Home",
    excerpt:
      "After a stroke, fall, infection or surgery, returning home safely is about more than a taxi. Our nurses share the 12-point clinical checklist they use so your family knows what to ask for on discharge day.",
    date: "2 August 2026",
    readTime: "6 min read",
    author: "Dr. Eleanor Ross",
    authorRole: "Clinical Advisor",
    category: "Nurse Insights",
    tags: ["Hospital Discharge", "Safety", "Reablement"],
    image: "/hero-image.png",
    alt: "Nurse discussing hospital discharge with family",
  },
  {
    slug: "medication-safety-at-home-elderly",
    title:
      "Medication Safety at Home: 8 Nurse-Recommended Systems to Prevent Missed Doses",
    excerpt:
      "From multi-compartment compliance aids to smart reminders and nurse-administered prompts, discover which medication support system works best depending on memory, dexterity and number of tablets.",
    date: "29 July 2026",
    readTime: "5 min read",
    author: "Adnan Karim RGN",
    authorRole: "Registered Manager, Zento Group",
    category: "Home Care Tips",
    tags: ["Medication", "Safety", "Nurse Tips"],
    image: "/brand-image.png",
    alt: "Organised weekly medication dispenser at home",
  },
  {
    slug: "winter-home-safety-elderly-scotland",
    title:
      "Winter Home Safety for Scottish Elders: Heating, Falls Prevention & Fuel Poverty Help",
    excerpt:
      "With long cold winters, fuel poverty and ice on paths, staying safe at home in Scotland needs a plan. Our community team shares practical checks, council grants and the simple daily habits that prevent 70% of winter hospital admissions.",
    date: "22 July 2026",
    readTime: "8 min read",
    author: "Fiona MacLeod",
    authorRole: "Community Care Team Lead",
    category: "Home Care Tips",
    tags: ["Winter", "Falls Prevention", "Edinburgh"],
    image: "/about-image.png",
    alt: "Warm elderly home in Scottish winter",
  },
  {
    slug: "choosing-home-care-agency-scotland",
    title:
      "Choosing a Home Care Agency in Scotland: 10 Questions Nurses Would Ask",
    excerpt:
      "Care Inspectorate scores, carer turnover rates, nurse supervision ratios, PVG checks — this is what actually matters when comparing domiciliary care agencies. The honest questions most sales teams hope you don't raise.",
    date: "15 July 2026",
    readTime: "10 min read",
    author: "Morven Campbell RGN",
    authorRole: "Care Quality Manager",
    category: "Funding & Legal",
    tags: ["Choosing Care", "Care Inspectorate", "Tips"],
    image: "/hero-image.png",
    alt: "Family discussing care agency options",
  },
  {
    slug: "loneliness-elderly-scotland-connections",
    title:
      "Loneliness in Scottish Elders: Small Weekly Habits That Rebuild Connection",
    excerpt:
      "Social isolation is Scotland's silent health crisis, linked to faster cognitive decline and early admission. Zento's companionship team shares the low-effort, high-impact weekly routines — from Men's Sheds to local lunch clubs — that genuinely change lives.",
    date: "8 July 2026",
    readTime: "6 min read",
    author: "Fiona MacLeod",
    authorRole: "Community Care Team Lead",
    category: "Home Care Tips",
    tags: ["Companionship", "Wellbeing", "Lothian"],
    image: "/brand-image.png",
    alt: "Elderly man enjoying dominoes with carer",
  },
  {
    slug: "palliative-care-at-home-scotland",
    title:
      "Palliative Care at Home: What Scottish Families Should Know About End-of-Life Support",
    excerpt:
      "A sensitive but important read about planning end-of-life care at home in Scotland, including district nurse input, syringe driver support, Fast Track funding and how a nurse-led agency coordinates with your GP and Marie Curie.",
    date: "1 July 2026",
    readTime: "11 min read",
    author: "Adnan Karim RGN",
    authorRole: "Registered Manager, Zento Group",
    category: "Nurse Insights",
    tags: ["Palliative Care", "End of Life", "Nurse Advice"],
    image: "/about-image.png",
    alt: "Compassionate palliative care at home",
  },
];

const categoryColors: Record<BlogCategory["color"], string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  zinc: "bg-zinc-100 text-zinc-600",
};

const categoryBadgeColors: Record<BlogCategory["color"], string> = {
  primary: "group-hover:bg-primary group-hover:text-white",
  secondary: "group-hover:bg-secondary group-hover:text-white",
  zinc: "group-hover:bg-zinc-800 group-hover:text-white",
};

export default function BlogListingPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zento Care Insights Blog",
    description:
      "Nurse-led home care insights, dementia support, funding guidance and practical caregiving tips for Scottish families.",
    url: "https://zentogroup.co.uk/blog/",
    publisher: {
      "@type": "Organization",
      name: "Zento Group",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
        jobTitle: post.authorRole,
      },
      image: [post.image],
      keywords: post.tags.join(", "),
      mainEntityOfPage: `https://zentogroup.co.uk/blog/${post.slug}/`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zentogroup.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://zentogroup.co.uk/blog/",
      },
    ],
  };

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* ── BREADCRUMB ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors font-medium"
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

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 md:pt-12 md:pb-18 lg:pt-14 lg:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  <Sparkles className="h-3.5 w-3.5" /> Nurse-Led Insights &middot; Edinburgh &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Care Insights &mdash;{" "}
                  <span className="text-primary">
                    Advice Straight from Our Nursing Team
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Honest, practical articles written by Zento&apos;s registered nurses and
                  home care specialists. Dementia support, funding help in Scotland,
                  medication safety and everything else families ask us every week.
                </p>
              </div>

              {/* Search bar */}
              <div className="max-w-xl mx-auto pt-2">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search articles on dementia, funding, care tips..."
                    className="w-full rounded-full border-2 border-zinc-200 bg-white py-4 pl-14 pr-5 text-sm text-zinc-700 placeholder:text-zinc-400 shadow-lg shadow-zinc-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — CATEGORY FILTERS + FEATURED POST
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-14">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const baseColor = categoryColors[cat.color];
                const hoverColor = categoryBadgeColors[cat.color];
                return (
                  <button
                    key={cat.name}
                    type="button"
                    className={`group inline-flex items-center gap-2 rounded-full px-4.5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${baseColor} ${hoverColor}`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {cat.name}
                    <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-black text-zinc-600 group-hover:text-zinc-700 transition-colors">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* FEATURED POST */}
            {featuredPost && (
              <div className="mb-16 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-5">
                  <span className="h-px flex-1 bg-zinc-200" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-secondary">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Featured Article
                  </span>
                  <span className="h-px flex-1 bg-zinc-200" />
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}/`}
                  className="group block relative overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-zinc-200/80 shadow-xl shadow-zinc-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Image side */}
                    <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category badge overlay */}
                      <div className="absolute top-5 left-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-primary shadow-lg">
                          <Tag className="w-3 h-3" />
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:col-span-5 flex flex-col justify-center p-7 sm:p-9 lg:p-11 space-y-5">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {featuredPost.date}
                        </span>
                        <span className="text-zinc-300">·</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="w-3.5 h-3.5 text-primary" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black leading-tight text-secondary group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                        {featuredPost.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-secondary">
                            {featuredPost.author}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {featuredPost.authorRole}
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-sm font-black text-primary group-hover:translate-x-1 transition-transform pt-2">
                        Read the full article
                        <ChevronRight className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════
                SECTION 3 — REGULAR BLOG POSTS GRID
            ════════════════════════════════════════════════════════ */}
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-3">
                  Latest Articles
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-secondary">
                  More from our blog
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-zinc-500">
                Showing {regularPosts.length} of 24
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Image */}
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="relative block aspect-[16/10] overflow-hidden bg-zinc-100"
                  >
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-wider text-secondary shadow-sm">
                        {post.category}
                      </span>
                    </div>
                    {/* Author initial badge */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur text-xs font-black text-primary shadow-md ring-2 ring-white/80">
                      {post.author.charAt(0)}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 space-y-4">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" />
                        {post.date}
                      </span>
                      <span className="text-zinc-300">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="w-3 h-3 text-primary" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}/`}>
                      <h3 className="text-lg sm:text-xl font-black leading-snug text-secondary group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-sm leading-relaxed text-zinc-600 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-50 border border-zinc-200 px-2.5 py-1 text-[10px] font-bold text-zinc-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-zinc-100 pt-4 mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[11px] font-semibold text-zinc-600 truncate max-w-[150px]">
                          {post.author}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="inline-flex items-center gap-1 text-xs font-black text-primary group-hover:text-secondary transition-colors"
                      >
                        Read
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load more button */}
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-200 bg-white px-8 py-3.5 text-sm font-black text-secondary shadow-sm transition-all hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-105 cursor-pointer"
              >
                Load more articles
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — NEWSLETTER SUBSCRIBE
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-16 border-y border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-secondary via-secondary/95 to-secondary/85 p-8 md:p-12 text-white shadow-2xl shadow-secondary/20">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Monthly Care Newsletter
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                    Nurse-approved care tips &mdash;{" "}
                    <span className="text-primary">straight to your inbox</span>
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/80 max-w-xl">
                    One short email per month with practical advice, funding updates in Scotland
                    and seasonal care reminders. No spam, unsubscribe anytime.
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/60 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                    <button
                      type="button"
                      className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105 cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-[11px] text-white/60 pl-2">
                    We respect your privacy. No sharing, ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Have questions about care for someone you love?
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Our nursing team writes all our blog articles because honest, clear guidance
                  should be free. If you&apos;d like to speak to someone directly about your family&apos;s
                  situation, we&apos;re here — with no pressure and no obligation.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton
                    type="assessment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a free consultation <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a
                      key={office.id}
                      href={office.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      {office.shortName}: {office.phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
