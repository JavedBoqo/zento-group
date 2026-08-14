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
  title: "Home Care in Perthshire | Nurse-Led | Zento",
  description: "Nurse-led home care across Perthshire from our Crieff office — covering Crieff, Comrie, Muthill, Braco and surrounding villages. Contact our Crieff team today.",
  alternates: { canonical: "https://zentogroup.co.uk/locations/perthshire/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Home Care in Perthshire | Nurse-Led | Zento",
    description: "Nurse-led home care across Perthshire from our Crieff office — covering Crieff, Comrie, Muthill, Braco and surrounding villages.",
    url: "https://zentogroup.co.uk/locations/perthshire/",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/brand-image.png", width: 1200, height: 630, alt: "Zento Nurse-Led Home Care in Perthshire" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care in Perthshire | Nurse-Led | Zento",
    description: "Nurse-led home care across Perthshire from our Crieff office.",
    images: ["/brand-image.png"],
  },
};

const crieffOffice = OFFICES[1];

const perthshireServices = [
  { id: "live-in-care", title: "Live-In Care in Perthshire", desc: "In rural Perthshire, where multiple daily visits can be complicated by distance, live-in care is often the most practical and the most compassionate arrangement available. A trained, nurse-selected carer moves into your loved one's home and provides round-the-clock support — so no one is ever alone, and no one is at risk between visits.", extraDesc: "Our Crieff nursing team manages every live-in arrangement personally, from the initial matching process through to regular care reviews. Families in Crieff, Comrie and the surrounding villages get the same standard of clinical oversight as they would anywhere.", href: "/live-in-care/", linkText: "About live-in care", icon: Home },
  { id: "respite-care", title: "Respite Care in Perthshire", desc: "Caring for a family member yourself is one of the most demanding things anyone can take on. Respite care gives you a genuine break — not just a few hours with someone sitting in the room, but properly planned cover with a nurse-led care plan in place before your carer even walks through the door.", extraDesc: "Zento provides planned and emergency respite care across Crieff, Comrie and the surrounding Perthshire villages. Your loved one stays at home, with a consistent and properly briefed carer, following the same routine. You get the time you need, knowing nothing important has been left to chance.", href: "/home-care/respite-care/", linkText: "About respite care", icon: ShieldCheck },
  { id: "dementia-care", title: "Dementia Care in Perthshire", desc: "For someone living with dementia in Perthshire, the things that matter most are often invisible to the untrained eye — whether the routine is consistent, whether the carer is the same face every time, whether the environment feels familiar. Our nursing team builds that consistency into every dementia care plan from the start.", extraDesc: "We monitor for changes in behaviour and cognition, adjust care before problems develop, and keep families informed throughout. Clinical oversight isn't something you add later when things go wrong. It's built into the arrangement from day one.", href: "/home-care/dementia-care/", linkText: "About our dementia care service", icon: Brain },
  { id: "personal-care", title: "Personal Care in Perthshire", desc: "Personal care visits across Perthshire cover the daily tasks that make independent life at home possible — bathing, dressing, continence support, mobility and medication. Every care plan is written by one of our Crieff nurses and reviewed on a regular basis. If anything needs to change between visits, our team is a phone call away on the same number you always use.", extraDesc: "For Perthshire families exploring council-funded care or Self-Directed Support through Perth and Kinross Council, we're happy to talk through what might be available from your very first conversation with us.", href: "/home-care/personal-care/", linkText: "About personal care at home", icon: Heart },
  { id: "overnight-care", title: "Overnight Care in Perthshire", desc: "Night-time is when many families in Perthshire worry most — falls risk, medication needs, the anxiety of being alone in a rural area after dark. Overnight care from a trained, nurse-supervised carer provides the safety net that makes staying at home feel genuinely safe.", extraDesc: "We provide sleep-in and waking-night cover across Crieff, Comrie and surrounding villages, with care plans written specifically for overnight needs.", href: "/live-in-care/overnight-care/", linkText: "About overnight care at home", icon: Clock4 },
  { id: "hospital-discharge", title: "Hospital Discharge Support in Perthshire", desc: "Coming home from Ninewells Hospital or Perth Royal Infirmary without the right care in place is a real risk — and one that happens more often than it should. Our Crieff nursing team can liaise directly with NHS Tayside discharge teams to ensure everything is ready before your loved one leaves hospital.", extraDesc: "In most cases, we can have care arranged within 24 to 48 hours of discharge, with a proper clinical care plan and a matched carer from our local team.", href: "/home-care/hospital-discharge/", linkText: "About hospital discharge care", icon: Building2 },
];

const perthshireAreasCrieff = ["Crieff", "Muthill", "Braco", "Gilmerton"];
const perthshireAreasComrie = ["Comrie", "St Fillans", "Strowan"];

const perthshireTestimonials = [
  { quote: "I'd spent weeks trying to find proper home care in Crieff and getting nowhere. A colleague mentioned Zento and within a week a nurse had visited Dad at home and we had a care plan. The fact that they're based on the High Street matters — you feel like you're dealing with people who are actually part of the community.", author: "Susan T.", location: "Crieff", source: "Google Review" },
  { quote: "Getting care arranged in Comrie always felt like it would be complicated. With Zento it wasn't. The nurse who came to assess Mum clearly knew what she was doing, and the carer she matched has been with Mum every week since. We finally feel like someone qualified is actually managing things.", author: "Ian F.", location: "Comrie", source: "homecare.co.uk" },
  { quote: "Mum came home from Ninewells needing support quickly. Zento had a carer with her the next day and a proper care plan within the week. Knowing the whole thing is nurse-led means I stop worrying that something medical is going to be missed. That peace of mind is worth everything.", author: "Patricia L.", location: "Muthill", source: "Google Review" },
];

const perthshireSteps = [
  { step: "01", title: "Call our Crieff team or complete our enquiry form", desc: "We respond the same day. No obligation, no pressure — just a straightforward conversation about what you need." },
  { step: "02", title: "A registered nurse visits your loved one at home", desc: "One of our Crieff nurses will visit — anywhere in the Crieff and Comrie area — for a proper needs assessment at the client's home." },
  { step: "03", title: "We write the care plan and match a carer", desc: "The nurse writes a personalised care plan. We match a carer based on clinical need, routine and personal fit — and introduce them before care begins." },
  { step: "04", title: "Care starts, and we stay involved", desc: "Our Crieff team stays in regular contact once care begins. If anything changes, we review and adjust. You're not left to manage it on your own." },
];

const perthshireFaqs = [
  { q: "Do you have a local office in Crieff?", a: "Yes. Our Perthshire team is based at East High Street, Crieff PH7. When you call us, you're speaking to people who work in the same town — not a national call centre. All care in Perthshire is planned, managed and reviewed from this office." },
  { q: "Which areas of Perthshire do you cover?", a: "We provide home care across Crieff, Muthill, Braco, Gilmerton, Comrie, St Fillans and surrounding Perthshire villages. If you're not sure whether we cover your specific area, call us on 0176 479 0095 and we'll confirm straightaway." },
  { q: "Is nurse-led care available in rural Perthshire villages?", a: "Yes. Our Crieff nursing team provides the same standard of clinical care to families in rural Perthshire as to those in the town itself. Your care plan is written and reviewed by a registered nurse, and your carer is clinically overseen throughout — regardless of where you are in the area." },
  { q: "Can you provide live-in care in Perthshire?", a: "Yes. We provide live-in care across Perthshire, managed by our Crieff nursing team. A registered nurse leads the matching and clinical oversight process for every live-in arrangement. For many Perthshire families — particularly those in more rural areas — live-in care is the most practical option available." },
  { q: "How quickly can home care be arranged in Crieff or Comrie?", a: "In most cases we can arrange a nursing assessment within a few days of your first call. For urgent situations — including discharge from Ninewells or Perth Royal Infirmary — we aim to have care in place within 24 to 48 hours." },
  { q: "How is Zento's care different from other home care providers in Perthshire?", a: "Most care providers who operate in Perthshire manage things from a distance. With Zento, your care is managed locally by a nurse-led team based in Crieff. That means a registered nurse writes and reviews your loved one's care plan, medication management is clinically overseen, and someone with real medical training is responsible for the standard of care — not just the scheduling of visits." },
  { q: "Do you work with NHS Tayside and Perth and Kinross Council?", a: "Yes. Our Crieff team can liaise with NHS Tayside discharge teams for clients returning home from hospital, and we're familiar with the care assessment and Self-Directed Support processes through Perth and Kinross Council's Health and Social Care Partnership. We can help you understand what might be available from your very first conversation with us." },
];
export default function PerthshireLocationPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zentogroup.co.uk/locations/perthshire/#crieff-office",
    name: "Zento Group — Crieff",
    telephone: "0176 479 0095",
    email: "info@zentogroup.co.uk",
    url: "https://zentogroup.co.uk/locations/perthshire/",
    address: { "@type": "PostalAddress", streetAddress: "East High Street", addressLocality: "Crieff", postalCode: "PH7", addressCountry: "GB" },
    areaServed: ["Crieff", "Comrie", "Muthill", "Braco", "Perthshire"],
    serviceType: "Nurse-Led Home Care",
    parentOrganization: { "@type": "Organization", "@id": "https://zentogroup.co.uk/#organization", name: "Zento Group" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perthshireFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zentogroup.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://zentogroup.co.uk/locations/" },
      { "@type": "ListItem", position: 3, name: "Perthshire", item: "https://zentogroup.co.uk/locations/perthshire/" },
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
                <li><span className="font-semibold text-secondary" aria-current="page">Perthshire</span></li>
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
                  Nurse-Led Home Care &middot; Local Team, Local Knowledge, Clinical Care
                </span>
                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Nurse-Led Home Care in Perthshire &mdash;{" "}
                  <span className="text-primary">Local Team, Local Knowledge, Clinical Care</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento provides nurse-led home care across Perthshire from our office in Crieff. Our team is here,
                  in the community &mdash; covering Crieff, Comrie, Muthill, Braco and the surrounding Perthshire villages.
                  When you call us, you&apos;re speaking to people who know exactly where you are.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ModalButton type="assessment" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer">
                  Speak to our Crieff team <ArrowRight className="w-5 h-5" />
                </ModalButton>
                <a href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white">
                  <Phone className="w-4 h-4 shrink-0" />Call Crieff: {crieffOffice.phone}
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-secondary">Local Crieff Office &middot; East High Street</span>
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
                <Image src="/about-image.png" alt="Registered nurse conducting home care assessment in Perthshire" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Local Office &middot; Crieff PH7</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Nurse-Led Home Care for Perthshire Families</h2>
                <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                  <p>Our Perthshire office is on East High Street in Crieff &mdash; in the middle of the community we care for. That&apos;s not a detail we mention for marketing purposes. It&apos;s what makes everything we do in Perthshire different from a national care agency managing things from a distance.</p>
                  <p>Our nurses know the roads, they know the villages, and they manage care with the kind of local knowledge that makes a real difference in practice. Every care plan across Perthshire is written by a registered nurse and reviewed on a regular basis. We&apos;re registered with the Care Inspectorate, and our team works closely with NHS Tayside and Perth and Kinross Council&apos;s health and social care services.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — WHY CHOOSE ZENTO */}
        <section className="bg-zinc-50 py-20 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">Local Expertise</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Why Perthshire families choose Zento</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">Finding good home care in Perthshire can be genuinely difficult. Most agencies that operate here are run remotely &mdash; the care plan is written somewhere else, the carer is dispatched and families are largely left to manage the rest themselves. Zento is different because we&apos;re here.</p>
              <p className="text-base leading-relaxed text-zinc-600">Our nurses visit clients at home &mdash; in Crieff, in Comrie, in the villages. They write the care plan, they match the carer, and they stay involved for as long as care is needed. When something changes, the team that responds is the same team that started the care.</p>

            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES */}
        <section className="bg-white py-24 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Full Range of Services</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl mb-4">Home care services across Perthshire</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">From our Crieff base, we provide the full range of Zento home care services to families across Perthshire and the surrounding villages.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-2">
              {perthshireServices.map((service) => {
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
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">Coverage Area</span>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl mb-4">Areas we cover in Perthshire</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary mb-6" />
              <p className="text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">Our Crieff office provides home care across the following Perthshire areas:</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-12">
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-secondary mb-4">Crieff and surrounding villages</h3>
                <div className="flex flex-wrap gap-2">
                  {perthshireAreasCrieff.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-secondary mb-4">Comrie and surrounding villages</h3>
                <div className="flex flex-wrap gap-2">
                  {perthshireAreasComrie.map((area) => (<span key={area} className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700">{area}</span>))}
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-500 italic">&amp; surrounding areas</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="max-w-3xl mx-auto mb-12 h-72 w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-md">
              <iframe
                title="Zento Group Crieff Office Location"
                src={crieffOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-600 mb-4">If you live elsewhere in Perthshire and would like to know whether we can help, call our Crieff team.</p>
              <a href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white">
                <Phone className="w-4 h-4 shrink-0" />Call Crieff: {crieffOffice.phone}
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
                  <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">Crieff Office</span>
                  <h2 className="text-3xl font-black text-secondary">Our Crieff team</h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">All home care in Perthshire is managed from our office on East High Street in Crieff. Assessments, care planning, carer matching and clinical reviews are handled locally &mdash; by people who are based here, in the same community as the families we work with.</p>

                </div>
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="border-b border-zinc-100 pb-3">
                    <p className="text-base font-black text-secondary">{crieffOffice.name}</p>
                    <p className="text-xs text-zinc-500">{crieffOffice.address}</p>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-zinc-700">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /><a href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`} className="hover:text-primary">Phone: {crieffOffice.phone}</a></p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /><a href={`mailto:${crieffOffice.email}`} className="hover:text-primary">Email: {crieffOffice.email}</a></p>
                  </div>
                  <div className="border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 leading-snug">
                    <p><span className="font-bold text-secondary">NHS Tayside:</span> Liaison for hospital discharge</p>
                    <p>Perth &amp; Kinross Council HSCP Partnership</p>
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
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">What Perthshire families say about Zento</h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {perthshireTestimonials.map((t, i) => (
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
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">How to arrange home care in Perthshire</h2>
              <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {perthshireSteps.map((item, index) => (
                <div key={index} className="relative flex flex-col">
                  {index < perthshireSteps.length - 1 && (<div className="absolute top-8 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px bg-primary/20 lg:block" />)}
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
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">Perthshire FAQs</span>
                <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">Frequently asked questions about home care in Perthshire</h2>
                <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                {perthshireFaqs.map((faq, i) => (
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
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl">Specific Perthshire area pages</h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
              <p className="text-base leading-relaxed text-zinc-600">For more detail on coverage in your local area:</p>
              <div className="grid gap-4 sm:grid-cols-2 pt-4 text-left max-w-2xl mx-auto">
                <Link href="/locations/perthshire/crieff/" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Home care in Crieff</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Crieff, Muthill, Braco, Gilmerton &amp; surrounding villages</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">View Crieff home care <ArrowRight className="w-3 h-3" /></span>
                </Link>
                <Link href="/locations/perthshire/comrie/" className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-primary/30 hover:shadow-md">
                  <p className="text-sm font-bold text-secondary group-hover:text-primary">Home care in Comrie</p>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">Comrie, St Fillans &amp; surrounding villages</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">View Comrie home care <ArrowRight className="w-3 h-3" /></span>
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
                <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Speak to our Crieff team today</h2>
                <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">Our Perthshire nursing team is ready to answer your questions and arrange a home assessment anywhere across Crieff, Comrie and the surrounding area.</p>
                <p className="text-sm font-semibold text-white/70 italic">No pressure. No obligation. Honest advice from our registered nurses.</p>
                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:flex-wrap">
                  <ModalButton type="assessment" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:scale-105 cursor-pointer">
                    Book a free consultation <ArrowRight className="w-5 h-5" />
                  </ModalButton>
                  <a href={`tel:${crieffOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
                    <Phone className="w-4 h-4 shrink-0" />{crieffOffice.phone}
                  </a>
                  <a href={`mailto:${crieffOffice.email}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
                    <Mail className="w-4 h-4 shrink-0" />{crieffOffice.email}
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
