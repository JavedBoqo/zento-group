import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Home,
  Moon,
  Clock4,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES, CONTACT_NUMBER } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Live-In Care at Home | Nurse-Led 24/7 Support | Zento",
  description:
    "Live-in care from our nurse-led team across Edinburgh, Lothian and Perthshire. Consistent carers, 24/7 support and genuine clinical oversight. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/live-in-care/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Live-In Care at Home | Nurse-Led 24/7 Support | Zento",
    description:
      "Live-in care from our nurse-led team across Edinburgh, Lothian and Perthshire. Consistent carers, 24/7 support and genuine clinical oversight.",
    url: "https://zentogroup.co.uk/live-in-care/",
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
    href: "/live-in-care/overnight-care/",
    desc: "A trained carer present through the night — either a sleep-in carer, available if woken, or a waking-night carer, alert and monitoring throughout. Suited to families who need reliable night-time cover, sometimes alongside daytime visits.",
    ctaLabel: "Learn more",
    icon: Moon,
  },
  {
    name: "24-Hour Home Care",
    href: "/live-in-care/24-hour-care/",
    desc: "A small team of carers working rotating shifts, so someone is always fully awake and alert — day and night, with no gaps. Suited to more complex or unpredictable needs, where waiting for a carer to wake isn't an option.",
    ctaLabel: "Learn more",
    icon: Clock4,
  },
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
    desc: "A registered nurse assesses what's genuinely needed. We look honestly at whether overnight support or full 24-hour care is the right fit, based on the actual clinical picture.",
  },
  {
    step: "03",
    title: "Carer Match or Team Built",
    desc: "We match a carer or build a team. Carers are matched for compatibility, not just availability, and briefed thoroughly before anyone moves in or starts a shift.",
  },
  {
    step: "04",
    title: "Care Begins",
    desc: "Care begins, with regular nurse review. Support starts on an agreed schedule. Our nursing team reviews the arrangement as circumstances change.",
  },
];

const testimonials = [
  {
    quote:
      "We looked at care homes for Mum and Dad and the numbers just didn't add up — two separate places would have cost nearly double what one live-in carer costs for both of them together. More importantly, they got to stay in the house they've lived in for forty years. The nurse who matched their carer clearly thought hard about who would actually suit them.",
    author: "Fiona L.",
    location: "Edinburgh",
  },
  {
    quote:
      "Dad's dementia meant a care home felt like it would be genuinely distressing for him. Live-in care let him stay somewhere familiar, with one carer he came to know well rather than a rotating staff team. The consistency made an enormous difference to how settled he was.",
    author: "Robert T.",
    location: "Perth",
  },
];

const faqs = [
  {
    q: "What is the difference between live-in care and visiting home care?",
    a: "Visiting home care involves scheduled visits throughout the day, with the client alone between them. Live-in care means a carer is present in the home continuously, including overnight, providing support whenever it's needed rather than only during set visit times. It suits people whose needs are less predictable or who need reassurance that someone is always close by.",
  },
  {
    q: "Is live-in care cheaper than a care home?",
    a: "It depends on individual circumstances, but for couples specifically, live-in care is often considerably more cost-effective, since one carer can support two people under a single arrangement, whereas care homes charge per person. For a single individual, costs are broadly comparable, though live-in care also means remaining in a familiar home. Our team can talk through the specifics honestly.",
  },
  {
    q: "What is the difference between overnight care and 24-hour care?",
    a: "Overnight care provides a trained carer through the night only — either a sleep-in carer or a waking-night carer — sometimes alongside separate daytime visits. 24-hour care provides a small team of carers working rotating shifts, so someone is always fully awake and alert throughout the day and night, with no gaps. The right choice depends on how predictable and frequent your loved one's needs are.",
  },
  {
    q: "How does Zento match a live-in carer to a client?",
    a: "Matching is led by our nursing team, who consider clinical needs alongside personality, routine and what's likely to make the arrangement work well day to day. Because a live-in carer shares the home, compatibility matters as much as competence. Carers are introduced before the arrangement begins.",
  },
  {
    q: "Can live-in care be arranged quickly, for example after a hospital stay?",
    a: "Yes. In many cases we can have live-in care in place within a few days, and more urgently where needed — for example following a hospital discharge. Our nursing team can assess needs quickly and arrange the right level of support without unnecessary delay.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh/" },
  { label: "Lothian", href: "/locations/lothian/" },
  { label: "Perthshire", href: "/locations/perthshire/" },
];

const relatedServices = [
  {
    name: "Overnight Care at Home",
    href: "/live-in-care/overnight-care/",
    desc: "Sleep-in or waking-night support, alone or alongside daytime visits.",
    icon: Moon,
    accent: "primary",
  },
  {
    name: "24-Hour Home Care",
    href: "/live-in-care/24-hour-care/",
    desc: "A rotating team for continuous, always-alert support — day and night.",
    icon: Clock4,
    accent: "secondary",
  },
  {
    name: "Home Care Services",
    href: "/home-care/",
    desc: "Visiting care for personal care, medication, companionship and more.",
    icon: Home,
    accent: "primary",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function LiveInCarePage() {
  /* ── JSON-LD: Service schema ── */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nurse-Led Live-In Care Services",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Live-In Care",
    areaServed: [
      "City of Edinburgh",
      "Midlothian",
      "East Lothian",
      "West Lothian",
      "Perthshire",
    ],
    url: "https://zentogroup.co.uk/live-in-care/",
  };

  /* ── JSON-LD: FAQPage schema ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  /* ── JSON-LD: BreadcrumbList schema ── */
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
        name: "Live-In Care",
        item: "https://zentogroup.co.uk/live-in-care/",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
                <li aria-hidden="true" className="text-zinc-300">/</li>
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
            SECTION 1 — HERO (Centered layout without image)
        ════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 md:pt-12 md:pb-18 lg:pt-14 lg:pb-20">
          {/* Subtle background blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                {/* Badge */}
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Nurse-Led Live-In Care · Edinburgh, Lothian &amp; Perthshire
                </span>

                {/* H1 */}
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  <span className="text-primary">Live-In Care at Home</span>{" "}
                  — 24-Hour Support From a Nurse-Led Team
                </h1>

                {/* Lead paragraph */}
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Live-in care means your loved one is never without support — day and night, in their own home, rather than moving somewhere unfamiliar. At Zento, every live-in arrangement is planned by a registered nurse and delivered by carers matched for genuine compatibility, not just availability.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <ModalButton
                  type="assessment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>

                {OFFICES.map((office) => (
                  <a
                    key={office.id}
                    href={office.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    Call {office.shortName}: {office.phone}
                  </a>
                ))}
              </div>

              {/* Trust bar */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Care Inspectorate registered</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Nurse-led care</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — DEFINITION
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              {/* Image Column */}
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Elderly client enjoying happy independent life at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>

              {/* Text Column */}
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is live-in care?
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                  <p>
                    Live-in care is support that extends into the night, not just through the day — a genuine alternative to moving into a care home. Instead of your loved one relocating to an unfamiliar residential setting, care comes to them, delivered by carers who know their routine, their preferences and their home.
                  </p>
                  <p>
                    It suits people who need more than daytime visits can provide: those with complex or unpredictable needs, higher falls risk, dementia-related night-time confusion, or simply a level of reassurance that comes from knowing someone capable is always close by. It's also, for many families, the option that best preserves independence and dignity — staying in a familiar home, with familiar belongings, familiar neighbours and a familiar routine.
                  </p>
                  <p>
                    Live-in care isn't one fixed package. It ranges from overnight-only support layered onto daytime visits, through to a full round-the-clock team for the highest-need situations. The right level depends entirely on the individual — which is why a proper nursing assessment, not a generic recommendation, is the right place to start.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SERVICE GRID
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50/50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Choose the Right Type
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                Which type of live-in care is right for your family?
              </h2>
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                Zento offers two distinct forms of live-in care, and the right one depends on how much support is genuinely needed overnight and beyond. A nursing assessment can help you decide — but here's the honest difference between the two.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto mt-4 font-medium">
                Not sure which applies to your situation? Our nursing team can assess this honestly, based on actual need — not a sales target.
              </p>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {liveInCareServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <div
                    key={service.name}
                    className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div>
                      {/* Icon */}
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <IconComp className="w-6 h-6" />
                      </div>
                      {/* Name */}
                      <h3 className="mb-3 text-lg font-bold text-secondary leading-snug">
                        {service.name}
                      </h3>
                      {/* Description */}
                      <p className="text-sm leading-relaxed text-zinc-600 mb-6">{service.desc}</p>
                    </div>

                    {/* Footer link */}
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
                );
              })}
            </div>

            {/* Speak to our team CTA */}
            <div className="mt-10 flex justify-center">
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>

            {/* Home Care cross-sell note */}
            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-secondary leading-relaxed">
                Looking for hourly or daytime-only visits instead of live-in support?
              </p>
              <Link
                href="/home-care/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 shrink-0"
              >
                See our visiting home care services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — LIVE-IN CARE VS A CARE HOME (dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          {/* Background glow */}
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              {/* Text Column */}
              <div className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  Honest Comparison
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Live-in care vs a care home —{" "}
                  <span className="text-primary">what's actually different</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Cost is usually the first question families ask, and the honest answer is that live-in care is often more cost-effective than people assume — particularly for couples. Because one carer can support two people living together, live-in care frequently works out considerably cheaper than two separate care home places, which are charged individually.
                  </p>
                  <p>
                    Consistency is the other major difference. In a care home, residents are typically supported by a large, frequently rotating staff team across different shifts. Live-in care means one or two familiar carers, matched specifically to your loved one — which matters enormously for anyone who finds unfamiliar faces disorientating, particularly with dementia.
                  </p>
                  <p>
                    Neither option is automatically right. Some families' needs are better met by residential care, particularly where clinical needs are very complex. Our nursing team will always give an honest view — including if live-in care isn't the right fit — rather than steer every conversation toward a sale.
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 mb-10 backdrop-blur-sm">
                  <div className="absolute -top-3 left-6 text-5xl text-primary leading-none font-black">&ldquo;</div>
                  <p className="pt-4 text-base md:text-lg leading-relaxed italic text-white/90">
                    Our nursing team will always tell you what's actually right for your family — even if that means live-in care isn't the answer. Honesty matters more than making a sale.
                  </p>
                  <footer className="mt-4 text-sm font-bold text-primary not-italic">
                    — Our Clinical Lead, Zento Group
                  </footer>
                </blockquote>
              </div>

              {/* Brand Image Card */}
              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Zento Trusted Caregiver and Client Team"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — THE NURSE-LED DIFFERENCE
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              {/* Text Column */}
              <div className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Why nurse-led live-in care matters
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                  <p>
                    Matching matters more in live-in care than in almost any other type of support, because this is someone sharing a home, not visiting it briefly. At Zento, a registered nurse leads that matching process — assessing not just care needs, but routine, personality and what will actually make the arrangement work day to day.
                  </p>
                  <p>
                    Once care begins, the plan doesn't sit still. Our nursing team reviews it regularly, adjusting as needs change — because a live-in arrangement that suited someone six months ago may need to look different today.
                  </p>
                </div>
              </div>

              {/* Image Column */}
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Nurse-led care team supporting client at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 — HOW IT WORKS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange live-in care with Zento
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Steps */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item:{
                step:string,
                title:string,
                desc:string,
                link?:{
                  href:string,
                  label:string
                }
              }, index) => (
                <div key={index} className="relative flex flex-col">
                  {/* Connector line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px bg-primary/20 lg:block" />
                  )}
                  <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-lg ring-1 ring-primary/10">
                    {item.step}
                  </div>
                  <div className="text-center">
                    <h3 className="mb-3 text-lg font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                    {item?.link && (
                      <Link
                        href={item.link.href}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        {item.link.label} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
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
            SECTION 7 — COSTS & FUNDING
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Costs &amp; Funding
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-6">
                How much does live-in care cost in Scotland?
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-base leading-relaxed text-zinc-600 mb-12">
              <p>
                Live-in care is typically priced weekly, with cost depending on whether overnight-only support or full 24-hour cover is needed.
              </p>
              <p>
                Several funding routes may apply. Scotland's Free Personal Care scheme can support personal care elements for eligible over-65s, and council-funded assessments or Self-Directed Support may also contribute. For the highest-complexity needs, NHS Continuing Care — administered through local Health Boards such as NHS Lothian or NHS Tayside — may fund some or all of the cost where eligibility criteria are met.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <ModalButton
                type="assessment"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Families We&apos;ve Supported
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                What families say about Zento&apos;s live-in care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Testimonial cards */}
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Stars */}
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="flex-1 text-sm leading-relaxed text-zinc-600 italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="border-t border-zinc-200 pt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-secondary">{t.author}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" /> {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Reviews link */}
            <div className="mt-10 text-center">
              <a
                href="https://www.google.com/search?q=Zento+Care+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Read all our reviews on Google <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="text-center">
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
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about live-in care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>

              {/* Accordion */}
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
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
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — RELATED / EXPLORE OPTIONS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Explore Options
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Explore our live-in care options
              </h2>
              <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
                Learn more about each type of live-in care, or explore our visiting home care services for daytime-only support.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                const accentBg = service.accent === "primary" ? "bg-primary" : "bg-secondary";
                const accentBgLight = service.accent === "primary" ? "bg-primary/10" : "bg-secondary/10";
                const accentText = service.accent === "primary" ? "text-primary" : "text-secondary";
                const accentShadow = service.accent === "primary" ? "shadow-primary/20" : "shadow-secondary/20";
                const accentBorder = service.accent === "primary" ? "hover:border-primary/30" : "hover:border-secondary/30";
                const accentShadowHover = service.accent === "primary" ? "hover:shadow-primary/10" : "hover:shadow-secondary/10";
                return (
                  <div
                    key={service.name}
                    className={`group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 ${accentBorder} hover:shadow-2xl ${accentShadowHover}`}
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              {/* Decorative blobs */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about live-in care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Whether you need overnight support or full round-the-clock care, our nursing team can help you find the right fit — with no pressure and no obligation.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from our registered nurses.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton
                    type="assessment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a free assessment <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a
                      key={office.id}
                      href={office.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      Call {office.shortName}: {office.phone}
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
