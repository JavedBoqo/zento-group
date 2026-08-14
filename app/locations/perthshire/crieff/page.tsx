import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Brain,
  Home,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Clock4,
  Building2,
  Utensils,
  Users,
  Sun,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Home Care in Crieff, Perthshire | Nurse-Led | Zento",
  description:
    "Our Crieff office provides nurse-led home care in Crieff, Comrie, Muthill and Braco. Personal care, medication support, live-in care and more — all locally managed.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/perthshire/crieff/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care in Crieff, Perthshire | Nurse-Led | Zento",
    description:
      "Our Crieff office provides nurse-led home care in Crieff, Comrie, Muthill and Braco. Personal care, medication support, live-in care and more — all locally managed.",
    url: "https://zentogroup.co.uk/locations/perthshire/crieff/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Nurse-Led Home Care in Crieff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care in Crieff, Perthshire | Nurse-Led | Zento",
    description:
      "Our Crieff office provides nurse-led home care in Crieff, Comrie, Muthill and Braco.",
    images: ["/brand-image.png"],
  },
};

const crieffOffice = OFFICES[1];

const crieffVillages = ["Crieff", "Muthill", "Braco", "Gilmerton", "Comrie"];

const crieffServices = [
  {
    name: "Personal Care",
    desc: "Bathing, dressing & daily mobility support",
    href: "/home-care/personal-care/",
    icon: Heart,
  },
  {
    name: "Medication Support",
    desc: "Nurse-monitored administration & management",
    href: "/home-care/medication-support/",
    icon: ShieldCheck,
  },
  {
    name: "Companionship",
    desc: "Social engagement & community activities",
    href: "/home-care/companionship/",
    icon: Users,
  },
  {
    name: "Meal Preparation",
    desc: "Nutritional support & home cooked meals",
    href: "/home-care/meal-preparation/",
    icon: Utensils,
  },
  {
    name: "Hospital Discharge Support",
    desc: "Seamless, safe transition back home",
    href: "/home-care/hospital-discharge/",
    icon: Building2,
  },
  {
    name: "Dementia Care",
    desc: "Structured, familiar daily routines",
    href: "/home-care/dementia-care/",
    icon: Brain,
  },
  {
    name: "Respite Care",
    desc: "Short-term relief for family carers",
    href: "/home-care/respite-care/",
    icon: Sun,
  },
  {
    name: "Overnight Care",
    desc: "Sleep-in or waking-night support",
    href: "/live-in-care/overnight-care/",
    icon: Clock4,
  },
  {
    name: "24-Hour Live-In Care",
    desc: "Continuous round-the-clock home care",
    href: "/live-in-care/24-hour-care/",
    icon: Home,
  },
];

const crieffSteps = [
  {
    step: "01",
    title: "Call us",
    desc: "A straightforward conversation about what you need. No pressure, no commitment.",
  },
  {
    step: "02",
    title: "A nurse visits your loved one at home",
    desc: "We arrange a proper assessment, in person, at your loved one's home in Crieff or the surrounding area.",
  },
  {
    step: "03",
    title: "Care begins",
    desc: "A care plan is written and a carer matched. Support starts on your agreed schedule.",
  },
];

const crieffFaqs = [
  {
    q: "Do you have a local office in Crieff?",
    a: "Yes. Our Perthshire team is based at East High Street, Crieff PH7. Your care is managed locally — care plans are written and reviewed by a nursing team based in the same town, not a remote office elsewhere in Scotland.",
  },
  {
    q: "Which villages near Crieff does Zento cover?",
    a: "From our Crieff office, we provide home care in Crieff, Muthill, Braco, Gilmerton and Comrie. If you're unsure whether we cover your specific village, call us on 0176 479 0095 and we'll confirm immediately.",
  },
  {
    q: "How do Crieff residents arrange a council care assessment?",
    a: "Care assessments in Crieff are coordinated through Perth and Kinross Health and Social Care Partnership. Unpaid carers can also access dedicated local support through PKAVS (Perth & Kinross Association of Voluntary Service), which provides advice and assistance specifically for carers in the area.",
  },
  {
    q: "Is nurse-led care available in rural areas around Crieff?",
    a: "Yes. Our Crieff nursing team provides the same clinical standard of care to surrounding villages as within Crieff itself. Your care plan is written and reviewed by a registered nurse, and your carer is clinically overseen, regardless of exactly where you are in the area.",
  },
];

export default function CrieffLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/perthshire/crieff/#crieff-service",
    name: "Zento Group — Crieff Office",
    telephone: "0176 479 0095",
    email: "perthshire@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/perthshire/crieff/",
    address: {
      "@type": "PostalAddress",
      streetAddress: "East High Street",
      addressLocality: "Crieff",
      postalCode: "PH7",
      addressCountry: "GB",
    },
    areaServed: ["Crieff", "Muthill", "Braco", "Gilmerton", "Comrie"],
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
    mainEntity: crieffFaqs.map((faq) => ({
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
        item: "https://zentogroup.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://zentogroup.co.uk/locations/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Perthshire",
        item: "https://zentogroup.co.uk/locations/perthshire/",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Crieff",
        item: "https://zentogroup.co.uk/locations/perthshire/crieff/",
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
                    href="/locations/"
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
                    href="/locations/perthshire/"
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
                    Crieff
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
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-secondary mb-4">
                  Perthshire Office &middot; East High Street, Crieff PH7
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Home Care in Crieff &mdash;{" "}
                  <span className="text-primary">
                    Locally-Based Nurse-Led Care for Crieff &amp; Surrounding Area
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento&apos;s Perthshire office is on East High Street in Crieff &mdash;
                  not a satellite of a national franchise, but a genuinely local
                  team. We provide nurse-led home care to families in Crieff and
                  the surrounding villages, managed by people who live and work in
                  the same town.
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
                  href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                >
                  <Phone className="w-4 h-4 shrink-0" /> Call us:{" "}
                  {crieffOffice.phone}
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-xs font-bold text-secondary">
                    Care Inspectorate Registered
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-xs font-bold text-secondary">
                    Locally Based Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — AREA OVERVIEW */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/hero-image.png"
                  alt="Zento Crieff office local nursing team"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                  Area Overview
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Nurse-led home care in Crieff
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Our Crieff office is where Zento&apos;s Perthshire operation is
                    based &mdash; every care plan for a Crieff client is written by a
                    nurse who works from this office, not a remote assessor
                    visiting once and disappearing.
                  </p>
                  <p>
                    We&apos;re registered with the Care Inspectorate, and our
                    nurses carry out home visits in person across Crieff and the
                    surrounding area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — AREAS WE COVER */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                  Coverage
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Villages we cover around Crieff
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
                <p className="text-base text-zinc-600">
                  From our Crieff office, our team provides home care in:
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap justify-center gap-3">
                  {crieffVillages.map((village) => (
                    <span
                      key={village}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-xs"
                    >
                      {village}
                    </span>
                  ))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-500 italic">
                    &amp; surrounding villages
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs leading-relaxed text-sm text-zinc-600">
                <p>
                  Care assessments in the Crieff area are coordinated through
                  Perth and Kinross Health and Social Care Partnership. Unpaid
                  carers can access dedicated local support through PKAVS (Perth
                  &amp; Kinross Association of Voluntary Service). If you&apos;re
                  unsure whether we cover your specific village, call us on{" "}
                  <a
                    href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`}
                    className="font-bold text-secondary hover:underline"
                  >
                    0176 479 0095
                  </a>{" "}
                  and we&apos;ll confirm right away.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES IN THIS AREA */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-4">
                Available Support
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                Home care services available in Crieff
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                Our Crieff clients have access to the full range of Zento
                services, all delivered under nurse-led oversight:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
              {crieffServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <div
                    key={service.name}
                    className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-secondary/30 hover:bg-white hover:shadow-xl hover:shadow-secondary/5"
                  >
                    <div className="space-y-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
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
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors"
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/home-care/"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:scale-105"
              >
                See all home care services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 — NURSE-LED IN CRIEFF */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                Clinical Standard
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                What nurse-led care means in Crieff
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
              <p className="text-base leading-relaxed text-zinc-600">
                Every care plan for a Crieff client is written by a registered nurse
                based at our East High Street office. Because the team is local,
                care plans stay properly reviewed and consistently delivered
                &mdash; not managed remotely by someone who&apos;s never visited the
                area.
              </p>
              <div className="pt-2">
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — LOCAL TESTIMONIAL */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                Local Feedback
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                What Crieff families say
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />

              <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 shadow-sm text-left">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-5 h-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-zinc-700 italic mb-6">
                  &ldquo;I&apos;d tried to arrange care for Dad through a couple
                  of national companies before finding Zento, and both treated
                  Crieff as an afterthought &mdash; long waits, unfamiliar carers each
                  time. Zento&apos;s office being right here on the High Street
                  made an immediate difference. The nurse who assessed Dad clearly
                  knew the area and the carer she matched has been consistent since
                  day one.&rdquo;
                </p>
                <div className="border-t border-zinc-200/60 pt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-base font-black text-secondary">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary">
                      Margaret F.
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" /> Crieff,
                      Perthshire &middot; Google Review
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — GETTING STARTED */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-4">
                3-Step Process
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange home care in Crieff
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-secondary" />
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              {crieffSteps.map((item, index) => (
                <div key={index} className="relative flex flex-col text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-black text-secondary shadow-md ring-1 ring-secondary/10">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 font-bold text-white shadow-xl shadow-secondary/20 transition-all hover:scale-105 hover:bg-secondary/90 cursor-pointer"
              >
                Start with a free call <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-3">
                  Crieff FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about home care in Crieff
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-secondary" />
              </div>
              <div className="space-y-3">
                {crieffFaqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-zinc-200 bg-white open:border-secondary/30 open:shadow-lg open:shadow-secondary/5 transition-all duration-200"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                      <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">
                        {faq.q}
                      </h3>
                      <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-secondary" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-relaxed text-zinc-600">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — NEARBY AREAS & FINAL CTA */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                Explore Regional Care
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Nearby areas
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
              <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto pt-4 text-left">
                <Link
                  href="/locations/perthshire/"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-secondary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Perthshire Region
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Care across Crieff, Comrie, Muthill &amp; surrounds
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                    Home care across Perthshire <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  href="/locations/perthshire/comrie/"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-secondary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">
                    Comrie
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">
                    Comrie, St Fillans &amp; Strowan villages
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                    Home care in Comrie <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>

            {/* FINAL CTA BOX */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-secondary via-secondary/90 to-secondary/75 py-16 px-8 text-center text-white shadow-2xl shadow-secondary/20 md:py-24 max-w-5xl mx-auto">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about care in Crieff
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Our local nursing team is ready to answer your questions and arrange
                  a home assessment anywhere in Crieff or the surrounding area.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from our registered
                  nurses.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton
                    type="assessment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-secondary shadow-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a free assessment <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  <a
                    href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                  >
                    <Phone className="w-4 h-4 shrink-0" /> Call us:{" "}
                    {crieffOffice.phone}
                  </a>
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
