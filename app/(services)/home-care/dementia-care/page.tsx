import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  ShieldCheck,
  Brain,
  Sun,
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
  title: "Dementia Care at Home | Nurse-Led Support | Zento",
  description:
    "Nurse-led dementia care at home with consistent carers. We support familiar routines and safe medication management across Edinburgh and Scotland. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/dementia-care",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dementia Care at Home | Nurse-Led Support | Zento",
    description:
      "Nurse-led dementia care at home with consistent carers. We support familiar routines and safe medication management across Edinburgh and Scotland.",
    url: "https://zentogroup.co.uk/home-care/dementia-care",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Dementia Care at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dementia Care at Home | Nurse-Led Support | Zento",
    description:
      "Nurse-led dementia care at home with consistent carers and person-centred care plans across Edinburgh & Perthshire.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "They're becoming confused about time, place or familiar routines more often than before",
  "They've had near-misses or accidents involving the cooker, medication or leaving the home unsafely",
  "Personal hygiene and self-care have noticeably declined",
  "They're repeating questions or forgetting recent conversations more frequently",
  "Family members are managing informal care but finding it increasingly difficult to sustain",
  "They've become anxious, withdrawn or uncharacteristically agitated",
  "A recent diagnosis means the family needs to plan for ongoing support",
  "There have been changes in eating, sleeping or medication compliance linked to memory difficulties",
];

const included = [
  "A personalised care plan built around your loved one's history, preferences and daily rhythm",
  "Consistent, carefully matched carers — the same familiar faces wherever possible",
  "Personal care delivered with patience and understanding of dementia-specific needs",
  "Nurse-designed medication management, including support for complex or changing prescriptions",
  "Meal support with dementia-safe planning — familiar foods, manageable portions",
  "Structured routines that reduce confusion and support a sense of security",
  "Regular clinical review as the condition changes, with the care plan adjusted accordingly",
  "Ongoing communication with family, so you always know how things are going",
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "A conversation about your loved one's situation, with no pressure and no commitment.",
  },
  {
    step: "02",
    title: "A registered nurse visits and gets to know your loved one",
    desc: "This isn't a checklist assessment. The nurse takes time to understand their history, personality, routine and what dementia has changed for them specifically.",
  },
  {
    step: "03",
    title: "We build a person-centred care plan and match a carer",
    desc: "The plan reflects who your loved one actually is. We match a carer carefully, with continuity as the priority.",
  },
  {
    step: "04",
    title: "Care begins, and we review regularly",
    desc: "Support starts on an agreed schedule. Our nursing team reviews the plan regularly as needs change over time.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "Perthshire", href: "/locations/perthshire" },
];

const faqs = [
  {
    q: "Is it possible to care for someone with advanced dementia at home?",
    a: "In many cases, yes — with the right level of support in place, which may include overnight or live-in care as the condition progresses. Whether home care remains appropriate depends on individual circumstances, including safety, medical needs and the level of support available. Our nursing team can assess this honestly during a home visit and advise on the right option for your specific situation.",
  },
  {
    q: "How does consistent carer matching help someone with dementia?",
    a: "Familiarity reduces confusion and distress for people living with dementia. An unfamiliar face can be genuinely disorientating, whereas a consistent, trusted carer supports a sense of security and routine. At Zento, we prioritise carer consistency specifically for dementia clients, recognising how much it affects day-to-day wellbeing.",
  },
  {
    q: "What is person-centred dementia care?",
    a: "Person-centred dementia care is the UK's recognised clinical standard, set out in NICE guideline NG97. It means building care around the individual's history, personality and preferences, rather than focusing solely on the symptoms of dementia. The approach originates from Professor Tom Kitwood's concept of 'personhood' — the principle that someone living with dementia remains a full individual deserving of relationship and dignity throughout the condition.",
  },
  {
    q: "At what stage of dementia should we consider professional care at home?",
    a: "There's no single right moment — it depends on safety, the demands on family carers, and how the condition is progressing. Common triggers include near-misses with safety (the cooker, medication, leaving the house), a decline in self-care, or family carers reaching breaking point. A nursing assessment can help you understand whether now is the right time, without any pressure to commit.",
  },
  {
    q: "How is medication managed for someone with dementia?",
    a: "Medication management for dementia clients is designed by a registered nurse and reviewed regularly, accounting for the specific challenges dementia can bring — resistance to taking medication, forgetting doses, or confusion about the routine. This is closely linked to our dedicated medication support service, which many dementia clients also use.",
  },
  {
    q: "Can family stay involved in the dementia care plan?",
    a: "Yes, and we actively encourage it. Family input is invaluable in building a genuinely person-centred care plan — no one knows your loved one's history, preferences and personality better than the people who know them best. Our nursing team keeps family updated and involved throughout, not just at the initial assessment.",
  },
];

const relatedServices = [
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care",
    desc: "Patient, dignified support with daily personal care tasks.",
    icon: Heart,
  },
  {
    title: "Medication Support at Home",
    href: "/home-care/medication-support",
    desc: "Nurse-designed medication protocols for complex or changing prescriptions.",
    icon: ShieldCheck,
  },
  {
    title: "Respite Care at Home",
    href: "/home-care/respite-care",
    desc: "A genuine break for family carers, with the same consistent, nurse-led approach.",
    icon: Sun,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function DementiaCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dementia Care at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Dementia Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/dementia-care",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Care - Dementia Support",
    url: "https://zentogroup.co.uk/home-care/dementia-care",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led person-centred dementia care at home.",
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
      { "@type": "ListItem", position: 3, name: "Dementia Care at Home", item: "https://zentogroup.co.uk/home-care/dementia-care" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      <main className="flex-1">

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li><Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><Link href="/home-care" className="hover:text-primary transition-colors font-medium">Home Care</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><span className="font-semibold text-secondary" aria-current="page">Dementia Care at Home</span></li>
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
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Dementia Care · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Dementia Care at Home —{" "}
                  <span className="text-primary">Consistent, Nurse-Led Support</span> in Familiar Surroundings
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Dementia care at home means your loved one can continue living in the place that means the
                  most to them, supported by consistent carers and a care plan shaped around who they are — not
                  just their diagnosis. At Zento, every dementia care plan is written and reviewed by a registered
                  nurse, built on person-centred principles that are recognised as UK best practice.
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
                  Call Edinburgh: {OFFICES[0]?.phone}
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS DEMENTIA CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Carer engaging in person-centred dementia care routine at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is dementia care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Dementia care at home is support delivered to someone living with dementia in their own home,
                    rather than in a care home or residential setting. It typically combines personal care,
                    medication management, meal support and companionship, all shaped around maintaining familiar
                    routines — which matters enormously for someone whose sense of orientation and security depends
                    on consistency.
                  </p>
                  <p>
                    The UK&apos;s clinical guidance body, NICE, sets person-centred care as the recommended
                    standard for dementia support (guideline NG97) — an approach that treats the individual&apos;s
                    history, personality and preferences as central to good care, not an afterthought to managing
                    symptoms. This idea traces back to the work of Professor Tom Kitwood in the 1980s, whose concept
                    of &lsquo;personhood&rsquo; reshaped how dementia care is understood across the UK: the person
                    living with dementia remains a full individual throughout the condition, deserving of
                    relationship, dignity and genuine understanding — not just supervision.
                  </p>
                  <p>
                    At Zento, that principle isn&apos;t a phrase on a webpage. It shapes how we build every
                    dementia care plan, from which carer we match to how routines are structured around your loved
                    one&apos;s actual life history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS TO LOOK FOR
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Signs to Look For"
          title="Signs your loved one may need dementia care at home"
          subtitle="Recognising the signs of progressing dementia helps families put support in place before difficulties escalate. Our registered nurses can visit you at home for a confidential assessment."
          signs={signs}
          ctaText="Speak to our team"
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
                What our dementia care service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Brain className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                No two dementia care plans at Zento look the same, because no two people living with dementia are the same. That&apos;s the entire point of a person-centred approach.
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
                  Why nurse-led dementia care{" "}
                  <span className="text-primary">makes a real difference</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Dementia progresses. What works today may need to change in three months, and a care plan
                    that isn&apos;t clinically reviewed tends to fall behind — still following yesterday&apos;s
                    routine when today&apos;s needs have moved on. At Zento, a registered nurse reviews every
                    dementia care plan on a regular basis, watching for changes in cognition, behaviour, mobility
                    and medication response, and adjusting the approach before small difficulties become genuine
                    crises.
                  </p>
                  <p>
                    Carer consistency is something we treat as non-negotiable for dementia clients specifically. A
                    new or unfamiliar carer can be genuinely distressing for someone with dementia — our matching
                    process is built to protect against that as far as possible, and our nursing oversight means
                    the carer isn&apos;t working from a static plan but one that&apos;s kept properly up to date.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Registered nurse overseeing dementia care plan"
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
                How to arrange dementia care with Zento
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
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Funding &amp; Cost
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                How much does dementia care at home cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Dementia care is typically priced by the hour, with the overall cost depending on the number and
                  length of visits and whether overnight or live-in support is also needed.
                </p>
                <p>
                  Scotland&apos;s Free Personal Care scheme applies to eligible people aged 65 and over, regardless
                  of income, and can significantly reduce the cost of dementia-related personal care. Council-funded
                  assessments and Self-Directed Support are also worth exploring. Our team can help you understand
                  what applies to your situation.
                </p>
              </div>
              <ModalButton
                type="assessment"
                className="page-cta-secondary-inline"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's dementia care"
          subtitle="Real stories from families navigating dementia who found comfort, safety and continuity with our nurse-led team."
          testimonials={getTestimonials("homeCare.dementiaCare")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
              Coverage
            </span>
            <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
              Where we provide dementia care
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
            <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
              Zento provides nurse-led dementia care across Edinburgh and the Lothians from our Edinburgh office,
              and across Perthshire from our Crieff office.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {locationLinks.map((loc) => (
                <Link key={loc.label} href={loc.href} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about dementia care at home
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                      <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">{faq.q}</h3>
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
            SECTION 11 — RELATED SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Related Services
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Dementia care often includes...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <Link key={service.title} href={service.href} className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-secondary group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600 flex-1">{service.desc}</p>
                    <div className="mt-4 pt-4 border-t border-zinc-100">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about dementia care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  Every dementia journey is different. Our nursing team is here to talk it through honestly — with
                  no pressure and no obligation.
                </p>
                <p className="text-sm font-semibold text-white/70 italic">
                  No pressure. No obligation. Honest advice from our registered nurses.
                </p>
                <div className="page-cta-group-dark">
                  <ModalButton
                    type="assessment"
                    className="page-cta-on-dark-primary"
                  >
                    Book a free assessment <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  {OFFICES.map((office) => (
                    <a key={office.id} href={office.phoneHref} className="page-cta-on-dark-outline">
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
