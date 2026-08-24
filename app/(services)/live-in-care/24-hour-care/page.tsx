import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  Brain,
  Clock4,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Users,
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
  title: "24-Hour Home Care | Round-the-Clock Support | Zento",
  description:
    "Continuous round-the-clock care at home in Edinburgh and across Scotland. Our nurse-led 24-hour service is the compassionate alternative to a care home.",
  alternates: {
    canonical: "https://zentogroup.co.uk/live-in-care/24-hour-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "24-Hour Home Care | Round-the-Clock Support | Zento",
    description:
      "Continuous round-the-clock care at home in Edinburgh and across Scotland. Our nurse-led 24-hour service is the compassionate alternative to a care home.",
    url: "https://zentogroup.co.uk/live-in-care/24-hour-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento 24-Hour Home Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "24-Hour Home Care | Round-the-Clock Support | Zento",
    description:
      "Continuous round-the-clock care at home in Edinburgh, Lothian & Perthshire.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "Their medical needs require monitoring or intervention at unpredictable times, day or night",
  "A single live-in carer's scheduled rest periods would leave a genuine gap in support",
  "They have a condition — advanced dementia, complex physical needs, post-surgical recovery — where waiting for a carer to wake could be unsafe",
  "They're currently in a care home but the family would prefer them to remain at home if safely possible",
  "A hospital discharge team has recommended intensive, continuous support during recovery",
  "Family have been managing round-the-clock care themselves and have reached the point of exhaustion",
  "Frequent falls, wandering or medical events mean genuinely active — not just present — supervision is needed",
  "You want the reassurance of knowing someone is always properly awake, not just available if woken",
];

const included = [
  "A small, coordinated team of carers working rotating shifts, so someone is always fully alert",
  "Seamless handovers between shifts, with nothing missed and no gaps in continuity",
  "Personal care, medication management and mobility support available at any hour",
  "Active monitoring for clients with complex, fluctuating or higher-intensity needs",
  "A nurse-written care plan, reviewed regularly as circumstances change",
  "Meal preparation, companionship and daily activities woven around the clinical support",
  "Direct communication with family, so you're never left wondering how things are going",
  "No need for a spare bedroom — unlike live-in care, carers rotate rather than reside permanently",
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "A conversation about your loved one's needs — no pressure, no commitment.",
  },
  {
    step: "02",
    title: "A registered nurse assesses the level of care genuinely needed",
    desc: "We look honestly at whether 24-hour care or live-in care is the right fit, based on the actual clinical picture, not assumption.",
  },
  {
    step: "03",
    title: "We build the care plan and assemble the team",
    desc: "A small, consistent team of carers is matched and briefed, with shift handovers built into the care plan from the start.",
  },
  {
    step: "04",
    title: "Care begins, with regular nurse review",
    desc: "Round-the-clock support starts on an agreed schedule. Our nursing team reviews the plan as needs evolve.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "Perthshire", href: "/locations/perthshire" },
];

const faqs = [
  {
    q: "What is the difference between 24-hour care and live-in care?",
    a: "Live-in care involves a single carer who lives in the home, typically with scheduled rest periods and the ability to sleep at night. 24-hour care involves a small team of carers working rotating shifts, so someone is always fully awake and alert, day and night, with no gaps. 24-hour care suits people with more complex or unpredictable needs; live-in care suits people who need consistent daily support without constant overnight monitoring.",
  },
  {
    q: "Is 24-hour care more expensive than live-in care?",
    a: "Yes, generally. 24-hour care involves multiple carers working shifts rather than one carer with rest periods, which increases the cost. The right choice isn't just about cost, though — it's about whether the level of support genuinely matches your loved one's needs. Our nursing team can help you understand honestly which option is appropriate before cost becomes the deciding factor.",
  },
  {
    q: "Do I need a spare bedroom for 24-hour care?",
    a: "No. Unlike live-in care, where a carer resides in the home and needs their own room, 24-hour care is delivered by carers who work shifts and don't stay overnight between them. This makes it a practical option for smaller homes where an extra bedroom isn't available.",
  },
  {
    q: "Is 24-hour home care a genuine alternative to a care home?",
    a: "For many people, yes. 24-hour home care provides the same continuous level of support as a care home — someone always present and alert — while allowing your loved one to remain in their own home, with consistent carers rather than a rotating institutional staff. Whether it's the right choice depends on individual circumstances, and our nursing team can talk through this honestly with you.",
  },
  {
    q: "Can 24-hour care be provided by the same small team of carers?",
    a: "Yes. While 24-hour care involves multiple carers by necessity — to ensure someone is always properly rested and alert — we aim to use a small, consistent team rather than a large rotating pool, so your loved one still benefits from familiar faces and continuity of care.",
  },
  {
    q: "What funding is available for 24-hour care in Scotland?",
    a: "Several routes may apply. Scotland's Free Personal Care scheme can support personal care elements for eligible over-65s, and council-funded assessments or Self-Directed Support may also contribute. For the highest-complexity clinical needs, NHS Continuing Care — administered by local Health Boards such as NHS Lothian or NHS Tayside — may fund some or all of the cost where strict eligibility criteria are met. Our team can help clarify what applies to your specific situation.",
  },
];

const relatedServices = [
  {
    title: "Live-In Care",
    href: "/live-in-care",
    desc: "A single, consistent carer for daily support and companionship, with scheduled overnight rest.",
    icon: Heart,
  },
  {
    title: "Overnight Care at Home",
    href: "/live-in-care/overnight-care",
    desc: "Sleep-in or waking-night support alone, without full daytime coverage.",
    icon: Clock4,
  },
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care",
    desc: "Consistent, nurse-led routines — often combined with 24-hour support for advanced needs.",
    icon: Brain,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function TwentyFourHourCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "24-Hour Home Care",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "24-Hour Home Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/live-in-care/24-hour-care",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Care - 24-Hour Home Support",
    url: "https://zentogroup.co.uk/live-in-care/24-hour-care",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led continuous 24-hour care at home.",
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
      { "@type": "ListItem", position: 3, name: "24-Hour Home Care", item: "https://zentogroup.co.uk/live-in-care/24-hour-care" },
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
                    24-Hour Home Care
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* SECTION 1 — HERO */}
        <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 md:pt-12 md:pb-18 lg:pt-14 lg:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <AnimateContainer animation="fade-up" className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  24-Hour Care &middot; Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  24-Hour Home Care &mdash;{" "}
                  <span className="text-primary">Round-the-Clock Support in Your Own Home</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  24-hour home care means your loved one is never without a fully alert, trained carer &mdash; day or
                  night, without exception. Delivered by a small rotating team rather than a single live-in carer,
                  it&apos;s the level of continuous support that makes staying at home a genuine, safe alternative to a
                  care home, even for complex or higher medical needs.
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

        {/* SECTION 2 — WHAT IS 24-HOUR HOME CARE? */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Carer providing round-the-clock 24-hour care and support at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is 24-hour home care?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    24-hour home care is continuous, round-the-clock support delivered by a small team of carers working
                    in rotating shifts &mdash; so there is always a fully awake, alert carer present, throughout the day
                    and through the night, with no gaps.
                  </p>
                  <p>
                    This is a genuinely different service from live-in care, and the two are often confused.{" "}
                    <strong className="text-secondary font-bold">Live-in care</strong> involves a single carer who lives
                    in the home, typically with scheduled rest periods and the ability to sleep at night, waking only if
                    needed. <strong className="text-secondary font-bold">24-hour care</strong> replaces that single carer
                    with a small, coordinated team &mdash; usually two or three carers working shifts of eight to twelve
                    hours &mdash; so someone is always fully alert, never resting, never off-duty. It&apos;s the
                    difference between a carer who&apos;s present through the night and one who&apos;s actively awake
                    and monitoring throughout it.
                  </p>
                  <p>
                    That distinction matters clinically. 24-hour care suits people with more complex, unpredictable or
                    higher-intensity needs &mdash; where waiting even briefly for a carer to wake and respond isn&apos;t
                    acceptable. A registered nurse can help determine which is genuinely appropriate &mdash; this
                    shouldn&apos;t be decided by guesswork or by which sounds more reassuring.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SIGNS */}
        <SignsSectionGrid
          category="Signs to Look For"
          title="Signs your loved one may need 24-hour home care"
          subtitle="Continuous supervision protects dignity and health when round-the-clock clinical risks are present. Our registered nurses assess each situation thoroughly."
          signs={signs}
          ctaText="Speak to our team"
          ctaType="assessment"
        />

        {/* SECTION 4 — WHAT'S INCLUDED */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Provide
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                What our 24-hour care service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <AnimateItem key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                Every 24-hour care plan is designed around the individual&apos;s actual clinical picture, not a fixed package applied regardless of need.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — NURSE-LED DIFFERENCE */}
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
                  Why nurse-led 24-hour care <span className="text-primary">matters</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Getting the choice right between live-in care and 24-hour care isn&apos;t a preference &mdash;
                    it&apos;s a clinical judgement with real consequences either way. Choose live-in care for someone
                    who genuinely needs active overnight monitoring, and there&apos;s a real gap in safety. Choose
                    24-hour care for someone who doesn&apos;t need it, and you&apos;re likely paying considerably more
                    than necessary.
                  </p>
                  <p>
                    At Zento, a registered nurse assesses the actual clinical picture &mdash; the frequency and
                    unpredictability of needs, falls history, medical complexity &mdash; before recommending 24-hour
                    care over live-in care, or vice versa. And once a 24-hour arrangement is in place, our nursing team
                    reviews it regularly, because needs that justify constant active support today may ease with time,
                    just as needs that start manageable can intensify.
                  </p>
                </div>
              </AnimateContainer>
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Registered nurse reviewing 24-hour care plan and clinical protocol"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOW IT WORKS */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange 24-hour care with Zento
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

        {/* SECTION 7 — COSTS AND FUNDING */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Funding &amp; Cost
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                How much does 24-hour home care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  24-hour care costs more than live-in care, because it involves multiple carers working shifts rather
                  than a single carer with rest periods. Cost depends on the level of complexity and the number of
                  carers required.
                </p>
                <p>
                  Several funding routes may apply, depending on circumstances. Scotland&apos;s Free Personal Care
                  scheme can support the personal care elements for eligible over-65s. Council-funded assessments and
                  Self-Directed Support may also contribute. For the highest-complexity clinical needs, NHS Continuing
                  Care &mdash; administered through local Health Boards such as NHS Lothian or NHS Tayside, and distinct
                  from the England-specific NHS Continuing Healthcare scheme &mdash; may fund some or all of the cost
                  where eligibility criteria are met. Our team can help you understand which routes might apply to your
                  situation.
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

        {/* SECTION 8 — TESTIMONIALS */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's 24-hour care"
          subtitle="How our continuous rotational care gave families comfort knowing their loved one was never left unattended."
          testimonials={getTestimonials("liveInCare.twentyFourHourCare")}
        />

        {/* SECTION 9 — COVERAGE AREA */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <AnimateContainer animation="fade-up">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide 24-hour care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
                Zento provides nurse-led 24-hour care across Edinburgh and the Lothians from our Edinburgh office,
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

        {/* SECTION 10 — FAQ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <AnimateContainer animation="fade-up" className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about 24-hour home care
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

        {/* SECTION 11 — RELATED SERVICES */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Related Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Families exploring 24-hour care also consider...
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

        {/* SECTION 12 — FINAL CTA */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <AnimateContainer animation="fade-up" className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about 24-hour care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  If you&apos;re weighing up live-in care against full 24-hour support, let&apos;s talk it through
                  properly &mdash; with an honest clinical assessment, not a sales pitch.
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
              </AnimateContainer>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
