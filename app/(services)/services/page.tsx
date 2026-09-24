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
  Clock4,
  CheckCircle2,
  Moon,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Nurse-Led Care Services | Home Care & Live-In Care | Zento",
  description:
    "Explore Zento's full range of nurse-led home care services across Edinburgh, Lothian, and Perthshire. From personal care and dementia support to 24-hour live-in care.",
  alternates: {
    canonical: "https://zentogroup.co.uk/services",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nurse-Led Care Services | Home Care & Live-In Care | Zento",
    description:
      "Explore Zento's full range of nurse-led home care services across Edinburgh, Lothian, and Perthshire. From personal care to 24-hour live-in care.",
    url: "https://zentogroup.co.uk/services",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Care Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurse-Led Care Services | Home Care & Live-In Care | Zento",
    description:
      "Nurse-led home care, live-in care, overnight care, and dementia support across Edinburgh, Lothian & Perthshire.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const homeCareServices = [
  {
    name: "Personal Care",
    href: "/home-care/personal-care",
    desc: "Support with bathing, dressing, continence, mobility and personal hygiene, delivered with patience and dignity.",
    icon: Heart,
    tag: "Daily Visits",
  },
  {
    name: "Medication Support",
    href: "/home-care/medication-support",
    desc: "Prompting, administering and monitoring medication under the oversight of a registered nurse.",
    icon: ShieldCheck,
    tag: "Clinical Care",
  },
  {
    name: "Dementia Care",
    href: "/home-care/dementia-care",
    desc: "Consistent carers and familiar routines to support people living with dementia at every stage.",
    icon: Brain,
    tag: "Specialist Support",
  },
  {
    name: "Companionship",
    href: "/home-care/companionship",
    desc: "Regular social visits to reduce isolation, maintain routines and enjoy meaningful conversation and activities.",
    icon: Users,
    tag: "Wellbeing",
  },
  {
    name: "Meal Preparation",
    href: "/home-care/meal-preparation",
    desc: "Nutritious meals planned around dietary needs and personal preferences, prepared in the client's own kitchen.",
    icon: Utensils,
    tag: "Daily Living",
  },
  {
    name: "Hospital Discharge Support",
    href: "/home-care/hospital-discharge",
    desc: "Short-term intensive care to help your loved one settle back home safely after a hospital stay.",
    icon: Building2,
    tag: "Reablement",
  },
  {
    name: "Respite Care",
    href: "/home-care/respite-care",
    desc: "Planned or emergency cover so family carers can take a genuine break, knowing their loved one is safe.",
    icon: Sun,
    tag: "Family Relief",
  },
];

const liveInServices = [
  {
    name: "Live-in Care",
    href: "/live-in-care",
    desc: "A dedicated, nurse-selected carer living in the home to provide full daily support and companionship, with scheduled overnight rest.",
    icon: Home,
    tag: "Full-Time Residence",
  },
  {
    name: "Overnight Care",
    href: "/live-in-care/overnight-care",
    desc: "Sleep-in or waking-night support through the dark hours so your loved one is never alone or unsafe overnight.",
    icon: Moon,
    tag: "Night-Time Safety",
  },
  {
    name: "24-Hour Care",
    href: "/live-in-care/24-hour-care",
    desc: "Continuous round-the-clock care delivered by a small rotating team of carers, ensuring someone is fully alert 24/7.",
    icon: Clock4,
    tag: "Continuous 24/7",
  },
];

const steps = [
  {
    step: "01",
    title: "Call us or submit an enquiry",
    desc: "A confidential discussion with our friendly team about your loved one's situation and care needs.",
  },
  {
    step: "02",
    title: "Registered nurse assessment",
    desc: "Our nurse visits your loved one at home to evaluate physical, cognitive, and clinical care needs.",
  },
  {
    step: "03",
    title: "Custom nurse-written care plan",
    desc: "We write a tailored care plan and match carers carefully chosen for personality and skillset.",
  },
  {
    step: "04",
    title: "Care begins with regular reviews",
    desc: "Care starts smoothly on your timeline, with ongoing nurse monitoring and regular care reviews.",
  },
];

const faqs = [
  {
    q: "What types of care services does Zento offer?",
    a: "Zento provides a comprehensive range of nurse-led care at home services, including hourly personal care, medication support, dementia care, companionship, meal preparation, hospital discharge care, respite care, live-in care, overnight care, and full 24-hour shift care.",
  },
  {
    q: "What does 'nurse-led care' mean?",
    a: "Nurse-led care means that registered nurses perform the initial assessment, write every care plan, train and match carers, and perform regular ongoing care reviews. This ensures clinical safety and high quality standards that standard care agencies cannot match.",
  },
  {
    q: "How quickly can care be arranged?",
    a: "In urgent situations — such as a sudden hospital discharge or emergency respite need — we can often assess and begin care within 24 to 48 hours. For planned care arrangements, we work around your family's desired schedule.",
  },
  {
    q: "Where does Zento provide care services?",
    a: "We provide care across Edinburgh and all the Lothians from our Edinburgh office, and across Crieff, Comrie, Muthill, Braco and Perthshire from our Crieff office.",
  },
  {
    q: "How do I know which service is right for my loved one?",
    a: "During your initial phone consultation and nursing assessment, our registered nurse will discuss your loved one's specific needs, risk profile, and preferences to recommend the most suitable and cost-effective care option.",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function ServicesOverviewPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zento Care Services",
    provider: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    serviceType: "Nurse-Led Home Care & Live-In Care",
    areaServed: ["City of Edinburgh", "Midlothian", "East Lothian", "West Lothian", "Perthshire"],
    url: "https://zentogroup.co.uk/services",
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Zento Group - Nurse-Led Care Services",
    url: "https://zentogroup.co.uk/services",
    telephone: "+441312100095",
    areaServed: ["Edinburgh", "Perthshire", "Lothians"],
    description: "Nurse-led home care, live-in care, and specialist support services.",
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
      { "@type": "ListItem", position: 2, name: "Our Services", item: "https://zentogroup.co.uk/services" },
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
                <li>
                  <Link href="/" className="hover:text-primary transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Our Services
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
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Nurse-Led Care Services &middot; Edinburgh, Lothian &amp; Perthshire
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Our Care Services &mdash;{" "}
                  <span className="text-primary">Nurse-Led Support in Your Own Home</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  From daily visiting care to continuous 24-hour live-in support, every Zento service is designed,
                  managed, and regularly reviewed by registered nurses. We help your loved one stay safely and comfortably at home.
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
            SECTION 2 — OVERVIEW / INTRODUCTION
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image
                  src="/about-image.webp"
                  alt="Zento registered nurse discussing care plan options with client at home"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" /> Nurse-Led Standard
                </div>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Care tailored to individual clinical needs
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    No two individuals have the exact same needs. At Zento, we believe care should never be a rigid,
                    one-size-fits-all package. Whether your family needs short daily visits for personal care, overnight
                    reassurance, or comprehensive 24-hour live-in support, our registered nurses ensure every detail is
                    clinically sound.
                  </p>
                  <p>
                    Our nurses perform a thorough initial assessment, match carers suited to your loved one&apos;s personality and
                    care needs, and conduct regular reviews to ensure support evolves as circumstances change.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — HOURLY & DAILY HOME CARE SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Visiting Care"
              title="Home Care Services"
              subtitle="Flexible, visiting support in your own home — from a few hours a week to multiple visits a day."
            />

            <AnimateContainer animation="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {homeCareServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.name} className="h-full">
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600">
                            {service.tag}
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600 mb-6">{service.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          Learn more about {service.name} <ArrowRight className="w-4 h-4" />
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
            SECTION 4 — LIVE-IN & ROUND-THE-CLOCK CARE
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Full-Time & Overnight"
              title="Live-In & 24-Hour Care Services"
              subtitle="Comprehensive alternatives to a residential care home, keeping your loved one safe at home day and night."
            />

            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {liveInServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <AnimateItem key={service.name} className="h-full">
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                            <IconComp className="w-7 h-7" />
                          </div>
                          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                            {service.tag}
                          </span>
                        </div>
                        <h3 className="mb-3 text-2xl font-black text-secondary group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600 mb-6">{service.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-zinc-200/60">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          Explore {service.name} <ArrowRight className="w-4 h-4" />
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
            SECTION 5 — THE NURSE-LED DIFFERENCE (Dark bg)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-secondary py-24 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
              <AnimateContainer animation="fade-right" className="flex-1">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6">
                  The Zento Standard
                </span>
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl mb-8">
                  Why nurse-led care <span className="text-primary">makes the difference</span>
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-white/80 mb-10">
                  <p>
                    Many care agencies match carers without formal clinical oversight. At Zento, every care arrangement
                    is overseen by a registered nurse from day one.
                  </p>
                  <p>
                    Our nursing team assesses cognitive, medical, and mobility risk profiles, creates customized clinical protocols,
                    trains carers, and performs regular ongoing reviews. If your loved one&apos;s condition changes, our nurses adjust
                    the care plan proactively.
                  </p>
                </div>
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  <Image
                    src="/brand-image.webp"
                    alt="Registered nurse assessing care plan options"
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
                Simple Steps
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                How to arrange care with Zento
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
                Book a free consultation <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 — TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Client Stories"
          title="What families say about Zento"
          subtitle="Real reviews and feedback from families who entrusted us with their loved one's care."
          testimonials={getTestimonials("services")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="FAQs"
              title="Frequently asked questions about our services"
              faqs={faqs}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FinalCTASection
              title="Speak to our nursing team today"
              subtitle="Let's discuss your family's needs with an honest clinical assessment, not a sales pitch."
              tagline="No pressure. No obligation. Honest advice from registered nurses."
              phone={OFFICES[0]?.phone}
              ctaText="Book a free assessment"
              ctaType="assessment"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
