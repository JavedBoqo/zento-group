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

const title = "Live-In Care in Crieff | Nurse-Led Support | Zento";
const description = "Looking for live-in care in Crieff? Zento provides personalised, nurse-led care at home, with consistent carers and local support. Book a free consultation.";
const canonical = "https://zentogroup.co.uk/locations/perthshire/crieff/live-in-care/";
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
  { name: "Live-In Care", href: "/locations/perthshire/crieff/live-in-care/" },
];

const reasons = [
  { title: "Care planned by registered nurses", text: "Our nursing team assesses your needs, develops your care plan and oversees the quality of your support. When circumstances change, your arrangements can be reviewed.", icon: ShieldCheck },
  { title: "A carer who gets to know you", text: "We consider your care requirements, preferences and daily routines when matching a live-in carer. Wherever possible, we maintain consistency so you can develop a comfortable, familiar relationship.", icon: Users },
  { title: "Support managed locally", text: "Our office is at 8 East High Street, Crieff. Families have a local point of contact for care planning, questions and ongoing communication.", icon: MapPin },
  { title: "Your independence matters", text: "Good care should help you continue doing the things you enjoy. We encourage you to make your own choices and stay involved in everyday life, with assistance where needed.", icon: Heart },
];

const support = [
  "Personal care, including washing, dressing and mobility assistance",
  "Medication support within an agreed care plan",
  "Help with meals, nutrition and hydration",
  "Companionship and everyday activities",
  "Support with familiar routines and household tasks",
  "Assistance for people living with dementia or long-term conditions, where appropriate",
  "Nurse-led care planning and regular reviews",
];

const steps = [
  { title: "Speak with our Crieff team", text: "Tell us about your circumstances, what support you need and any concerns you would like to discuss." },
  { title: "Arrange a free home assessment", text: "A member of our nursing management team will assess your care needs, discuss your preferences and explain the available options." },
  { title: "Agree your care arrangements", text: "We prepare your individual care plan, discuss the costs and help arrange a suitable live-in carer. Care begins once the arrangements have been agreed and the required support is available." },
];

const faqs = [
  { q: "Can I arrange a live-in carer in Crieff?", a: "Yes. Zento provides nurse-led live-in care in Crieff, subject to an assessment and carer availability. Contact our local team to discuss your requirements, the care arrangements and the next steps." },
  { q: "Does a live-in carer provide 24-hour care?", a: "A live-in carer lives in your home and provides support during agreed working hours, with appropriate rest and sleep periods. If you need regular waking-night assistance or continuous supervision, Zento will assess whether additional staffing or a different arrangement is required." },
  { q: "Can live-in care support someone with dementia in Crieff?", a: "Live-in care may be suitable for someone living with dementia who benefits from familiar surroundings and consistent daily routines. Our nursing team will assess the person's needs and determine whether an appropriate care arrangement can be provided safely at home." },
  { q: "Can I meet my live-in carer before care begins?", a: "Zento aims to introduce you to your proposed carer before the arrangement begins. We consider your preferences, support needs and personal compatibility when choosing someone to work in your home." },
  { q: "Do you provide live-in care outside Crieff?", a: "We may be able to arrange live-in care in nearby communities such as Comrie, Muthill and Braco, subject to confirmed operational coverage within Perth & Kinross and carer availability. Contact our Crieff office to check your address." },
];

export default function CrieffLiveInCarePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Live-In Care in Crieff",
    serviceType: "Live-in Care",
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
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary sm:text-sm">Nurse-Led Live-In Care &middot; Crieff</span>
              <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Live-In Care in Crieff — <span className="text-primary">Personal Support, Led by Nurses</span></h1>
              <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                <p>Remain in the home you know with support shaped around your daily life. Zento provides personalised live-in care in Crieff, with carefully matched carers and oversight from our registered nursing team based on East High Street.</p>
                <p>Whether you need ongoing assistance or care following a change in health, we&apos;ll take time to understand your needs and arrange support that feels right.</p>
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
                <SectionHeader align="left" badge="Care at Home" title="Live-In Care at Home in Crieff — What to Expect" className="mb-6 md:mb-6" />
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>With Zento&apos;s live-in care service, a dedicated carer stays in your home and helps you manage everyday life while maintaining your familiar routines.</p>
                  <p>We arrange care for people living in Crieff and nearby communities within our confirmed Perth &amp; Kinross service area. From the initial assessment to choosing a suitable carer, arrangements are managed through our local Crieff team.</p>
                  <p>Before care begins, a registered nurse assesses your requirements and develops an individual care plan. We also discuss the practical arrangements for a carer living in your home, including accommodation, working hours, rest breaks and any additional cover required.</p>
                  <p className="rounded-2xl border border-primary/20 bg-primary/5 p-5 font-medium text-secondary">Live-in care offers ongoing support and reassurance, but it does not mean one carer works continuously without breaks or sleep.</p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="The Zento Difference" title="Why Families in Crieff Choose Zento for Live-In Care" />
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
            <div className="mt-8 text-center"><Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Meet our nursing team <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-secondary py-24 text-white">
          <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className={`${container} relative z-10`}>
            <AnimateContainer animation="fade-up" className="mx-auto max-w-4xl">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">Personalised Support</span>
              <h2 className="mb-6 text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl">What Does Our Live-In Care in Crieff Include?</h2>
              <p className="mb-8 text-base text-white/85">Your care plan may include:</p>
              <ul className="grid gap-4 md:grid-cols-2">
                {support.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />{item}</li>)}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-white/85">The exact support provided depends on your assessed needs, the agreed care arrangement and the carer&apos;s responsibilities.</p>
              <Link href="/live-in-care/" className="mt-8 inline-flex items-center gap-2 font-bold text-white underline underline-offset-4">Learn more about our live-in care services <ArrowRight className="h-4 w-4 shrink-0" /></Link>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24">
          <div className={container}>
            <SectionHeader badge="Getting Started" title="How to Arrange Live-In Care in Crieff" />
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
            <SectionHeader badge="Costs & Funding" title="How Much Does Live-In Care Cost in Crieff?" />
            <AnimateContainer animation="fade-up" className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 text-base leading-relaxed text-zinc-600 sm:p-10">
              <p>The cost of live-in care in Crieff depends on the level of support required, the agreed care arrangement and whether additional assistance or overnight cover is needed.</p>
              <p>Zento provides a personalised quotation following an assessment, so you can understand the proposed services and costs before making a decision.</p>
              <p>In Scotland, adults assessed as needing personal care may qualify for free personal care, regardless of age or financial circumstances. This does not mean the full cost of live-in care is automatically covered.</p>
              <p>Perth &amp; Kinross Council can assess eligibility for publicly funded support, including options available through Self-Directed Support.</p>
            </AnimateContainer>
          </div>
        </section>

        <section className="bg-zinc-50 py-24"><div className={container}><FaqAccordion title="Frequently Asked Questions About Live-In Care in Crieff" faqs={faqs} /></div></section>

        <section className="border-t border-zinc-100 bg-white py-16">
          <div className={container}>
            <SectionHeader badge="Local Support" title="Explore care in your area" />
            <div className="flex flex-wrap justify-center gap-3">
              {[{ href: "/locations/perthshire/crieff/", label: "Home care services in Crieff" }, { href: "/locations/perthshire/", label: "Home care across Perthshire" }, { href: "/contact/", label: "Book a free consultation" }].map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-bold text-secondary transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary">{link.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50 py-24">
          <FinalCTASection title="Looking for Live-In Care in Crieff? Speak to Our Team" subtitle="Choosing someone to live in your home and provide care is a significant decision. Our Crieff team will listen to your needs, explain the options and help you understand what a suitable arrangement could look like." tagline="Free initial assessment. No obligation." phone={crieffOffice.phone} ctaText="Book Free Consultation" ctaType="assessment" />
          <address className="mt-8 px-6 text-center text-sm leading-relaxed not-italic text-zinc-600"><span className="font-bold text-secondary">Zento Group Limited</span><br />8 East High Street, Crieff, PH7 3AF</address>
        </section>
      </main>
      <Footer />
    </div>
  );
}
