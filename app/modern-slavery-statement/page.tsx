import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  Building2,
  FileText,
  CheckCircle2,
  HeartHandshake,
  Eye,
  BadgeCheck,
  Scale,
  Mail,
  Phone,
  ShieldCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import ModalButton from "@/components/ModalButton";
import { OFFICES, CONTACT_EMAIL, SERVICE_AREAS } from "@/constants";

export const metadata: Metadata = {
  title: "Modern Slavery & Human Trafficking Statement | Zento Group",
  description:
    "Read the Modern Slavery & Human Trafficking Statement for Zento Group Limited. Learn about our zero-tolerance stance, ethical recruitment, and safeguarding.",
  alternates: {
    canonical: "https://zentogroup.co.uk/modern-slavery-statement",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Modern Slavery & Human Trafficking Statement | Zento Group",
    description:
      "Read the Modern Slavery & Human Trafficking Statement for Zento Group Limited. Learn about our zero-tolerance stance, ethical recruitment, and safeguarding.",
    url: "https://zentogroup.co.uk/modern-slavery-statement",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Modern Slavery Statement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Slavery & Human Trafficking Statement | Zento Group",
    description:
      "Read Zento Group Limited's commitment to preventing modern slavery and human trafficking across all operations and supply chains.",
    images: ["/brand-image.png"],
  },
};

const sections = [
  { id: "section-intro", title: "Overview & Zero-Tolerance" },
  { id: "section-1", title: "1. Our organisation and services" },
  { id: "section-2", title: "2. Our supply chains" },
  { id: "section-3", title: "3. Our policies" },
  { id: "section-4", title: "4. Due diligence & safe recruitment" },
  { id: "section-5", title: "5. Assessing and managing risk" },
  { id: "section-6", title: "6. Training and awareness" },
  { id: "section-7", title: "7. Our commitment" },
];

const policyCards = [
  {
    title: "Safe Recruitment Policy",
    desc: "Rigorous right-to-work checks and PVG scheme (Disclosure Scotland) membership for all staff undertaking regulated work before placement.",
    icon: BadgeCheck,
  },
  {
    title: "Adult Support & Protection",
    desc: "Proactive safeguarding frameworks designed to detect, prevent, and swiftly report any form of abuse, harm, or vulnerability exploitation.",
    icon: ShieldCheck,
  },
  {
    title: "Whistleblowing Policy",
    desc: "Protected, confidential reporting mechanisms enabling all workers to voice concerns freely and safely without fear of reprisal or detriment.",
    icon: Eye,
  },
  {
    title: "Equality, Diversity & Dignity",
    desc: "Strict workplace policies upholding fairness, mutual respect, anti-discrimination, and zero tolerance for harassment in every setting.",
    icon: HeartHandshake,
  },
  {
    title: "Fair Pay & Working Time",
    desc: "Strict adherence to the National Minimum/Living Wage, transparent contracts, and compliance with the Working Time Regulations.",
    icon: Scale,
  },
];

const dueDiligencePillars = [
  {
    title: "Identity & Right to Work Verification",
    desc: "We verify every worker’s legal identity and right to work in the UK before any employment or induction begins.",
  },
  {
    title: "Mandatory PVG Scheme Membership",
    desc: "All staff in regulated care roles must hold active Protection of Vulnerable Groups (PVG) scheme membership with Disclosure Scotland.",
  },
  {
    title: "Fair Pay & No Recruitment Fees",
    desc: "We pay all staff at least the National Minimum/Living Wage and strictly never charge workers fees or deductions to obtain employment.",
  },
  {
    title: "Transparent Written Contracts",
    desc: "We provide comprehensive written contracts of employment outlining clear, lawful, and mutually understood terms.",
  },
  {
    title: "Direct Remuneration & Document Custody",
    desc: "Wages are paid directly into each worker’s verified bank account, and we strictly never withhold identity documents or passports.",
  },
  {
    title: "Sponsorship & Intermediary Due Diligence",
    desc: "We apply heightened scrutiny and oversight when working with sponsored workers or recruitment partners to ensure lawful, dignified treatment.",
  },
];

export default function ModernSlaveryStatementPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Modern Slavery & Human Trafficking Statement | Zento Group",
    description:
      "Modern Slavery & Human Trafficking Statement for Zento Group Limited in line with the Modern Slavery Act 2015.",
    url: "https://zentogroup.co.uk/modern-slavery-statement",
    publisher: {
      "@type": "Organization",
      name: "Zento Group Limited",
      url: "https://zentogroup.co.uk",
      logo: "https://zentogroup.co.uk/logo.svg",
    },
  };

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
        name: "Modern Slavery Statement",
        item: "https://zentogroup.co.uk/modern-slavery-statement",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">
                  /
                </li>
                <li>
                  <span
                    className="font-semibold text-secondary"
                    aria-current="page"
                  >
                    Modern Slavery Statement
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                  <ShieldAlert className="h-3.5 w-3.5" /> Modern Slavery Act 2015 Statement
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Modern Slavery &amp; Human Trafficking{" "}
                  <span className="text-primary">Statement</span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  Zento Group Limited is committed to preventing modern slavery and
                  human trafficking in all forms, upholding a zero-tolerance approach
                  across our organisation, workforce and supply chains.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="general"
                  className="page-cta-primary"
                >
                  Contact Governance Team <ShieldCheck className="w-5 h-5" />
                </ModalButton>

                <a
                  href={OFFICES[0]?.phoneHref}
                  className="page-cta-phone"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call {OFFICES[0]?.phone}
                </a>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ── MAIN CONTENT WITH SIDEBAR ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
              
              {/* SIDEBAR: TABLE OF CONTENTS */}
              <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
                    <FileText className="w-4 h-4 text-secondary" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-secondary">
                      Table of Contents
                    </h2>
                  </div>
                  <nav aria-label="Statement sections" className="space-y-1">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-white hover:text-primary hover:font-bold"
                      >
                        {sec.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Zero Tolerance Callout Box */}
                <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Zero-Tolerance Policy
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    We maintain absolute zero tolerance for modern slavery, servitude, forced labour, or trafficking across all operations and supplier networks.
                  </p>
                  <div className="pt-1 text-xs">
                    <a
                      href="mailto:info@zentogroup.co.uk"
                      className="inline-flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" /> Report a Concern
                    </a>
                  </div>
                </div>
              </aside>

              {/* MAIN TEXT COLUMN */}
              <div className="lg:col-span-8 space-y-12 text-zinc-700 leading-relaxed">
                
                {/* Intro Card */}
                <div id="section-intro" className="scroll-mt-24 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed text-zinc-700 font-medium">
                    <strong className="text-secondary">Zento Group Limited</strong> is committed to preventing modern slavery and human trafficking in all its forms. We have a zero-tolerance approach to slavery, servitude, forced or compulsory labour and human trafficking, whether within our own organisation or our supply chains. This statement sets out the steps we take to ensure that modern slavery is not taking place in our business or supply chains.
                  </p>
                  <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-600 leading-relaxed">
                    Zento makes this statement voluntarily and in line with the principles of the <strong>Modern Slavery Act 2015</strong>. As a provider of care to vulnerable people, we consider strong safeguards against exploitation to be a core part of running a safe, ethical and well-governed service, regardless of whether we are legally required to publish a statement.
                  </div>
                </div>

                {/* Section 1 */}
                <section id="section-1" className="scroll-mt-24 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      1
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Our organisation and services
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      Zento Group Limited is a private, nurse-led provider of care at home and housing support, registered with the Care Inspectorate in Scotland. We support adults &mdash; primarily older people and people living with dementia or long-term conditions &mdash; to live safely and independently in their own homes and communities.
                    </p>
                    <p className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm font-medium text-zinc-700">
                      Our workforce is central to our service, which makes fair, safe and lawful employment practices essential to who we are.
                    </p>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="section-2" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      2
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Our supply chains
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      Our supply chains are relatively limited and are focused on recruitment, care-management and IT software, training providers, personal protective equipment (PPE) and consumables, and professional services.
                    </p>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                        <Briefcase className="w-4 h-4 text-primary" /> Supply Chain Vigilance in Social Care
                      </div>
                      <p className="text-sm text-zinc-600">
                        We recognise that the social care sector can carry a higher risk of labour exploitation, particularly in recruitment and the use of agency staff, and we take this risk seriously. We audit and vet our partners to ensure compliance with Scottish and UK employment standards.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="section-3" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      3
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Our policies
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      The following policies support our commitment to preventing modern slavery and protecting the people who work for us and the people we support:
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {policyCards.map((policy) => {
                        const Icon = policy.icon;
                        return (
                          <div
                            key={policy.title}
                            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                          >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-secondary text-base mb-1.5">
                              {policy.title}
                            </h3>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {policy.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="section-4" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      4
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Due diligence and safe recruitment
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      We seek to prevent modern slavery through the way we recruit and employ people. In particular, we enforce the following strict protocols:
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {dueDiligencePillars.map((pillar, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 space-y-1.5"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <h4 className="font-bold text-secondary text-sm">
                              {pillar.title}
                            </h4>
                          </div>
                          <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="section-5" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      5
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Assessing and managing risk
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      We assess the risk of modern slavery within our organisation and supply chains as part of our wider governance and quality assurance.
                    </p>
                    <p className="text-sm bg-white rounded-2xl p-5 border border-zinc-200 text-zinc-600">
                      Where we identify heightened risk &mdash; for example when engaging agency staff or recruitment partners &mdash; we take proactive steps to satisfy ourselves that those parties share our standards and operate lawfully in strict compliance with UK employment legislation.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="section-6" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      6
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Training and awareness
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      We raise awareness of modern slavery and exploitation among our staff, so that they can recognise the signs and know how to raise concerns.
                    </p>
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-2">
                      <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                        Managers are supported to respond appropriately to any concern, and all staff can use our whistleblowing and safeguarding routes to report suspected exploitation &mdash; of a colleague, a person we support, or anyone else.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section id="section-7" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      7
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Our commitment
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <div className="rounded-3xl border border-secondary/30 bg-secondary p-6 sm:p-8 text-white shadow-xl space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        Zero-Tolerance Stance &amp; Ongoing Review
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        Zento has a zero-tolerance approach to modern slavery and human trafficking. Any concern that modern slavery may be occurring in our organisation or supply chains will be investigated and, where appropriate, reported to the relevant authorities. We will keep this statement and our related policies under review and update them as our business grows.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white/80">
                        <span>Zento Group Limited</span>
                        <span>&bull;</span>
                        <span>Registered Office: East High Street, Crieff PH7</span>
                        <span>&bull;</span>
                        <span>Care Inspectorate Registered</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact & Help Card */}
                <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-secondary">
                    Questions or Concerns Regarding Safe Working Practices?
                  </h3>
                  <p className="text-sm text-zinc-600">
                    If you have questions about our modern slavery statement or wish to report a concern, please contact our management team:
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm pt-1">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary" /> {CONTACT_EMAIL}
                    </a>
                    <a
                      href={OFFICES[0]?.phoneHref}
                      className="inline-flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary" /> {OFFICES[0]?.phone}
                    </a>
                  </div>

                  <div className="pt-4 page-cta-group !mx-0 !justify-start">
                    <ModalButton
                      type="general"
                      className="page-cta-primary"
                    >
                      Contact our governance team <ShieldCheck className="w-5 h-5" />
                    </ModalButton>
                    <Link
                      href="/about-us"
                      className="page-cta-phone"
                    >
                      Learn about our team
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION — FINAL CTA (SPEAK TO OUR TEAM)
        ════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="scale-up">
              <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl space-y-6">
                  <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    Safe &amp; Ethical Care
                  </span>
                  <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                    Speak with our nursing leadership
                  </h2>
                  <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                    Have questions about our employment standards, safeguarding protocols, or nurse-led care services? We welcome open dialogue.
                  </p>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 pt-2 max-w-3xl mx-auto">
                    <a
                      href={OFFICES.find((o) => o.id === "crieff")?.phoneHref}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Phone className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Crieff Head Office
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {OFFICES.find((o) => o.id === "crieff")?.phone}
                      </p>
                    </a>
                    <a
                      href={OFFICES.find((o) => o.id === "edinburgh")?.phoneHref}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Phone className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Edinburgh Team
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {OFFICES.find((o) => o.id === "edinburgh")?.phone}
                      </p>
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                      <Mail className="w-5 h-5 text-white shrink-0 mb-1" />
                      <p className="text-xs text-white/70 font-bold uppercase tracking-wider">
                        Governance Email
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white break-all">
                        {CONTACT_EMAIL}
                      </p>
                    </a>
                  </div>

                  <div className="page-cta-group-dark pt-4">
                    <ModalButton
                      type="general"
                      className="page-cta-on-dark-primary"
                    >
                      Send us a message <ArrowRight className="w-5 h-5" />
                    </ModalButton>
                    <a
                      href="tel:01764790095"
                      className="page-cta-on-dark-outline cursor-pointer"
                    >
                      <Phone className="w-4 h-4 shrink-0" /> Call 01764 790095
                    </a>
                  </div>
                </div>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* BOTTOM SERVICE AREAS STRIP */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-8 text-center text-xs text-zinc-500">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            Serving {SERVICE_AREAS}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
