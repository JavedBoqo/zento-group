import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Heart,
  Sun,
  Brain,
  CheckCircle2,
  Star,
  ChevronDown,
  MapPin,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import { OFFICES } from "@/constants";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Companionship Care at Home | Nurse-Led | Zento",
  description:
    "Regular companionship visits across Edinburgh and Lothian. Our carers build meaningful relationships — consistent faces your loved one can trust. Call us.",
  alternates: {
    canonical: "https://zentogroup.co.uk/home-care/companionship",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Companionship Care at Home | Nurse-Led | Zento",
    description:
      "Regular companionship visits across Edinburgh and Lothian. Our carers build meaningful relationships — consistent faces your loved one can trust.",
    url: "https://zentogroup.co.uk/home-care/companionship",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Companionship Care at Home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companionship Care at Home | Nurse-Led | Zento",
    description:
      "Regular companionship visits across Edinburgh and Lothian. Consistent, meaningful relationships for your loved one.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const signs = [
  "They live alone and have limited regular contact with family, friends or neighbours",
  "They've recently lost a partner and are adjusting to living alone for the first time",
  "They've stopped attending clubs, social groups or places of worship they used to enjoy",
  "You've noticed a flatter mood, less enthusiasm, or reluctance to make plans",
  "They seem to be eating less or skipping meals when there's no one to share them with",
  "Phone calls or visits reveal a version of them that seems different from how they used to be",
  "They mention feeling bored, low or disconnected, even if they don't use the word 'lonely'",
  "Family members live far away and worry about how their loved one is really doing day to day",
];

const included = [
  "Regular visits from a consistent, familiar carer — not a rotating cast of strangers",
  "Conversation, company and genuine interest in your loved one's life, interests and history",
  "Help getting out and about — walks, appointments, social clubs, places of worship, visiting friends",
  "Shared activities — games, hobbies, reading, gardening, whatever your loved one enjoys",
  "Company at mealtimes, making eating a social occasion rather than something done alone",
  "Light assistance with everyday tasks that come up naturally during a visit",
  "Gentle observation of wellbeing — mood, appetite, engagement — reported back where it matters",
];

const steps = [
  {
    step: "01",
    title: "Call us or complete our enquiry form",
    desc: "No pressure, no commitment — just a conversation about your loved one and what might help.",
  },
  {
    step: "02",
    title: "We get to know your loved one",
    desc: "A member of our team visits to understand their interests, routine and what kind of companionship would genuinely suit them — not a generic assessment, a proper introduction.",
  },
  {
    step: "03",
    title: "We match a consistent companion",
    desc: "We match a carer based on personality and shared interests wherever possible, and aim to keep the same companion visiting each time.",
  },
  {
    step: "04",
    title: "Visits begin, and we stay in touch",
    desc: "Regular visits start on your agreed schedule. Our team checks in periodically to make sure the arrangement is genuinely working.",
  },
];

const locationLinks = [
  { label: "Edinburgh", href: "/locations/edinburgh" },
  { label: "Midlothian", href: "/locations/lothian/midlothian" },
  { label: "East Lothian", href: "/locations/lothian/east-lothian" },
  { label: "Perthshire", href: "/locations/perthshire" },
];

const faqs = [
  {
    q: "What is companionship care at home?",
    a: "Companionship care at home is a home care service focused on emotional and social wellbeing — regular visits from a trained carer who provides company, conversation and shared activities. It differs from personal care, which covers physical tasks like bathing and dressing, and can be arranged on its own or alongside other services.",
  },
  {
    q: "How is Zento's companionship service different from a befriending scheme?",
    a: "Befriending services are typically run by volunteers on a casual basis, without professional oversight. Zento's companionship care is delivered by trained carers, guided by our nursing team on wellbeing awareness — meaning changes in mood, appetite or engagement are more likely to be noticed and acted on. It is also a consistent, reliable arrangement rather than a volunteer-dependent one.",
  },
  {
    q: "Can companionship care help if my parent is showing signs of depression?",
    a: "Companionship care itself is not a treatment for depression, but consistent, trained visits can make a genuine difference to someone's mood and sense of connection. Our carers are guided to notice signs that something more clinical may be affecting your loved one, and to flag this so it can be properly addressed — whether that means a GP referral or an adjustment to their care.",
  },
  {
    q: "Can companionship visits include help with meals or light tasks?",
    a: "Yes. While the focus is on company and connection, a companionship visit often naturally includes sharing a meal, light tidying, or help with a small task. For more structured support with meal preparation or household tasks, this can be added to the care plan alongside companionship visits.",
  },
  {
    q: "Will my loved one have the same companion each time?",
    a: "We aim to match a consistent companion and maintain that relationship over time, because familiarity is central to what makes companionship care valuable. A revolving door of different carers undermines the entire purpose of the service, so carer consistency is a priority in how we plan visits.",
  },
  {
    q: "How often should companionship visits happen?",
    a: "This depends entirely on your loved one's circumstances and needs. Some families arrange a single weekly visit; others prefer several visits a week, particularly if their loved one lives alone with limited other contact. Our team can help you think through what frequency would genuinely help during your first conversation.",
  },
];

const relatedServices = [
  {
    title: "Personal Care at Home",
    href: "/home-care/personal-care",
    desc: "Daily hands-on support with bathing, dressing and hygiene, delivered under nurse-led oversight.",
    icon: Heart,
  },
  {
    title: "Respite Care at Home",
    href: "/home-care/respite-care",
    desc: "Planned or emergency cover for family carers, with the same consistent, nurse-led approach.",
    icon: Sun,
  },
  {
    title: "Dementia Care at Home",
    href: "/home-care/dementia-care",
    desc: "Consistent carers and nurse-led routines for clients living with dementia.",
    icon: Brain,
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function CompanionshipCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Companionship Care at Home",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Companionship Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/home-care/companionship",
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
      { "@type": "ListItem", position: 3, name: "Companionship Care", item: "https://zentogroup.co.uk/home-care/companionship" },
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
                <li><Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><Link href="/home-care" className="hover:text-primary transition-colors font-medium">Home Care</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><span className="font-semibold text-secondary" aria-current="page">Companionship Care</span></li>
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
                  Companionship Care · Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Companionship Care —{" "}
                  <span className="text-primary">Meaningful Visits</span> That Go Beyond the Routine
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Companionship care at home provides regular, meaningful visits from a consistent carer — someone
                  who becomes a familiar and trusted presence in your loved one&apos;s week, not just a name on a
                  rota. At Zento, companionship visits are informed by nurse-led awareness of wellbeing, so a
                  friendly visit can also be the first place a change in health or mood gets noticed.
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
                  href={OFFICES.find((o) => o.id === "crieff")?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Crieff: {OFFICES.find((o) => o.id === "crieff")?.phone}
                </a>
                <a
                  href={OFFICES.find((o) => o.id === "edinburgh")?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Edinburgh: {OFFICES.find((o) => o.id === "edinburgh")?.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — WHAT IS COMPANIONSHIP CARE?
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Carer providing warm companionship to an elderly person at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  What is companionship care at home?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Companionship care is a home care service focused on emotional and social wellbeing rather
                    than physical or medical tasks. A trained carer visits regularly to provide company,
                    conversation, shared activities and a genuine, consistent relationship — helping to reduce
                    the isolation that can affect older people living alone or with reduced mobility.
                  </p>
                  <p>
                    A typical visit might include a chat over tea, a shared hobby, help getting to a social club
                    or place of worship, a walk outside, or simply someone to share a meal with. It&apos;s a
                    different kind of support from personal care — less about physical tasks, more about
                    connection. But for many families, it is just as important.
                  </p>
                  <p>
                    Loneliness in later life is a significant and widely under-recognised health concern.
                    According to Age UK, over 1.4 million older people in the UK experience loneliness every
                    day — and the impact isn&apos;t just emotional. Sustained loneliness is linked to higher
                    rates of depression, cognitive decline and physical health problems.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — SIGNS YOUR LOVED ONE MAY NEED COMPANIONSHIP
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Signs to Look For"
          title="Signs your loved one may benefit from companionship care"
          subtitle="Social isolation and loneliness can develop gradually. If you are noticing changes in your loved one's engagement, mood or confidence, our team is here to support you."
          signs={signs}
          ctaText="Speak to our team"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — WHAT'S INCLUDED
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                What We Provide
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">
                What our companionship service includes
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mb-8">
              {included.map((item, i) => (
                <AnimateItem key={i} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="max-w-4xl mx-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
              <p className="text-sm leading-relaxed text-secondary font-medium text-center">
                Every companionship care plan is built around the individual — their interests, their routine and what genuinely matters to them. It&apos;s not a script. It&apos;s a relationship.
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
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Difference
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why nurse-informed companionship{" "}
                  <span className="text-primary">makes a difference</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Most companionship services are purely social — a companion visits, has a nice chat, and
                    leaves. There&apos;s real value in that. But loneliness in older people is rarely just about
                    loneliness. It can mask early depression. It can accelerate cognitive decline. It can hide a
                    decline in appetite, mobility or self-care that a family only discovers much later, when
                    it&apos;s harder to address.
                  </p>
                  <p>
                    At Zento, our carers are guided by our nursing team on what to notice — not to diagnose,
                    but to recognise when a change in mood, appetite or engagement is worth a proper conversation
                    with the family. A companionship visit at Zento isn&apos;t just company. It&apos;s a regular,
                    trained pair of eyes on your loved one&apos;s overall wellbeing.
                  </p>
                </div>
              </AnimateContainer>
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Zento carer building a meaningful relationship with a client"
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
            SECTION 6 — HOW IT WORKS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Getting Started
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange companionship care with Zento
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {steps.map((item, index) => (
                <AnimateItem key={index} className="relative flex flex-col">
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
                </AnimateItem>
              ))}
            </AnimateContainer>
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
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Funding &amp; Cost
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                How much does companionship care cost in Scotland?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-8" />
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 text-left mb-8">
                <p>
                  Companionship visits are typically priced by the hour or by the visit, depending on frequency
                  and duration.
                </p>
                <p>
                  Companionship care doesn&apos;t always qualify for Free Personal Care funding in the same way
                  personal care does, since it isn&apos;t a personal care task under the Scottish scheme.
                  However, if companionship is combined with personal care needs, some or all of the visit may
                  be eligible. Our team can help clarify this during your first conversation.
                </p>
              </div>
              <ModalButton
                type="assessment"
                className="page-cta-secondary-inline"
              >
                Speak to our team <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Families We've Supported"
          title="What families say about Zento's companionship care"
          subtitle="Real stories from families across Edinburgh, Lothian, and Perthshire who saw their loved ones regain companionship and joy."
          testimonials={getTestimonials("homeCare.companionship")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — COVERAGE AREA
        ════════════════════════════════════════════════════════ */}
        <section className="border-t border-zinc-100 bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <AnimateContainer animation="fade-up">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Where we provide companionship care
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 mb-6 max-w-2xl mx-auto">
                Zento provides companionship care across Edinburgh and the Lothians from our Edinburgh office, and
                across Perthshire from our Crieff office.
              </p>
              <AnimateContainer animation="stagger" className="flex flex-wrap gap-3 justify-center">
                {locationLinks.map((loc) => (
                  <AnimateItem key={loc.label}>
                    <Link href={loc.href} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {loc.label}
                    </Link>
                  </AnimateItem>
                ))}
              </AnimateContainer>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <AnimateContainer animation="fade-up" className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  FAQs
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                  Frequently asked questions about companionship care
                </h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </AnimateContainer>
              <AnimateContainer animation="stagger" className="space-y-3">
                {faqs.map((faq, i) => (
                  <AnimateItem key={i}>
                    <details className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                        <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">{faq.q}</h3>
                        <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-relaxed text-zinc-600">{faq.a}</p>
                      </div>
                    </details>
                  </AnimateItem>
                ))}
              </AnimateContainer>
            </div>
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
                Families often combine companionship with...
              </h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </AnimateContainer>
            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {relatedServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.title} className="h-full">
                    <Link href={service.href} className="group flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10">
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
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <AnimateContainer animation="fade-up" className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Speak to our team about companionship care
                </h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                  A little company can make an enormous difference. Our team is here to talk through what might
                  help your loved one — with no pressure and no obligation.
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
              </AnimateContainer>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
