import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import ServiceCardsGrid, { ServiceCardItem } from "@/components/ServiceCardsGrid";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import ProcessSteps from "@/components/ProcessSteps";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Companionship & Meal Preparation Across Lothian | Zento",
  description: "Non-regulated home support across Midlothian, East Lothian and West Lothian from our Edinburgh office. Friendly companionship and fresh meal preparation.",
  alternates: { canonical: "https://zentogroup.co.uk/locations/lothian" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Companionship & Meal Preparation Across Lothian | Zento",
    description: "Non-regulated home support across Midlothian, East Lothian and West Lothian from our Edinburgh office. Friendly companionship and fresh meal preparation.",
    url: "https://zentogroup.co.uk/locations/lothian",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Home Support Across Lothian" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companionship & Meal Preparation Across Lothian | Zento",
    description: "Non-regulated home support across Midlothian, East Lothian and West Lothian.",
    images: ["/brand-image.png"],
  },
};

const edinburghOffice = OFFICES.find((o) => o.id === "edinburgh") ?? OFFICES[0];

const lothianServices: ServiceCardItem[] = [
  {
    id: "companionship",
    title: "Companionship Support Across Lothian",
    desc: "Companionship is designed to support emotional wellbeing and reduce social isolation for older adults across Midlothian, East Lothian, and West Lothian. Regular visits from a dedicated, friendly companion provide meaningful social interaction, conversation, and shared activities.",
    extraDesc: "Our local team carefully matches each client with a consistent companion who shares their interests. Whether enjoying a walk, sharing a cup of tea, or participating in hobbies, our companions bring reliable warmth and connection. (Please note: This is non-regulated social support and does not include personal care).",
    href: "/home-care/companionship",
    linkText: "Learn more about companionship support",
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation Across Lothian",
    desc: "Healthy nutrition and regular hydration are vital for staying well and energised at home. Our meal preparation service across Lothian supports your loved one with meal planning, grocery shopping, and cooking fresh, nutritious meals according to their personal tastes.",
    extraDesc: "Visits are arranged around your loved one's preferred meal times, making daily dining enjoyable and stress-free. (Please note: This is non-regulated domestic and nutritional support).",
    href: "/home-care/meal-preparation",
    linkText: "Find out about meal preparation",
  },
];

const lothianSigns = [
  "Social isolation and loneliness — Spending long periods alone without regular conversation, social contact, or shared activities.",
  "Poor appetite or weight reduction — Difficulty preparing nutritious hot meals or managing daily grocery shopping.",
  "Mobility difficulties in the kitchen — Unsteadiness while standing to cook or struggling to prepare daily refreshments.",
  "Pantry and kitchen routines slipping — Expired items in cupboards, skipped meals, or untidy cooking areas.",
  "Family members needing reliable support — Balancing busy schedules while ensuring loved ones eat well and stay socially engaged.",
  "Loss of enthusiasm for daily routines — Reluctance to cook, low motivation for hobbies, or needing gentle friendly encouragement.",
];

const lothianAreasMidlothian = ["Dalkeith", "Penicuik", "Bonnyrigg", "Loanhead", "Gorebridge", "Newtongrange", "Roslin", "Lasswade"];
const lothianAreasEast = ["Musselburgh", "Haddington", "North Berwick", "Dunbar", "Tranent", "Prestonpans", "Gullane", "East Linton"];
const lothianAreasWest = ["Livingston", "Bathgate", "Linlithgow", "Broxburn", "Armadale", "West Calder"];

const lothianSteps = [
  { step: "01", title: "Call us or complete our enquiry form", desc: "We respond promptly. There's no obligation, no sales pitch and no pressure — just an honest conversation about what you need." },
  { step: "02", title: "Introductory home consultation", desc: "We arrange a visit to the client's home anywhere across Midlothian, East Lothian or West Lothian to understand their companionship and daily routine preferences." },
  { step: "03", title: "Support plan agreed and companion matched", desc: "We create a tailored support plan and match a companion based on personality, shared interests, and routine." },
  { step: "04", title: "Support begins on your agreed schedule", desc: "Once visits begin, our local team stays in regular contact to ensure smooth, dependable support." },
];

const lothianFaqs = [
  { q: "Does Zento provide home support across all three Lothian council areas?", a: "Yes — Midlothian, East Lothian and West Lothian. We cover a wide range of towns and villages across all three areas. For specific coverage details, call us on 0131 210 0095 or see the areas section above." },
  { q: "Are the services provided in Lothian regulated personal care?", a: "No. Our services in Midlothian, East Lothian, and West Lothian focus exclusively on non-regulated home support — namely companionship, social engagement, grocery shopping, and meal preparation. We do not provide regulated personal care, bathing assistance, or clinical nursing in the Lothian region." },
  { q: "How quickly can support visits begin in Lothian?", a: "In most cases, we can arrange an introductory home consultation within a few days of your first call and begin regular visits shortly thereafter." },
  { q: "Will my loved one have the same companion for every visit?", a: "We work hard to ensure consistency, because we know how much familiarity matters. We match companions based on personality compatibility and aim to maintain the same companion throughout wherever possible." },
  { q: "Can companionship and meal preparation visits be tailored to our schedule?", a: "Yes. We arrange visits around your loved one's preferred routines — whether that is daily visits for meal preparation, weekly companionship outings, or regular check-ins throughout the week." },
];

export default function LothianLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/lothian#lothian-service",
    name: "Zento Group — Lothian",
    telephone: "0131 210 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/lothian",
    address: { "@type": "PostalAddress", addressLocality: "Edinburgh", addressCountry: "GB" },
    areaServed: ["Midlothian", "East Lothian", "West Lothian"],
    serviceType: "Home Support Services",
    parentOrganization: { "@type": "Organization", "@id": "https://zentogroup.co.uk/#organization", name: "Zento Group" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lothianFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://zentogroup.co.uk/locations" },
      { "@type": "ListItem", position: 3, name: "Lothian", item: "https://zentogroup.co.uk/locations/lothian" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="flex-1">
        {/* BREADCRUMB */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li><Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><Link href="/locations" className="hover:text-primary transition-colors font-medium">Locations</Link></li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li><span className="font-semibold text-secondary" aria-current="page">Lothian</span></li>
              </ol>
            </nav>
          </div>
        </div>

        {/* SECTION 1 — HERO */}
        <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 md:pt-12 md:pb-18 lg:pt-14 lg:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <AnimateContainer animation="fade-up" className="mx-auto max-w-5xl space-y-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  Home Support &middot; Midlothian, East Lothian &amp; West Lothian
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Companionship &amp; Meal Preparation Across Lothian &mdash;{" "}
                  <span className="text-primary">Midlothian, East Lothian &amp; West Lothian</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides dedicated, non-regulated companionship and meal preparation support to families across Midlothian, East Lothian, and West Lothian.
                  Whether you&apos;re in Dalkeith, Musselburgh, or Livingston, our friendly local team is here to help your loved ones stay connected and well-supported at home.
                </p>
              </div>

              {/* Notice Banner */}
              <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-zinc-700">
                <span className="font-bold text-secondary">Please Note:</span> Our Lothian services focus exclusively on non-regulated support (companionship, lifestyle assistance, and meal preparation) and do not include regulated personal care.
              </div>

              <div className="page-cta-group">
                <ModalButton type="general" className="page-cta-primary">
                  Speak to our local team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="page-cta-phone">
                  <Phone className="w-4 h-4 shrink-0" />Call us: {edinburghOffice.phone}
                </a>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 2 — OVERVIEW */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer animation="fade-right" className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image src="/about-image.webp" alt="Home companion visiting client in Lothian" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Home Support</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Support for Lothian Families</h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>Across Midlothian, East Lothian, and West Lothian, Zento provides friendly visiting companionship and practical meal preparation tailored to each person&apos;s lifestyle and preferences.</p>
                  <p>Our companions are carefully selected, thoroughly vetted, and PVG-checked to provide safe, reliable, and friendly company. We help older adults enjoy home-cooked meals, stay active with local hobbies, and maintain regular social connections.</p>
                  <p>Please note: All services provided across Midlothian, East Lothian, and West Lothian are non-regulated support services and do not include regulated personal care or nursing.</p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 — WHY CHOOSE ZENTO */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Local Commitment</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Why Lothian families choose Zento</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">Our local team understands the Lothian communities and provides responsive, relationship-focused companionship. We take the time to match companions based on personality and shared interests, making every visit enjoyable and meaningful.</p>
              <p className="text-base leading-relaxed text-zinc-600">We keep families updated, ensure reliable arrival times, and provide friendly support you can depend on day in, day out.</p>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 4 — SERVICES (Using ServiceCardsGrid) */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Available Support"
              title="Home support services across the Lothian region"
              subtitle="From Bonnyrigg to Bathgate and Musselburgh to Dunbar, our team provides dedicated companionship and meal preparation support across the Lothian region."
            />
            <ServiceCardsGrid services={lothianServices} />
          </div>
        </section>

        {/* SECTION 5 — SIGNS SECTION (Using SignsSectionGrid) */}
        <SignsSectionGrid
          category="Lothian Home Observations"
          title="Signs your loved one in Lothian may benefit from support at home"
          subtitle="Recognising when a family member across Midlothian, East Lothian or West Lothian could benefit from friendly company or a hand with cooking and shopping."
          signs={lothianSigns}
          ctaText="Book a Lothian consultation"
          ctaType="general"
        />

        {/* SECTION 6 — AREAS */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Full Coverage</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">Areas we cover across Lothian</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">Our team provides companionship and meal support across all three Lothian council areas:</p>
            </AnimateContainer>

            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-12">
              <AnimateItem className="h-full">
                <div className="h-full rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-black text-secondary mb-4">Midlothian</h3>
                  <div className="flex flex-wrap gap-2">
                    {lothianAreasMidlothian.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                  </div>
                </div>
              </AnimateItem>
              <AnimateItem className="h-full">
                <div className="h-full rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-black text-secondary mb-4">East Lothian</h3>
                  <div className="flex flex-wrap gap-2">
                    {lothianAreasEast.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                  </div>
                </div>
              </AnimateItem>
              <AnimateItem className="h-full">
                <div className="h-full rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-black text-secondary mb-4">West Lothian</h3>
                  <div className="flex flex-wrap gap-2">
                    {lothianAreasWest.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                  </div>
                </div>
              </AnimateItem>
            </AnimateContainer>

            {/* Google Map Embed */}
            <AnimateContainer animation="scale-up" className="max-w-5xl mx-auto mb-12 h-72 w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-md">
              <iframe
                title="Zento Group Edinburgh Office Location (Serving Lothian)"
                src={edinburghOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimateContainer>

            <AnimateContainer animation="fade-up" className="text-center">
              <p className="text-sm text-zinc-600 mb-4">Not sure whether your specific town is covered?</p>
              <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white">
                <Phone className="w-4 h-4 shrink-0" />Call us on {edinburghOffice.phone}
              </a>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 7 — TEAM NAP */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up" className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-primary/5 p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">Office Details</span>
                  <h2 className="text-3xl font-black text-secondary">The team behind your support</h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">Our local team coordinates companionship and meal preparation support across Midlothian, East Lothian, and West Lothian from our Edinburgh office.</p>
                </div>
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <p className="text-base font-black text-secondary">{edinburghOffice.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Serving Midlothian, East Lothian &amp; West Lothian</p>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-zinc-700">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /><a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="hover:text-primary">Phone: {edinburghOffice.phone}</a></p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /><a href={`mailto:${edinburghOffice.email}`} className="hover:text-primary">Email: {edinburghOffice.email}</a></p>
                  </div>
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 8 — GETTING STARTED (Using ProcessSteps) */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <ProcessSteps
              badge="4-Step Process"
              title="How to arrange home support in Lothian"
              steps={lothianSteps}
              ctaText="Start with a free call"
              ctaType="general"
            />
          </div>
        </section>

        {/* SECTION 9 — FAQ (Using FaqAccordion) */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="Lothian FAQs"
              title="Frequently asked questions about support in Lothian"
              faqs={lothianFaqs}
            />
          </div>
        </section>

        {/* SECTION 10 — SPECIFIC AREA PAGES */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Specific Area Pages</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Find support in your specific Lothian area</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">For detailed local coverage, towns served and area-specific information:</p>
              <div className="grid gap-4 sm:grid-cols-3 pt-4 text-left">
                <Link href="/locations/lothian/midlothian" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Midlothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Dalkeith, Penicuik, Bonnyrigg &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Support in Midlothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
                <Link href="/locations/lothian/east-lothian" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">East Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Musselburgh, Haddington, North Berwick &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Support in East Lothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
                <Link href="/locations/lothian/west-lothian" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">West Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Livingston, Bathgate, Linlithgow &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Support in West Lothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 11 — FINAL CTA (Using FinalCTASection) */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <FinalCTASection
            title="Speak to our local team today"
            subtitle="Our team is ready to answer your questions and arrange an introductory home consultation anywhere across Midlothian, East Lothian or West Lothian."
            tagline="No pressure. No obligation. Friendly advice from our local Lothian team."
            phone={edinburghOffice.phone}
            email={edinburghOffice.email}
            ctaText="Book a free consultation"
            ctaType="general"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
