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
  title: "Home Care in Comrie, Perthshire | Nurse-Led | Zento",
  description:
    "Zento provides nurse-led home care in Comrie and the surrounding Perthshire villages, from our nearby Crieff office. Call us to arrange a free home visit.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/perthshire/comrie",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care in Comrie, Perthshire | Nurse-Led | Zento",
    description:
      "Zento provides nurse-led home care in Comrie and the surrounding Perthshire villages, from our nearby Crieff office. Call us to arrange a free home visit.",
    url: "https://zentogroup.co.uk/locations/perthshire/comrie",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Nurse-Led Home Care in Comrie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care in Comrie, Perthshire | Nurse-Led | Zento",
    description:
      "Nurse-led home care in Comrie and surrounding Perthshire villages from our nearby Crieff office.",
    images: ["/brand-image.png"],
  },
};

const crieffOffice = OFFICES.find((o) => o.id === "crieff") ?? OFFICES[0];

const comrieVillages = ["Comrie", "St Fillans", "Strowan"];

const comrieServices = [
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

const comrieSigns = [
  "Concerns over winter mobility or navigating village homes in Comrie and St Fillans.",
  "Medication challenges or delays in collecting repeat prescriptions.",
  "Nutritional issues — Skipping meals, reduced appetite, or difficulty cooking.",
  "Personal hygiene or dressing becoming unsafe without supportive help.",
  "Memory lapses or nighttime disorientation causing concern for family living away.",
  "Family carer strain in rural Perthshire — Needing compassionate, reliable local respite.",
];

const comrieSteps = [
  {
    step: "01",
    title: "Call us",
    desc: "A straightforward conversation about what you need. No pressure, no commitment.",
  },
  {
    step: "02",
    title: "A nurse visits your loved one at home",
    desc: "One of our nurses from Crieff will visit your loved one in Comrie or St Fillans.",
  },
  {
    step: "03",
    title: "Care begins",
    desc: "A care plan is written and a local carer matched. Support starts on your agreed schedule.",
  },
];

const comrieFaqs = [
  {
    q: "Where is the nearest Zento office to Comrie?",
    a: "Our local office is on East High Street in Crieff (PH7), just a 15-minute drive from Comrie. When you call us on 0176 479 0095, you're speaking to our local Strathearn team.",
  },
  {
    q: "Do you cover St Fillans and other villages near Comrie?",
    a: "Yes. We provide nurse-led home care across Comrie, St Fillans, Strowan and surrounding West Perthshire rural areas.",
  },
  {
    q: "Is nurse oversight included for all Comrie clients?",
    a: "Yes. Every care package in Comrie is assessed, written and reviewed by a registered nurse based at our Crieff office.",
  },
  {
    q: "Can you provide live-in care in Comrie?",
    a: "Yes. We offer dedicated 24-hour live-in care across Comrie and the surrounding rural Perthshire villages, personally matched and clinically supervised by our nursing team.",
  },
];

export default function ComrieLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/perthshire/comrie#crieff-office",
    name: "Zento Group — Comrie & Perthshire Care",
    telephone: "0176 479 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/perthshire/comrie",
    address: {
      "@type": "PostalAddress",
      streetAddress: "East High Street",
      addressLocality: "Crieff",
      postalCode: "PH7",
      addressCountry: "GB",
    },
    areaServed: ["Comrie", "St Fillans", "Strowan", "Perthshire"],
    serviceType: "Nurse-Led Home Care",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comrieFaqs.map((faq) => ({
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
        name: "Perthshire",
        item: "https://zentogroup.co.uk/locations/perthshire",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Comrie",
        item: "https://zentogroup.co.uk/locations/perthshire/comrie",
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
                    href="/locations/perthshire"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    Perthshire
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
                    Comrie
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
                  Nurse-Led Home Care &middot; Comrie &amp; West Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Home Care in Comrie &mdash;{" "}
                  <span className="text-primary">
                    Nurse-Led Care from Our Nearby Crieff Team
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care in Comrie, St Fillans and
                  surrounding West Perthshire villages, managed from our office
                  on East High Street in Crieff. Consistent carers, clinical
                  nursing plans and personal support.
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
                  href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" /> Call Crieff:{" "}
                  {crieffOffice.phone}
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
                  alt="Registered nurse conducting home care assessment in Comrie"
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
                  Nurse-led home care in Comrie
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Comrie is just minutes from our Crieff office, meaning
                    families in Comrie, St Fillans and Strowan receive prompt,
                    local attention from nurses and carers who know the area
                    well.
                  </p>
                  <p>
                    Every care arrangement is assessed and planned by a
                    registered nurse. We ensure consistency of carers so that
                    your loved one builds a trusting, familiar relationship with
                    the people visiting their home.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 — VILLAGES COVERED */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-8">
              <AnimateContainer animation="fade-up" className="text-center space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Coverage
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Villages and areas we cover in West Perthshire
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                <p className="text-base text-zinc-600">
                  From our nearby Crieff office, we provide home care
                  throughout:
                </p>
              </AnimateContainer>

              <AnimateContainer animation="stagger" className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap justify-center gap-3">
                  {comrieVillages.map((village) => (
                    <AnimateItem key={village}>
                      <span
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-xs"
                      >
                        {village}
                      </span>
                    </AnimateItem>
                  ))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 italic">
                    &amp; surrounding West Perthshire
                  </span>
                </div>
              </AnimateContainer>

              <AnimateContainer animation="fade-up" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs leading-relaxed text-sm text-zinc-600">
                <p>
                  If you reside outside the main village boundary, please
                  contact our Crieff team on{" "}
                  <a
                    href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`}
                    className="font-bold text-primary hover:underline"
                  >
                    0176 479 0095
                  </a>{" "}
                  to confirm availability.
                </p>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Available Support"
              title="Home care services available in Comrie"
              subtitle="From visiting personal care to 24-hour live-in support, our team provides comprehensive nurse-led care:"
            />

            <AnimateContainer animation="stagger" className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
              {comrieServices.map((service) => {
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
          category="Comrie Care Assessment"
          title="Signs your loved one in Comrie may need support at home"
          subtitle="Recognising when an elderly relative in Comrie or St Fillans requires compassionate home care. Our nurses provide free assessments."
          signs={comrieSigns}
          ctaText="Book a Comrie assessment"
          ctaType="assessment"
        />

        {/* SECTION 6 — TESTIMONIALS (Using TestimonialsSection) */}
        <TestimonialsSection
          category="Comrie Feedback"
          title="What Comrie families say"
          subtitle="Direct experiences from families in Comrie and St Fillans who trust our nurse-led care team."
          testimonials={getTestimonials("locations.perthshire.comrie")}
        />

        {/* SECTION 7 — GETTING STARTED */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                3-Step Process
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange home care in Comrie
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              {comrieSteps.map((item, index) => (
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
              badge="Comrie FAQs"
              title="Frequently asked questions about home care in Comrie"
              faqs={comrieFaqs}
            />
          </div>
        </section>

        {/* SECTION 9 — NEARBY AREAS & FINAL CTA */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Perthshire Locations
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Nearby areas
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <div className="grid gap-4 sm:grid-cols-2 pt-4 text-left">
                <Link
                  href="/locations/perthshire"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Perthshire Hub
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Overview of our Perthshire home care services
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Perthshire care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  href="/locations/perthshire/crieff"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Crieff
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Home care across Crieff, Muthill, Braco &amp; Strathearn
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Home care in Crieff <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </AnimateContainer>

            {/* FINAL CTA BOX */}
            <FinalCTASection
              title="Speak to our Crieff team about care in Comrie"
              subtitle="Our team is based on East High Street in Crieff and ready to arrange a home assessment at a time that suits you in Comrie."
              tagline="No pressure. No obligation. Honest advice from our registered nurses."
              phone={crieffOffice.phone}
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
