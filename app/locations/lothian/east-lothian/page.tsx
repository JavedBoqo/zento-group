import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Brain,
  Home,
  CheckCircle2,
  Clock4,
  Building2,
  Utensils,
  Users,
  Sun,
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

export const metadata: Metadata = {
  title: "Home Care in East Lothian | Nurse-Led | Zento",
  description:
    "Home care visits across East Lothian — Musselburgh, Haddington, North Berwick, Tranent and Dunbar. Nurse-led team based in Edinburgh. Free initial consultation.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/lothian/east-lothian",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care in East Lothian | Nurse-Led | Zento",
    description:
      "Home care visits across East Lothian — Musselburgh, Haddington, North Berwick, Tranent and Dunbar. Nurse-led team based in Edinburgh. Free initial consultation.",
    url: "https://zentogroup.co.uk/locations/lothian/east-lothian",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Nurse-Led Home Care in East Lothian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care in East Lothian | Nurse-Led | Zento",
    description:
      "Home care visits across East Lothian — Musselburgh, Haddington, North Berwick, Tranent and Dunbar.",
    images: ["/brand-image.png"],
  },
};

const edinburghOffice = OFFICES[0];

const eastLothianTowns = [
  "Musselburgh",
  "Haddington",
  "North Berwick",
  "Dunbar",
  "Tranent",
  "Prestonpans",
  "Gullane",
  "East Linton",
];

const eastLothianServices = [
  {
    name: "Personal Care",
    desc: "Bathing, dressing & daily mobility support",
    href: "/home-care/personal-care",
    icon: Heart,
  },
  {
    name: "Medication Support",
    desc: "Nurse-monitored administration & management",
    href: "/home-care/medication-support",
    icon: ShieldCheck,
  },
  {
    name: "Companionship",
    desc: "Social engagement & community activities",
    href: "/home-care/companionship",
    icon: Users,
  },
  {
    name: "Meal Preparation",
    desc: "Nutritional support & home cooked meals",
    href: "/home-care/meal-preparation",
    icon: Utensils,
  },
  {
    name: "Hospital Discharge Support",
    desc: "Seamless, safe transition back home",
    href: "/home-care/hospital-discharge",
    icon: Building2,
  },
  {
    name: "Dementia Care",
    desc: "Structured, familiar daily routines",
    href: "/home-care/dementia-care",
    icon: Brain,
  },
  {
    name: "Respite Care",
    desc: "Short-term relief for family carers",
    href: "/home-care/respite-care",
    icon: Sun,
  },
  {
    name: "Overnight Care",
    desc: "Sleep-in or waking-night support",
    href: "/live-in-care/overnight-care",
    icon: Clock4,
  },
  {
    name: "24-Hour Live-In Care",
    desc: "Continuous round-the-clock home care",
    href: "/live-in-care/24-hour-care",
    icon: Home,
  },
];

const eastLothianSigns = [
  "Difficulty managing coastal or multi-level East Lothian homes — Unsteadiness on stairs or navigating thresholds.",
  "Medication errors, forgotten doses, or struggle with blister pack organisation.",
  "Weight loss or irregular meals — Difficulty shopping locally or preparing nutritious food.",
  "Struggling with dressing, personal grooming, or maintaining hygiene independently.",
  "Memory lapses, evening disorientation, or confusion around familiar surroundings.",
  "Family members feeling stretched balancing work and caring responsibilities.",
];

const eastLothianSteps = [
  {
    step: "01",
    title: "Call us",
    desc: "A quick, honest conversation about what you need. No pressure, no commitment.",
  },
  {
    step: "02",
    title: "A nurse visits your loved one at home",
    desc: "We arrange a proper assessment, in person, wherever you are in East Lothian.",
  },
  {
    step: "03",
    title: "Care begins",
    desc: "A care plan is written and a carer matched. Support starts on your agreed schedule.",
  },
];

const eastLothianFaqs = [
  {
    q: "How quickly can home care begin in East Lothian?",
    a: "In most cases, we can complete a nurse assessment within a few days of your initial call. For urgent situations — including hospital discharge — we aim to arrange care within 24 to 48 hours.",
  },
  {
    q: "Which East Lothian towns does Zento cover?",
    a: "We cover all of East Lothian including Musselburgh, Haddington, North Berwick, Dunbar, Tranent, Prestonpans, Gullane and East Linton. If you're unsure whether we cover your specific address, call us on 0131 210 0095.",
  },
  {
    q: "Is nurse oversight included for all East Lothian clients?",
    a: "Yes. Every care package in East Lothian is assessed, written and reviewed by a registered nurse. Clinical oversight is a standard part of our service, not an optional extra.",
  },
  {
    q: "Can you provide live-in care in East Lothian?",
    a: "Yes. We offer dedicated 24-hour live-in care across East Lothian, personally matched and clinically supervised by our nursing team.",
  },
];

export default function EastLothianLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/lothian/east-lothian#east-lothian-service",
    name: "Zento Group — East Lothian Home Care",
    telephone: "0131 210 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/lothian/east-lothian",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Adit Place",
      addressLocality: "Edinburgh",
      postalCode: "EH17",
      addressCountry: "GB",
    },
    areaServed: "East Lothian",
    serviceType: "Nurse-Led Home Care",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    identifier: "CS2026000326",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eastLothianFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
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
        item: "https://zentogroup.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://zentogroup.co.uk/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Lothian",
        item: "https://zentogroup.co.uk/locations/lothian",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "East Lothian",
        item: "https://zentogroup.co.uk/locations/lothian/east-lothian",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        {/* BREADCRUMB */}
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
                    href="/locations"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    Locations
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <Link
                    href="/locations/lothian"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    Lothian
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
                    East Lothian
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
                  Nurse-Led Home Care &middot; East Lothian
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Home Care in East Lothian &mdash;{" "}
                  <span className="text-primary">
                    Musselburgh, Haddington, North Berwick &amp; More
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care across East Lothian from our
                  Edinburgh office. Whether your family is in Musselburgh,
                  Haddington, North Berwick or one of the coastal or rural
                  communities in between, care is planned by a registered nurse
                  and delivered by a carer your loved one can rely on seeing
                  again.
                </p>
              </div>


              <div className="page-cta-group pt-2">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a
                  href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" /> Call us:{" "}
                  {edinburghOffice.phone}
                </a>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 2 — AREA OVERVIEW */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Registered nurse conducting home care assessment in East Lothian"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Area Overview
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Nurse-led home care in East Lothian
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Our nursing team provides home care across East Lothian, from
                    Musselburgh in the west to Dunbar in the east. Every care plan
                    is written by a registered nurse and reviewed regularly &mdash;
                    the same clinical standard we apply across all the areas we
                    serve.
                  </p>
                  <p>
                    We&apos;re registered with the Care Inspectorate, and our
                    nurses visit clients at home across East Lothian for
                    assessments, rather than working from a phone-based process.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 — TOWNS AND AREAS COVERED */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-8">
              <AnimateContainer animation="fade-up" className="text-center space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Coverage
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Towns and villages we cover in East Lothian
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                <p className="text-base text-zinc-600">
                  Our team provides home care throughout East Lothian, including:
                </p>
              </AnimateContainer>

              <AnimateContainer animation="stagger" className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap justify-center gap-3">
                  {eastLothianTowns.map((town) => (
                    <AnimateItem key={town}>
                      <span
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-xs"
                      >
                        {town}
                      </span>
                    </AnimateItem>
                  ))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 italic">
                    &amp; surrounding villages
                  </span>
                </div>
              </AnimateContainer>

              <AnimateContainer animation="fade-up" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs leading-relaxed text-sm text-zinc-600">
                <p>
                  Care assessments in East Lothian are coordinated through East
                  Lothian Health and Social Care Partnership (ELHSCP), based at
                  John Muir House in Haddington. If you&apos;re not sure whether we
                  cover your specific town or village, call us on{" "}
                  <a
                    href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`}
                    className="font-bold text-primary hover:underline"
                  >
                    0131 210 0095
                  </a>{" "}
                  and we&apos;ll confirm right away.
                </p>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES IN THIS AREA */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Available Support"
              title="Home care services available in East Lothian"
              subtitle="Our East Lothian clients have access to the full range of Zento services, all delivered under nurse-led oversight:"
            />

            <AnimateContainer animation="stagger" className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
              {eastLothianServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.name} className="h-full">
                    <div
                      className="flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
                    >
                      <div className="space-y-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-secondary">
                          {service.name}
                        </h3>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-zinc-200/60">
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors"
                        >
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>

            <div className="text-center">
              <Link
                href="/home-care/"
                className="page-cta-secondary-inline"
              >
                See all home care services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 — SIGNS SECTION (Using SignsSectionGrid) */}
        <SignsSectionGrid
          category="East Lothian Care Assessment"
          title="Signs your loved one in East Lothian may need extra support"
          subtitle="Recognising when someone in Musselburgh, Haddington, or Dunbar requires personal care at home. Our registered nurses provide free consultations."
          signs={eastLothianSigns}
          ctaText="Book an East Lothian assessment"
          ctaType="assessment"
        />

        {/* SECTION 6 — TESTIMONIALS (Using TestimonialsSection) */}
        <TestimonialsSection
          category="East Lothian Feedback"
          title="What East Lothian families say"
          subtitle="Direct feedback from families across Musselburgh, Haddington, and North Berwick who rely on Zento."
          testimonials={getTestimonials("locations.lothian.eastLothian")}
        />

        {/* SECTION 7 — GETTING STARTED */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                3-Step Process
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange home care in East Lothian
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              {eastLothianSteps.map((item, index) => (
                <AnimateItem key={index} className="relative flex flex-col text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-md ring-1 ring-primary/10">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {item.desc}
                  </p>
                </AnimateItem>
              ))}
            </AnimateContainer>

            <div className="flex justify-center">
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Start with a free call <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="East Lothian FAQs"
              title="Frequently asked questions about home care in East Lothian"
              faqs={eastLothianFaqs}
            />
          </div>
        </section>

        {/* SECTION 9 — NEARBY AREAS & FINAL CTA */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Explore Regional Care
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Nearby areas
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <div className="grid gap-4 sm:grid-cols-3 pt-4 text-left">
                <Link
                  href="/locations/lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Lothian Region
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Regional hub for Midlothian, East &amp; West Lothian
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Home care across Lothian <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  href="/locations/lothian/midlothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Midlothian
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Dalkeith, Penicuik, Bonnyrigg &amp; Loanhead
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Home care in Midlothian <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  href="/locations/edinburgh"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Edinburgh
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    All Edinburgh postcodes (EH1–EH17)
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Home care in Edinburgh <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </AnimateContainer>

            {/* FINAL CTA BOX */}
            <FinalCTASection
              title="Speak to our team about care in East Lothian"
              subtitle="Our nursing team is ready to answer your questions and arrange a home assessment anywhere in East Lothian."
              tagline="No pressure. No obligation. Honest advice from our registered nurses."
              phone={edinburghOffice.phone}
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
