import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Brain,
  Sun,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Clock4,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Respite Care at Home | Nurse-Led Relief | Zento",
  description:
    "Planned and emergency at-home respite care in Edinburgh and Scotland. Nurse oversight so family carers can take a genuine break with peace of mind. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/respite-care/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Respite Care at Home | Nurse-Led Relief | Zento",
    description:
      "Planned and emergency at-home respite care in Edinburgh and Scotland. Nurse oversight so family carers can take a genuine break with peace of mind.",
    url: "https://zentogroup.co.uk/home-care/respite-care/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Respite Care at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Respite Care at Home | Nurse-Led Relief | Zento",
    description:
      "Nurse-led planned and emergency respite care at home in Edinburgh, Lothian & Perthshire.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "You're feeling exhausted, irritable or emotionally worn down more days than not",
  "You've cancelled your own appointments, plans or basic self-care repeatedly to cover caring duties",
  "You haven't had a proper break — a day, let alone a week — in longer than you can comfortably remember",
  "An upcoming event, holiday or hospital stay means you'll be unavailable and need reliable cover",
  "Your own health has started to suffer, physically or mentally, from the demands of caring",
  "You've found yourself more short-tempered with the person you care for than you'd like to be",
  "A sudden illness or emergency has left you unable to provide care with no immediate backup plan",
  "You feel guilty even considering a break — which is, itself, often a sign one is overdue",
];

const included = [
  "A nurse-written care plan prepared before cover begins — not a rushed handover on the day",
  "Personal care, medication support and daily routines maintained exactly as your loved one is used to",
  "Consistent, properly briefed carers, not a stranger with no context walking in cold",
  "Flexible arrangements — from a few hours to several weeks, depending on what you need",
  "Emergency respite availability, for situations that can't be planned in advance",
  "Regular updates during the respite period, so you can properly switch off",
  "A smooth handover back to your usual routine once respite care ends",
];

const steps = [
  {
    step: "01",
    title: "Call us, whether planned or urgent",
    desc: "For planned respite, the earlier you contact us, the more thoroughly we can prepare. For emergencies, call us right away — we understand the urgency.",
  },
  {
    step: "02",
    title: "A nurse builds a proper handover plan",
    desc: "We gather everything a carer needs to know — medication, routine, preferences, anything clinically important — before anyone steps in.",
  },
  {
    step: "03",
    title: "A carer is briefed and matched",
    desc: "Your loved one's carer during respite is properly prepared, not improvising. For emergency respite, we move as quickly as the situation demands.",
  },
  {
    step: "04",
    title: "Cover begins, and you get your break",
    desc: "Regular updates are available if you'd like them. When you're back, we hand things over smoothly.",
  },
];

const testimonials = [
  {
    quote:
      "I hadn't had a proper week off in over two years of caring for my husband. Booking respite felt like admitting I couldn't cope, but it wasn't that at all — it meant I could actually keep going. The nurse who set up the handover plan clearly understood his routine before the carer even arrived. He barely noticed a change.",
    author: "Linda P.",
    location: "Portobello, Edinburgh",
    source: "Google Review",
  },
  {
    quote:
      "My sister and I share Mum's care, and when she was hospitalised suddenly, I needed emergency cover within a day. Zento had someone briefed and in place faster than I expected — and more importantly, properly prepared, not just a stranger showing up. That mattered enormously in an already stressful week.",
    author: "Kenneth R.",
    location: "Comrie, Perthshire",
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
    q: "What is respite care and who is it for?",
    a: "Respite care is temporary support that allows a family carer to take a break, while the person they normally care for continues to be looked after safely at home. It's for anyone providing unpaid care for a family member — whether that's a spouse, parent or other relative — and can be arranged for a few hours, a week, or on an emergency basis.",
  },
  {
    q: "Can Zento provide emergency or short-notice respite care?",
    a: "Yes. We understand that carers sometimes need support urgently — due to illness, an accident or sudden exhaustion. While planned respite allows for more thorough preparation, we prioritise emergency requests and move as quickly as the situation requires.",
  },
  {
    q: "How long can a respite care arrangement last?",
    a: "This depends entirely on your needs. Respite arrangements with Zento can range from a few hours a week to several weeks of continuous cover, for example during a holiday or extended hospital stay. There's no fixed limit — we build the arrangement around what you actually need.",
  },
  {
    q: "Can a family carer in Scotland get support towards respite care costs?",
    a: "Yes. Under the Carers (Scotland) Act 2016, unpaid carers have the right to request an Adult Carer Support Plan from their local council, which assesses your needs as a carer and can include support towards respite. This is separate from any assessment of the person you care for, and it's a right specific to carers in Scotland.",
  },
  {
    q: "Will my loved one have the same carer during respite as their usual carer?",
    a: "Where the respite period overlaps with your loved one's usual care arrangement, we aim for as much consistency as possible. For standalone respite arrangements, we match a carer carefully and ensure they're fully briefed on your loved one's routine, preferences and any medical needs before cover begins.",
  },
  {
    q: "Does respite care cost the same as regular home care visits?",
    a: "Pricing depends on the type and duration of respite required — hourly cover is priced differently from daily or live-in respite arrangements. Our team can give you clear guidance on cost during your first conversation, based on exactly what you need.",
  },
];

const relatedServices = [
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care/",
    desc: "Consistent, nurse-led support for clients living with dementia — including during respite periods.",
    icon: Brain,
  },
  {
    title: "Live-In Care",
    href: "/live-in-care/",
    desc: "For longer respite periods or ongoing 24-hour cover, a live-in carer may be the right next step.",
    icon: ShieldCheck,
  },
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care/",
    desc: "Daily hands-on support maintained consistently throughout a respite arrangement.",
    icon: Heart,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function RespiteCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Respite Care at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Respite Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/respite-care/",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Care - Respite Support",
    url: "https://zentogroup.co.uk/home-care/respite-care/",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led planned and emergency respite care at home.",
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
      { "@type": "ListItem", position: 3, name: "Respite Care at Home", item: "https://zentogroup.co.uk/home-care/respite-care/" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      <main className="flex-1">
        {/* ── BREADCRUMB ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <Link href="/home-care/" className="hover:text-primary transition-colors font-medium">
                    Home Care
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Respite Care at Home
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
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Respite Care · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Respite Care at Home —{" "}
                  <span className="text-primary">Professional Relief for Family Carers</span> in Scotland
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Caring for a loved one is exhausting in ways that are hard to explain to anyone who hasn&apos;t done it.
                  Respite care gives you a genuine break — planned or at short notice — while your loved one stays at
                  home, supported by a properly briefed carer working from a nurse-written plan, not just someone filling in.
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
                <a
                  href={OFFICES[1]?.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Crieff: {OFFICES[1]?.phone}
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Planned &amp; emergency cover</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Nurse-written handover plan</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Routine &amp; continuity preserved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS RESPITE CARE AT HOME?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Carer providing supportive respite care at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is respite care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Respite care at home is temporary support arranged to give a family carer a proper break, while the
                    person they normally care for continues to be looked after — safely, and in their own home rather than
                    moving them somewhere unfamiliar. It can mean a few hours a week, a week&apos;s cover for a holiday,
                    or urgent, short-notice support if a carer is suddenly unavailable.
                  </p>
                  <p>
                    There are two broad types. Planned respite is booked in advance — for a holiday, a hospital
                    appointment, a wedding, or simply a regular scheduled break. Emergency respite responds to something
                    unexpected — the carer falls ill, has an accident, or simply reaches a point where they cannot continue
                    without support right away. Both matter equally, and a good respite provider needs to be genuinely ready
                    for either.
                  </p>
                  <p>
                    The word &lsquo;break&rsquo; undersells what respite actually protects. Carers&apos; charities recommend a
                    minimum of two weeks of respite a year, and research consistently shows that carers who don&apos;t get
                    proper breaks are at significantly higher risk of burnout — which, in turn, is one of the most common
                    reasons care arrangements break down and a loved one ends up moving into residential care sooner than
                    would otherwise have been necessary. Respite care isn&apos;t indulgent. It&apos;s often what keeps a home
                    care arrangement sustainable in the first place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOU MAY NEED RESPITE CARE
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                  Signs to Look For
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                  Signs you or a family carer need a break
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
                What our respite care service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Sun className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                The goal of every respite arrangement at Zento is continuity — your loved one&apos;s routine shouldn&apos;t feel disrupted just because you&apos;re taking a break.
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
                  Why nurse-led respite care <span className="text-primary">matters</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Respite care is often treated as an afterthought — a temporary carer sent in with minimal briefing,
                    expected to muddle through. That&apos;s a real risk, particularly for clients with complex needs,
                    dementia or specific medical routines, where an unbriefed carer can genuinely struggle.
                  </p>
                  <p>
                    At Zento, every respite arrangement starts with a proper handover, written by a registered nurse,
                    covering medication, routine, preferences and anything clinically relevant. The carer who arrives
                    isn&apos;t guessing. They&apos;re working from a real plan, prepared by someone with clinical training
                    who understands what actually matters to get right.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Registered nurse preparing handover plan for respite care"
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
                How to arrange respite care with Zento
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
                How much does respite care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Respite care is typically priced by the hour or by the day, depending on the type and length of cover
                  required.
                </p>
                <p>
                  Unpaid carers in Scotland have a specific legal right that&apos;s worth knowing about: under the Carers
                  (Scotland) Act 2016, you&apos;re entitled to an Adult Carer Support Plan from your local council, which
                  assesses your needs as a carer — separately from the person you care for — and can include support
                  towards respite. This is a Scotland-specific right, distinct from the equivalent legislation in England,
                  and it&apos;s often underused simply because carers don&apos;t know it exists.
                </p>
                <p>
                  Scotland&apos;s Free Personal Care scheme may also reduce the cost of the personal care elements of a
                  respite arrangement for eligible over-65s.
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
                What families say about Zento&apos;s respite care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
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
              Where we provide respite care
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
            <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
              Zento provides nurse-led respite care across Edinburgh and the Lothians from our Edinburgh office,
              and across Perthshire from our Crieff office.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {locationLinks.map((loc) => (
                <Link
                  key={loc.label}
                  href={loc.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                >
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
                  Frequently asked questions about respite care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                      <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">
                        {faq.q}
                      </h3>
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
                Respite care often includes...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-secondary group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
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
                  Speak to our team about respite care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  You deserve a proper break — and your loved one deserves continuity while you take it. Our team is here
                  to help, with no pressure and no obligation.
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
