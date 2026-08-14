import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  Users,
  Brain,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Utensils,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Meal Preparation & Nutrition Support | Home Care | Zento",
  description:
    "Our carers prepare home-cooked meals tailored to dietary needs. Hydration, dementia-safe meal planning and encouragement to eat well. Edinburgh & Lothian. Call us today.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/meal-preparation/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Meal Preparation & Nutrition Support | Home Care | Zento",
    description:
      "Our carers prepare home-cooked meals tailored to dietary needs. Hydration, dementia-safe meal planning and encouragement to eat well. Edinburgh & Lothian.",
    url: "https://zentogroup.co.uk/home-care/meal-preparation/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Meal Preparation Home Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meal Preparation & Nutrition Support | Home Care | Zento",
    description:
      "Home-cooked meals tailored to dietary needs. Dementia-safe planning, hydration support and nurse-informed nutrition care. Edinburgh & Lothian.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "You've noticed unintended weight loss, or their clothes seem looser than before",
  "The fridge or cupboards contain little fresh food, or the same ready meals repeatedly",
  "They've mentioned that cooking feels like too much effort, or they've stopped bothering",
  "There are signs they're skipping meals — no washing up, no cooking smells, empty bins",
  "They seem more confused or tired than usual, which can be a sign of dehydration",
  "Mobility issues make standing at the cooker or carrying hot pans genuinely unsafe",
  "They're eating alone every day and seem to have lost interest in food altogether",
  "A recent diagnosis means their diet needs to change and they're unsure how to manage it",
];

const included = [
  "Planning and preparing meals tailored to dietary needs, preferences and any medical requirements",
  "Cooking fresh, home-cooked food rather than relying on ready meals",
  "Support for specific diets — diabetic, low-sodium, soft-texture, allergen-aware, and more",
  "Encouragement and reminders to drink fluids regularly throughout the day",
  "Company at mealtimes, making eating a social occasion rather than a solitary task",
  "Dementia-safe meal planning — familiar foods, manageable portions, appropriate textures",
  "Light kitchen tasks — washing up, tidying, ensuring the kitchen stays safe and manageable",
  "Monitoring of appetite and intake, with any concerns reported back to family or our nursing team",
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "A quick, honest conversation about what your loved one needs — no pressure, no commitment.",
  },
  {
    step: "02",
    title: "We learn about their diet and preferences",
    desc: "We find out what they like to eat, any dietary or medical requirements, and how much support they currently need in the kitchen.",
  },
  {
    step: "03",
    title: "We build a meal plan and match a carer",
    desc: "A plan is put together around their preferences and needs, and we match a carer who can deliver it consistently.",
  },
  {
    step: "04",
    title: "Visits begin, and we keep watching",
    desc: "Meals start on your agreed schedule. Our team keeps an eye on appetite and wellbeing, and adjusts the plan if anything changes.",
  },
];

const testimonials = [
  {
    quote:
      "Dad had lost a noticeable amount of weight before we realised how little he was actually eating. He was managing fine on the surface, but the freezer told a different story. His carer now cooks proper meals a few times a week and eats with him. He's put weight back on and, honestly, seems happier too.",
    author: "Elaine C.",
    location: "Corstorphine, Edinburgh",
    source: "Google Review",
  },
  {
    quote:
      "Mum's dementia meant meal times had become stressful and unpredictable — she'd forget she'd eaten, or refuse food that used to be a favourite. Her carer worked out what actually worked for her and stuck with it. It's completely changed how relaxed mealtimes are for her.",
    author: "Douglas W.",
    location: "Livingston, West Lothian",
    source: "homecare.co.uk",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh/" },
  { label: "Midlothian", href: "/locations/lothian/midlothian/" },
  { label: "Perthshire", href: "/locations/perthshire/" },
];

const faqs = [
  {
    q: "What is meal preparation home care?",
    a: "Meal preparation home care is support with planning, cooking and serving meals for someone who struggles to manage this independently — due to mobility issues, memory difficulties or general difficulty cooking for themselves. A carer prepares meals suited to dietary needs and preferences, and can share the meal as a social occasion.",
  },
  {
    q: "Can meal preparation help with specific dietary requirements?",
    a: "Yes. Our carers can prepare meals suited to a range of dietary needs — diabetic diets, low-sodium diets, soft or modified-texture food for swallowing difficulties, allergen-aware cooking and more. Where a dietary requirement is medically significant, our nursing team is involved in getting the meal plan right.",
  },
  {
    q: "How does meal preparation support someone with dementia?",
    a: "Meal times can be particularly difficult for people living with dementia — changes in appetite, forgetting they've eaten, or resistance to unfamiliar food are all common. Our carers plan dementia-safe meals around familiar foods, manageable portions and appropriate textures, and maintain the same consistent approach to reduce confusion and stress at mealtimes.",
  },
  {
    q: "Can carers monitor for signs of malnutrition or dehydration?",
    a: "Our carers are guided by our nursing team on what changes in appetite, weight or hydration might indicate, and are attentive to early warning signs during visits. While this isn't a clinical assessment, it means changes are more likely to be noticed early and flagged to family or, where appropriate, a GP — rather than going unnoticed until they become more serious.",
  },
  {
    q: "Is meal preparation available alongside other home care services?",
    a: "Yes. Meal preparation is often combined with personal care, companionship or medication support as part of a broader care plan. Our nursing team can help you work out what combination of services would genuinely suit your loved one's situation.",
  },
];

const relatedServices = [
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care/",
    desc: "Daily hands-on support with bathing, dressing and hygiene, delivered under nurse-led oversight.",
    icon: Heart,
  },
  {
    title: "Companionship Care",
    href: "/home-care/companionship/",
    desc: "Regular, consistent visits that combine naturally with shared mealtimes.",
    icon: Users,
  },
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care/",
    desc: "Consistent routines and nurse-led planning for clients living with dementia.",
    icon: Brain,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function MealPreparationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Meal Preparation Home Care",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Meal Preparation and Nutrition Support",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/meal-preparation/",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Home Care", item: "https://zentogroup.co.uk/home-care/" },
      { "@type": "ListItem", position: 3, name: "Meal Preparation Home Care", item: "https://zentogroup.co.uk/home-care/meal-preparation/" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      <main className="flex-1">

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li><Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><Link href="/home-care/" className="hover:text-primary transition-colors font-medium">Home Care</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><span className="font-semibold text-secondary" aria-current="page">Meal Preparation Home Care</span></li>
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
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Meal Preparation &amp; Nutrition · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Meal Preparation Home Care —{" "}
                  <span className="text-primary">Nutritious, Home-Cooked</span> Support
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Meal preparation at home means more than getting a meal on the table. It&apos;s making sure your
                  loved one is eating enough, drinking enough, and getting food that suits their specific needs —
                  prepared by a carer who&apos;s been guided by our nursing team on what to watch for when appetite
                  or eating habits start to change.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ModalButton
                  type="assessment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a
                  href={OFFICES[0]?.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Edinburgh: {OFFICES[0]?.phone}
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Tailored meal planning</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Nurse-informed nutrition awareness</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Dementia-safe menus</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS MEAL PREPARATION HOME CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Carer preparing a fresh, nutritious home-cooked meal for a client"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is meal preparation home care?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Meal preparation home care is support with planning, cooking and serving meals for someone
                    who finds it difficult to manage this independently — whether due to mobility issues, memory
                    difficulties, low mood or simply the effort of cooking for one. A carer prepares meals
                    tailored to dietary needs and preferences, encourages regular eating and drinking, and can
                    share the meal as a social occasion rather than a task done alone.
                  </p>
                  <p>
                    It&apos;s easy to think of this as a minor convenience. In practice, it addresses a genuine
                    and under-recognised health risk. Around 1 in 10 older adults in the UK is estimated to be
                    at risk of malnutrition, and dehydration in older people is directly linked to confusion,
                    falls and hospital admissions that could often have been prevented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOUR LOVED ONE MAY NEED MEAL SUPPORT
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                  Signs to Look For
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                  Signs your loved one may need meal preparation support
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3 mb-10">
                {signs.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-700">{sign}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <ModalButton
                  type="assessment"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — WHAT'S INCLUDED
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Provide
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                What our meal preparation service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Utensils className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                Meals are planned around what your loved one actually enjoys — not a generic menu. Where there&apos;s a specific medical dietary requirement, our nursing team is involved in getting that right.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — THE NURSE-LED DIFFERENCE (dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why nurse-informed meal support{" "}
                  <span className="text-primary">matters</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Most home care providers treat meal preparation as the least clinical service they offer —
                    someone pops in, makes a sandwich, leaves. But nutrition and hydration in older age carry
                    real health stakes. Poor nutrition contributes to muscle loss, weaker immunity and slower
                    recovery from illness. Dehydration — often caused simply by a reduced sense of thirst as
                    we age — can cause confusion that&apos;s easily mistaken for cognitive decline, and is a
                    recognised contributor to falls.
                  </p>
                  <p>
                    At Zento, our carers are guided by our nursing team on what changes in appetite, weight or
                    hydration might mean, and when they&apos;re worth flagging. A meal preparation visit
                    isn&apos;t just about the food on the plate. It&apos;s a regular, informed check on one of
                    the most basic and most overlooked aspects of your loved one&apos;s health.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Zento carer ensuring proper nutrition and hydration for a home care client"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 — HOW IT WORKS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange meal preparation support with Zento
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item, index) => (
                <div key={index} className="relative flex flex-col">
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px bg-primary/20 lg:block" />
                  )}
                  <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-lg ring-1 ring-primary/10">
                    {item.step}
                  </div>
                  <div className="text-center">
                    <h3 className="mb-3 text-lg font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Start with a free call <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 — COSTS AND FUNDING
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Funding &amp; Cost
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                How much does meal preparation home care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Meal preparation is usually included as part of a broader home care visit, priced by the
                  hour, rather than charged as a standalone service.
                </p>
                <p>
                  Where meal preparation forms part of a wider personal care package, it may be eligible for
                  support under Scotland&apos;s Free Personal Care scheme for over-65s. Our team can help
                  clarify what applies to your situation.
                </p>
              </div>
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-secondary/90 cursor-pointer"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Families We&apos;ve Supported
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                What families say about Zento&apos;s meal preparation service
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-zinc-600 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="border-t border-zinc-200 pt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-secondary">{t.author}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" /> {t.location} · {t.source}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
              Coverage
            </span>
            <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
              Where we provide meal preparation support
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
            <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
              Zento provides nurse-informed meal preparation support across Edinburgh and the Lothians from our
              Edinburgh office, and across Perthshire from our Crieff office.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {locationLinks.map((loc) => (
                <Link key={loc.label} href={loc.href} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about meal preparation home care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                      <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">{faq.q}</h3>
                      <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-relaxed text-zinc-600">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — RELATED SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Related Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Families often combine meal preparation with...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <Link key={service.title} href={service.href} className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-secondary group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600 flex-1">{service.desc}</p>
                    <div className="mt-4 pt-4 border-t border-zinc-100">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about meal preparation
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Getting nutrition right matters more than it might seem. Our team is here to talk through
                  what support would genuinely help — with no pressure and no obligation.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from our registered nurses.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton
                    type="assessment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a free assessment <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a key={office.id} href={office.phoneHref} className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
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
