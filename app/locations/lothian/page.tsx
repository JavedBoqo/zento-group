import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, Mail, Heart, ShieldCheck, Brain,
  Home, CheckCircle2, Star, ChevronDown, MapPin, Clock4, Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
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

const lothianServices = [
  { id: "live-in-care", title: "Live-In Care Across Lothian", desc: "When daily visits aren't enough — when your loved one needs someone there through the night, or around the clock — live-in care is often the most practical and the most compassionate answer. A trained, carefully selected carer moves into the home and becomes part of the daily routine. For many Lothian families, it's the option that finally makes staying at home feel genuinely safe.", extraDesc: "Every live-in arrangement in Lothian is managed by our nursing team. They select the carer, oversee the clinical care plan, and review the arrangement regularly so families don't have to chase anyone for updates.", href: "/live-in-care/", linkText: "Learn more about live-in care", icon: Home },
  { id: "respite-care", title: "Respite Care Across Lothian", desc: "If you're a family carer in Lothian, a proper break isn't a luxury — it's a necessity. Zento provides planned and emergency respite care across Midlothian, East Lothian and West Lothian. Before cover begins, a nurse writes a care plan specific to the respite period, so there's genuine continuity rather than someone simply showing up and guessing what to do.", extraDesc: "Your loved one stays at home, with a consistent and carefully briefed carer. You get the break you need, knowing the standard of care hasn't dropped while you're away.", href: "/home-care/respite-care/", linkText: "Find out about respite care", icon: ShieldCheck },
  { id: "dementia-care", title: "Dementia Care Across Lothian", desc: "For someone living with dementia, the details matter enormously — the same face at the door, the same order to the morning, the same small routines that make the day feel familiar and safe. Our nursing team designs dementia care plans with consistency at the centre, monitors for changes in behaviour and cognition, and adjusts the approach before small difficulties turn into significant ones.", extraDesc: "Whether your family member is in Dalkeith, Haddington or Livingston, the clinical care behind their daily support is the same.", href: "/home-care/dementia-care/", linkText: "About our dementia care service", icon: Brain },
  { id: "personal-care", title: "Personal Care Across Lothian", desc: "Personal care visits across Lothian cover the practical daily tasks that allow your loved one to stay comfortably and safely at home — bathing, dressing, continence support, mobility assistance and medication prompting. A registered nurse writes the initial care plan and reviews it on a regular basis throughout.", extraDesc: "Nothing is left to the discretion of an individual carer working without clinical oversight.", href: "/home-care/personal-care/", linkText: "About personal care at home", icon: Heart },
  { id: "overnight-care", title: "Overnight Care Across Lothian", desc: "Falls, medication needs, night-time confusion — the risks that worry families most often happen after dark. For Lothian families where overnight safety is a concern, we provide sleep-in and waking-night carers with care plans written specifically for the night hours and what they can bring.", extraDesc: "Support that's properly planned, not improvised.", href: "/live-in-care/overnight-care/", linkText: "About overnight care at home", icon: Clock4 },
  { id: "hospital-discharge", title: "Hospital Discharge Support Across Lothian", desc: "Returning home after a hospital stay is one of the most vulnerable moments for an older person. Zento can liaise directly with NHS Lothian discharge teams to make sure the right care is in place before your loved one leaves hospital — not arranged in a rush the day they get home.", extraDesc: "In most cases we can have care in place within 24 to 48 hours of discharge, with a proper nursing care plan and a matched carer ready from day one.", href: "/home-care/hospital-discharge/", linkText: "About hospital discharge care", icon: Building2 },
];

const lothianAreasMidlothian = ["Dalkeith", "Penicuik", "Bonnyrigg", "Loanhead", "Gorebridge", "Newtongrange", "Roslin", "Lasswade"];
const lothianAreasEast = ["Musselburgh", "Haddington", "North Berwick", "Dunbar", "Tranent", "Prestonpans", "Gullane", "East Linton"];
const lothianAreasWest = ["Livingston", "Bathgate", "Linlithgow", "Broxburn", "Armadale", "West Calder"];

const lothianTestimonials = [
  { quote: "After Dad's fall last winter, we needed care in place quickly. The nurse who came to Dalkeith was thorough — she spotted things we hadn't even thought to mention. He's been with the same carer since February, and the difference it's made to his confidence at home is remarkable.", author: "Helen B.", location: "Dalkeith", source: "Google Review" },
  { quote: "What won us over was that a nurse came first. Not a salesperson, not a coordinator — a nurse who actually knew what she was assessing. Mum's had the same carer from the start and genuinely looks forward to her visits. That kind of consistency is rare.", author: "David R.", location: "Haddington", source: "homecare.co.uk" },
  { quote: "We manage Mum's care from Australia, which means we can't be there to check on things. Knowing a nurse reviews her care plan every few months gives us real peace of mind. When we do visit, we can see she's being looked after properly.", author: "Karen M.", location: "Livingston", source: "Google Review" },
];

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
            <div className="mx-auto max-w-5xl space-y-6">
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
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ModalButton type="assessment" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer">
                  Speak to our nursing team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white">
                  <Phone className="w-4 h-4 shrink-0" />Call us: {edinburghOffice.phone}
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Midlothian &middot; East Lothian &middot; West Lothian</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Care Inspectorate Registered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — OVERVIEW */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl">
                <Image src="/about-image.png" alt="Registered nurse conducting home care assessment across Lothian" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Care Inspectorate Registered</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Nurse-Led Home Care for Lothian Families</h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>Across Midlothian, East Lothian and West Lothian, Zento provides home care that&apos;s planned and overseen by registered nurses at every stage. Every care plan is written by a nurse, tailored to the individual, and reviewed on a regular basis &mdash; not handed to a carer and left to run on its own.</p>
                  <p>We&apos;re registered with the Care Inspectorate, Scotland&apos;s independent regulator for health and care services, and we operate to the standards that registration requires. For Lothian families, that means genuine clinical oversight &mdash; not the appearance of it.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — WHY CHOOSE ZENTO */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Clinical Difference</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Why Lothian families choose Zento</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">Most home care providers don&apos;t have a nurse behind them. Zento does. Every care arrangement in Lothian is planned by a registered nurse, reviewed by a registered nurse, and backed by clinical expertise that most families wouldn&apos;t expect to find in a home care provider.</p>
              <p className="text-base leading-relaxed text-zinc-600">That matters more than it might seem. It means someone with medical training is watching your loved one&apos;s condition, adjusting the care plan when things change, and spotting problems before they become crises. Not every provider offers that. We think every family deserves it.</p>

            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Full Range of Services</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">Home care services across the Lothian region</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">From Bonnyrigg to Bathgate and Musselburgh to Dunbar, our nursing team provides the full range of Zento home care services across the Lothian region.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-2">
              {lothianServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <div key={service.id} className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><IconComp className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-secondary leading-snug">{service.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-600">{service.desc}</p>
                      <p className="text-sm leading-relaxed text-zinc-600">{service.extraDesc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-200/60">
                      <Link href={service.href} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors">
                        {service.linkText}<ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5 — AREAS */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Full Coverage</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">Areas we cover across Lothian</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">Our nursing team provides home care across all three Lothian council areas:</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-12">
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-secondary mb-4">Midlothian</h3>
                <div className="flex flex-wrap gap-2">
                  {lothianAreasMidlothian.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-secondary mb-4">East Lothian</h3>
                <div className="flex flex-wrap gap-2">
                  {lothianAreasEast.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-secondary mb-4">West Lothian</h3>
                <div className="flex flex-wrap gap-2">
                  {lothianAreasWest.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="max-w-5xl mx-auto mb-12 h-72 w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-md">
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
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-600 mb-4">Not sure whether your specific town is covered?</p>
              <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white">
                <Phone className="w-4 h-4 shrink-0" />Call us on {edinburghOffice.phone}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6 — TEAM NAP */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-primary/5 p-8 md:p-12 max-w-4xl mx-auto">
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
            </div>
          </div>
        </section>

        {/* SECTION 7 — TESTIMONIALS */}
        <section className="bg-zinc-50/50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">Local Feedback</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">What Lothian families say about Zento</h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {lothianTestimonials.map((t, i) => (
                <div key={i} className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div>
                    <div className="mb-5 flex gap-1">{Array.from({ length: 5 }).map((_, si) => (<Star key={si} className="w-4 h-4 fill-primary text-primary" />))}</div>
                    <p className="text-sm leading-relaxed text-zinc-600 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="border-t border-zinc-100 pt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary">{t.author.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-bold text-secondary">{t.author}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {t.location} &middot; {t.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — GETTING STARTED */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">4-Step Process</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">How to arrange home care in Lothian</h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {lothianSteps.map((item, index) => (
                <div key={index} className="relative flex flex-col">
                  {index < lothianSteps.length - 1 && (<div className="absolute top-8 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px bg-primary/20 lg:block" />)}
                  <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-2xl font-black text-primary shadow-lg ring-1 ring-primary/10">{item.step}</div>
                  <div className="text-center">
                    <h3 className="mb-3 text-lg font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <ModalButton type="assessment" className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer">
                Start with a free call <ArrowRight className="w-5 h-5" />
              </ModalButton>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">Lothian FAQs</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">Frequently asked questions about home care in Lothian</h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                {lothianFaqs.map((faq, i) => (
                  <details key={i} className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                      <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">{faq.q}</h3>
                      <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                    </summary>
                    <div className="px-6 pb-6"><p className="text-sm leading-relaxed text-zinc-600">{faq.a}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10 — NEARBY AREAS */}
        <section className="bg-white py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
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
            </div>
          </div>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Speak to our nursing team today</h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">Our team is ready to answer your questions and arrange a home assessment anywhere across Midlothian, East Lothian or West Lothian.</p>
                <p className="text-sm font-semibold text-white/70 italic">No pressure. No obligation. Honest advice from our registered nurses.</p>
                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton type="assessment" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer">
                    Book a free consultation <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  <a href={`tel:${edinburghOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
                    <Phone className="w-4 h-4 shrink-0" />{edinburghOffice.phone}
                  </a>
                  <a href={`mailto:${edinburghOffice.email}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
                    <Mail className="w-4 h-4 shrink-0" />{edinburghOffice.email}
                  </a>
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
