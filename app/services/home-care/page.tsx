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
  Star,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import { OFFICES, CONTACT_NUMBER } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Home Care Services | Nurse-Led Care at Home | Zento",
  description:
    "Nurse-led home care services across Edinburgh, Lothian and Perthshire. Personal care, dementia support, respite and more — all overseen by registered nurses. Call us today.",
  alternates: {
    canonical: "https://zentogroup.co.uk/services/home-care/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care Services | Nurse-Led Care at Home | Zento",
    description:
      "Nurse-led home care services across Edinburgh, Lothian and Perthshire. Personal care, dementia support, respite and more — all overseen by registered nurses.",
    url: "https://zentogroup.co.uk/services/home-care/",
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
    href: "/services/home-care/personal-care/",
    desc: "Support with bathing, dressing, continence, mobility and personal hygiene, delivered with patience and dignity.",
    ctaLabel: "Learn more",
    icon: Heart,
  },
  {
    name: "Medication Support",
    href: "/services/home-care/medication-support/",
    desc: "Prompting, administering and monitoring medication under the oversight of a registered nurse.",
    ctaLabel: "Learn more",
    icon: ShieldCheck,
  },
  {
    name: "Companionship",
    href: "/services/home-care/companionship/",
    desc: "Regular social visits to reduce isolation, maintain routines and enjoy meaningful conversation and activities.",
    ctaLabel: "Learn more",
    icon: Users,
  },
  {
    name: "Meal Preparation",
    href: "/services/home-care/meal-preparation/",
    desc: "Nutritious meals planned around dietary needs and personal preferences, prepared in the client's own kitchen.",
    ctaLabel: "Learn more",
    icon: Utensils,
  },
  {
    name: "Hospital Discharge Support",
    href: "/services/home-care/hospital-discharge/",
    desc: "Short-term intensive care to help your loved one settle back home safely after a hospital stay.",
    ctaLabel: "Learn more",
    icon: Building2,
  },
  {
    name: "Dementia Care",
    href: "/services/home-care/dementia-care/",
    desc: "Consistent carers and familiar routines to support people living with dementia at every stage.",
    ctaLabel: "Learn more",
    icon: Brain,
  },
  {
    name: "Respite Care",
    href: "/services/home-care/respite-care/",
    desc: "Planned or emergency cover so family carers can take a genuine break, knowing their loved one is safe.",
    ctaLabel: "Learn more",
    icon: Sun,
  },
];

const steps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Call us or complete our enquiry form. We will listen carefully and answer any questions your family has, with no pressure and no obligation.",
  },
  {
    step: "02",
    title: "Nursing Assessment",
    desc: "One of our registered nurses visits your loved one at home to understand their needs, preferences and daily routine.",
    link: { label: "Learn more about our assessment process", href: "/how-it-works/" },
  },
  {
    step: "03",
    title: "Care Plan Written",
    desc: "Your nurse writes a personalised care plan and selects a carer matched to your loved one's personality and needs. You review and approve the plan before anything begins.",
  },
  {
    step: "04",
    title: "Care Begins",
    desc: "Your regular carer starts visits on a schedule that works for your family. Our nursing team reviews the plan regularly and adjusts it as needs change.",
  },
];

const testimonials = [
  {
    quote:
      "The nurse who came to assess my mother was thorough in a way we had not experienced before — she spotted issues with her medication that two previous agencies had missed. That gave us enormous confidence before care even started.",
    author: "Sandra M.",
    location: "Morningside",
  },
  {
    quote:
      "We tried another agency first and the carers kept changing. With Zento, the same two carers have been visiting my father for six months. He knows their names, looks forward to their visits, and that consistency has made a real difference to his wellbeing.",
    author: "James R.",
    location: "Portobello",
  },
  {
    quote:
      "After my husband's stroke, hospital discharge felt overwhelming. Zento had a care plan ready within 48 hours and the transition home was far smoother than I thought possible. The nursing team stayed in touch throughout the first two weeks to make sure everything was right.",
    author: "Catherine B.",
    location: "Crieff",
  },
];

const faqs = [
  {
    q: "What is the difference between home care and a care home?",
    a: "Home care is professional support delivered in a person's own home, while a care home is a residential facility where the person moves in permanently or for a short stay. Home care allows your loved one to remain in familiar surroundings, keep their daily routines and stay close to family, friends and their local community. Many families choose home care because it preserves independence and can be more cost-effective than residential alternatives, particularly when Scotland's Free Personal Care funding is applied.",
  },
  {
    q: "What does nurse-led home care mean?",
    a: "Nurse-led home care means that every care plan is written, reviewed and supervised by a registered nurse rather than a non-clinical coordinator. At Zento, our nurses assess each client personally, design care around their specific medical and personal needs, train the carers who deliver that care, and conduct regular clinical reviews. This provides a level of oversight that standard care agencies do not typically offer.",
  },
  {
    q: "How do I arrange home care for a parent or family member?",
    a: "Start by contacting us for a free, no-obligation consultation. One of our registered nurses will arrange a home visit to assess your loved one's needs, after which we write a personalised care plan and match a carer to your family. The whole process from initial call to the first care visit can be completed within days, depending on urgency. Emergency or short-notice arrangements are also possible.",
  },
  {
    q: "What home care services are available for someone with dementia?",
    a: "Zento provides specialist dementia care at home, focusing on consistent carer matching, familiar daily routines and medication management under nurse supervision. Our carers are trained in person-centred dementia care, and our nursing team reviews each care plan regularly as the condition progresses. Keeping a person with dementia in their own home, surrounded by what they know, often supports their wellbeing more than an unfamiliar residential setting.",
  },
  {
    q: "Is home care available on evenings, weekends and overnight?",
    a: "Zento provides care visits at any time of day, including early mornings, evenings, weekends and public holidays. For families who need overnight support, we offer both sleep-in and waking-night care options. Round-the-clock support is available through our live-in care service, where a dedicated carer stays in the client's home. Our nursing team builds a schedule that fits around your family's life.",
  },
  {
    q: "How is home care funded in Scotland?",
    a: "In Scotland, Free Personal Care provides funding for the personal care element of home care for eligible adults aged 65 and over, regardless of income or savings. Younger adults may also qualify under Frank's Law. Additional funding options include a council care needs assessment, Self-Directed Support and Direct Payments. Many families also choose to fund care privately, either in full or alongside council support. Our team will help you understand which routes apply to your situation.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh/" },
  { label: "Midlothian", href: "/locations/lothian/midlothian/" },
  { label: "East Lothian", href: "/locations/lothian/east-lothian/" },
  { label: "West Lothian", href: "/locations/lothian/west-lothian/" },
  { label: "Perthshire", href: "/locations/perthshire/" },
  { label: "Crieff", href: "/locations/perthshire/crieff/" },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function HomeCarePage() {
  /* ── JSON-LD: Service schema ── */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nurse-Led Home Care Services",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Home Care",
    areaServed: [
      "City of Edinburgh",
      "Midlothian",
      "East Lothian",
      "West Lothian",
      "Perthshire",
    ],
    url: "https://zentogroup.co.uk/services/home-care/",
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
        name: "Home Care",
        item: "https://zentogroup.co.uk/services/home-care/",
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
                    Home Care
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
            <div className="mx-auto max-w-4xl space-y-6">
              <div>
                {/* Badge */}
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Nurse-Led Home Care · Edinburgh, Lothian &amp; Perthshire
                </span>

                {/* H1 */}
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Our Home Care Services —{" "}
                  <span className="text-primary">Personal, Visiting</span> and Daily Living Care
                </h1>

                {/* Lead paragraph */}
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care services for older adults across Edinburgh,
                  Lothian and Perthshire. Every care plan is written by a registered nurse, not a
                  coordinator, and every visit is backed by clinical oversight that most care
                  agencies simply do not offer. Whether your family needs a few hours of personal
                  care each week or daily support to stay safely at home, our team is here.
                </p>
              </div>

              {/* 2 CTAs Only */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ModalButton
                  type="assessment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
                >
                  Arrange a free consultation <ArrowRight className="w-5 h-5" />
                </ModalButton>

                <a
                  href={OFFICES[0]?.phoneHref || `tel:${CONTACT_NUMBER.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Now: {CONTACT_NUMBER}
                </a>
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
                  What are home care services?
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                  <p>
                    Home care services are professional care and support delivered in a person&apos;s
                    own home, allowing older adults to remain independent in familiar surroundings
                    rather than moving into a residential or nursing home. A home care package
                    typically includes help with personal care such as washing and dressing, medication
                    support, meal preparation, companionship and household tasks — tailored to the
                    individual&apos;s needs and preferences.
                  </p>
                  <p>
                    Home care can range from a single weekly visit to multiple daily calls, or even
                    round-the-clock live-in support. In Scotland, eligible adults aged 65 and over can
                    access Free Personal Care, which covers the cost of personal care at home regardless
                    of income. A care needs assessment through your local council is the first step.
                  </p>
                  <p>
                    What sets one provider apart from another is how that care is planned and
                    supervised. At Zento, every care plan is developed and regularly reviewed by a
                    registered nurse — a standard of clinical oversight that goes beyond what most
                    domiciliary care agencies provide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — SERVICE GRID
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50/50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Our Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                Home care services we provide
              </h2>
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                We offer a full range of visiting home care services, each planned by our nursing
                team and delivered by trained carers who know your family. Select a service below
                for full details.
              </p>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {homeCareServices.map((service) => {
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

            {/* Live-in Care note */}
            <div className="mt-10 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-secondary leading-relaxed">
                Looking for overnight or 24-hour support?
              </p>
              <Link
                href="/live-in-care/"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:scale-105 shrink-0"
              >
                See our live-in care services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — NURSE-LED DIFFERENTIATOR (dark bg)
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
                    complex health conditions and liaise directly with GPs and hospital teams. It also
                    means the carers delivering care in your home are trained and supervised to a
                    clinical standard, not just a general one.
                  </p>
                  <p>
                    Every care package at Zento is assessed, planned and regularly reviewed by our
                    nursing team. We are registered with the Care Inspectorate (registration numbers{" "}
                    <span className="text-white font-semibold">CS2026000326</span> (Support Service)
                    and{" "}
                    <span className="text-white font-semibold">CS2026000325</span> (Housing Support
                    Service)) and proud that nursing oversight is built into every level of the
                    service we provide.
                  </p>
                </div>

                {/* Quote */}
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

                <Link
                  href="/about/our-team/"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary hover:text-white"
                >
                  Meet our nursing team <ArrowRight className="w-4 h-4" />
                </Link>
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
                How to get started with home care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Steps */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item, index) => (
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
                    {item.link && (
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
            SECTION 7 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Families We&apos;ve Supported
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                What families say about Zento&apos;s home care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            {/* Testimonial cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
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
        <section className="border-t border-zinc-100 bg-zinc-50 py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="text-center">
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
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about home care services
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>

              {/* Accordion */}
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-zinc-200 bg-zinc-50 open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200"
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
            SECTION 11 — FIND HOME CARE NEAR YOU
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Local Offices
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Find home care near you
              </h2>
              <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
                We provide home care services from two local offices. Select your area to see
                detailed coverage, meet your local team and get in touch.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
              {/* Edinburgh card */}
              <div className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Home className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Edinburgh</h3>
                <p className="text-sm leading-relaxed text-zinc-600 mb-6 flex-1">
                  Our Edinburgh office serves all City of Edinburgh postcodes, Midlothian, East
                  Lothian and West Lothian.
                </p>
                <Link
                  href="/locations/edinburgh/"
                  className="mt-auto flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  View Edinburgh home care <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Perthshire card */}
              <div className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Perthshire</h3>
                <p className="text-sm leading-relaxed text-zinc-600 mb-6 flex-1">
                  Our Crieff office serves Crieff, Comrie, Muthill, Braco and surrounding
                  Perthshire villages.
                </p>
                <Link
                  href="/locations/perthshire/"
                  className="mt-auto flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-bold text-white shadow-md shadow-secondary/20 transition-all hover:bg-secondary/90"
                >
                  View Perthshire home care <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                  Speak to our nursing team today
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Finding the right care for someone you love is rarely straightforward. Our nursing
                  team is here to listen, answer your questions and give you an honest picture of
                  what support is possible — whether that is a few visits a week or full-time care
                  at home.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from registered nurses.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton
                    type="assessment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Book a free consultation <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a
                      key={office.id}
                      href={office.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
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
