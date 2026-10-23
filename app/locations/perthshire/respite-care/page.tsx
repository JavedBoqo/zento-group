import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import ModalButton from "@/components/ModalButton";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

const title = "Respite Care in Perthshire | At-Home Support | Zento";
const description = "Respite care at home in Perthshire from Zento's Crieff nursing team. Planned support for family carers in Perth & Kinross. Book a free consultation.";
const canonical = "https://zentogroup.co.uk/locations/perthshire/respite-care";
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
  { name: "Respite Care", href: "/locations/perthshire/respite-care" },
];

const reasons = [
  { title: "Nurse-led plans", text: "Registered nurses assess needs and agree care arrangements.", icon: ShieldCheck },
  { title: "Familiar routines", text: "Carers are briefed on mealtimes, preferences and mobility needs.", icon: Users },
  { title: "Local coordination", text: "Our team at 8 East High Street, Crieff manages plans and handovers.", icon: MapPin },
];

const support = [
  "Personal care and daily routines",
  "Medication support where appropriate",
  "Meals and hydration",
  "Companionship and familiar activities",
  "Mobility assistance",
  "A handover to the usual family carer"
];

const steps = [
  {
    "title": "Call us",
    "text": "Tell us when and where cover is needed."
  },
  {
    "title": "Free assessment",
    "text": "A nurse reviews care requirements and routines."
  },
  {
    "title": "Agree arrangements",
    "text": "We confirm the schedule, plan, costs and available carer."
  }
];

const faqs = [
  {
    "q": "Is respite care at home different from residential respite?",
    "a": "Yes. Zento's carers visit the person's home. We do not offer residential respite beds, so your loved one can remain in familiar surroundings during agreed visits."
  },
  {
    "q": "Can I arrange respite care in Comrie or a rural Perthshire village?",
    "a": "Possibly. We assess requests within confirmed Perth & Kinross areas, including Comrie, Muthill and Braco. Call with the address and required dates."
  },
  {
    "q": "How early should I book respite care for a holiday?",
    "a": "Contact us early enough to arrange an assessment, care plan and carer. Dates depend on availability."
  },
  {
    "q": "Can Zento provide overnight respite care in Perthshire?",
    "a": "We can discuss overnight support and assess whether an appropriate arrangement is available. Overnight cover must be agreed separately."
  },
  {
    "q": "Can Perth & Kinross Council help pay for respite care?",
    "a": "The council can assess needs and explain short-break support. Funding is not guaranteed to cover private care with Zento."
  }
];

export default function PerthshireRespiteCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Respite Care at Home in Perthshire",
    serviceType: "At-home respite care",
    description,
    url: canonical,
    provider: { "@id": "https://zentogroup.co.uk/#organization", name: "Zento Group Limited" },
    areaServed: ["Crieff", "Comrie", "Muthill", "Braco"].map((locality) => ({
      "@type": "Place",
      name: locality,
      address: { "@type": "PostalAddress", addressLocality: locality, addressRegion: "Perth and Kinross, Scotland", addressCountry: "GB" },
    })),
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
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary sm:text-sm">Nurse-Led Respite Care &middot; Perthshire</span>
              <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Respite Care at Home <span className="text-primary">in Perthshire</span></h1>
              <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                <p>Taking time away from caring can take planning. Zento provides respite care at home in Perthshire, so your loved one stays at home while you take a break. Our Crieff nursing team plans support around their routines.</p>
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
                <SectionHeader align="left" badge="Care at Home" title="Respite Support That Fits Around Your Family" className="mb-6 md:mb-6" />
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>Whether you need a regular afternoon off or a longer planned break, we discuss care needs, medication and daily preferences before arranging cover. For unexpected changes, phone our Crieff team. Short-notice availability cannot be guaranteed.</p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="The Zento Difference" title="Why Choose Zento for Respite Care in Perthshire?" />
            <AnimateContainer animation="stagger" className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
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
            <div className="mt-8 text-center"><Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">About our nurse-led team <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-secondary py-24 text-white">
          <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className={`${container} relative z-10`}>
            <AnimateContainer animation="fade-up" className="mx-auto max-w-4xl">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">Personalised Support</span>
              <h2 className="mb-6 text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl">What Can At-Home Respite Care Include?</h2>
              <p className="mb-8 text-base text-white/85">Depending on the agreed plan, visits may include:</p>
              <ul className="grid gap-4 md:grid-cols-2">
                {support.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />{item}</li>)}
              </ul>
              <Link href="/home-care/respite-care" className="mt-8 inline-flex items-center gap-2 font-bold text-white underline underline-offset-4">Learn more about our respite care at home service <ArrowRight className="h-4 w-4 shrink-0" /></Link>
            </AnimateContainer>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white py-20">
          <div className={container}>
            <SectionHeader badge="Local Coverage" title="Where We Provide Respite Care in Perthshire" />
            <AnimateContainer animation="fade-up" className="mx-auto max-w-3xl rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 text-base leading-relaxed text-zinc-600 sm:p-10">
              <p>We cover confirmed areas within Perth &amp; Kinross, including Crieff, Comrie, Muthill and Braco, subject to availability. Not all of wider Perthshire is within our regulated area. <a href={crieffOffice.phoneHref} className="font-bold text-primary hover:underline">Call with your postcode</a>.</p>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="Getting Started" title="How to Arrange Respite Care in Perthshire" />
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
            <SectionHeader badge="Costs & Funding" title="Respite Care Costs and Funding in Perthshire" />
            <AnimateContainer animation="fade-up" className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 text-base leading-relaxed text-zinc-600 sm:p-10">
              <p>Costs depend on visit length and support required. We provide a quotation after assessment.</p>
              <p>Unpaid carers can ask Perth &amp; Kinross Council about an Adult Carer Support Plan and short-break options. Funding depends on assessment and does not guarantee payment for Zento care. Eligible adults in Scotland may receive free assessed personal care, but this does not automatically fund all respite costs.</p>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24"><div className={container}><FaqAccordion title="Frequently Asked Questions About Respite Care in Perthshire" faqs={faqs} /></div></section>

        <section className="border-t border-zinc-100 bg-white py-16">
          <div className={container}>
            <SectionHeader badge="Local Support" title="Explore care in your area" />
            <div className="flex flex-wrap justify-center gap-3">
              {[{ href: "/locations/perthshire/crieff", label: "Home care in Crieff" }, { href: "/locations/perthshire", label: "Home care across Perthshire" }, { href: "/locations/perthshire/comrie", label: "Home care in Comrie" }, { href: "/contact", label: "Book a free consultation" }].map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-bold text-secondary transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary">{link.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <FinalCTASection title="Speak to Our Perthshire Respite Care Team" subtitle="Tell our Crieff team what would help. We&apos;ll explain the options for your area without pressure." tagline="Free initial assessment. No obligation." phone={crieffOffice.phone} ctaText="Book Free Consultation" ctaType="assessment" />
          <address className="mt-8 px-6 text-center text-sm leading-relaxed not-italic text-zinc-600"><span className="font-bold text-secondary">Zento Group Limited</span><br />8 East High Street, Crieff, PH7 3AF</address>
        </section>
      </main>
      <Footer />
    </div>
  );
}
