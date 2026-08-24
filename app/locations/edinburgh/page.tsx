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
  Building2,
  Sun,
  Home,
  CheckCircle2,
  Clock4,
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

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Home Care in Edinburgh | Nurse-Led | Zento",
  description:
    "Nurse-led home care in Edinburgh, covering EH1–EH17 and the Lothians. Personal care, dementia support, respite, live-in care — all overseen by registered nurses. Call us today.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/edinburgh",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care in Edinburgh | Nurse-Led | Zento",
    description:
      "Nurse-led home care in Edinburgh, covering EH1–EH17 and the Lothians. Personal care, dementia support, respite, live-in care — all overseen by registered nurses.",
    url: "https://zentogroup.co.uk/locations/edinburgh",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Home Care in Edinburgh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care in Edinburgh | Nurse-Led | Zento",
    description:
      "Nurse-led home care in Edinburgh, covering EH1–EH17 and the Lothians. All care overseen by registered nurses.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const edinburghOffice = OFFICES[0]; // Edinburgh office

const edinburghServices: ServiceCardItem[] = [
  {
    id: "live-in-care",
    title: "Live-In Care in Edinburgh",
    desc: "Live-in care allows an older person to remain in their Edinburgh home with a dedicated carer present around the clock — an alternative to a care home that many Edinburgh families are choosing. Rather than uprooting someone from a home they know, a familiar street, a GP surgery they trust, and a community they belong to, live-in care brings full-time support directly to them.",
    extraDesc:
      "Our Edinburgh nursing team matches each client with a live-in carer suited to their personality, care needs and daily routine. The carer is supported and supervised by a registered nurse, who reviews the care plan regularly and adjusts it as the client's needs change. Live-in care is available for older adults, those recovering from illness or surgery, and people living with dementia or other long-term conditions.",
    href: "/live-in-care/",
    linkText: "Full details about live-in care",
  },
  {
    id: "respite-care",
    title: "Respite Care in Edinburgh",
    desc: "If you are a family carer in Edinburgh, respite care gives you the opportunity to take a genuine break — knowing your loved one is safe, comfortable and well looked after in their own home. Zento provides at-home respite care in Edinburgh: a carer comes to your loved one, rather than your loved one being moved into unfamiliar surroundings.",
    extraDesc:
      "Respite can be arranged as planned, regular cover — weekly breaks for family carers — or as emergency support at short notice. Edinburgh families who want to know more about carer support and their own rights are also encouraged to contact VOCAL (Voluntary Organisations' Caring for Lothian), the Edinburgh charity that supports unpaid family carers across the city.",
    // vocalLink: {
    //   text: "VOCAL Edinburgh (vocallothian.org.uk)",
    //   href: "https://www.vocallothian.org.uk/",
    // },
    href: "/home-care/respite-care/",
    linkText: "Full details about respite care at home",
  },
  {
    id: "overnight-care",
    title: "Overnight Care in Edinburgh",
    desc: "For Edinburgh families where a loved one needs support during the night but does not require full-time live-in care, overnight care provides a practical and reassuring solution. We offer two types: sleep-in care, where a carer stays overnight and is available if needed; and waking-night care, where the carer remains awake and active throughout.",
    extraDesc:
      "Overnight care is often needed following a period of illness or hospital discharge, when night-time confusion, falls risk or medication needs make unsupervised nights unsafe. It is also commonly arranged for people living with dementia, where wandering or disorientation overnight is a concern. Our Edinburgh nursing team will advise which option suits your situation and can arrange an assessment at short notice when needed.",
    href: "/live-in-care/overnight-care/",
    linkText: "Full details about overnight care",
  },
  {
    id: "dementia-care",
    title: "Dementia Care in Edinburgh",
    desc: "Remaining at home, in a familiar environment, surrounded by personal belongings and established routines, makes a meaningful difference to the wellbeing of someone living with dementia. Zento provides dementia care at home across Edinburgh — keeping people connected to the places, people and patterns that are important to them.",
    extraDesc:
      "Our approach to dementia care focuses on carer consistency — the same carer, or a small team of familiar faces, visiting reliably so that your loved one is never met by a stranger. Our nursing team develops care plans specifically for each person's stage of dementia and the behaviours it produces, and reviews them regularly as the condition progresses. We liaise with families, GPs and Edinburgh-based memory services to ensure care remains appropriate.",
    href: "/home-care/dementia-care/",
    linkText: "Full details about dementia care at home",
  },
  {
    id: "personal-care",
    title: "Personal Care in Edinburgh",
    desc: "Personal care covers the daily tasks that become difficult with age, illness or reduced mobility — washing, dressing, continence support, grooming and getting ready for the day. These are the most intimate forms of care, and the quality of the person delivering them matters enormously.",
    extraDesc:
      "Zento's personal care visits in Edinburgh are delivered by trained carers who approach each client with patience, dignity and a genuine understanding of what it means to need help with private tasks. Every carer is recruited, trained and supervised by our nursing team. Visits are scheduled around the client's preferred routine — not around what is convenient for us. For many Edinburgh families, a daily personal care visit is the foundation around which other support is built.",
    href: "/home-care/personal-care/",
    linkText: "Full details about personal care at home",
  },
  {
    id: "hospital-discharge",
    title: "Hospital Discharge Support in Edinburgh",
    desc: "When a loved one is discharged from the Royal Infirmary of Edinburgh or the Western General Hospital, the first days at home are often the most uncertain. Physical recovery continues at home, but the level of support at home does not always match what was available in hospital. Zento works with Edinburgh families — and with discharge teams at NHS Lothian — to bridge that gap.",
    extraDesc:
      "Our hospital discharge service provides short-term intensive care designed around what was actually needed on the ward. This can include personal care, medication management, mobility support, meal preparation and overnight assistance. Our nurses liaise directly with hospital discharge coordinators and community nurses at NHS Lothian to ensure the transition home is safe and well supported. Care can be arranged within 48 hours of a planned discharge.",
    href: "/home-care/hospital-discharge/",
    linkText: "Full details about hospital discharge care",
  },
];

const edinburghSigns = [
  "Changes in mobility or frequent falls — Stumbling, difficulty getting up from a chair, or reluctance to walk unassisted around the home.",
  "Medication mismanagement — Forgetting daily doses, taking incorrect quantities, or confusion regarding prescription times.",
  "Skipped meals and noticeable weight loss — Unopened food in the fridge, missed meals, or observable changes in physical strength.",
  "Struggling with personal care and dressing — Difficulty bathing safely, wearing soiled clothes, or neglecting daily personal grooming.",
  "Increased memory lapses or disorientation — Forgetting recent events, misplacing household keys/belongings, or nighttime wandering.",
  "Household chores becoming unmanageable — Piles of unopened post, neglected laundry, or general untidiness in previously tidy rooms.",
];

const edinburghNeighborhoods = [
  "City Centre",
  "Leith",
  "Portobello",
  "Joppa",
  "Morningside",
  "Bruntsfield",
  "Marchmont",
  "Newington",
  "Stockbridge",
  "Inverleith",
  "Trinity",
  "Granton",
  "Pilton",
  "Corstorphine",
  "Murrayfield",
  "Saughtonhall",
  "Gorgie",
  "Slateford",
  "Colinton",
  "Oxgangs",
  "Juniper Green",
  "Currie",
  "Balerno",
  "Liberton",
  "Gilmerton",
  "Craigmillar",
  "Duddingston",
  "Abbeyhill",
  "Barnton",
  "Davidson's Mains",
  "Fairmilehead",
];

const steps = [
  {
    step: "01",
    title: "Call our Edinburgh office",
    desc: "Call 0131 210 0095 or complete our enquiry form. We will listen and answer your questions honestly — no pressure, no obligation.",
  },
  {
    step: "02",
    title: "Nurse assessment at home",
    desc: "A registered nurse visits your loved one at their Edinburgh address to understand their care needs, preferences and daily routine.",
  },
  {
    step: "03",
    title: "Care plan written and agreed",
    desc: "Your nurse writes a personalised care plan and matches a carer to your family. You review and approve it before anything begins.",
  },
  {
    step: "04",
    title: "Care begins",
    desc: "Your carer starts visits on the agreed schedule. Our Edinburgh nursing team reviews the plan regularly and stays in touch with your family.",
  },
];

const edinburghFaqs = [
  {
    q: "Do you cover my Edinburgh postcode?",
    a: "Zento covers all Edinburgh postcodes from EH1 to EH17, including every neighbourhood across the City of Edinburgh council area — from Portobello and Leith in the east to Corstorphine, Balerno and Currie in the west. We also cover Midlothian, East Lothian and West Lothian from the same Edinburgh office. If you are unsure whether your postcode falls within our area, call our Edinburgh team on 0131 210 0095 and we will confirm immediately.",
  },
  {
    q: "How quickly can you arrange home care in Edinburgh?",
    a: "In most cases, we can complete a nurse assessment and begin care within a few days of your initial enquiry. For urgent situations — such as hospital discharge, a sudden change in health, or a family carer who can no longer continue — we can often arrange emergency cover within 24 to 48 hours. Contact our Edinburgh office on 0131 210 0095 to discuss your timeline.",
  },
  {
    q: "What is Free Personal Care and do Edinburgh residents qualify?",
    a: "Free Personal Care is a Scottish Government-funded scheme that covers the cost of personal care at home for eligible adults aged 65 and over, regardless of their income or savings. In Edinburgh, it is accessed through a care needs assessment arranged by City of Edinburgh Council's Health and Social Care Partnership (Edinburgh HSCP). Younger adults with certain conditions may also qualify under Frank's Law. We can guide you through the process and help you understand what you are entitled to.",
  },
  {
    q: "Is Zento registered with the Care Inspectorate in Edinburgh?",
    a: "Zento is fully registered with the Care Inspectorate, the independent regulator of care services in Scotland. Our Edinburgh registration numbers are CS2026000326 (Support Service) and CS2026000325 (Housing Support Service). Registration means we meet national care standards and are subject to independent inspection. You can view our registration details on the Care Inspectorate's online service register at careinspectorate.com.",
  },
  {
    q: "Will my loved one always have the same carer?",
    a: "Carer consistency is one of the things Edinburgh families ask about most. Our approach is to build a small team of regular carers for each client rather than sending different people each week. For clients with dementia or anxiety, we treat consistency as a clinical requirement — the same carer, the same routine, the same familiar face. While there will occasionally be cover for holidays or illness, we work hard to ensure these disruptions are minimal and managed well.",
  },
  {
    title: "Care begins with familiar faces",
    desc: "We match consistent, trained carers who are introduced before care starts, with ongoing nurse oversight.",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function EdinburghLocationPage() {
  /* ── JSON-LD: LocalBusiness schema ── */
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/edinburgh#edinburgh-office",
    name: "Zento Group — Edinburgh",
    telephone: "0131 210 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/edinburgh",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Adit Place",
      addressLocality: "Edinburgh",
      postalCode: "EH17",
      addressCountry: "GB",
    },
    areaServed: [
      "City of Edinburgh",
      "Midlothian",
      "East Lothian",
      "West Lothian",
    ],
    serviceType: "Nurse-Led Home Care",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
    identifier: "CS2026000326",
  };

  /* ── JSON-LD: FAQPage schema ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: edinburghFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  /* ── JSON-LD: BreadcrumbList schema ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zentogroup.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://zentogroup.co.uk/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Edinburgh",
        item: "https://zentogroup.co.uk/locations/edinburgh",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <Link href="/locations" className="hover:text-primary transition-colors font-medium">
                    Locations
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Edinburgh
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
                  Nurse-Led Home Care · City of Edinburgh &amp; The Lothians
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Home Care in Edinburgh —{" "}
                  <span className="text-primary">Nurse-Led</span> by Our Registered Nurses
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care in Edinburgh and across the Lothians. We are a
                  local care provider, based in Edinburgh, registered with the Care Inspectorate, and
                  led by registered nurses who write and supervise every care plan we deliver. If someone
                  you love needs support at home — whether that is a few visits a week or something
                  more — we are here to help.
                </p>
              </div>

              {/* CTAs */}
              <div className="page-cta-group">
                <ModalButton
                  type="assessment"
                  className="page-cta-primary"
                >
                  Arrange a free consultation <ArrowRight className="w-5 h-5" />
                </ModalButton>

                <a
                  href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call our Edinburgh team: {edinburghOffice.phone}
                </a>
              </div>

            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — NURSE-LED OVERVIEW
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <AnimateContainer
                animation="fade-right"
                className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl"
              >
                <Image
                  src="/about-image.webp"
                  alt="Registered nurse conducting home care assessment in Edinburgh"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </AnimateContainer>

              <AnimateContainer
                animation="fade-left"
                delay={0.1}
                className="flex-1 space-y-6"
              >
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  Care Inspectorate Registered
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Nurse-led home care across Edinburgh
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Zento is a nurse-led home care provider, operating from our Edinburgh office on
                    Adit Place (EH17). We provide visiting care, live-in care, overnight support and
                    specialist home care services to older adults living across the City of Edinburgh —
                    from Portobello and Leith in the east to Corstorphine and Balerno in the west.
                  </p>
                  <p>
                    What distinguishes us from other Edinburgh care providers is the clinical standard
                    behind everything we do. Every care package is assessed, written and regularly
                    reviewed by a registered nurse. Carers are trained and supervised to a clinical level.
                    We are registered with the Care Inspectorate (CS2026000326), which means our service is
                    independently inspected and held to national care standards.
                  </p>
                  <p>
                    Eligible Edinburgh residents aged 65 and over may qualify for Free Personal Care, which
                    covers the cost of personal care at home through City of Edinburgh Council. We can help
                    your family understand what funding is available during your initial consultation.
                  </p>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — WHY CHOOSE ZENTO IN EDINBURGH
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Local Expertise
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                A local Edinburgh team you can trust
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">
                We are not a national franchise managing Edinburgh from a call centre elsewhere. Our
                Edinburgh office is staffed by a local care team that knows the city — its hospitals,
                its communities, its NHS Lothian services, and the funding routes available to
                Edinburgh and Lothian families.
              </p>
              <p className="text-base leading-relaxed text-zinc-600">
                When you call us, you speak to someone based in Edinburgh. When a nurse assesses your
                loved one, they travel from our Edinburgh office. When care visits begin, your carer is
                managed locally, not remotely.
              </p>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 — SERVICES IN EDINBURGH
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Tailored Support"
              title="Our home care services in Edinburgh"
              subtitle="Our Edinburgh team provides the full range of home care services. Each is delivered by trained carers, overseen by a registered nurse, and tailored precisely to the individual receiving it."
            />

            <ServiceCardsGrid services={edinburghServices} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — SIGNS YOUR LOVED ONE MAY NEED CARE (Grid Cards)
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Edinburgh Clinical Observation"
          title="Signs your loved one in Edinburgh may need care at home"
          subtitle="Recognising when a family member needs extra help is not always straightforward. If several of these signs feel familiar, our Edinburgh nurse team can provide a gentle, confidential assessment."
          signs={edinburghSigns}
          ctaText="Book an Edinburgh nursing assessment"
          ctaType="assessment"
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 6 — AREAS AND POSTCODES
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="text-center mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Full Coverage
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">
                Edinburgh postcodes and areas we cover
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                Our Edinburgh team provides nurse-led home care across the full City of Edinburgh
                council area. We cover every Edinburgh postcode from EH1 to EH17, including the
                following neighbourhoods and areas:
              </p>
            </AnimateContainer>

            {/* Neighborhoods tags */}
            <AnimateContainer animation="stagger" className="mb-12 flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {edinburghNeighborhoods.map((name) => (
                <AnimateItem key={name}>
                  <span className="inline-block rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs">
                    {name}
                  </span>
                </AnimateItem>
              ))}
            </AnimateContainer>

            {/* Google Map Embed & Regional Links */}
            <div className="grid gap-8 lg:grid-cols-12 max-w-5xl mx-auto items-center">
              <AnimateContainer animation="fade-right" className="lg:col-span-7 h-72 w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-md">
                <iframe
                  title="Zento Group Edinburgh Office Location"
                  src={edinburghOffice.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </AnimateContainer>

              <AnimateContainer animation="fade-left" delay={0.1} className="lg:col-span-5 space-y-4">
                <h3 className="text-lg font-bold text-secondary">
                  Surrounding Lothians Coverage
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Looking for care outside the city boundary? Explore our dedicated pages for
                  neighbouring areas in the Lothians:
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/locations/lothian/midlothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <span>Midlothian Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/locations/lothian/east-lothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <span>East Lothian Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/locations/lothian/west-lothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <span>West Lothian Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </AnimateContainer>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 — OUR EDINBURGH TEAM (NAP Section)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up" className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-primary/5 p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                    Office Details
                  </span>
                  <h2 className="text-3xl font-black text-secondary">
                    Our Edinburgh office
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Zento&apos;s Edinburgh office is based on Adit Place, Edinburgh EH17. Our care team
                    manages all home care services across Edinburgh and the Lothians from this
                    location.
                  </p>
                </div>

                {/* NAP Card */}
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <p className="text-base font-black text-secondary">{edinburghOffice.name}</p>
                    <p className="text-xs text-zinc-500">{edinburghOffice.address}</p>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-zinc-700">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="hover:text-primary">
                        Phone: {edinburghOffice.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href={`mailto:${edinburghOffice.email}`} className="hover:text-primary">
                        Email: {edinburghOffice.email}
                      </a>
                    </p>
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

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS (Using global TestimonialsSection)
        ════════════════════════════════════════════════════════ */}
        <TestimonialsSection
          category="Edinburgh Family Feedback"
          title="What Edinburgh families say about Zento"
          subtitle="Real experiences from families across Edinburgh who trust Zento to care for their loved ones."
          testimonials={getTestimonials("locations.edinburgh")}
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — GETTING STARTED IN EDINBURGH (Using ProcessSteps)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <ProcessSteps
              badge="4-Step Process"
              title="How to arrange home care in Edinburgh"
              steps={steps}
              ctaText="Start with a free consultation"
              ctaType="assessment"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — FAQ (Using FaqAccordion)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="Edinburgh FAQs"
              title="Frequently asked questions about home care in Edinburgh"
              faqs={edinburghFaqs as any}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — NEARBY AREAS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Regional Hub
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Home care across Edinburgh and the Lothians
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">
                Our Edinburgh office covers more than the city boundary. We provide the same
                nurse-led home care to families across the wider Lothian region. If you live just
                outside Edinburgh, you can access the same local team, the same nursing oversight and
                the same standard of care.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 pt-4 text-left">
                <Link
                  href="/locations/lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Lothian Region</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Midlothian, East &amp; West Lothian</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Lothian home care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/midlothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Midlothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Dalkeith, Penicuik, Bonnyrigg &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Midlothian home care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/east-lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">East Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Musselburgh, Haddington &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View East Lothian home care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/west-lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">West Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Livingston, Bathgate &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View West Lothian home care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/perthshire"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-secondary/30 hover:shadow-md sm:col-span-2 md:col-span-2"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Perthshire Office</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Crieff, Comrie, Muthill, Braco &amp; Perthshire villages</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                    View Perthshire home care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 — FINAL CTA (Using FinalCTASection)
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50/50 border-t border-zinc-100">
          <FinalCTASection
            title="Speak to our Edinburgh team today"
            subtitle="If you are looking for home care in Edinburgh for a parent, spouse or family member, we would like to hear from you. Our nursing team is here to listen, explain what is possible and help you find the right care — without any pressure to make a decision before you are ready."
            tagline="No pressure. No obligation. Honest advice from registered nurses."
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
