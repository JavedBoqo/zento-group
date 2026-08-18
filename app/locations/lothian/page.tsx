import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Brain,
  Home,
  CheckCircle2,
  Clock4,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import SectionHeader from "@/components/SectionHeader";
import ServiceCardsGrid, { ServiceCardItem } from "@/components/ServiceCardsGrid";
import SignsSectionGrid from "@/components/SignsSectionGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getTestimonials } from "@/lib/testimonials";
import ProcessSteps from "@/components/ProcessSteps";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCTASection from "@/components/FinalCTASection";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Home Care Across Lothian | Nurse-Led | Zento",
  description: "Covering Midlothian, East Lothian and West Lothian from our Edinburgh office. Nurse-led care for families across the Lothian region. Find your local area.",
  alternates: { canonical: "https://zentogroup.co.uk/locations/lothian/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care Across Lothian | Nurse-Led | Zento",
    description: "Covering Midlothian, East Lothian and West Lothian from our Edinburgh office. Nurse-led care for families across the Lothian region.",
    url: "https://zentogroup.co.uk/locations/lothian/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Home Care Across Lothian" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care Across Lothian | Nurse-Led | Zento",
    description: "Nurse-led home care across Midlothian, East Lothian and West Lothian.",
    images: ["/brand-image.png"],
  },
};

const edinburghOffice = OFFICES[0];

const lothianServices: ServiceCardItem[] = [
  { id: "live-in-care", title: "Live-In Care Across Lothian", desc: "When daily visits aren't enough — when your loved one needs someone there through the night, or around the clock — live-in care is often the most practical and the most compassionate answer. A trained, carefully selected carer moves into the home and becomes part of the daily routine. For many Lothian families, it's the option that finally makes staying at home feel genuinely safe.", extraDesc: "Every live-in arrangement in Lothian is managed by our nursing team. They select the carer, oversee the clinical care plan, and review the arrangement regularly so families don't have to chase anyone for updates.", href: "/live-in-care/", linkText: "Learn more about live-in care" },
  { id: "respite-care", title: "Respite Care Across Lothian", desc: "If you're a family carer in Lothian, a proper break isn't a luxury — it's a necessity. Zento provides planned and emergency respite care across Midlothian, East Lothian and West Lothian. Before cover begins, a nurse writes a care plan specific to the respite period, so there's genuine continuity rather than someone simply showing up and guessing what to do.", extraDesc: "Your loved one stays at home, with a consistent and carefully briefed carer. You get the break you need, knowing the standard of care hasn't dropped while you're away.", href: "/home-care/respite-care/", linkText: "Find out about respite care" },
  { id: "dementia-care", title: "Dementia Care Across Lothian", desc: "For someone living with dementia, the details matter enormously — the same face at the door, the same order to the morning, the same small routines that make the day feel familiar and safe. Our nursing team designs dementia care plans with consistency at the centre, monitors for changes in behaviour and cognition, and adjusts the approach before small difficulties turn into significant ones.", extraDesc: "Whether your family member is in Dalkeith, Haddington or Livingston, the clinical care behind their daily support is the same.", href: "/home-care/dementia-care/", linkText: "About our dementia care service" },
  { id: "personal-care", title: "Personal Care Across Lothian", desc: "Personal care visits across Lothian cover the practical daily tasks that allow your loved one to stay comfortably and safely at home — bathing, dressing, continence support, mobility assistance and medication prompting. A registered nurse writes the initial care plan and reviews it on a regular basis throughout.", extraDesc: "Nothing is left to the discretion of an individual carer working without clinical oversight.", href: "/home-care/personal-care/", linkText: "About personal care at home" },
  { id: "overnight-care", title: "Overnight Care Across Lothian", desc: "Falls, medication needs, night-time confusion — the risks that worry families most often happen after dark. For Lothian families where overnight safety is a concern, we provide sleep-in and waking-night carers with care plans written specifically for the night hours and what they can bring.", extraDesc: "Support that's properly planned, not improvised.", href: "/live-in-care/overnight-care/", linkText: "About overnight care at home" },
  { id: "hospital-discharge", title: "Hospital Discharge Support Across Lothian", desc: "Returning home after a hospital stay is one of the most vulnerable moments for an older person. Zento can liaise directly with NHS Lothian discharge teams to make sure the right care is in place before your loved one leaves hospital — not arranged in a rush the day they get home.", extraDesc: "In most cases we can have care in place within 24 to 48 hours of discharge, with a proper nursing care plan and a matched carer ready from day one.", href: "/home-care/hospital-discharge/", linkText: "About hospital discharge care" },
];

const lothianSigns = [
  "Mobility difficulties & increased falls risk — Unsteadiness on feet or struggling to navigate stairs in Lothian homes.",
  "Medication challenges — Missed or incorrect dosage timings without regular clinical oversight.",
  "Poor appetite or weight reduction — Difficulty preparing nutritious hot meals on a daily basis.",
  "Struggling with hygiene and daily dressing — Needing dignified personal care support from a compassionate carer.",
  "Cognitive changes or memory concerns — Feeling disoriented or overwhelmed by everyday household routines.",
  "Carer burnout — Family members in Midlothian, East or West Lothian needing trusted respite and support.",
];

const lothianAreasMidlothian = ["Dalkeith", "Penicuik", "Bonnyrigg", "Loanhead", "Gorebridge", "Newtongrange", "Roslin", "Lasswade"];
const lothianAreasEast = ["Musselburgh", "Haddington", "North Berwick", "Dunbar", "Tranent", "Prestonpans", "Gullane", "East Linton"];
const lothianAreasWest = ["Livingston", "Bathgate", "Linlithgow", "Broxburn", "Armadale", "West Calder"];

const lothianSteps = [
  { step: "01", title: "Call us or complete our enquiry form", desc: "We respond the same day. There's no obligation, no sales pitch and no pressure — just an honest conversation about what you need." },
  { step: "02", title: "A registered nurse visits your loved one at home", desc: "We'll arrange for one of our nurses to visit — anywhere across Midlothian, East Lothian or West Lothian — for a proper needs assessment at the client's home." },
  { step: "03", title: "We write the care plan and match a carer", desc: "The assessing nurse writes a personalised care plan. We then match a carer based on clinical need, personality and routine, and introduce them before care begins." },
  { step: "04", title: "Care starts on your agreed schedule", desc: "Once care begins, our nursing team stays in contact. If anything changes, we review and adjust. You're not left to manage it on your own." },
];

const lothianFaqs = [
  { q: "Does Zento provide home care across all three Lothian council areas?", a: "Yes — Midlothian, East Lothian and West Lothian. We cover a wide range of towns and villages across all three areas. For specific coverage details, call us on 0131 210 0095 or see the areas section above." },
  { q: "What makes Zento different from other home care providers in Lothian?", a: "Every care arrangement through Zento is planned and reviewed by a registered nurse — not a care coordinator or a scheduler. That means your loved one's care plan is clinically sound, their medication is properly overseen, and someone with genuine medical training reviews their care on a regular basis. Most home care agencies in Lothian don't offer that." },
  { q: "How quickly can home care begin in Lothian?", a: "In most cases, we can arrange a nursing assessment within a few days of your first call. For urgent situations — including hospital discharge — we aim to have care in place within 24 to 48 hours." },
  { q: "Will my loved one have the same carer for every visit?", a: "We work hard to ensure carer consistency, because we know how much it matters — particularly for clients with dementia or anxiety. Our nursing team matches carers based on clinical need and personal compatibility, and we aim to maintain the same carer throughout wherever it's possible." },
  { q: "Do you provide live-in care in Lothian?", a: "Yes, across Midlothian, East Lothian and West Lothian. Every live-in arrangement is personally matched and clinically overseen by our nursing team. Visit our live-in care page for full details." },
  { q: "How do I arrange a nurse-led home assessment in Lothian?", a: "Call us on 0131 210 0095 or complete our online enquiry form. We'll arrange a home visit from one of our registered nurses — anywhere across Lothian — at a time that suits you. It's free and there's no obligation." },
];

export default function LothianLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/lothian/#lothian-service",
    name: "Zento Group — Lothian",
    telephone: "0131 210 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/lothian/",
    address: { "@type": "PostalAddress", streetAddress: "Adit Place", addressLocality: "Edinburgh", postalCode: "EH17", addressCountry: "GB" },
    areaServed: ["Midlothian", "East Lothian", "West Lothian"],
    serviceType: "Nurse-Led Home Care",
    parentOrganization: { "@type": "Organization", "@id": "https://zentogroup.co.uk/#organization", name: "Zento Group" },
    identifier: "CS2026000326",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://zentogroup.co.uk/locations/" },
      { "@type": "ListItem", position: 3, name: "Lothian", item: "https://zentogroup.co.uk/locations/lothian/" },
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
                <li><Link href="/locations/" className="hover:text-primary transition-colors font-medium">Locations</Link></li>
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
                  Nurse-Led Home Care &middot; Midlothian, East Lothian &amp; West Lothian
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Nurse-Led Home Care Across Lothian &mdash;{" "}
                  <span className="text-primary">Midlothian, East Lothian and West Lothian</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care to families across Midlothian, East Lothian and West Lothian.
                  Whether you&apos;re in Dalkeith, Musselburgh or Livingston, a registered nurse oversees every care
                  plan we put in place &mdash; from the first assessment through to regular reviews.
                </p>
              </div>
              <div className="page-cta-group">
                <ModalButton type="assessment" className="page-cta-primary">
                  Speak to our nursing team <ArrowRight className="w-5 h-5" />
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
                <Image src="/about-image.png" alt="Registered nurse conducting home care assessment across Lothian" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
              </AnimateContainer>
              <AnimateContainer animation="fade-left" delay={0.1} className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Care Inspectorate Registered</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Nurse-Led Home Care for Lothian Families</h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>Across Midlothian, East Lothian and West Lothian, Zento provides home care that&apos;s planned and overseen by registered nurses at every stage. Every care plan is written by a nurse, tailored to the individual, and reviewed on a regular basis &mdash; not handed to a carer and left to run on its own.</p>
                  <p>We&apos;re registered with the Care Inspectorate, Scotland&apos;s independent regulator for health and care services, and we operate to the standards that registration requires. For Lothian families, that means genuine clinical oversight &mdash; not the appearance of it.</p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 — WHY CHOOSE ZENTO */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Clinical Difference</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Why Lothian families choose Zento</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">Most home care providers don&apos;t have a nurse behind them. Zento does. Every care arrangement in Lothian is planned by a registered nurse, reviewed by a registered nurse, and backed by clinical expertise that most families wouldn&apos;t expect to find in a home care provider.</p>
              <p className="text-base leading-relaxed text-zinc-600">That matters more than it might seem. It means someone with medical training is watching your loved one&apos;s condition, adjusting the care plan when things change, and spotting problems before they become crises. Not every provider offers that. We think every family deserves it.</p>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 4 — SERVICES (Using ServiceCardsGrid) */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Full Range of Services"
              title="Home care services across the Lothian region"
              subtitle="From Bonnyrigg to Bathgate and Musselburgh to Dunbar, our nursing team provides the full range of Zento home care services across the Lothian region."
            />
            <ServiceCardsGrid services={lothianServices} />
          </div>
        </section>

        {/* SECTION 5 — SIGNS SECTION (Using SignsSectionGrid) */}
        <SignsSectionGrid
          category="Lothian Clinical Assessment"
          title="Signs your loved one in Lothian may need support at home"
          subtitle="Recognising when a family member across Midlothian, East Lothian or West Lothian needs extra assistance. Our registered nurses can carry out a comprehensive at-home assessment."
          signs={lothianSigns}
          ctaText="Book a Lothian consultation"
          ctaType="assessment"
        />

        {/* SECTION 6 — AREAS */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Full Coverage</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">Areas we cover across Lothian</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">Our nursing team provides home care across all three Lothian council areas:</p>
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
                  <h2 className="text-3xl font-black text-secondary">The team behind your care</h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">Our nursing team carries out home assessments and care plan reviews in person across Midlothian, East Lothian and West Lothian. Assessments are conducted at the client&apos;s home &mdash; not over the phone &mdash; and care plans are reviewed regularly throughout the care relationship.</p>
                </div>
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <p className="text-base font-black text-secondary">{edinburghOffice.name}</p>
                    <p className="text-xs text-zinc-500">{edinburghOffice.address}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Serving Midlothian, East Lothian &amp; West Lothian</p>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-zinc-700">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /><a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="hover:text-primary">Phone: {edinburghOffice.phone}</a></p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /><a href={`mailto:${edinburghOffice.email}`} className="hover:text-primary">Email: {edinburghOffice.email}</a></p>
                  </div>
                  <div className="border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 leading-snug">
                    <p><span className="font-bold text-secondary">Care Inspectorate:</span> CS2026000326 (Support Service)</p>
                    <p>CS2026000325 (Housing Support Service)</p>
                  </div>
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 8 — TESTIMONIALS (Using TestimonialsSection) */}
        <TestimonialsSection
          category="Lothian Family Feedback"
          title="What Lothian families say about Zento"
          subtitle="Direct feedback from family members across Midlothian, East Lothian and West Lothian."
          testimonials={getTestimonials("locations.lothian")}
        />

        {/* SECTION 9 — GETTING STARTED (Using ProcessSteps) */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <ProcessSteps
              badge="4-Step Process"
              title="How to arrange home care in Lothian"
              steps={lothianSteps}
              ctaText="Start with a free call"
              ctaType="assessment"
            />
          </div>
        </section>

        {/* SECTION 10 — FAQ (Using FaqAccordion) */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="Lothian FAQs"
              title="Frequently asked questions about home care in Lothian"
              faqs={lothianFaqs}
            />
          </div>
        </section>

        {/* SECTION 11 — NEARBY AREAS */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Specific Area Pages</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Find home care in your specific Lothian area</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">For detailed local coverage, towns served and area-specific information:</p>
              <div className="grid gap-4 sm:grid-cols-3 pt-4 text-left">
                <Link href="/locations/lothian/midlothian/" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Midlothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Dalkeith, Penicuik, Bonnyrigg &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Home care in Midlothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
                <Link href="/locations/lothian/east-lothian/" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">East Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Musselburgh, Haddington, North Berwick &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Home care in East Lothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
                <Link href="/locations/lothian/west-lothian/" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">West Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Livingston, Bathgate, Linlithgow &amp; surrounding areas</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Home care in West Lothian <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* SECTION 12 — FINAL CTA (Using FinalCTASection) */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <FinalCTASection
            title="Speak to our nursing team today"
            subtitle="Our team is ready to answer your questions and arrange a home assessment anywhere across Midlothian, East Lothian or West Lothian."
            tagline="No pressure. No obligation. Honest advice from our registered nurses."
            phone={edinburghOffice.phone}
            email={edinburghOffice.email}
            ctaText="Book a free consultation"
            ctaType="assessment"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
