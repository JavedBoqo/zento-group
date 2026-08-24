import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  MapPin,
  Home,
  Moon,
  Clock4,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Live-In Care at Home | Nurse-Led 24/7 Support | Zento",
  description:
    "Live-in care from our nurse-led team across Edinburgh, Lothian and Perthshire. Consistent carers, 24/7 support and genuine clinical oversight. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/live-in-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Live-In Care at Home | Nurse-Led 24/7 Support | Zento",
    description:
      "Live-in care from our nurse-led team across Edinburgh, Lothian and Perthshire. Consistent carers, 24/7 support and genuine clinical oversight.",
    url: "https://zentogroup.co.uk/live-in-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Live-In Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live-In Care at Home | Nurse-Led 24/7 Support | Zento",
    description:
      "Live-in care from our nurse-led team across Edinburgh, Lothian and Perthshire. Consistent carers, 24/7 support and genuine clinical oversight.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const liveInCareServices = [
  {
    name: "Overnight Care",
    href: "/live-in-care/overnight-care",
    desc: "A trained carer present through the night — either a sleep-in carer, available if woken, or a waking-night carer, alert and monitoring throughout.",
    ctaLabel: "Learn more",
    icon: Moon,
  },
  {
    name: "24-Hour Home Care",
    href: "/live-in-care/24-hour-care",
    desc: "A small team of carers working rotating shifts, so someone is always fully awake and alert — day and night, with no gaps.",
    ctaLabel: "Learn more",
    icon: Clock4,
  },
];

const liveInCareSigns = [
  "Increased risk of nighttime falls, restlessness, or wandering around the house.",
  "Complex health conditions requiring frequent monitoring, repositioning, or clinical routines.",
  "Progressive dementia leading to nighttime confusion, anxiety, or safety concerns.",
  "Difficulty managing alone during mornings, mealtimes, and evenings despite visiting care.",
  "Discharge from hospital with high rehabilitation or recovery care needs.",
  "Family members needing peace of mind that a dedicated carer is always present.",
];

const steps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Call us or complete our enquiry form. A conversation about your loved one's situation — no pressure, no commitment.",
  },
  {
    step: "02",
    title: "Nursing Assessment",
    desc: "A registered nurse assesses what's genuinely needed. We look honestly at whether overnight support or full 24-hour care is the right fit.",
  },
  {
    step: "03",
    title: "Carer Match",
    desc: "We match a carer or build a team. Carers are matched for compatibility, not just availability, and briefed thoroughly.",
  },
  {
    step: "04",
    title: "Care Begins",
    desc: "Care begins, with regular nurse review. Support starts on an agreed schedule. Our nursing team reviews the arrangement regularly.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "East Lothian", href: "/locations/lothian/east-lothian" },
  { label: "West Lothian", href: "/locations/lothian/west-lothian" },
  { label: "Crieff", href: "/locations/perthshire/crieff" },
  { label: "Comrie", href: "/locations/perthshire/comrie" },
];

const faqs = [
  {
    q: "How does live-in care work on a day-to-day basis?",
    a: "A dedicated carer resides in a private guest room in your loved one's home. They assist with morning routines, meal preparation, medication prompting, mobility, domestic support, and evening companionship, allowing your relative to maintain complete autonomy.",
  },
  {
    q: "How is live-in care different from a residential care home?",
    a: "Live-in care provides 1-to-1 dedicated attention in familiar home surroundings, tailored solely to your loved one's preferences, without the disruption or routine restrictions of a communal care facility.",
  },
  {
    q: "What facilities does a live-in carer require?",
    a: "A live-in carer requires their own private bedroom with clean bedding, storage for personal belongings, and access to a bathroom and cooking facilities.",
  },
  {
    q: "How does nurse oversight work with live-in care?",
    a: "Our registered nurses conduct initial clinical assessments, formulate detailed care protocols, conduct carer matching, and perform regular supervisory home visits to monitor client health.",
  },
];

const relatedServices = [
  {
    name: "Overnight Care",
    href: "/live-in-care/overnight-care",
    desc: "Sleep-in or waking-night support through the dark hours so your loved one is never unsafe.",
    icon: Moon,
    accent: "primary",
  },
  {
    name: "24-Hour Home Care",
    href: "/live-in-care/24-hour-care",
    desc: "Continuous round-the-clock support delivered by a small rotating team of carers.",
    icon: Clock4,
    accent: "secondary",
  },
  {
    name: "Visiting Home Care",
    href: "/home-care",
    desc: "Flexible, visiting daytime care from personal support to companionship.",
    icon: Home,
    accent: "primary",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function LiveInCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zento Live-In Care Services",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Nurse-Led Live-In Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/live-in-care",
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
                <li>
                  <Link href="/" className="hover:text-primary transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Live-In Care
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
                  Nurse-Led Live-In Care &middot; Edinburgh, Lothian &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Live-In Care at Home —{" "}
                  <span className="text-primary">24/7 Support</span> in Familiar Surroundings
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led live-in care across Edinburgh, Lothian and Perthshire.
                  Every care arrangement is assessed and overseen by a registered nurse, ensuring
                  your loved one receives clinical-standard care in the comfort and dignity of their
                  own home.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>

                {OFFICES.map((office) => (
                  <a
                    key={office.id}
                    href={office.phoneHref}
                    className="page-cta-phone"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    Call {office.shortName}: {office.phone}
                  </a>
                ))}
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — DEFINITION
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Elderly client enjoying happy independent life at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is live-in care?
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                  <p>
                    Live-in care is support that extends into the night, not just through the day — a genuine alternative to moving into a care home. Instead of your loved one relocating to an unfamiliar residential setting, care comes to them, delivered by carers who know their routine, their preferences and their home.
                  </p>
                  <p>
                    It suits people who need more than daytime visits can provide: those with complex or unpredictable needs, higher falls risk, dementia-related night-time confusion, or simply a level of reassurance that comes from knowing someone capable is always close by.
                  </p>
                  <p>
                    Live-in care isn&apos;t one fixed package. It ranges from overnight-only support layered onto daytime visits, through to a full round-the-clock team for the highest-need situations.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SERVICE GRID
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50/50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Choose the Right Type"
              title="Which type of live-in care is right for your family?"
              subtitle="Zento offers two distinct forms of live-in care, and the right one depends on how much support is genuinely needed overnight and beyond."
            />

            <AnimateContainer animation="stagger" className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {liveInCareServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.name} className="h-full">
                    <div
                      className="group relative flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div>
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-secondary leading-snug">
                          {service.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600 mb-6">{service.desc}</p>
                      </div>

                      <div className="border-t border-zinc-100 pt-4">
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors group-hover:text-secondary"
                        >
                          {service.ctaLabel}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>

            <AnimateContainer animation="fade-up" className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-4xl mx-auto">
              <p className="text-sm font-medium text-secondary leading-relaxed">
                Looking for hourly or daytime-only visits instead of live-in support?
              </p>
              <Link
                href="/home-care/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 shrink-0"
              >
                See our visiting home care services <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — SIGNS SECTION (Using SignsSectionGrid)
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Live-In Care Indicators"
          title="Signs your loved one may need 24-hour live-in support"
          subtitle="Recognising when visiting care is no longer sufficient and around-the-clock presence is required."
          signs={liveInCareSigns}
          ctaText="Book a free consultation"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — LIVE-IN CARE VS A CARE HOME (dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <AnimateContainer animation="fade-right" className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  Honest Comparison
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Live-in care vs a care home —{" "}
                  <span className="text-primary">what&apos;s actually different</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Cost is usually the first question families ask, and the honest answer is that live-in care is often more cost-effective than people assume — particularly for couples. Because one carer can support two people living together, live-in care frequently works out considerably cheaper than two separate care home places.
                  </p>
                  <p>
                    Consistency is the other major difference. In a care home, residents are typically supported by a large, frequently rotating staff team across different shifts. Live-in care means one or two familiar carers, matched specifically to your loved one.
                  </p>
                  <p>
                    Our nursing team will always give an honest view — including if live-in care isn&apos;t the right fit — rather than steer every conversation toward a sale.
                  </p>
                </div>

                <blockquote className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 mb-10 backdrop-blur-sm">
                  <div className="absolute -top-3 left-6 text-5xl text-primary leading-none font-black">&ldquo;</div>
                  <p className="pt-4 text-base md:text-lg leading-relaxed italic text-white/90">
                    Our nursing team will always tell you what&apos;s actually right for your family — even if that means live-in care isn&apos;t the answer. Honesty matters more than making a sale.
                  </p>
                  <footer className="mt-4 text-sm font-bold text-primary not-italic">
                    — Our Clinical Lead, Zento Group
                  </footer>
                </blockquote>
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Zento Trusted Caregiver and Client Team"
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
                How to arrange live-in care with Zento
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
            SECTION 7 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's live-in care"
          subtitle="Real experiences from families across Edinburgh, Lothian, and Perthshire whose loved ones thrive with round-the-clock live-in care."
          testimonials={getTestimonials("liveInCare")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide live-in care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-4 max-w-2xl mx-auto">
                Zento provides nurse-led live-in care across Edinburgh and the Lothians from our Edinburgh office, and across Perthshire from our Crieff office.
              </p>
              <p className="text-sm font-semibold text-secondary mb-4">
                Find detailed coverage and local team information for your area:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {locationLinks.map((loc) => (
                  <Link
                    key={loc.label}
                    href={loc.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {loc.label}
                  </Link>
                ))}
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="FAQs"
              title="Frequently asked questions about live-in care"
              faqs={faqs}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — EXPLORE OPTIONS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Explore Options
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Explore our live-in care options
              </h2>
              <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
                Learn more about each type of live-in care, or explore our visiting home care services for daytime-only support.
              </p>
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                const accentBg = service.accent === "primary" ? "bg-primary" : "bg-secondary";
                const accentBgLight = service.accent === "primary" ? "bg-primary/10" : "bg-secondary/10";
                const accentText = service.accent === "primary" ? "text-primary" : "text-secondary";
                const accentShadow = service.accent === "primary" ? "shadow-primary/20" : "shadow-secondary/20";
                const accentBorder = service.accent === "primary" ? "hover:border-primary/30" : "hover:border-secondary/30";
                const accentShadowHover = service.accent === "primary" ? "hover:shadow-primary/10" : "hover:shadow-secondary/10";
                return (
                  <AnimateItem key={service.name} className="h-full">
                    <div
                      className={`group flex h-full flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 ${accentBorder} hover:shadow-2xl ${accentShadowHover}`}
                    >
                      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${accentBgLight} ${accentText} group-hover:${accentBg} group-hover:text-white transition-colors`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-secondary mb-3">{service.name}</h3>
                      <p className="text-sm leading-relaxed text-zinc-600 mb-6 flex-1">
                        {service.desc}
                      </p>
                      <Link
                        href={service.href}
                        className={`mt-auto flex items-center justify-center gap-2 rounded-full ${accentBg} px-7 py-3 text-sm font-bold text-white shadow-md ${accentShadow} transition-all hover:opacity-90`}
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FinalCTASection
              title="Speak to our team about live-in care"
              subtitle="Whether you need overnight support or full round-the-clock care, our nursing team can help you find the right fit — with no pressure and no obligation."
              tagline="No pressure. No obligation. Honest advice from our registered nurses."
              phone={OFFICES[0]?.phone}
              ctaText="Book a free assessment"
              ctaType="assessment"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
