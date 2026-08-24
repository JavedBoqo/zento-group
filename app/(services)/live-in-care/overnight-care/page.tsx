import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Brain,
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
  title: "Overnight Care at Home | Nurse-Led Support | Zento",
  description:
    "Sleep-in and waking-night care from trained carers in Edinburgh and Lothian. Nurse-led oversight ensures your loved one is safe and supported through the night.",
  alternates: {
    canonical: "https://zentogroup.co.uk/live-in-care/overnight-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Overnight Care at Home | Nurse-Led Support | Zento",
    description:
      "Sleep-in and waking-night care from trained carers in Edinburgh and Lothian. Nurse-led oversight ensures your loved one is safe and supported through the night.",
    url: "https://zentogroup.co.uk/live-in-care/overnight-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Overnight Care at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overnight Care at Home | Nurse-Led Support | Zento",
    description:
      "Sleep-in and waking-night care from trained carers in Edinburgh, Lothian & Perthshire.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "They've had a fall or near-fall during the night, or you're worried one is likely",
  "They wake frequently and become confused, distressed or disorientated — common in dementia",
  "They need medication, repositioning or personal care assistance during the night",
  "They live alone and you worry about what would happen if something went wrong overnight",
  "They're recovering from surgery or a hospital stay and need closer monitoring for a period",
  "A family carer has been managing broken nights themselves and is reaching exhaustion",
  "They've expressed anxiety about being alone after dark, even without a specific incident",
  "A GP, discharge team or social worker has recommended overnight support",
];

const included = [
  "A nursing assessment to determine whether sleep-in or waking night care is genuinely appropriate",
  "A trained carer present in the home for the full agreed overnight period",
  "Support with toileting, repositioning and personal care as needed through the night",
  "Medication administration at night-specific times, following a nurse-written protocol",
  "Close monitoring for clients with dementia, falls risk or post-surgical recovery needs",
  "A calm, reassuring presence that helps reduce night-time anxiety and confusion",
  "Handover to daytime care or family, with any concerns from the night clearly communicated",
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "A conversation about what's happening overnight and what's worrying you — no pressure, no commitment.",
  },
  {
    step: "02",
    title: "A registered nurse assesses overnight risk",
    desc: "We look at falls history, medication needs, cognitive state and mobility to determine whether sleep-in or waking night care is right.",
  },
  {
    step: "03",
    title: "We write the plan and match a carer",
    desc: "A nurse-written overnight protocol is prepared, and a carer suited to your loved one's specific needs is matched.",
  },
  {
    step: "04",
    title: "Overnight care begins",
    desc: "Support starts on the agreed schedule, with regular review as needs change.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "Perthshire", href: "/locations/perthshire" },
];

const faqs = [
  {
    q: "What is the difference between sleep-in and waking night care?",
    a: "A sleep-in carer sleeps in the home, usually in a separate room, and is available to be woken if needed — typically up to around twice a night. A waking night carer stays awake and actively monitors throughout the night, suited to clients who need frequent assistance. At Zento, a registered nurse assesses which type is genuinely appropriate based on the client's specific needs, rather than leaving this to guesswork.",
  },
  {
    q: "How do I know if my loved one needs sleep-in or waking night care?",
    a: "This depends on how much support is likely to be needed during the night — how often they wake, whether they need repositioning or medication overnight, and any falls or confusion risk. A nursing assessment is the most reliable way to determine this accurately, since getting it wrong can mean either inadequate support or unnecessary cost.",
  },
  {
    q: "How many times can a sleep-in carer be expected to help overnight?",
    a: "Sleep-in care is generally suited to clients who need occasional support — typically up to around twice a night. If your loved one needs more frequent assistance than this, waking night care, where the carer remains alert throughout, is usually the more appropriate and safer option.",
  },
  {
    q: "Is overnight care more expensive than daytime visits?",
    a: "Overnight care is typically priced per night rather than by the hour, and waking night care costs more than sleep-in care due to the higher level of active support involved. Our team can give you a clear breakdown of costs based on which type of overnight care is right for your situation.",
  },
  {
    q: "Can overnight care be combined with daytime home care visits?",
    a: "Yes. Many clients have daytime visits for personal care, medication or companionship, with overnight care added for night-time support and safety. This combination is common for clients recovering from a hospital stay, living with dementia, or managing a condition with higher falls risk.",
  },
  {
    q: "Is overnight care suitable for someone with dementia?",
    a: "Yes, and it's one of the most common reasons families arrange it. Night-time waking, confusion and wandering are common in dementia, and a waking night carer provides continuous, reassuring support through what can otherwise be a distressing and unsafe time of day for both the client and their family.",
  },
];

const relatedServices = [
  {
    title: "24-Hour Home Care",
    href: "/live-in-care/24-hour-care",
    desc: "For clients needing continuous round-the-clock support, not just overnight.",
    icon: Clock4,
  },
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care",
    desc: "Consistent, nurse-led routines that extend into overnight support for dementia clients.",
    icon: Brain,
  },
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care",
    desc: "Daytime personal care that pairs naturally with overnight support.",
    icon: Heart,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function OvernightCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Overnight Care at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Overnight Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/live-in-care/overnight-care",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Care - Overnight Support",
    url: "https://zentogroup.co.uk/live-in-care/overnight-care",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led sleep-in and waking-night care at home.",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk" },
      { "@type": "ListItem", position: 2, name: "Live-In Care", item: "https://zentogroup.co.uk/live-in-care" },
      { "@type": "ListItem", position: 3, name: "Overnight Care at Home", item: "https://zentogroup.co.uk/live-in-care/overnight-care" },
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
                  <Link href="/live-in-care" className="hover:text-primary transition-colors font-medium">
                    Live-In Care
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Overnight Care at Home
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
            <AnimateContainer animation="fade-up" className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Overnight Care · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Overnight Care at Home —{" "}
                  <span className="text-primary">Sleep-In &amp; Waking Night Support</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Not all risk happens during the day. Overnight care puts a trained carer in your loved one&apos;s home
                  through the night — either a sleep-in carer, available if needed, or a waking-night carer, actively
                  monitoring throughout — with the right choice determined by a nurse, not a guess.
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
                <a
                  href={OFFICES[1]?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Crieff: {OFFICES[1]?.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS OVERNIGHT CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Carer providing overnight care and night-time reassurance at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is overnight care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Overnight care means a trained carer is present in your loved one&apos;s home through the night,
                    providing support if something happens rather than leaving them alone until morning. There are two
                    distinct types, and the difference between them matters.
                  </p>
                  <p>
                    <strong className="text-secondary font-bold">Sleep-in care</strong> — the carer sleeps in the home,
                    typically in a separate room, but is available to be woken if needed — usually up to around twice a night.
                    Suitable for clients who are generally settled overnight but need someone present in case of a fall,
                    confusion or an unexpected need.
                  </p>
                  <p>
                    <strong className="text-secondary font-bold">Waking night care</strong> — the carer stays awake and alert
                    throughout the night, actively monitoring and providing support as required. This suits clients who need
                    frequent assistance overnight — regular repositioning, night-time medication, or conditions like
                    advanced dementia where waking and confusion are common through the night.
                  </p>
                  <p>
                    Choosing the wrong type isn&apos;t just a cost issue — it&apos;s a safety issue. A client who genuinely
                    needs waking support shouldn&apos;t be left with a sleep-in carer who may not wake in time. A registered
                    nurse assesses which type of overnight care is actually appropriate during the initial visit, rather
                    than leaving the choice to guesswork or a generic recommendation.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOUR LOVED ONE MAY NEED OVERNIGHT CARE
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Signs to Look For"
          title="Signs your loved one may need overnight care"
          subtitle="Night-time disorientation, fall hazards and missed medications can make the hours between dusk and dawn the most dangerous. Our overnight nursing-led care provides reassurance."
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
                What our overnight care service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <AnimateItem key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Clock4 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                Every overnight care plan is built around the specific risks and needs identified at assessment — not a standard package applied regardless of circumstances.
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
                  Why nurse-led overnight care <span className="text-primary">matters</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Deciding between sleep-in and waking night care is a clinical judgement, not a preference. Get it
                    wrong, and a client who needs active monitoring is left with a carer who may not wake in time — or a
                    family pays for waking night support that genuinely isn&apos;t needed. Neither outcome serves anyone
                    well.
                  </p>
                  <p>
                    At Zento, a registered nurse makes this assessment based on your loved one&apos;s actual risk profile —
                    falls history, medication timing, cognitive state, mobility — not a generic recommendation. And because
                    the plan is nurse-written, it&apos;s reviewed and updated if the situation changes, rather than left
                    to run on autopilot indefinitely.
                  </p>
                </div>
              </AnimateContainer>
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Registered nurse reviewing overnight risk profile and care protocol"
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
                How to arrange overnight care with Zento
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
                How much does overnight care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Overnight care is typically priced per night, with sleep-in care costing less than waking night care
                  due to the difference in the level of active support provided.
                </p>
                <p>
                  Scotland&apos;s Free Personal Care scheme may apply to the personal care elements of overnight support
                  for eligible over-65s. For clients transitioning from hospital, some overnight support may also be
                  available through short-term NHS or council-funded reablement care. Our team can help clarify what
                  applies to your situation.
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
          title="What families say about Zento's overnight care"
          subtitle="Real stories from families across Edinburgh and Scotland who found safety through the night and true peace of mind."
          testimonials={getTestimonials("liveInCare.overnightCare")}
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
                Where we provide overnight care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
                Zento provides nurse-led overnight care across Edinburgh and the Lothians from our Edinburgh office,
                and across Perthshire from our Crieff office.
              </p>
              <AnimateContainer animation="stagger" className="flex flex-wrap gap-3 justify-center">
                {locationLinks.map((loc) => (
                  <AnimateItem key={loc.label}>
                    <Link
                      href={loc.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                    >
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
                  Frequently asked questions about overnight care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </AnimateContainer>
              <AnimateContainer animation="stagger" className="space-y-3">
                {faqs.map((faq, i) => (
                  <AnimateItem key={i}>
                    <details
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
                Overnight care often includes...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.title} className="h-full">
                    <Link
                      href={service.href}
                      className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10 h-full"
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
              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about overnight care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  If nights have become a worry, let&apos;s talk it through properly — with a nursing assessment to get
                  the right answer, not a guess.
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
                    <a
                      key={office.id}
                      href={office.phoneHref}
                      className="page-cta-on-dark-outline"
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
