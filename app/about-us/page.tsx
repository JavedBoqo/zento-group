import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Handshake,
  Users,
  Sparkles,
  MapPin,
  Mail,
  Building2,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import { OFFICES, CONTACT_EMAIL, SERVICE_AREAS } from "@/constants";

export const metadata: Metadata = {
  title: "About Zento | Nurse-Led Care in Edinburgh & Perthshire",
  description:
    "Zento Group is nurse-led home care serving Edinburgh, Lothian and Perthshire. Meet the founders, our values and our Care Inspectorate registration. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/about-us/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About Zento | Nurse-Led Care in Edinburgh & Perthshire",
    description:
      "Zento Group is nurse-led home care serving Edinburgh, Lothian and Perthshire. Meet the founders, our values and our Care Inspectorate registration.",
    url: "https://zentogroup.co.uk/about-us/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "About Zento Nurse-Led Care Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zento | Nurse-Led Care in Edinburgh & Perthshire",
    description:
      "Zento Group is nurse-led home care serving Edinburgh, Lothian and Perthshire. Meet the founders, our values and our Care Inspectorate registration.",
    images: ["/brand-image.png"],
  },
};

const values = [
  {
    name: "Kindness",
    desc: "Every person is treated with warmth, patience and genuine compassion.",
    icon: Heart,
  },
  {
    name: "Respect",
    desc: "Your home, your choices, your routines. We fit around you.",
    icon: Users,
  },
  {
    name: "Reliability",
    desc: "We turn up when we say we will, and do what we promise.",
    icon: ShieldCheck,
  },
  {
    name: "Dignity",
    desc: "Personal care delivered sensitively, protecting your privacy at all times.",
    icon: BadgeCheck,
  },
  {
    name: "Partnership",
    desc: "We work with you, your family and other professionals as one team.",
    icon: Handshake,
  },
];

export default function AboutUsPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Zento Group",
    description:
      "Zento Group is a nurse-led care-at-home provider supporting adults across Edinburgh, East, Mid and West Lothian, and Perthshire, including Crieff and Comrie.",
    url: "https://zentogroup.co.uk/about-us/",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
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
        name: "About Us",
        item: "https://zentogroup.co.uk/about-us/",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* ── BREADCRUMB ── */}
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
                  <span
                    className="font-semibold text-secondary"
                    aria-current="page"
                  >
                    About Us
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  <Sparkles className="h-3.5 w-3.5" /> Nurse-Led Care in
                  Edinburgh, Lothian &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  About Zento —{" "}
                  <span className="text-primary">
                    Nurse-Led Care, Founded by Nurses
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento Group is a nurse-led care-at-home provider supporting
                  adults across Edinburgh, East, Mid and West Lothian, and
                  Perthshire, including Crieff and Comrie. We help people live
                  safely, comfortably and independently in their own homes —
                  from a weekly friendly visit to comprehensive, round-the-clock
                  support.
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
                  Call {OFFICES[0]?.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHY WE STARTED ZENTO
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Zento founders who are practising nurses delivering care"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Why we started Zento
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-zinc-600">
                  <p>
                    Zento was founded by practising nurses whose careers were
                    spent in the NHS, on acute wards, and in long-term care
                    homes, supporting hundreds of older people through
                    dementia, Parkinson&apos;s, stroke, frailty and the final
                    chapters of life.
                  </p>
                  <p>
                    One wish came up again and again:{" "}
                    <span className="font-semibold text-secondary">
                      &ldquo;I just want to go home.&rdquo;
                    </span>{" "}
                    Zento exists to answer that wish — bringing genuinely good,
                    clinically-informed care into the place people feel most
                    themselves.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — OUR VALUES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50/50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Stand For
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                Our values
              </h2>
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                Everything we do at Zento is guided by the values our nursing
                founders brought with them from the wards. These are the
                standards each member of our team lives by every single day.
              </p>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {values.map((value) => {
                const IconComp = value.icon;
                return (
                  <AnimateItem key={value.name}>
                    <div
                      className="group relative flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 h-full"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-secondary leading-snug">
                        {value.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600">
                        {value.desc}
                      </p>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — LED BY NURSES, ACCOUNTABLE TO YOU
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <AnimateContainer animation="fade-right" className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  Clinical Governance
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Led by nurses,{" "}
                  <span className="text-primary">accountable to you</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80">
                  <p>
                    Day-to-day care is led by our Registered Manager,{" "}
                    <span className="text-white font-semibold">
                      Adnan Karim RGN
                    </span>
                    , alongside a dedicated Care Quality Manager — also a
                    practising registered nurse — who provides independent
                    oversight of standards.
                  </p>
                  <p>
                    Both report through a Board-level Director of Care
                    Standards, so quality assurance never rests with one
                    person alone. This layered clinical governance structure
                    means every client benefits from multiple pairs of expert
                    eyes reviewing their care.
                  </p>
                </div>

                <blockquote className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 mt-10 backdrop-blur-sm">
                  <div className="absolute -top-3 left-6 text-5xl text-primary leading-none font-black">
                    &ldquo;
                  </div>
                  <p className="pt-4 text-base md:text-lg leading-relaxed italic text-white/90">
                    Quality is not something you check at the end. It is
                    something you build into every step — from the first
                    assessment to every single visit. That is the nursing
                    standard we bring to Zento.
                  </p>
                  <footer className="mt-4 text-sm font-bold text-primary not-italic">
                    — Director of Care Standards, Zento Group
                  </footer>
                </blockquote>
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Zento nurse-led care team"
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
            SECTION 5 — REGULATED AND ACCOUNTABLE
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
              <AnimateContainer animation="fade-left" className="relative aspect-[4/3] w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/brand-image.png"
                  alt="Care Inspectorate regulated care provider"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-right" delay={0.1} className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                  Regulation &amp; Standards
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Regulated and accountable
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-zinc-600">
                  <p>
                    Zento Group is registered with the{" "}
                    <span className="font-semibold text-secondary">
                      Care Inspectorate
                    </span>
                    , Scotland&apos;s independent care regulator. Our current
                    registrations are:
                  </p>

                  <ul className="space-y-3 pl-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">
                        <span className="font-bold text-secondary">
                          Support Service:
                        </span>{" "}
                        registration{" "}
                        <span className="font-mono text-xs bg-zinc-100 px-2 py-0.5 rounded">
                          CS2026000326
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">
                        <span className="font-bold text-secondary">
                          Housing Support Service:
                        </span>{" "}
                        registration{" "}
                        <span className="font-mono text-xs bg-zinc-100 px-2 py-0.5 rounded">
                          CS2026000325
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">
                        <span className="font-bold text-secondary">
                          Provider Number:
                        </span>{" "}
                        <span className="font-mono text-xs bg-zinc-100 px-2 py-0.5 rounded">
                          SP2025000950
                        </span>
                      </span>
                    </li>
                  </ul>

                  <p>
                    We deliver care in line with the{" "}
                    <span className="font-semibold text-secondary">
                      Health and Social Care Standards (Scotland) 2017
                    </span>
                    . Every carer is PVG-checked, SSSC-registered, and trained
                    through a structured, competency-based induction before
                    they ever step foot in a client&apos;s home.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 — WHERE WE WORK
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage Area
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                Where we work
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                We&apos;re proud to serve the City of Edinburgh, East, Mid and
                West Lothian, and Perthshire — including Crieff, Comrie,
                Muthill and Braco — from our two local offices in Edinburgh
                and Crieff.
              </p>
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              <AnimateItem className="h-full">
                <div className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    Edinburgh Office
                  </h3>
                  <ul className="space-y-2.5 mb-6">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-zinc-600">
                        Adit Place, Edinburgh EH17
                      </span>
                    </li>
                    <li>
                      <a
                        href={OFFICES[0]?.phoneHref}
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        {OFFICES[0]?.phone}
                      </a>
                    </li>
                    <li className="text-xs text-zinc-500 pt-1">
                      Serving: City of Edinburgh, East Lothian, Midlothian, West
                      Lothian
                    </li>
                  </ul>
                  <Link
                    href="/locations/edinburgh/"
                    className="mt-auto flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                  >
                    Learn more about our Edinburgh team{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </AnimateItem>

              <AnimateItem className="h-full">
                <div className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10 h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    Crieff Office
                  </h3>
                  <ul className="space-y-2.5 mb-6">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-zinc-600">
                        East High Street, Crieff PH7
                      </span>
                    </li>
                    <li>
                      <a
                        href={OFFICES[1]?.phoneHref}
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        {OFFICES[1]?.phone}
                      </a>
                    </li>
                    <li className="text-xs text-zinc-500 pt-1">
                      Serving: Crieff, Comrie, Muthill, Braco &amp; Perthshire
                    </li>
                  </ul>
                  <Link
                    href="/locations/perthshire/crieff/"
                    className="mt-auto flex items-center gap-1.5 text-sm font-bold text-secondary group-hover:text-primary transition-colors"
                  >
                    Learn more about our Crieff team{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </AnimateItem>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 — FINAL CTA (SPEAK TO OUR TEAM)
        ════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up">
              <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl space-y-6">
                  <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    Contact Us
                  </span>
                  <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                    Speak to our team
                  </h2>
                  <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                    Have questions about care for yourself or a loved one? Our
                    nursing team is here to listen, answer your questions and
                    give you honest, clear guidance — with no pressure and no
                    obligation.
                  </p>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 pt-2 max-w-3xl mx-auto">
                    <a
                      href={OFFICES[0]?.phoneHref}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Phone className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Edinburgh
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {OFFICES[0]?.phone}
                      </p>
                    </a>
                    <a
                      href={OFFICES[1]?.phoneHref}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Phone className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Crieff
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {OFFICES[1]?.phone}
                      </p>
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Mail className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white break-all">
                        {CONTACT_EMAIL}
                      </p>
                    </a>
                  </div>

                  <div className="page-cta-group-dark pt-4">
                    <ModalButton
                      type="assessment"
                      className="page-cta-on-dark-primary"
                    >
                      Book a free consultation <ArrowRight className="w-5 h-5" />
                    </ModalButton>
                    <ModalButton
                      type="general"
                      className="page-cta-on-dark-outline cursor-pointer"
                    >
                      Send us a message
                    </ModalButton>
                  </div>
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* BOTTOM SERVICE AREAS STRIP */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-8 text-center text-xs text-zinc-500">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            Serving {SERVICE_AREAS}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
