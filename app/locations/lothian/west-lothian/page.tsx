import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Utensils,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Companionship & Meal Preparation in West Lothian | Zento",
  description:
    "Non-regulated home support across West Lothian — Livingston, Bathgate, Linlithgow, Broxburn and Armadale. Friendly companionship and fresh meal preparation.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/lothian/west-lothian",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Companionship & Meal Preparation in West Lothian | Zento",
    description:
      "Non-regulated home support across West Lothian — Livingston, Bathgate, Linlithgow, Broxburn and Armadale. Friendly companionship and fresh meal preparation.",
    url: "https://zentogroup.co.uk/locations/lothian/west-lothian",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Home Support in West Lothian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companionship & Meal Preparation in West Lothian | Zento",
    description:
      "Non-regulated home support across West Lothian — Livingston, Bathgate, Linlithgow, Broxburn and Armadale.",
    images: ["/brand-image.png"],
  },
};

const edinburghOffice = OFFICES.find((o) => o.id === "edinburgh") ?? OFFICES[0];

const westLothianTowns = [
  "Livingston",
  "Bathgate",
  "Linlithgow",
  "Broxburn",
  "Armadale",
  "West Calder",
];

const westLothianServices = [
  {
    name: "Companionship Support",
    desc: "Social engagement, friendly visits & community outings without personal care duties.",
    href: "/home-care/companionship",
    icon: Users,
  },
  {
    name: "Meal Preparation Support",
    desc: "Nutritional support, fresh cooking, hydration check-ins & grocery assistance.",
    href: "/home-care/meal-preparation",
    icon: Utensils,
  },
];

const westLothianSigns = [
  "Social isolation — Feeling lonely, spending long periods without regular conversation or activities in West Lothian.",
  "Nutritional concerns — Skipping meals, difficulty opening food containers, or struggling to cook hot food safely.",
  "Difficulty with kitchen tasks — Trouble preparing food, standing for long cooking sessions, or managing groceries.",
  "Loss of interest in daily hobbies — Withdrawing from local community events, reading, or favourite pastimes.",
  "Family carer strain — Balancing work and family while ensuring loved ones eat well and stay active.",
  "Unmanaged fridge or pantry — Unopened food going past its use-by date or lack of fresh ingredients at home.",
];

const westLothianSteps = [
  {
    step: "01",
    title: "Call us",
    desc: "A quick, honest conversation about what you need. No pressure, no commitment.",
  },
  {
    step: "02",
    title: "Introductory home consultation",
    desc: "We arrange a visit to your loved one's home in West Lothian to understand their preferences and routine.",
  },
  {
    step: "03",
    title: "Support begins",
    desc: "A tailored support plan is agreed and a compatible companion matched. Support starts on your schedule.",
  },
];

const westLothianFaqs = [
  {
    q: "How quickly can support visits begin in West Lothian?",
    a: "In most cases, we can arrange an introductory consultation within a few days of your initial call and begin companionship or meal preparation visits shortly thereafter.",
  },
  {
    q: "Which West Lothian towns does Zento cover?",
    a: "We cover all of West Lothian including Livingston, Bathgate, Linlithgow, Broxburn, Armadale and West Calder. If you're unsure whether we cover your specific address, call us on 0131 210 0095.",
  },
  {
    q: "Are the West Lothian services regulated personal care?",
    a: "No. Our West Lothian services focus exclusively on non-regulated home support — namely social companionship, lifestyle assistance, grocery shopping, and meal preparation. We do not provide regulated personal care, bathing assistance, or clinical nursing in West Lothian.",
  },
  {
    q: "How can companionship and meal preparation help my loved one in West Lothian?",
    a: "Our companions provide regular social connection, shared activities, and support with cooking fresh, wholesome meals — helping older adults stay healthy, nourished, and happy in their own home.",
  },
];

export default function WestLothianLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/lothian/west-lothian#west-lothian-service",
    name: "Zento Group — West Lothian Home Support",
    telephone: "0131 210 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/lothian/west-lothian",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edinburgh",
      addressCountry: "GB",
    },
    areaServed: "West Lothian",
    serviceType: "Home Support Services",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: westLothianFaqs.map((faq) => ({
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
        name: "West Lothian",
        item: "https://zentogroup.co.uk/locations/lothian/west-lothian",
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
                    West Lothian
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
                  Home Support &middot; West Lothian
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Companionship &amp; Meal Preparation in West Lothian &mdash;{" "}
                  <span className="text-primary">
                    Livingston, Bathgate, Linlithgow &amp; More
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides dedicated, non-regulated companionship and meal preparation support
                  across West Lothian from our Edinburgh office. From Livingston and Bathgate to Linlithgow,
                  Broxburn, and Armadale, our friendly team helps older adults remain well-nourished, active, and socially engaged.
                </p>
              </div>

              {/* Notice Banner */}
              <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-zinc-700">
                <span className="font-bold text-secondary">Please Note:</span> Services in West Lothian focus exclusively on non-regulated support (companionship, lifestyle assistance, and meal preparation) and do not include regulated personal care.
              </div>

              <div className="page-cta-group pt-2">
                <ModalButton
                  type="general"
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
                  alt="Home companion visiting client in West Lothian"
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
                  Friendly home support in West Lothian
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    West Lothian families have access to dependable companionship and fresh meal preparation
                    services delivered by our caring, PVG-vetted team. We help older adults enjoy home-cooked meals,
                    maintain favorite pastimes, and stay connected with family and community.
                  </p>
                  <p>
                    Please note: Our West Lothian services are non-regulated support services and do not include
                    regulated personal care or nursing.
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
                  Towns and villages we cover in West Lothian
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
                <p className="text-base text-zinc-600">
                  Our team provides companionship and meal support throughout West Lothian, including:
                </p>
              </AnimateContainer>

              <AnimateContainer animation="stagger" className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap justify-center gap-3">
                  {westLothianTowns.map((town) => (
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
                  If you&apos;re unsure whether we cover your specific
                  address, call us on{" "}
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
              title="Home support services available in West Lothian"
              subtitle="Our West Lothian clients have access to dedicated companionship and meal preparation services, all delivered by vetted, caring companions:"
            />

            <AnimateContainer animation="stagger" className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12">
              {westLothianServices.map((service) => {
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
                See all home services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 — SIGNS SECTION (Using SignsSectionGrid) */}
        <SignsSectionGrid
          category="West Lothian Observations"
          title="Signs your loved one in West Lothian may benefit from extra support"
          subtitle="Recognising when a family member in Livingston, Bathgate, or Linlithgow needs friendly companionship or assistance with daily cooking."
          signs={westLothianSigns}
          ctaText="Book a West Lothian consultation"
          ctaType="general"
        />

        {/* SECTION 6 — GETTING STARTED */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                3-Step Process
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange support in West Lothian
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              {westLothianSteps.map((item, index) => (
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
                type="general"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Start with a free call <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* SECTION 7 — FAQ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="West Lothian FAQs"
              title="Frequently asked questions about support in West Lothian"
              faqs={westLothianFaqs}
            />
          </div>
        </section>

        {/* SECTION 8 — NEARBY AREAS & FINAL CTA */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Explore Regional Support
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
                    Support across Lothian <ArrowRight className="w-3 h-3" />
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
                    Support in Midlothian <ArrowRight className="w-3 h-3" />
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
                    Support in Edinburgh <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </AnimateContainer>

            {/* FINAL CTA BOX */}
            <FinalCTASection
              title="Speak to our team about support in West Lothian"
              subtitle="Our team is ready to answer your questions and arrange an introductory consultation anywhere in West Lothian."
              tagline="No pressure. No obligation. Friendly advice from our local team."
              phone={edinburghOffice.phone}
              ctaText="Book a free consultation"
              ctaType="general"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
