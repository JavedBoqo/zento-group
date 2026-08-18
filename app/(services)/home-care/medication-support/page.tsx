import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Clock4,
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
  title: "Medication Support at Home | Nurse-Led Care | Zento",
  description:
    "Safe medication prompting and administration, overseen by our nurses. Reducing risks and giving families genuine peace of mind. Edinburgh & Lothian. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/medication-support/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Medication Support at Home | Nurse-Led Care | Zento",
    description:
      "Safe medication prompting and administration, overseen by our nurses. Reducing risks and giving families genuine peace of mind. Edinburgh & Lothian.",
    url: "https://zentogroup.co.uk/home-care/medication-support/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Medication Support at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medication Support at Home | Nurse-Led Care | Zento",
    description:
      "Safe medication prompting and administration, overseen by our nurses. Edinburgh & Lothian.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const medicationLevels = [
  {
    title: "Medication prompting",
    desc: "Reminding someone to take their medication at the correct time, when they are still capable of self-administering and in control of their medicines.",
  },
  {
    title: "Medication assistance",
    desc: "Providing physical help with the task of taking medication — opening packaging, handing over a dosette box or blister pack — for someone who can still control their medicines but needs practical support.",
  },
  {
    title: "Medication administration",
    desc: "Physically giving medication to someone on their behalf, according to a clinical protocol, when they can no longer safely self-administer.",
  },
];

const signs = [
  "They are regularly forgetting to take medication, or are unsure whether they have already taken it",
  "You have noticed blister packs or dosette boxes that don't match the expected pattern — doses missed, or too many taken",
  "They have been hospitalised recently for a medication-related reason — a missed dose, an adverse reaction or an interaction between prescriptions",
  "They take four or more medications daily (polypharmacy), which significantly increases the risk of confusion and error",
  "They have a diagnosis of dementia or mild cognitive impairment that affects their ability to follow a medication routine",
  "They express anxiety or confusion about their medication — what each one is for, when to take it, or what to do when the prescription changes",
  "Their medication schedule has recently been changed significantly, such as following a hospital discharge or a GP review",
  "They live alone and there is no family member nearby who can monitor their medication reliably",
];

const included = [
  "Medication prompting at agreed visit times, following the nurse-written care plan",
  "Physical assistance with packaging — opening blister packs, dosette boxes, sachets or other formats",
  "Medication administration where clinically appropriate, following a nurse-written protocol reviewed and approved before care begins",
  "Monitoring for side effects, adverse reactions or changes in the client's response to medication",
  "Recording of medication given at each visit — a clear, auditable record maintained by the carer",
  "Communication with GPs and pharmacies when changes are needed or clinical concerns arise",
  "Protocol update when prescription changes — the nurse revises the medication protocol before the carer adapts their approach",
  "Escalation to our nursing team if anything unexpected is observed during or after a medication visit",
];

const fundingRoutes = [
  {
    title: "Free Personal Care (Scotland)",
    desc: "Eligible over-65s following a council assessment. Includes medication support within personal care.",
  },
  {
    title: "Council care assessment",
    desc: "Through City of Edinburgh Council, Midlothian, East Lothian, West Lothian or Perth and Kinross Council.",
  },
  {
    title: "Self-Directed Support / Direct Payments",
    desc: "Council-funded care you manage and purchase yourself.",
  },
  {
    title: "Self-funding",
    desc: "Private pay — typically more flexibility and a faster start.",
  },
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "Our team responds the same day. No commitment, no pressure.",
  },
  {
    step: "02",
    title: "A registered nurse reviews your loved one's full medication list",
    desc: "The assessment covers every prescribed medication, the dosing schedule, any known interactions or risks, the format of the medication and the appropriate level of support. Controlled drugs and complex regimens are assessed with particular care.",
  },
  {
    step: "03",
    title: "The nurse writes a medication protocol",
    desc: "A written clinical protocol is produced, specifying exactly what the carer will do at each visit — what is given, when, how and what to record. You review and approve it. The carer is briefed before care begins.",
  },
  {
    step: "04",
    title: "Support begins, and the nurse stays involved",
    desc: "Carers follow the protocol. Our nursing team reviews it whenever the prescription changes, and at regular planned intervals throughout the care relationship. Changes to the medication plan are always nurse-approved before they are implemented.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh/" },
  { label: "Midlothian", href: "/locations/lothian/midlothian/" },
  { label: "East Lothian", href: "/locations/lothian/east-lothian/" },
  { label: "Perthshire", href: "/locations/perthshire/" },
];

const faqs = [
  {
    q: "What is the difference between medication prompting and medication administration?",
    a: "Medication prompting means reminding someone to take their medication at the correct time, when they are still able to self-administer and in control of their own medicines. Medication administration means physically giving medication on behalf of someone who can no longer safely take it themselves, following a clinical protocol written by a registered nurse. At Zento, a registered nurse determines which level of support each client requires during the initial assessment. Carers do not make this judgement independently.",
  },
  {
    q: "Can a home carer in Scotland give medication?",
    a: "Yes, within defined clinical limits. In Scotland, home carers working under a nurse-designed care plan can provide medication prompting, assistance with self-administration and, where clinically appropriate, medication administration — provided this is specified in a care plan approved by a registered nurse and the carer has received appropriate training. At Zento, no carer delivers medication support without a nurse-written protocol in place. Our services are registered with the Care Inspectorate, Scotland's independent regulator.",
  },
  {
    q: "Can Zento help with controlled drugs at home?",
    a: "Controlled drugs require stricter handling under the Misuse of Drugs Regulations. Whether and how a home carer can assist with a controlled medication depends on the specific drug, the client's needs, the prescribing arrangements and the clinical protocol in place. Our nursing team assesses controlled drug requirements on a case-by-case basis during the initial assessment. We do not make blanket commitments without reviewing the specifics — because the specifics matter.",
  },
  {
    q: "What happens if my loved one's GP changes their medication?",
    a: "Any change to a prescribed medication should be communicated to our nursing team as soon as possible. The nurse reviews the updated prescription, updates the medication protocol accordingly and briefs the carer before they implement the new regimen. Carers at Zento do not adapt medication routines without nurse approval — the protocol is updated first.",
  },
  {
    q: "Is medication support available for someone with dementia?",
    a: "Yes. Safe medication management is one of the most important aspects of dementia care at home. Our nursing team designs medication protocols that account for cognitive impairment — including approaches for a client who may resist taking medication, forget whether they have already taken it, or become distressed about the medication routine. Regular nurse reviews ensure the protocol adapts as the condition changes.",
  },
  {
    q: "Can medication support be included in an overnight care arrangement?",
    a: "Yes. For clients who require medication during the night — time-sensitive medications, insulin, controlled drugs or overnight feeds — our overnight carers can provide medication support as part of a nurse-written overnight protocol. This is particularly relevant following hospital discharge or for clients with complex medical conditions.",
  },
  {
    q: "What if my loved one manages multiple medications daily?",
    a: "Polypharmacy — taking four or more medications daily — significantly increases the risk of error, interaction and adverse reaction. It is one of the most common reasons families contact us. At Zento, the nurse who assesses a client with a complex medication list is looking specifically for interaction risks, high-risk medication types and timing requirements that need clinical management. The resulting protocol reflects that complexity in a way that a standard care plan does not.",
  },
];

const relatedServices = [
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care/",
    desc: "Daily personal care visits that include medication prompting as part of a broader nurse-led care plan.",
    icon: Heart,
  },
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care/",
    desc: "Nurse-led dementia care with consistent carers, safe medication management and regular clinical reviews.",
    icon: ShieldCheck,
  },
  {
    title: "Overnight Care at Home",
    href: "/live-in-care/overnight-care/",
    desc: "Sleep-in and waking-night care for clients with medication needs that extend into the night hours.",
    icon: Clock4,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function MedicationSupportPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Medication Support at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Medication Support at Home",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/medication-support/",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Home Care", item: "https://zentogroup.co.uk/home-care/" },
      { "@type": "ListItem", position: 3, name: "Medication Support at Home", item: "https://zentogroup.co.uk/home-care/medication-support/" },
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
                  <Link href="/home-care/" className="hover:text-primary transition-colors font-medium">Home Care</Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">Medication Support at Home</span>
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
                  Nurse-Led Medication Support · Edinburgh, Lothian &amp; Perthshire
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Medication Support &amp; Management at Home —{" "}
                  <span className="text-primary">Overseen by Registered Nurses</span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Medication support at home means ensuring your loved one takes the right medicines at the right
                  time — safely, consistently and under proper clinical oversight. At Zento, that oversight comes
                  from a registered nurse: not a care coordinator who writes a reminder into a care plan, but a
                  clinician who reviews the medication list, identifies the risks and designs a safe protocol
                  before a carer ever picks up a blister pack.
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
            SECTION 2 — WHAT IS MEDICATION SUPPORT?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.png"
                  alt="Registered nurse reviewing medication protocol with a home care client"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is medication support at home?
                </h2>
                <p className="text-base leading-relaxed text-zinc-600">
                  Medication support at home covers the clinical assistance provided to help someone manage their
                  prescribed medicines safely and consistently. There are three distinct levels of support, each
                  requiring a different approach:
                </p>

                <div className="space-y-4">
                  {medicationLevels.map((level, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5"
                    >
                      <p className="text-sm font-bold text-secondary mb-1">{level.title}</p>
                      <p className="text-sm leading-relaxed text-zinc-600">{level.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-zinc-600">
                  The distinction matters. Each level carries different responsibilities, different training
                  requirements and different clinical risks. At Zento, a registered nurse determines which level
                  of medication support is appropriate for each client during the initial assessment.
                </p>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOUR LOVED ONE NEEDS MEDICATION SUPPORT
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Warning Signs"
          title="Signs your loved one may need medication support at home"
          subtitle="Medication errors are one of the leading causes of avoidable hospital admissions in older adults. If any of these signs sound familiar, our nursing team can help."
          signs={signs}
          ctaText="Speak to our nursing team"
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
                What our medication support service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                Medication support from Zento is nurse-designed and carer-delivered, with clinical oversight throughout:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-10">
              {included.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                No carer at Zento delivers medication support without a nurse-written protocol in place. There is no informal &lsquo;reminder system&rsquo; — there is a clinical process, designed by a nurse.
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
                  Why nurse-led medication support{" "}
                  <span className="text-primary">is different</span>
                </h2>

                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Medication management is the area where the absence of clinical oversight causes the most harm.
                    Research has consistently found that a significant proportion of older people receiving care
                    without dedicated nursing oversight experience at least one medication error — missed doses,
                    incorrect timing, unrecognised adverse reactions — over the course of a year. These are the
                    risks that proper nursing oversight exists to prevent.
                  </p>
                  <p>
                    At Zento, medication support is not a box on a care plan. Before a carer ever visits for
                    medication support, a registered nurse reviews the client&apos;s full medication list. They
                    check for interactions. They identify high-risk medications — anticoagulants, hypoglycaemics,
                    cardiac drugs, controlled substances — and build specific safeguards into the protocol. They
                    specify exactly what the carer does at each visit and what they do not do.
                  </p>
                  <p>
                    If the GP changes a prescription, the nurse updates the protocol before the carer changes
                    their approach. Most home care agencies in Edinburgh have a carer who prompts medication and
                    a coordinator who knows the medication list. At Zento, a nurse designs the process and a
                    carer delivers it.
                  </p>
                </div>
              </div>

              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.png"
                    alt="Zento registered nurse reviewing medication safety protocols"
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
                How to arrange medication support at home with Zento
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
                  How much does medication support at home cost in Scotland?
                </h2>
                <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              </div>

              <div className="space-y-4 text-base leading-relaxed text-zinc-600 mb-10">
                <p>
                  Medication support is typically included within the cost of a home care visit rather than charged
                  separately. The cost depends on the frequency of visits and the level of support required.
                </p>
                <p>
                  Scotland&apos;s Free Personal Care scheme may apply. Eligible people aged 65 and over may receive
                  personal care at home — which includes medication support — free of charge, following a council
                  assessment. This applies regardless of income or assets and is unique to Scotland.
                </p>
              </div>

              <h3 className="text-xl font-bold text-secondary mb-5">Funding routes available:</h3>

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

              <div className="flex justify-center">
                <ModalButton
                  type="assessment"
                  className="page-cta-secondary-inline"
                >
                  Discuss your situation with our nursing team <ArrowRight className="w-5 h-5" />
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
          title="What families say about Zento's medication support"
          subtitle="How nurse-overseen medication administration and daily prompting provides complete reassurance to families."
          testimonials={getTestimonials("homeCare.medicationSupport")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
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
                Where we provide medication support
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
                Nurse-led medication support is available across Edinburgh and the Lothians from our Edinburgh
                office, and across Perthshire and Crieff from our Crieff office.
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
              title="Frequently asked questions about medication support at home"
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
                Families often combine medication support with...
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
              title="Speak to our nursing team about medication support"
              subtitle="Medication management is one of the areas where getting care right matters most. Our nursing team is here to review your loved one's situation, assess the appropriate level of support and put a proper clinical plan in place."
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
