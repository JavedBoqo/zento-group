import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, MapPin, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import ModalButton from "@/components/ModalButton";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

const title = "Dementia Care in Crieff | Nurse-Led Support | Zento";
const description = "Dementia care at home in Crieff, planned by registered nurses. Familiar routines, consistent carers and support for your family. Book a free consultation.";
const canonical = "https://zentogroup.co.uk/locations/perthshire/crieff/dementia-care";
const crieffOffice = OFFICES.find((office) => office.id === "crieff")!;
const container = "container mx-auto px-6 sm:px-6 md:px-12 lg:px-24";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title, description, url: canonical, siteName: "Zento Care", locale: "en_GB", type: "website",
    images: [{ url: "/about-image.webp", width: 1408, height: 768, alt: "Carer sharing a cup of tea with an older adult at home" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/about-image.webp"] },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Locations", href: "/locations" },
  { name: "Perthshire", href: "/locations/perthshire" },
  { name: "Crieff", href: "/locations/perthshire/crieff" },
  { name: "Dementia Care", href: "/locations/perthshire/crieff/dementia-care" },
];

const reasons = [
  { title: "Nurse-led planning", text: "Nurses assess needs, write care plans and review changes.", icon: ShieldCheck },
  { title: "Familiar carers", text: "We aim for familiar faces and clear handovers.", icon: Users },
  { title: "Individual routines", text: "Support respects preferred meals, activities and communication.", icon: Heart },
  { title: "Local team", text: "Find us at 8 East High Street, Crieff.", icon: MapPin },
];

const support = [
  "Washing, dressing and personal care",
  "Medication support within the care plan",
  "Help with meals and drinks",
  "Companionship and familiar activities",
  "Assistance moving safely at home",
  "Updates to authorised family members"
];

const steps = [
  {
    "title": "Call us",
    "text": "Tell us what is changing at home."
  },
  {
    "title": "Free assessment",
    "text": "A nurse discusses needs, preferences and safety."
  },
  {
    "title": "Agree arrangements",
    "text": "We confirm the care plan, costs and carers before visits, subject to availability."
  }
];

const faqs = [
  {
    "q": "Can someone with dementia receive care at home in Crieff instead of moving to a care home?",
    "a": "Yes, if an assessment confirms their needs can be met safely at home. Zento provides visits designed around the person's routines and care requirements."
  },
  {
    "q": "Will the same dementia carer visit my family member in Crieff?",
    "a": "We aim for consistent carers. The team depends on the agreed schedule and staff availability, and we explain changes wherever possible."
  },
  {
    "q": "What happens if dementia care needs change in Crieff?",
    "a": "Our nursing team reviews the care plan and discusses whether more visits, overnight support or another arrangement is appropriate and available."
  },
  {
    "q": "Do you provide dementia care in villages near Crieff?",
    "a": "We may cover Comrie, Muthill and Braco within Perth & Kinross. Call to confirm coverage and availability."
  },
  {
    "q": "Where can families in Crieff find independent dementia advice?",
    "a": "Alzheimer Scotland's Perth Brain Health & Dementia Resource Centre offers information and family support independently of Zento."
  }
];

export default function CrieffDementiaCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Dementia Care at Home in Crieff",
    serviceType: "Dementia care at home",
    description,
    url: canonical,
    provider: { "@id": "https://zentogroup.co.uk/#organization", name: "Zento Group Limited" },
    areaServed: {
      "@type": "Place", name: "Crieff, Perth and Kinross, Scotland",
      address: { "@type": "PostalAddress", addressLocality: "Crieff", addressRegion: "Perth and Kinross, Scotland", addressCountry: "GB" },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: `https://zentogroup.co.uk${item.href}`,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="flex-1">
        <div className="border-b border-zinc-100 bg-zinc-50">
          <nav aria-label="Breadcrumb" className={`${container} py-3`}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
              {breadcrumbs.map((item, index) => (
                <li key={item.name} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true" className="text-zinc-300">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-secondary">{item.name}</span>
                  ) : (
                    <Link href={item.href} className="font-medium transition-colors hover:text-primary">{item.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 md:pt-12 md:pb-18 lg:pt-14 lg:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className={`${container} relative z-10 text-center`}>
            <AnimateContainer animation="fade-up" className="mx-auto max-w-5xl space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary sm:text-sm">Nurse-Led Dementia Care &middot; Crieff</span>
              <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Dementia Care at Home <span className="text-primary">in Crieff</span></h1>
              <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                <p>A familiar morning routine. A favourite chair. Knowing where things are kept. These details matter when someone is living with dementia. Zento provides dementia care at home in Crieff, with care plans overseen by registered nurses and support built around familiar routines.</p>
                <p>Our team is based on East High Street, Crieff.</p>
              </div>
              <div className="page-cta-group pt-2">
                <ModalButton type="assessment" className="page-cta-primary">Book Free Consultation <ArrowRight className="h-5 w-5 shrink-0" /></ModalButton>
                <a href={crieffOffice.phoneHref} className="page-cta-phone"><Phone className="h-4 w-4 shrink-0" /> Call: {crieffOffice.phone}</a>
              </div>
            </AnimateContainer>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white py-20">
          <div className={container}>
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image src="/about-image.webp" alt="Carer sharing a cup of tea with an older adult at home" fill sizes="(max-width: 768px) 100vw, 448px" className="object-cover" />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" className="flex-1 space-y-5">
                <SectionHeader align="left" badge="Care at Home" title="Dementia Support in Crieff That Respects Familiar Routines" className="mb-6 md:mb-6" />
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>We ask about the person&apos;s routine, interests, communication and sources of anxiety. Carers respect these preferences, allowing time for choices rather than rushing through tasks.</p>
                  <p>A registered nurse assesses needs and reviews arrangements when things change.</p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="The Zento Difference" title="Why Crieff Families Choose Zento for Dementia Care" />
            <AnimateContainer animation="stagger" className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {reasons.map(({ title: heading, text, icon: Icon }) => (
                <AnimateItem key={heading} className="h-full">
                  <div className="h-full rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                    <h3 className="mb-3 text-lg font-bold text-secondary">{heading}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600">{text}</p>
                  </div>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="mt-8 text-center"><Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Meet our nurse-led team <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-secondary py-24 text-white">
          <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className={`${container} relative z-10`}>
            <AnimateContainer animation="fade-up" className="mx-auto max-w-4xl">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">Personalised Support</span>
              <h2 className="mb-6 text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl">What Can Dementia Care at Home Include?</h2>
              <p className="mb-8 text-base text-white/85">Depending on the agreed plan, visits may include:</p>
              <ul className="grid gap-4 md:grid-cols-2">
                {support.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />{item}</li>)}
              </ul>
              <Link href="/home-care/dementia-care" className="mt-8 inline-flex items-center gap-2 font-bold text-white underline underline-offset-4">Learn more about our dementia care at home service <ArrowRight className="h-4 w-4 shrink-0" /></Link>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="Getting Started" title="How to Arrange Dementia Care in Crieff" />
            <AnimateContainer animation="stagger" className="mb-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <AnimateItem key={step.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-lg ring-1 ring-primary/10">0{index + 1}</div>
                  <h3 className="mb-3 text-lg font-bold text-secondary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{step.text}</p>
                </AnimateItem>
              ))}
            </AnimateContainer>
            <div className="page-cta-group"><ModalButton type="assessment" className="page-cta-primary">Book Free Assessment <ArrowRight className="h-5 w-5" /></ModalButton></div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white py-20">
          <div className={container}>
            <SectionHeader badge="Costs & Funding" title="How Much Does Dementia Care Cost in Crieff?" />
            <AnimateContainer animation="fade-up" className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 text-base leading-relaxed text-zinc-600 sm:p-10">
              <p>Costs depend on visit frequency and support required. We quote after assessment.</p>
              <p>In Scotland, adults assessed as eligible for personal care may receive that element free. Other support may be chargeable. Perth &amp; Kinross Council can assess care needs and explain Self-Directed Support options. A dementia diagnosis does not automatically cover all care costs.</p>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24"><div className={container}><FaqAccordion title="Frequently Asked Questions About Dementia Care in Crieff" faqs={faqs} /></div></section>

        <section className="border-t border-zinc-100 bg-white py-16">
          <div className={container}>
            <SectionHeader badge="Local Support" title="Explore care in your area" />
            <div className="flex flex-wrap justify-center gap-3">
              {[{ href: "/locations/perthshire/crieff", label: "Home care services in Crieff" }, { href: "/locations/perthshire", label: "Home care across Perthshire" }, { href: "/home-care/respite-care", label: "Respite care at home" }, { href: "/contact", label: "Book a free consultation" }].map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-bold text-secondary transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary">{link.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <FinalCTASection title="Talk to Our Crieff Team About Dementia Care" subtitle="Tell us where help is needed. We&apos;ll explain the options without pressure." tagline="Free initial assessment. No obligation." phone={crieffOffice.phone} ctaText="Book Free Consultation" ctaType="assessment" />
          <address className="mt-8 px-6 text-center text-sm leading-relaxed not-italic text-zinc-600"><span className="font-bold text-secondary">Zento Group Limited</span><br />8 East High Street, Crieff, PH7 3AF</address>
        </section>
      </main>
      <Footer />
    </div>
  );
}
