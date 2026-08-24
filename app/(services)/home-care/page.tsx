import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Brain,
  Users,
  Utensils,
  Building2,
  Sun,
  Home,
  CheckCircle2,
  MapPin,
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
import { OFFICES, CONTACT_NUMBER } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Home Care Services | Nurse-Led Care at Home | Zento",
  description:
    "Nurse-led home care services across Edinburgh, Lothian and Perthshire. Personal care, dementia support, respite and more — all overseen by registered nurses. Call us today.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care Services | Nurse-Led Care at Home | Zento",
    description:
      "Nurse-led home care services across Edinburgh, Lothian and Perthshire. Personal care, dementia support, respite and more — all overseen by registered nurses.",
    url: "https://zentogroup.co.uk/home-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Home Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care Services | Nurse-Led Care at Home | Zento",
    description:
      "Nurse-led home care services across Edinburgh, Lothian and Perthshire. All care overseen by registered nurses.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const homeCareServices = [
  {
    name: "Personal Care",
    href: "/home-care/personal-care",
    desc: "Support with bathing, dressing, continence, mobility and personal hygiene, delivered with patience and dignity.",
    ctaLabel: "Learn more",
    icon: Heart,
  },
  {
    name: "Medication Support",
    href: "/home-care/medication-support",
    desc: "Prompting, administering and monitoring medication under the oversight of a registered nurse.",
    ctaLabel: "Learn more",
    icon: ShieldCheck,
  },
  {
    name: "Companionship",
    href: "/home-care/companionship",
    desc: "Regular social visits to reduce isolation, maintain routines and enjoy meaningful conversation and activities.",
    ctaLabel: "Learn more",
    icon: Users,
  },
  {
    name: "Meal Preparation",
    href: "/home-care/meal-preparation",
    desc: "Nutritious meals planned around dietary needs and personal preferences, prepared in the client's own kitchen.",
    ctaLabel: "Learn more",
    icon: Utensils,
  },
  {
    name: "Hospital Discharge Support",
    href: "/home-care/hospital-discharge",
    desc: "Short-term intensive care to help your loved one settle back home safely after a hospital stay.",
    ctaLabel: "Learn more",
    icon: Building2,
  },
  {
    name: "Dementia Care",
    href: "/home-care/dementia-care",
    desc: "Consistent carers and familiar routines to support people living with dementia at every stage.",
    ctaLabel: "Learn more",
    icon: Brain,
  },
  {
    name: "Respite Care",
    href: "/home-care/respite-care",
    desc: "Planned or emergency cover so family carers can take a genuine break, knowing their loved one is safe.",
    ctaLabel: "Learn more",
    icon: Sun,
  },
];

const homeCareSigns = [
  "Difficulty maintaining personal hygiene, bathing, washing, or dressing safely.",
  "Forgetfulness or confusion around prescribed medications and dosage times.",
  "Reduced mobility, unsteadiness, or fear of falls when moving around the house.",
  "Unopened post, unattended household chores, or a fridge lacking fresh nutrition.",
  "Noticeable changes in mood, disorientation, or symptoms of cognitive decline.",
  "Family caregivers feeling overwhelmed or exhausted trying to balance daily demands.",
];

const steps = [
  {
    step: "01",
    title: "Call us",
    desc: "A confidential discussion with our friendly team about your loved one's situation and care needs.",
  },
  {
    step: "02",
    title: "Nurse assessment",
    desc: "Our nurse visits your loved one at home to evaluate physical, cognitive, and clinical care needs.",
  },
  {
    step: "03",
    title: "Tailored care plan",
    desc: "We write a tailored care plan and match carers carefully chosen for personality and skillset.",
  },
  {
    step: "04",
    title: "Care begins",
    desc: "Care starts smoothly on your timeline, with ongoing nurse monitoring and regular care reviews.",
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
    q: "What is the difference between home care and live-in care?",
    a: "Visiting home care involves scheduled calls — from 30 minutes to several hours — where a carer visits your home to assist with specific tasks. Live-in care provides a dedicated carer who resides in your loved one's home for continuous support.",
  },
  {
    q: "How does nurse oversight work for daily home care?",
    a: "Every care plan is written and reviewed by a registered nurse. Our nurses regularly check in, assess changing clinical needs, communicate with GPs and district nurses, and guide our care team on best practices.",
  },
  {
    q: "Can home care visits be adjusted as needs change?",
    a: "Yes. Home care is completely flexible. If you need additional visits, temporary night support, or adjustments to visit times, our team can quickly adapt your care plan.",
  },
  {
    q: "Are your carers trained for dementia support?",
    a: "Yes. All our carers undergo extensive training in dementia awareness, communication strategies, and positive behavioral support, all overseen by registered mental health and general nurses.",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function HomeCareHubPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zento Home Care Services",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Nurse-Led Home Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care",
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
      { "@type": "ListItem", position: 2, name: "Home Care", item: "https://zentogroup.co.uk/home-care" },
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
                    Home Care
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
                  Nurse-Led Care &middot; Edinburgh, Lothian &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Our Home Care Services —{" "}
                  <span className="text-primary">Personal, Visiting</span> and Daily Living Care
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care services for older adults across Edinburgh,
                  Lothian and Perthshire. Every care plan is written by a registered nurse, not a
                  coordinator, and every visit is backed by clinical oversight that most care
                  agencies simply do not offer.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Arrange a free consultation <ArrowRight className="w-5 h-5" />
                </ModalButton>

                <a
                  href={OFFICES[0]?.phoneHref || `tel:${CONTACT_NUMBER.replace(/\s+/g, "")}`}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Now: {CONTACT_NUMBER}
                </a>
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
                  What are home care services?
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                  <p>
                    Home care services are professional care and support delivered in a person&apos;s
                    own home, allowing older adults to remain independent in familiar surroundings
                    rather than moving into a residential or nursing home.
                  </p>
                  <p>
                    Home care can range from a single weekly visit to multiple daily calls, or even
                    round-the-clock live-in support. In Scotland, eligible adults aged 65 and over can
                    access Free Personal Care, which covers the cost of personal care at home regardless
                    of income.
                  </p>
                  <p>
                    At Zento, every care plan is developed and regularly reviewed by a registered
                    nurse — a standard of clinical oversight that goes beyond what most domiciliary care
                    agencies provide.
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
              badge="Our Services"
              title="Home care services we provide"
              subtitle="We offer a full range of visiting home care services, each planned by our nursing team and delivered by trained carers who know your family."
            />

            <AnimateContainer animation="stagger" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {homeCareServices.map((service) => {
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

            <AnimateContainer animation="fade-up" className="mt-10 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-secondary leading-relaxed">
                Looking for overnight or 24-hour support?
              </p>
              <Link
                href="/live-in-care/"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:scale-105 shrink-0"
              >
                See our live-in care services <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — SIGNS SECTION (Using SignsSectionGrid)
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Home Care Need Indicators"
          title="Signs your loved one may benefit from home care"
          subtitle="Knowing when extra support is needed can make a profound difference to safety and wellbeing at home."
          signs={homeCareSigns}
          ctaText="Book a free consultation"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — NURSE-LED DIFFERENTIATOR (dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <AnimateContainer animation="fade-right" className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why nurse-led home care{" "}
                  <span className="text-primary">makes a difference</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Most home care agencies use coordinators or managers with no clinical background
                    to plan and review care. At Zento, that role is filled by registered nurses.
                  </p>
                  <p>
                    This means the person writing your loved one&apos;s care plan has the clinical
                    knowledge to spot early warning signs, adjust medication routines safely, manage
                    complex health conditions and liaise directly with GPs and hospital teams.
                  </p>
                  <p>
                    Every care package at Zento is assessed, planned and regularly reviewed by our
                    nursing team. We are registered with the Care Inspectorate.
                  </p>
                </div>

                <blockquote className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 mb-10 backdrop-blur-sm">
                  <div className="absolute -top-3 left-6 text-5xl text-primary leading-none font-black">&ldquo;</div>
                  <p className="pt-4 text-base md:text-lg leading-relaxed italic text-white/90">
                    I became a nurse because I believe everyone deserves clinical-quality care — not
                    just in a hospital ward, but at home, where it matters most. That is what we
                    deliver at Zento every single day.
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
                How to get started with home care
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
          title="What families say about Zento's home care"
          subtitle="Real stories from families across Edinburgh, Lothian, and Perthshire who trust our nurse-led care."
          testimonials={getTestimonials("homeCare")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide home care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-4 max-w-2xl mx-auto">
                Zento delivers home care services from two offices. Our Edinburgh team covers all
                City of Edinburgh postcodes (EH1–EH17), plus Midlothian, East Lothian and West
                Lothian. Our Crieff team serves Crieff, Comrie, Muthill, Braco and the surrounding
                Perthshire villages.
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
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="FAQs"
              title="Frequently asked questions about home care services"
              faqs={faqs}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FinalCTASection
              title="Speak to our nursing team today"
              subtitle="Finding the right care for someone you love is rarely straightforward. Our nursing team is here to listen, answer your questions and give you an honest picture of what support is possible."
              tagline="No pressure. No obligation. Honest advice from registered nurses."
              phone={OFFICES[0]?.phone}
              ctaText="Book a free consultation"
              ctaType="assessment"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
