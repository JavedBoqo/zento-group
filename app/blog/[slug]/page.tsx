import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Clock3,
  User,
  Tag,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  Phone,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";

type BlogContentBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
      author?: string;
    }
  | {
      type: "list";
      ordered?: boolean;
      items: string[];
    }
  | {
      type: "callout";
      style: "tip" | "warning" | "info";
      title: string;
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorBio: string;
  category: string;
  tags: string[];
  image: string;
  alt: string;
  content: BlogContentBlock[];
  relatedPosts: { slug: string; title: string; image: string; alt: string }[];
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
};

type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorBio: string;
  category: string;
  tags: string[];
  image: string;
  alt: string;
};

const postMetas: PostMeta[] = [
  {
    slug: "understanding-dementia-stages-at-home",
    title:
      "Understanding Dementia Stages at Home: A Nurse's Practical Guide to Daily Support",
    excerpt:
      "Learn how to recognise the early, mid and later stages of dementia, with nurse-approved tips for creating safe, comforting routines at each stage.",
    date: "12 August 2026",
    readTime: "9 min read",
    author: "Adnan Karim RGN",
    authorRole: "Registered Manager, Zento Group",
    authorBio:
      "Adnan is a Registered General Nurse with over 15 years of experience in elderly care, dementia support and community nursing across Lothian. He leads Zento's clinical governance and carer training.",
    category: "Dementia Care",
    tags: ["Dementia", "Nurse Advice", "Home Safety", "Memory Care"],
    image: "/brand-image.png",
    alt: "Nurse supporting person with dementia at home",
  },
  {
    slug: "free-personal-care-scotland-2026-guide",
    title:
      "Free Personal Care in Scotland 2026: Who Qualifies and How to Apply",
    excerpt:
      "A clear, nurse-written walkthrough of Scotland's Free Personal Care funding for over-65s, Frank's Law for younger adults, and how to navigate the assessment process.",
    date: "8 August 2026",
    readTime: "7 min read",
    author: "Morven Campbell RGN",
    authorRole: "Care Quality Manager",
    authorBio:
      "Morven is a registered nurse with a background in older people's care and health and social care integration. She works with families at Zento to ensure every eligible client accesses the funding they are entitled to.",
    category: "Funding & Legal",
    tags: ["Funding", "Free Personal Care", "Scotland", "Frank's Law"],
    image: "/about-image.png",
    alt: "Senior couple receiving home care in Scotland",
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
    authorBio:
      "Eleanor is a medical doctor and clinical advisor with 12 years in NHS acute medicine and community rehabilitation across Edinburgh and the Lothians.",
    category: "Nurse Insights",
    tags: ["Hospital Discharge", "Safety", "Reablement", "NHS"],
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
    authorBio:
      "Adnan is a Registered General Nurse with over 15 years of experience in elderly care, dementia support and community nursing across Lothian. He leads Zento's clinical governance and carer training.",
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
    authorBio:
      "Fiona leads Zento's community care and companionship teams across Perthshire and Crieff, with 10 years of experience supporting elderly people to live independently at home.",
    category: "Home Care Tips",
    tags: ["Winter", "Falls Prevention", "Edinburgh", "Heating"],
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
    authorBio:
      "Morven is a registered nurse with a background in older people's care and health and social care integration. She works with families at Zento to ensure every eligible client accesses the funding they are entitled to.",
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
      "Social isolation is Scotland's silent health crisis, linked to faster cognitive decline and early admission. Zento's companionship team shares the low-effort, high-impact weekly routines that genuinely change lives.",
    date: "8 July 2026",
    readTime: "6 min read",
    author: "Fiona MacLeod",
    authorRole: "Community Care Team Lead",
    authorBio:
      "Fiona leads Zento's community care and companionship teams across Perthshire and Crieff, with 10 years of experience supporting elderly people to live independently at home.",
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
      "A sensitive but important read about planning end-of-life care at home in Scotland, including district nurse input, syringe driver support, Fast Track funding and how a nurse-led agency coordinates with your GP.",
    date: "1 July 2026",
    readTime: "11 min read",
    author: "Adnan Karim RGN",
    authorRole: "Registered Manager, Zento Group",
    authorBio:
      "Adnan is a Registered General Nurse with over 15 years of experience in elderly care, dementia support and community nursing across Lothian. He leads Zento's clinical governance and carer training.",
    category: "Nurse Insights",
    tags: ["Palliative Care", "End of Life", "Nurse Advice"],
    image: "/about-image.png",
    alt: "Compassionate palliative care at home",
  },
];

const imageCycle = ["/brand-image.png", "/about-image.png", "/hero-image.png"];

function buildContent(meta: PostMeta): BlogContentBlock[] {
  const cycleImage = (i: number) => imageCycle[i % imageCycle.length];
  return [
    {
      type: "paragraph" as const,
      text: `${meta.excerpt} In this article we take a practical, nurse-led look at ${meta.title.toLowerCase()} — the kind of guidance our Zento team gives families in Edinburgh, Lothian and Perthshire every week.`,
    },
    {
      type: "callout" as const,
      style: "info" as const,
      title: `About this ${meta.category} article`,
      text: `This guide was written by ${meta.author}, ${meta.authorRole}. It provides general guidance for Scottish families but is not a substitute for individual medical or legal advice from your GP, social worker or qualified professional.`,
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: `Why this matters for families in Scotland`,
    },
    {
      type: "paragraph" as const,
      text: `Across the City of Edinburgh, East, Mid and West Lothian, and Perthshire — including Crieff and Comrie — we see families come to Zento after a worry has been building for weeks or months. Many feel like they should already know the answers when it comes to ${meta.category.toLowerCase()}. But the reality is that every family's situation is unique, and there is no single right way to arrange support. What matters is finding a plan that works for the person receiving care, on their terms.`,
    },
    {
      type: "list" as const,
      ordered: false,
      items: [
        `Understand what ${meta.category.toLowerCase()} means in practical day-to-day terms`,
        `Know which questions to ask your GP, social worker or care provider`,
        `Build a realistic plan for your home, your budget and your family's availability`,
        `Identify the early warning signs that a review or extra support may be needed`,
        `Feel confident knowing what quality ${meta.category.toLowerCase()} actually looks like`,
      ],
    },
    {
      type: "image" as const,
      src: cycleImage(0),
      alt: meta.alt,
      caption: `${meta.category} — a practical guide written by Zento's clinical team for families in Scotland.`,
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: `What our nursing team recommends as a first step`,
    },
    {
      type: "paragraph" as const,
      text: `Before making any decisions, our Zento nurses always recommend starting with a single, honest conversation around the kitchen table with the person needing care (if they are able to contribute), and the family members who will be most involved. Document what life looks like right now — the good days and the difficult ones — and write down the specific outcomes you want to achieve. This baseline becomes the foundation for every other decision.`,
    },
    {
      type: "callout" as const,
      style: "tip" as const,
      title: `Nurse-approved tip from ${meta.author.split(" ")[0]}`,
      text: `Write things down. The families who cope best over the long term keep a simple notebook or shared online note logging appointments, medication changes, weight, and what a 'good day' versus a 'difficult day' looks like. It's invaluable for GP visits and reviews.`,
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: `The practical framework we use at Zento`,
    },
    {
      type: "paragraph" as const,
      text: `Every care package and plan we write at Zento follows the same clinical structure, regardless of whether it's a weekly companionship visit or a complex, nurse-supervised 24-hour care rota. This ${meta.category.toLowerCase()} framework is the one our registered managers use for all clients in our Crieff and Edinburgh offices.`,
    },
    {
      type: "list" as const,
      ordered: true,
      items: [
        `Full assessment in the home by a registered nurse — not a salesperson or coordinator`,
        `Written care plan with clear outcomes, reviewed and signed off by the family`,
        `Matched small team of two or three consistent carers with relevant training`,
        `Monthly clinical review by a second registered nurse (independent oversight)`,
        `Open, regular communication with the family and any other professionals involved`,
      ],
    },
    {
      type: "quote" as const,
      text: `Good care at home isn't measured in number of visits. It's measured in whether the person feels seen, safe and respected in their own space. That's the nursing standard we build every package around.`,
      author: `${meta.author}, ${meta.authorRole}`,
    },
    {
      type: "heading" as const,
      level: 2 as const,
      text: `Tags, topics and further reading`,
    },
    {
      type: "paragraph" as const,
      text: `This article is filed under ${meta.category}, and touches on the specific topics: ${meta.tags.join(", ")}. If this is relevant for someone you love, we recommend reading two or three of our related articles below and then booking a free, no-obligation nurse consultation to discuss your family's exact situation. There is never any pressure to proceed with Zento — our team is here to give honest guidance first and foremost.`,
    },
    {
      type: "callout" as const,
      style: "warning" as const,
      title: `When to act sooner rather than later`,
      text: `If you have noticed a sudden change — increased confusion, a fall, rapid weight loss, difficulty managing medication or repeated missed appointments — don't wait for a formal review. Reach out to your GP practice or local social work team today. Early intervention almost always leads to better, less expensive outcomes.`,
    },
  ];
}

function buildRelatedPosts(
  currentSlug: string
): { slug: string; title: string; image: string; alt: string }[] {
  return postMetas
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      image: p.image,
      alt: p.alt,
    }));
}

function buildPrevNext(currentSlug: string): {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
} {
  const idx = postMetas.findIndex((p) => p.slug === currentSlug);
  return {
    prev:
      idx > 0
        ? { slug: postMetas[idx - 1].slug, title: postMetas[idx - 1].title }
        : undefined,
    next:
      idx < postMetas.length - 1
        ? { slug: postMetas[idx + 1].slug, title: postMetas[idx + 1].title }
        : undefined,
  };
}

const _buildForSlug = (slug: string): BlogPost | undefined => {
  const meta = postMetas.find((p) => p.slug === slug);
  if (!meta) return undefined;
  const nav = buildPrevNext(meta.slug);
  return {
    ...meta,
    content: buildContent(meta),
    relatedPosts: buildRelatedPosts(meta.slug),
    prev: nav.prev,
    next: nav.next,
  };
};

const blogPostsData: Record<string, BlogPost> = {
  "understanding-dementia-stages-at-home": _buildForSlug(
    "understanding-dementia-stages-at-home"
  ) as BlogPost,
  "free-personal-care-scotland-2026-guide": _buildForSlug(
    "free-personal-care-scotland-2026-guide"
  ) as BlogPost,
  "hospital-discharge-checklist-scotland": _buildForSlug(
    "hospital-discharge-checklist-scotland"
  ) as BlogPost,
  "medication-safety-at-home-elderly": _buildForSlug(
    "medication-safety-at-home-elderly"
  ) as BlogPost,
  "winter-home-safety-elderly-scotland": _buildForSlug(
    "winter-home-safety-elderly-scotland"
  ) as BlogPost,
  "choosing-home-care-agency-scotland": _buildForSlug(
    "choosing-home-care-agency-scotland"
  ) as BlogPost,
  "loneliness-elderly-scotland-connections": _buildForSlug(
    "loneliness-elderly-scotland-connections"
  ) as BlogPost,
  "palliative-care-at-home-scotland": _buildForSlug(
    "palliative-care-at-home-scotland"
  ) as BlogPost,
};

function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsData[slug];
}

function getAllBlogPostSlugs(): string[] {
  return Object.keys(blogPostsData);
}

const styleClasses = {
  tip: {
    wrapper:
      "border border-primary/20 bg-primary/5 rounded-2xl p-6 shadow-sm",
    iconBg: "bg-primary/15 text-primary",
    title: "text-secondary",
  },
  warning: {
    wrapper:
      "border border-orange-300 bg-orange-50 rounded-2xl p-6 shadow-sm",
    iconBg: "bg-orange-100 text-orange-600",
    title: "text-orange-800",
  },
  info: {
    wrapper:
      "border border-secondary/20 bg-secondary/5 rounded-2xl p-6 shadow-sm",
    iconBg: "bg-secondary/15 text-secondary",
    title: "text-secondary",
  },
};

export async function generateStaticParams() {
  return getAllBlogPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Zento Care Blog",
    };
  }

  return {
    title: `${post.title} | Zento Care Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://zentogroup.co.uk/blog/${post.slug}/`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${post.title} | Zento Care Blog`,
      description: post.excerpt,
      url: `https://zentogroup.co.uk/blog/${post.slug}/`,
      siteName: "Zento Care",
      locale: "en_GB",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Zento Care Blog`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug);
  const {slug} = await params
  console.log(slug); 
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      description: post.authorBio,
    },
    publisher: {
      "@type": "Organization",
      name: "Zento Group",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zentogroup.co.uk/blog/${post.slug}/`,
    },
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://zentogroup.co.uk/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
                  <Link
                    href="/blog/"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    Blog
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
                    Article
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — ARTICLE HERO
        ════════════════════════════════════════════════════════ */}
        <article>
          <header className="relative overflow-hidden bg-zinc-50 border-b border-zinc-100 pt-10 pb-10 md:pt-14 md:pb-14">
            <div className="pointer-events-none absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

            <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                {/* Category badge */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary">
                    <Stethoscope className="w-3 h-3" />
                    Nurse-Written
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
                  {/* Author card */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white shadow-md">
                      {post.author.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-secondary leading-tight">
                        {post.author}
                      </p>
                      <p className="text-xs text-zinc-500 leading-tight">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>

                  <span className="h-6 w-px bg-zinc-200 hidden sm:block" />

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="w-3.5 h-3.5 text-primary" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 -mt-2 md:-mt-4">
            <div className="relative max-w-5xl mx-auto aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl shadow-zinc-300/60 border border-zinc-100">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              SECTION 2 — ARTICLE CONTENT (sidebar layout)
          ════════════════════════════════════════════════════════ */}
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-7xl mx-auto">
              {/* MAIN ARTICLE COLUMN */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <div className="prose-content max-w-none space-y-6 text-base leading-relaxed text-zinc-700">
                  {post.content.map((block, i) => {
                    switch (block.type) {
                      case "heading":
                        const HeadingTag = `h${block.level}` as const;
                        return (
                          <HeadingTag
                            key={i}
                            className={`font-black text-secondary leading-tight scroll-mt-32 ${
                              block.level === 2
                                ? "text-2xl sm:text-3xl mt-10 mb-4 flex items-center gap-3"
                                : "text-xl sm:text-2xl mt-8 mb-3"
                            }`}
                          >
                            {block.level === 2 && (
                              <span className="inline-block h-8 w-1 rounded-full bg-primary shrink-0" />
                            )}
                            {block.text}
                          </HeadingTag>
                        );
                      case "paragraph":
                        return (
                          <p
                            key={i}
                            className="text-zinc-700 leading-[1.85]"
                          >
                            {block.text}
                          </p>
                        );
                      case "quote":
                        return (
                          <blockquote
                            key={i}
                            className="relative rounded-3xl bg-gradient-to-br from-zinc-50 via-primary/5 to-secondary/5 border border-zinc-200/60 p-7 md:p-9 my-8"
                          >
                            <div className="absolute -top-3.5 left-6 text-6xl font-black text-primary leading-none select-none">
                              &ldquo;
                            </div>
                            <p className="pt-3 text-base md:text-lg leading-relaxed italic text-zinc-700 font-medium">
                              {block.text}
                            </p>
                            {block.author && (
                              <footer className="mt-5 flex items-center gap-3">
                                <span className="h-px flex-1 bg-primary/20 max-w-[40px]" />
                                <span className="text-sm font-black text-primary not-italic">
                                  {block.author}
                                </span>
                              </footer>
                            )}
                          </blockquote>
                        );
                      case "list":
                        const ListTag = block.ordered ? "ol" : "ul";
                        return (
                          <ListTag
                            key={i}
                            className={`space-y-3 my-6 ${
                              block.ordered
                                ? "list-decimal pl-6 marker:text-primary marker:font-black"
                                : "space-y-3"
                            }`}
                          >
                            {block.items.map((item, li) => (
                              <li
                                key={li}
                                className={`flex items-start gap-3 leading-relaxed text-zinc-700 ${
                                  block.ordered ? "pl-1" : ""
                                }`}
                              >
                                {!block.ordered && (
                                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                )}
                                <span>{item}</span>
                              </li>
                            ))}
                          </ListTag>
                        );
                      case "callout":
                        const style = styleClasses[block.style];
                        const Icon =
                          block.style === "tip"
                            ? Lightbulb
                            : block.style === "warning"
                            ? AlertTriangle
                            : Sparkles;
                        return (
                          <aside
                            key={i}
                            className={`my-8 ${style.wrapper}`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h4
                                  className={`text-sm font-black ${style.title}`}
                                >
                                  {block.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-zinc-700">
                                  {block.text}
                                </p>
                              </div>
                            </div>
                          </aside>
                        );
                      case "image":
                        return (
                          <figure key={i} className="my-10 group">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100 shadow-xl shadow-zinc-200/50 border border-zinc-100">
                              <Image
                                src={block.src}
                                alt={block.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 66vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            {block.caption && (
                              <figcaption className="mt-4 text-center text-xs sm:text-sm text-zinc-500 italic max-w-xl mx-auto leading-relaxed px-4">
                                {block.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                {/* ── TAGS ── */}
                <div className="mt-12 pt-8 border-t border-zinc-200">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-500 mr-1">
                      Tags
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 text-[11px] font-bold text-zinc-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── AUTHOR BIO CARD ── */}
                <div className="mt-8">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 via-white to-secondary/5 border border-zinc-200/60 p-7 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-5 md:gap-7">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-primary to-primary/80 text-3xl font-black text-white shadow-lg shadow-primary/20">
                        {post.author.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-black text-secondary">
                            {post.author}
                          </h3>
                          <p className="text-sm font-bold text-primary">
                            {post.authorRole}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-600">
                          {post.authorBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── PREV / NEXT NAV ── */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.prev ? (
                    <Link
                      href={`/blog/${post.prev.slug}/`}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-primary group-hover:-translate-x-0.5 transition-all shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                          Previous article
                        </p>
                        <p className="text-sm font-bold text-secondary group-hover:text-primary line-clamp-2 leading-snug">
                          {post.prev.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {post.next ? (
                    <Link
                      href={`/blog/${post.next.slug}/`}
                      className="group flex items-center justify-end gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:text-right"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                          Next article
                        </p>
                        <p className="text-sm font-bold text-secondary group-hover:text-primary line-clamp-2 leading-snug">
                          {post.next.title}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>

              {/* ── SIDEBAR ── */}
              <aside className="lg:col-span-4 order-1 lg:order-2 space-y-6 lg:sticky lg:top-24 self-start">
                {/* Share card */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-primary" />
                    Share this article
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "Facebook", color: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" },
                      { name: "LinkedIn", color: "bg-sky-50 text-sky-700 hover:bg-sky-700 hover:text-white" },
                      { name: "Email", color: "bg-zinc-50 text-zinc-600 hover:bg-zinc-700 hover:text-white" },
                    ].map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        className={`rounded-xl py-2.5 text-[11px] font-black ${s.color} transition-all cursor-pointer`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of contents */}
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    In this guide
                  </h3>
                  <ul className="space-y-1.5">
                    {post.content
                      .filter((b) => b.type === "heading" && b.level === 2)
                      .map((block) =>
                        block.type === "heading" ? (
                          <li key={block.text}>
                            <a
                              href="#"
                              // onClick={(e) => e.preventDefault()}
                              className="group flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-zinc-600 hover:text-primary transition-colors py-1"
                            >
                              <span className="mt-1.5 h-1 w-4 rounded-full bg-zinc-300 group-hover:bg-primary transition-colors shrink-0" />
                              <span className="leading-snug">
                                {block.text}
                              </span>
                            </a>
                          </li>
                        ) : null
                      )}
                  </ul>
                </div>

                {/* Mini CTA */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary/90 p-6 text-white shadow-lg shadow-secondary/20">
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
                  <div className="relative z-10 space-y-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                      <Stethoscope className="w-3 h-3" />
                      Need advice?
                    </span>
                    <h3 className="text-lg font-black leading-tight">
                      Unsure which care is right for your family?
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Book a free, no-obligation chat with our registered nursing team.
                    </p>
                    <ModalButton
                      type="assessment"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3 text-xs font-black text-secondary shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      Free nurse consultation
                      <ArrowRight className="w-4 h-4" />
                    </ModalButton>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — RELATED ARTICLES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-16 md:py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-12 max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  More Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-secondary">
                  Related articles you may find helpful
                </h2>
              </div>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1.5 text-sm font-black text-primary hover:text-secondary transition-colors"
              >
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {post.relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}/`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative block aspect-[16/10] overflow-hidden bg-zinc-100">
                    <Image
                      src={rp.image}
                      alt={rp.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-black leading-snug text-secondary group-hover:text-primary transition-colors line-clamp-3 mb-auto">
                      {rp.title}
                    </h3>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-primary group-hover:text-secondary transition-colors">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white">
                  <Heart className="w-3.5 h-3.5" />
                  Need Care Support?
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Let&apos;s talk about care for your loved one
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Whether it&apos;s dementia care, funding guidance, nurse assessment or help
                  arranging home visits — our Edinburgh and Crieff teams are here to help with
                  honest advice, no pressure.
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
