import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Building2,
  Clock4,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import { OFFICES } from "@/constants";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Hospital Discharge Care at Home | Nurse-Led | Zento",
  description:
    "Coming home from hospital? Our nurse-led team provides safe discharge support across Edinburgh, liaising with NHS staff for a smooth transition home. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/hospital-discharge/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hospital Discharge Care at Home | Nurse-Led | Zento",
    description:
      "Coming home from hospital? Our nurse-led team provides safe discharge support across Edinburgh, liaising with NHS staff for a smooth transition home.",
    url: "https://zentogroup.co.uk/home-care/hospital-discharge/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Hospital Discharge Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Discharge Care at Home | Nurse-Led | Zento",
    description:
      "Safe hospital discharge support across Edinburgh and Lothian. Nurse-led care planned before leaving the ward.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "The hospital team has raised concerns about them managing alone at home",
  "They live alone with no family nearby who can provide regular support",
  "Their mobility, strength or confidence has noticeably declined during their hospital stay",
  "Their medication has changed significantly and they'll need help managing the new routine",
  "They're recovering from surgery, a fall, a stroke or another event that affects daily activities",
  "The discharge team has mentioned a 'package of care' or asked about home support options",
  "You're worried about them being readmitted if the right support isn't in place",
  "The ward has given a discharge date and you don't yet have a care plan arranged",
];

const included = [
  "A care plan built around the discharge summary, before your loved one leaves hospital",
  "Coordination with the ward or discharge team on timing, needs and any risks flagged",
  "Personal care, mobility support and medication management, based on what's needed",
  "A home safety check — identifying trip hazards, ensuring the home is warm and ready",
  "Meal preparation and hydration support during the early recovery period",
  "Close monitoring in the first days home, when the risk of readmission is highest",
  "Flexibility to step support up or down as recovery progresses",
  "Clear communication with family throughout, so no one is left wondering how things are going",
];

const steps = [
  {
    step: "01",
    title: "Call us as soon as a discharge date is mentioned",
    desc: "The earlier we know, the better we can prepare. This can be arranged by family, or directly with the hospital discharge team.",
  },
  {
    step: "02",
    title: "A nurse reviews the discharge summary",
    desc: "We understand what happened in hospital, what's changed, and what support is genuinely needed — not a guess, an actual clinical review.",
  },
  {
    step: "03",
    title: "We build the care plan and match a carer",
    desc: "A plan is ready before discharge day. In most cases we can have care in place within 24 to 48 hours of being contacted.",
  },
  {
    step: "04",
    title: "Care starts the day they come home",
    desc: "Support begins immediately, with close monitoring in the first critical days. We adjust the plan as recovery progresses.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh/" },
  { label: "Midlothian", href: "/locations/lothian/midlothian/" },
  { label: "Perthshire", href: "/locations/perthshire/" },
];

const faqs = [
  {
    q: "What is hospital discharge care at home?",
    a: "Hospital discharge care at home is support arranged specifically to help someone leave hospital safely and recover well at home. It follows the Discharge to Assess principle — recovering in a familiar environment, with the right support in place from day one. It can include personal care, medication management, mobility support and meal preparation, depending on individual needs.",
  },
  {
    q: "How quickly can Zento arrange care after a hospital discharge?",
    a: "In most cases, we can have care in place within 24 to 48 hours of being contacted. The earlier we're involved — ideally as soon as a discharge date is confirmed — the more thoroughly we can prepare, including reviewing the discharge summary and liaising with the ward if needed.",
  },
  {
    q: "Can Zento liaise directly with hospital discharge teams?",
    a: "Yes. Our nursing team can communicate directly with discharge coordinators, ward staff and social workers at Edinburgh Royal Infirmary, the Western General, Ninewells Hospital, Perth Royal Infirmary and other hospitals across the region, to ensure the care plan reflects the actual clinical picture at the point of discharge.",
  },
  {
    q: "Does a hospital discharge care plan differ from a standard home care plan?",
    a: "Yes, in important ways. A discharge care plan is built around the specific clinical events of the hospital stay — surgery, a fall, a stroke, a medication change — and is designed to be ready before the person leaves hospital, rather than arranged afterwards. It also typically involves closer monitoring in the first days home, when the risk of complications or readmission is highest.",
  },
  {
    q: "Can discharge care transition into longer-term home care?",
    a: "Yes. Many discharge care arrangements begin as short-term, intensive support during early recovery and are gradually reduced as the person regains independence — or continue as ongoing care if that's what's needed. Our nursing team reviews the plan regularly and adjusts it as circumstances change.",
  },
  {
    q: "What happens if complications arise after discharge?",
    a: "Our carers are trained to recognise signs that something isn't right and to escalate concerns to our nursing team promptly. If a clinical issue arises, we can advise on next steps and, where needed, support communication with the GP or out-of-hours services. Early recognition of complications is one of the most important functions of nurse-led discharge care.",
  },
];

const relatedServices = [
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care/",
    desc: "Hands-on daily support with bathing, dressing and mobility during recovery.",
    icon: Heart,
  },
  {
    title: "Medication Support at Home",
    href: "/home-care/medication-support/",
    desc: "Nurse-designed medication protocols — especially important when prescriptions change after a hospital stay.",
    icon: ShieldCheck,
  },
  {
    title: "Overnight Care at Home",
    href: "/live-in-care/overnight-care/",
    desc: "Sleep-in or waking-night support for the first, most vulnerable days of recovery.",
    icon: Clock4,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function HospitalDischargePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Discharge Support",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Hospital Discharge Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/hospital-discharge/",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Care - Hospital Discharge Support",
    url: "https://zentogroup.co.uk/home-care/hospital-discharge/",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led hospital discharge care and post-acute recovery support at home.",
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
      { "@type": "ListItem", position: 3, name: "Hospital Discharge Care", item: "https://zentogroup.co.uk/home-care/hospital-discharge/" },
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
                <li><Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><Link href="/home-care/" className="hover:text-primary transition-colors font-medium">Home Care</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><span className="font-semibold text-secondary" aria-current="page">Hospital Discharge Care</span></li>
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
            <AnimateContainer animation="fade-up" className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Hospital Discharge Support · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Hospital Discharge Support —{" "}
                  <span className="text-primary">Nurse-Led Care</span> After You Leave Hospital
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Leaving hospital should be the start of recovery, not the start of a new set of worries.
                  Zento provides nurse-led hospital discharge support across Edinburgh and Perthshire — care
                  that&apos;s planned before your loved one leaves the ward, not scrambled together after
                  they&apos;re already home.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a
                  href={OFFICES[0]?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Edinburgh: {OFFICES[0]?.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS HOSPITAL DISCHARGE CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Registered nurse liaising on hospital discharge care plan for a patient returning home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is hospital discharge care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Hospital discharge care is home support arranged specifically to help someone leave hospital
                    safely and recover well once they&apos;re home. It typically follows what the NHS calls a
                    Discharge to Assess model — the principle that people recover better in a familiar environment
                    than in a hospital bed, provided the right support is in place from day one.
                  </p>
                  <p>
                    A discharge care plan might include personal care, medication support, mobility assistance,
                    meal preparation or overnight care — often a combination, depending on what the person needs
                    during the first weeks of recovery. What makes it different from a standard care arrangement
                    is the urgency and the coordination required: it needs to be ready before your loved one
                    walks out of the hospital doors, not arranged in a rush once they&apos;re already home and
                    struggling.
                  </p>
                  <p>
                    Nationally, patients waiting for home care to be arranged are one of the most common reasons
                    hospital discharges are delayed — accounting for roughly a quarter of all delays. A discharge
                    plan that&apos;s ready in advance doesn&apos;t just help your loved one. It helps free up the
                    hospital bed for someone who needs it.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOU NEED DISCHARGE CARE
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Triggers for Care"
          title="Signs your loved one will need support after hospital"
          subtitle="A safe transition home prevents hospital readmission and builds confidence. If any of these apply to your discharge situation, our nurse-led team is ready to step in."
          signs={signs}
          ctaText="Speak to our team"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — WHAT'S INCLUDED
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Provide
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                What our hospital discharge service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <AnimateItem key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                Every discharge care plan is written by a registered nurse, based on the actual clinical picture — not a generic package applied regardless of what happened in hospital.
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
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why a nurse-led discharge plan{" "}
                  <span className="text-primary">matters</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    A standard home care agency waits for a referral, then sends a coordinator to arrange a
                    care plan once your loved one is already home. That gap — between leaving hospital and care
                    actually starting properly — is exactly when things go wrong: a missed medication, a fall,
                    confusion about a new routine.
                  </p>
                  <p>
                    At Zento, a registered nurse can be involved before discharge, reviewing the discharge
                    summary, understanding what changed during the hospital stay, and building a care plan that
                    reflects the actual clinical picture — not a generic template. Our nurses can liaise directly
                    with hospital discharge teams, whether that&apos;s Edinburgh Royal Infirmary, the Western
                    General, Ninewells Hospital or Perth Royal Infirmary, to make sure nothing is missed in the
                    handover.
                  </p>
                </div>
              </AnimateContainer>
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Zento registered nurse conducting discharge liaison for post-hospital home recovery"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 — HOW IT WORKS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange discharge care with Zento
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item, index) => (
                <AnimateItem key={index} className="relative flex flex-col">
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
                </AnimateItem>
              ))}
            </AnimateContainer>
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
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Funding &amp; Cost
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                How much does hospital discharge care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Discharge care is usually priced by the hour, based on the level and frequency of support
                  required during recovery.
                </p>
                <p>
                  Some discharge care may be funded through NHS-funded intermediate care or reablement support for
                  a short initial period, arranged through the hospital or council. Beyond that, Scotland&apos;s Free
                  Personal Care scheme may apply for eligible over-65s. Our team can help clarify funding options
                  quickly — this shouldn&apos;t be a barrier to arranging care on time.
                </p>
              </div>
              <ModalButton
                type="assessment"
                className="page-cta-secondary-inline"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's discharge care"
          subtitle="How our registered nursing oversight made returning home from hospital safe, calm and seamless."
          testimonials={getTestimonials("homeCare.hospitalDischarge")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <AnimateContainer animation="fade-up">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide discharge care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
                Zento provides nurse-led hospital discharge support across Edinburgh and the Lothians from our
                Edinburgh office, and across Perthshire from our Crieff office.
              </p>
              <AnimateContainer animation="stagger" className="flex flex-wrap gap-3 justify-center">
                {locationLinks.map((loc) => (
                  <AnimateItem key={loc.label}>
                    <Link href={loc.href} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {loc.label}
                    </Link>
                  </AnimateItem>
                ))}
              </AnimateContainer>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <AnimateContainer animation="fade-up" className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about hospital discharge care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </AnimateContainer>
              <AnimateContainer animation="stagger" className="space-y-3">
                {faqs.map((faq, i) => (
                  <AnimateItem key={i}>
                    <details className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                        <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">{faq.q}</h3>
                        <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-relaxed text-zinc-600">{faq.a}</p>
                      </div>
                    </details>
                  </AnimateItem>
                ))}
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — RELATED SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Related Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Discharge care often includes...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.title} className="h-full">
                    <Link href={service.href} className="group flex flex-col h-full rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10">
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
                  </AnimateItem>
                );
              })}
            </AnimateContainer>
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
              <AnimateContainer animation="fade-up" className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about discharge care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  If a discharge date is approaching, don&apos;t wait. Our nursing team can start planning
                  today — with no pressure and no obligation.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from our registered nurses.
                </p>
                <div className="page-cta-group-dark">
                  <ModalButton
                    type="assessment"
                    className="page-cta-on-dark-primary"
                  >
                    Book a free assessment <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a key={office.id} href={office.phoneHref} className="page-cta-on-dark-outline">
                      <Phone className="w-4 h-4 shrink-0" />
                      {office.shortName}: {office.phone}
                    </a>
                  ))}
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
