import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Personal Care at Home | Nurse-Led Support | Zento",
  description:
    "Our nurses oversee personal care across Edinburgh and Lothian — bathing, dressing, continence and mobility. Dignified, compassionate care at home. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/personal-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Personal Care at Home | Nurse-Led Support | Zento",
    description:
      "Our nurses oversee personal care across Edinburgh and Lothian — bathing, dressing, continence and mobility. Dignified, compassionate care at home.",
    url: "https://zentogroup.co.uk/home-care/personal-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Personal Care at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Care at Home | Nurse-Led Support | Zento",
    description:
      "Our nurses oversee personal care across Edinburgh and Lothian — bathing, dressing, continence and mobility.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "They are avoiding bathing or showering — going several days without washing when this wasn't the case before",
  "Their clothing is less clean or less appropriate than it used to be, or they wear the same outfit for multiple days without noticing",
  "They have had a fall while moving around the bathroom, bedroom or when getting in or out of bed",
  "You have noticed unexplained skin soreness, pressure marks, redness or poor wound hygiene",
  "Continence is becoming harder to manage independently and there have been incidents at home",
  "Personal hygiene — oral care, hair, grooming — has declined and they seem unaware or unconcerned",
  "They are losing confidence about moving around the house and are becoming less active as a result",
  "They are asking for help with tasks they previously managed, or expressing worry about managing alone",
];

const included = [
  "Bathing and showering, including bed baths where mobility restricts access to the bathroom",
  "Dressing and undressing, including selecting appropriate clothing for the day or for bed",
  "Oral hygiene — brushing teeth, denture cleaning and care",
  "Hair washing, grooming, shaving and general personal appearance",
  "Skin care — applying creams, barrier products, lotions and ointments as required",
  "Continence support, including assistance with catheter care as clinically appropriate",
  "Mobility assistance — safe movement around the home, transfers between chair and bed, support with standing",
  "Medication prompting, where this forms part of the nurse-written care plan",
  "Nutrition and hydration monitoring — noting if your loved one is eating and drinking adequately",
  "Wellbeing observation — carers report any concerns to our nursing team after each visit",
];

const fundingRoutes = [
  {
    title: "Free Personal Care (Scotland)",
    desc: "For eligible over-65s, following a council care assessment. No means testing.",
  },
  {
    title: "Council care assessment",
    desc: "Through City of Edinburgh Council, Midlothian, East Lothian or West Lothian Council, or Perth and Kinross Council.",
  },
  {
    title: "Self-Directed Support / Direct Payments",
    desc: "The council funds care but you choose and manage the provider.",
  },
  {
    title: "Self-funding",
    desc: "Private pay. Usually more flexibility and faster start.",
  },
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "Our team responds the same day. There's no commitment and no pressure — just an honest conversation about what you're looking for.",
  },
  {
    step: "02",
    title: "A registered nurse visits your loved one at home",
    desc: "We arrange a proper nursing assessment at the client's home — not a phone assessment, not a sales call. The nurse assesses clinical needs, identifies any risks and discusses the right level of care with you.",
  },
  {
    step: "03",
    title: "We write a personalised care plan",
    desc: "The nurse writes the care plan. You review and approve it before anything begins. We then match a carer based on clinical suitability, personality and routine.",
  },
  {
    step: "04",
    title: "Care begins, and we stay involved",
    desc: "Your matched carer begins visits on the agreed schedule. Our nursing team reviews the care plan regularly and adjusts it when your loved one's needs change. You are not left to manage that alone.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "East Lothian", href: "/locations/lothian/east-lothian" },
  { label: "West Lothian", href: "/locations/lothian/west-lothian" },
  { label: "Perthshire", href: "/locations/perthshire" },
];

const faqs = [
  {
    q: "What is personal care at home?",
    a: "Personal care at home is the support a trained carer provides with activities of daily living (ADLs) — the personal tasks that become harder to manage safely as we age or as health changes. This includes bathing and showering, dressing, oral hygiene, continence care, skin care and mobility. It differs from domestic home help, which covers household tasks. Personal care is hands-on, delivered at the client's home and, at Zento, overseen by a registered nurse throughout.",
  },
  {
    q: "Is personal care available through Free Personal Care in Scotland?",
    a: "Yes. Scotland's Free Personal Care scheme means that eligible people aged 65 and over may receive personal care at home free of charge, regardless of their income or assets. Eligibility is assessed by your local council — City of Edinburgh Council or the relevant Lothian council for Edinburgh and Lothian clients; Perth and Kinross Council for Perthshire clients. The assessment is free and there is no means test. Our team can help you understand the process from your first conversation with us.",
  },
  {
    q: "What makes Zento's personal care different from other care providers in Edinburgh?",
    a: "The clinical oversight. Every personal care arrangement at Zento is planned and reviewed by a registered nurse — not a care coordinator or a scheduler. That means the care plan identifies and addresses your loved one's actual clinical risks: skin integrity, continence, nutrition, mobility and falls risk. It is reviewed regularly and adjusted when things change. Most Edinburgh home care agencies do not offer nurse-led care planning. Zento does.",
  },
  {
    q: "Will my loved one always have the same carer?",
    a: "Yes, wherever this is possible. Carer consistency matters enormously for personal care — it is an intimate service, and familiarity makes it both safer and more dignified. Zento matches carers based on clinical compatibility and personal fit, and we aim to maintain the same carer throughout. If a cover carer is ever needed, the existing care plan ensures continuity, and the covering carer is properly briefed before the visit.",
  },
  {
    q: "How quickly can personal care begin in Edinburgh or Perthshire?",
    a: "In most cases, we can arrange a nursing assessment within a few days of your first call. For urgent situations — including hospital discharge, where personal care is often needed quickly — we aim to have care in place within 24 to 48 hours of the assessment.",
  },
  {
    q: "Can personal care help with medication at home?",
    a: "Yes. Medication prompting is included within personal care visits where it forms part of the nurse-written care plan. For clients with more complex medication needs — polypharmacy, dementia, controlled drugs — our dedicated medication support service provides nurse-designed medication protocols with closer clinical oversight. Our nursing team determines the appropriate level of medication support during the initial assessment.",
  },
  {
    q: "Is personal care at home only for elderly people?",
    a: "No. While the majority of our personal care clients are older adults, we also support younger adults living with disabilities, chronic health conditions or recovering from surgery or illness. If you're unsure whether personal care is right for your situation, our nursing team is happy to talk it through without any commitment.",
  },
];

const relatedServices = [
  {
    title: "Medication Support at Home",
    href: "/home-care/medication-support",
    desc: "Nurse-designed medication prompting and administration — a clinical approach to one of the riskiest daily tasks.",
    icon: ShieldCheck,
  },
  {
    title: "Companionship Care",
    href: "/home-care/companionship",
    desc: "Regular visits that go beyond physical tasks — building a genuine relationship alongside practical support.",
    icon: Users,
  },
  {
    title: "Hospital Discharge Support",
    href: "/home-care/hospital-discharge",
    desc: "Nurse-led care planned before your loved one leaves hospital, ensuring a safe and supported transition home.",
    icon: Building2,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function PersonalCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Personal Care at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Personal Care at Home",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/personal-care",
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
      { "@type": "ListItem", position: 3, name: "Personal Care at Home", item: "https://zentogroup.co.uk/home-care/personal-care" },
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
                  <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <Link href="/home-care" className="hover:text-primary transition-colors font-medium">Home Care</Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">Personal Care at Home</span>
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
                  Nurse-Led Personal Care · Edinburgh, Lothian &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Personal Care at Home —{" "}
                  <span className="text-primary">Dignified Support</span> from Our Nursing Team
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Personal care at home provides practical, hands-on support with the activities of daily living —
                  bathing, dressing, continence, mobility and personal hygiene — delivered by a trained carer and
                  overseen at every stage by a registered nurse.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Speak to our nursing team <ArrowRight className="w-5 h-5" />
                </ModalButton>

                <a
                  href={OFFICES[0]?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Edinburgh: {OFFICES[0]?.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS PERSONAL CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Carer providing dignified personal care support at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is personal care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Personal care at home is the support a trained carer provides with activities of daily living
                    (ADLs) — the everyday tasks that become harder to manage safely and independently as we age or
                    as health changes. It includes bathing and showering, dressing and undressing, oral hygiene,
                    hair washing and grooming, continence support, mobility assistance and skin care.
                  </p>
                  <p>
                    It is distinct from domestic home help, which covers household tasks like cleaning and laundry:
                    personal care involves direct, hands-on assistance with personal tasks, often at intimate
                    moments, carried out in your loved one&apos;s own home.
                  </p>
                  <p>
                    For families in Edinburgh, Lothian and Perthshire, arranging personal care at home is often the
                    first step in managing a loved one&apos;s changing needs.
                  </p>
                  <p>
                    At Zento, personal care is nurse-led. A registered nurse assesses each client before care
                    begins, identifies any clinical risks and writes a care plan specific to that person&apos;s
                    needs.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOUR LOVED ONE MAY NEED PERSONAL CARE
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Warning Signs"
          title="Signs your loved one may need personal care at home"
          subtitle="Recognising when someone needs help with personal care is not always straightforward — many people find it difficult to accept and harder still to ask for. If any of the following are familiar, a nursing assessment is a sensible first step."
          signs={signs}
          ctaText="Book a free nursing assessment"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — WHAT'S INCLUDED
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Provide
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                What our personal care service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                Every visit is tailored to the individual&apos;s care plan. Personal care services from Zento include:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto mb-10">
              {included.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Heart className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                All personal care is overseen by a registered nurse. If your loved one&apos;s needs change — following illness, a fall or a hospital stay — the nurse reviews and updates the care plan before the carer&apos;s approach changes.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — THE NURSE-LED DIFFERENCE (dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why nurse-led personal care{" "}
                  <span className="text-primary">is different</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Most home care agencies in Edinburgh and across Scotland send a carer with a care plan written
                    by a coordinator. That coordinator may have no clinical training. At Zento, the care plan for
                    every personal care arrangement is written by a registered nurse — and that changes what the
                    care plan looks like, and what it actually addresses.
                  </p>
                  <p>
                    Before care begins, a nurse visits your loved one at home. They assess clinical risks that a
                    non-clinical coordinator would not identify: skin integrity, pressure risk, continence,
                    nutritional status, falls risk, mobility patterns. They build those risks into the care plan.
                    The carer arrives knowing what to look for, not just what to do.
                  </p>
                  <p>
                    When something changes — and with personal care, things do change — the nurse reviews the plan.
                    The carer doesn&apos;t improvise.
                  </p>
                </div>
              </div>

              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Zento registered nurse conducting a clinical care assessment"
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
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange personal care at home with Zento
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item, index) => (
                <div key={index} className="relative flex flex-col">
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
                </div>
              ))}
            </div>

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
            SECTION 7 — COSTS AND FUNDING
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                  Funding &amp; Cost
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                  How much does personal care at home cost in Scotland?
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              </div>

              <div className="space-y-4 text-base leading-relaxed text-zinc-600 mb-10">
                <p>
                  Visiting personal care in Edinburgh and Perthshire is typically priced by the hour, with cost
                  depending on the frequency and complexity of visits required.
                </p>
                <p>
                  Scotland has a significant advantage over the rest of the UK here. Under the Community Care and
                  Health (Scotland) Act 2002, people aged 65 and over who are assessed as needing personal care
                  may receive it free of charge — regardless of their income or savings. This is Scotland&apos;s
                  Free Personal Care policy, and it does not apply in England, Wales or Northern Ireland. It is
                  worth exploring before arranging private care.
                </p>
              </div>

              <h3 className="text-xl font-bold text-secondary mb-5">
                Funding routes available to Edinburgh, Lothian and Perthshire residents:
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                {fundingRoutes.map((route, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <p className="text-sm font-bold text-secondary mb-2">{route.title}</p>
                    <p className="text-sm leading-relaxed text-zinc-600">{route.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                Our nursing team can help you understand which route applies to your situation from your first conversation.
              </p>

              <div className="flex justify-center">
                <ModalButton
                  type="assessment"
                  className="page-cta-secondary-inline"
                >
                  Speak to our team <ArrowRight className="w-5 h-5" />
                </ModalButton>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's personal care"
          subtitle="Read how our nurse-led approach and matched carers make a meaningful difference for families across Edinburgh, Lothian, and Perthshire."
          testimonials={getTestimonials("homeCare.personalCare")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide personal care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-4 max-w-2xl mx-auto">
                Zento provides nurse-led personal care at home across Edinburgh and the Lothians from our Edinburgh
                office, and across Perthshire from our Crieff office. For detailed coverage in your specific area:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {locationLinks.map((loc) => (
                  <Link
                    key={loc.label}
                    href={loc.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
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
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="FAQs"
              title="Frequently asked questions about personal care at home"
              faqs={faqs}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — RELATED SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Related Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Families often combine personal care with...
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
                      className="group flex h-full flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10"
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

        {/* ════════════════════════════════════════════════════════
            SECTION 12 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FinalCTASection
              title="Speak to our nursing team about personal care"
              subtitle="Finding the right personal care for a loved one takes time — and it should. Our nursing team is here to help you understand the options, answer your questions honestly and arrange the right level of support without pressure."
              tagline="No pressure. No obligation. Honest advice from our registered nurses."
              phone={OFFICES[0]?.phone}
              ctaText="Book a free nursing assessment"
              ctaType="assessment"
            />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
