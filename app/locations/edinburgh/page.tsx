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

/* ─────────────────────────── SEO METADATA ─────────────────────────── */
export const metadata: Metadata = {
  title: "Companionship & Meal Preparation Support in Edinburgh | Zento",
  description:
    "Dedicated non-regulated home support across Edinburgh, covering EH1–EH17 and the Lothians. Friendly companionship and fresh meal preparation. Call us today.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/edinburgh",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Companionship & Meal Preparation Support in Edinburgh | Zento",
    description:
      "Dedicated non-regulated home support across Edinburgh, covering EH1–EH17 and the Lothians. Friendly companionship and fresh meal preparation.",
    url: "https://zentogroup.co.uk/locations/edinburgh",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Home Support in Edinburgh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companionship & Meal Preparation Support in Edinburgh | Zento",
    description:
      "Dedicated non-regulated home support across Edinburgh, covering EH1–EH17 and the Lothians. Companionship and meal preparation support.",
    images: ["/brand-image.png"],
  },
};

/* ─────────────────────────── DATA ─────────────────────────── */
const edinburghOffice = OFFICES.find((o) => o.id === "edinburgh") ?? OFFICES[0];

const edinburghServices: ServiceCardItem[] = [
  {
    id: "companionship",
    title: "Companionship Support",
    desc: "Companionship focuses on emotional and social wellbeing — regular visits from a friendly, vetted companion who provides genuine company, engaging conversation, and shared activities. It helps older adults stay connected to their Edinburgh community without feeling isolated at home.",
    extraDesc:
      "Our Edinburgh team matches each client with a consistent companion who shares their interests and respects their daily routine. Whether it is enjoying a cup of tea and a chat, visiting a local park, pursuing favourite hobbies, or accompanying them on local outings, our companions bring warmth, joy, and reliable company. (Please note: This is non-regulated companionship support and does not include personal care).",
    href: "/home-care/companionship/",
    linkText: "Full details about companionship support",
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation Support",
    desc: "Good nutrition and hydration are essential for maintaining health, energy, and independence at home. Our meal preparation service provides dedicated support with planning, grocery shopping, and cooking wholesome, freshly prepared meals tailored to individual tastes and dietary requirements.",
    extraDesc:
      "Delivered by dedicated support staff, we assist with everything from preparing nutritious home-cooked meals to checking food fresh dates and making mealtimes an enjoyable social experience. Visits are scheduled around your loved one's preferred routine. (Please note: This is non-regulated domestic and nutritional support).",
    href: "/home-care/meal-preparation/",
    linkText: "Full details about meal preparation support",
  },
];

const edinburghSigns = [
  "Feelings of loneliness or social isolation — Spending long periods alone, withdrawing from community activities, or loss of interest in hobbies.",
  "Skipped meals and noticeable weight loss — Unopened food in the fridge, missed meals, or difficulty standing in the kitchen.",
  "Difficulty managing grocery shopping — Lack of fresh produce at home or struggling to carry groceries and stock the pantry.",
  "Household routines becoming unmanageable — Neglected kitchen cleaning, piles of unopened post, or untidiness in previously tidy rooms.",
  "Loss of confidence in preparing hot meals — Reluctance to cook unassisted or needing friendly reassurance and practical assistance.",
  "Family members needing peace of mind — Relatives balancing demanding schedules wanting regular friendly check-ins and support for their loved one.",
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
    title: "Initial home consultation",
    desc: "A member of our Edinburgh team visits your loved one at their Edinburgh address to understand their routine, interests, and companionship needs.",
  },
  {
    step: "03",
    title: "Personalised support plan agreed",
    desc: "We agree on a tailored schedule and match a consistent companion to your family. You review and approve everything before visits begin.",
  },
  {
    step: "04",
    title: "Support begins",
    desc: "Your companion starts visits on the agreed schedule. Our Edinburgh management team checks in regularly to ensure you are delighted with the support.",
  },
];

const edinburghFaqs = [
  {
    q: "Do you cover my Edinburgh postcode?",
    a: "Zento covers all Edinburgh postcodes from EH1 to EH17, including every neighbourhood across the City of Edinburgh council area — from Portobello and Leith in the east to Corstorphine, Balerno and Currie in the west. We also cover Midlothian, East Lothian and West Lothian from the same Edinburgh office. If you are unsure whether your postcode falls within our area, call our Edinburgh team on 0131 210 0095 and we will confirm immediately.",
  },
  {
    q: "How quickly can you arrange support visits in Edinburgh?",
    a: "In most cases, we can complete an introductory consultation and begin companionship or meal preparation visits within a few days of your initial enquiry. Contact our Edinburgh office on 0131 210 0095 to discuss your timeline.",
  },
  {
    q: "Are the Edinburgh services regulated personal care?",
    a: "No. In Edinburgh and the Lothians, our services focus exclusively on non-regulated support — specifically social companionship, lifestyle support, grocery shopping, and meal preparation. We do not provide regulated personal care, bathing assistance, or clinical nursing in this area.",
  },
  {
    q: "How can companionship and meal preparation support my loved one?",
    a: "Regular companionship visits and meal preparation support help older adults maintain their independence, stay socially connected, and enjoy well-balanced, nutritious meals. Our companions build genuine relationships while ensuring daily nutrition and social needs are met in a comfortable, familiar environment.",
  },
  {
    q: "Will my loved one always have the same companion?",
    a: "Consistency is central to our companionship service. Our approach is to match a dedicated, consistent companion for each client rather than sending different people each week. While there will occasionally be cover for holidays or illness, we work hard to ensure familiar faces and established routines.",
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
      addressLocality: "Edinburgh",
      addressCountry: "GB",
    },
    areaServed: [
      "City of Edinburgh",
      "Midlothian",
      "East Lothian",
      "West Lothian",
    ],
    serviceType: "Home Support Services",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://zentogroup.co.uk/#organization",
      name: "Zento Group",
    },
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
                  Home Support · City of Edinburgh &amp; The Lothians
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Companionship &amp; Meal Preparation in <span className="text-primary">Edinburgh</span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides dedicated, non-regulated companionship and meal preparation support in
                  Edinburgh and across the Lothians. We are a local team, based in Edinburgh, helping
                  older adults stay connected, well-nourished, and socially engaged at home.
                </p>
              </div>

              {/* Notice Banner */}
              <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-zinc-700">
                <span className="font-bold text-secondary">Please Note:</span> Services in Edinburgh and the Lothians focus strictly on non-regulated support (companionship, lifestyle assistance, and meal preparation) and do not include regulated personal care.
              </div>

              {/* CTAs */}
              <div className="page-cta-group">
                <ModalButton
                  type="general"
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
            SECTION 2 — OVERVIEW
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
                  alt="Home companion visiting older adult in Edinburgh"
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
                  Home Support
                </span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                  Friendly companionship &amp; home support across Edinburgh
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>
                    Zento operates across the City of Edinburgh, providing visiting
                    companionship and meal preparation support to older adults — from
                    Portobello and Leith in the east to Corstorphine and Balerno in the west.
                  </p>
                  <p>
                    Our services are designed to combat loneliness, encourage active daily routines, and
                    ensure older adults enjoy fresh, wholesome meals prepared in their own kitchens. Companions
                    are thoroughly vetted, referenced, and PVG checked for your complete peace of mind.
                  </p>
                  <p>
                    Our Edinburgh and Lothian services focus specifically on non-regulated companionship and
                    nutritional support. We do not provide regulated personal care, bathing, or clinical tasks in this area.
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
                We are not a national franchise managing Edinburgh from a remote call centre. Our
                Edinburgh office is staffed by a local team that knows the city and its communities.
              </p>
              <p className="text-base leading-relaxed text-zinc-600">
                When you call us, you speak to someone based in Edinburgh. When we arrange an introductory
                visit, our team meets your family in person to ensure a warm, compatible companion match.
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
              title="Our home support services in Edinburgh"
              subtitle="Our Edinburgh team provides dedicated companionship and meal preparation services. All support is non-regulated, delivered by carefully vetted companions, and tailored to individual preferences."
            />

            <ServiceCardsGrid services={edinburghServices} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 — SIGNS YOUR LOVED ONE MAY NEED SUPPORT (Grid Cards)
        ════════════════════════════════════════════════════════ */}
        <SignsSectionGrid
          category="Edinburgh Home Observations"
          title="Signs your loved one in Edinburgh may need companionship or meal support"
          subtitle="Recognising when a family member could benefit from friendly company or assistance with cooking and shopping. Our Edinburgh team provides gentle, supportive consultations."
          signs={edinburghSigns}
          ctaText="Book an Edinburgh consultation"
          ctaType="general"
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
                Our Edinburgh team provides companionship and meal preparation support across the full
                City of Edinburgh council area. We cover every Edinburgh postcode from EH1 to EH17,
                including the following neighbourhoods and areas:
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

            {/* Surrounding Lothians Coverage */}
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50/70 p-8 text-center space-y-4">
                <h3 className="text-xl font-bold text-secondary">
                  Surrounding Lothians Coverage
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
                  Looking for companionship or meal support outside the city boundary? Explore our dedicated pages for neighbouring areas in the Lothians:
                </p>
                <div className="grid gap-3 sm:grid-cols-3 pt-2">
                  <Link
                    href="/locations/lothian/midlothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all shadow-xs"
                  >
                    <span>Midlothian Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/locations/lothian/east-lothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all shadow-xs"
                  >
                    <span>East Lothian Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/locations/lothian/west-lothian"
                    className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 text-xs font-bold text-secondary hover:border-primary/30 hover:text-primary transition-all shadow-xs"
                  >
                    <span>West Lothian Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 — OUR EDINBURGH TEAM
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up" className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-primary/5 p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                    Care Team
                  </span>
                  <h2 className="text-3xl font-black text-secondary">
                    Our Edinburgh team
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Our dedicated local Edinburgh team manages all companionship and meal preparation support across Edinburgh and the wider Lothians.
                  </p>
                </div>

                {/* Team Contact Card */}
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <p className="text-base font-black text-secondary">{edinburghOffice.name}</p>
                    <p className="text-xs text-zinc-500">Covering City of Edinburgh &amp; The Lothians</p>
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
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 — GETTING STARTED IN EDINBURGH (Using ProcessSteps)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <ProcessSteps
              badge="4-Step Process"
              title="How to arrange support in Edinburgh"
              steps={steps}
              ctaText="Start with a free consultation"
              ctaType="general"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 — FAQ (Using FaqAccordion)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="Edinburgh FAQs"
              title="Frequently asked questions about support in Edinburgh"
              faqs={edinburghFaqs as any}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 — NEARBY AREAS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Regional Hub
              </span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">
                Support across Edinburgh and the Lothians
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">
                Our Edinburgh office covers more than the city boundary. We provide non-regulated companionship
                and meal preparation support across the wider Lothian region. If you live just outside Edinburgh,
                you can access the same friendly local team and reliable support.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 pt-4 text-left">
                <Link
                  href="/locations/lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Lothian Region</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Midlothian, East &amp; West Lothian</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Lothian support <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/midlothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Midlothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Dalkeith, Penicuik, Bonnyrigg &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Midlothian support <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/east-lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">East Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Musselburgh, Haddington &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View East Lothian support <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/lothian/west-lothian"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">West Lothian</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Livingston, Bathgate &amp; more</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View West Lothian support <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>

                <Link
                  href="/locations/perthshire"
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-secondary/30 hover:shadow-md sm:col-span-2 md:col-span-2"
                >
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Perthshire Office</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Nurse-led regulated care in Crieff, Comrie &amp; Perthshire</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                    View Perthshire care <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 — FINAL CTA (Using FinalCTASection)
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-zinc-50/50 border-t border-zinc-100">
          <FinalCTASection
            title="Speak to our Edinburgh team today"
            subtitle="If you are looking for friendly companionship or meal preparation support in Edinburgh for a parent, spouse or family member, we would love to hear from you. Our local team is here to listen, answer questions, and help arrange reliable support."
            tagline="No pressure. No obligation. Friendly advice from our local Edinburgh team."
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
