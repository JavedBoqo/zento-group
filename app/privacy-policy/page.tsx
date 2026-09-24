import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Scale,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateContainer from "@/components/AnimateContainer";
import ModalButton from "@/components/ModalButton";
import { OFFICES, CONTACT_EMAIL, SERVICE_AREAS } from "@/constants";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | Zento Group",
  description:
    "Learn how Zento Group Limited collects, uses, and protects your personal information in compliance with the UK GDPR and Data Protection Act 2018.",
  alternates: {
    canonical: "https://zentogroup.co.uk/privacy-policy",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy & Data Protection Policy | Zento Group",
    description:
      "Learn how Zento Group Limited collects, uses, and protects your personal information in compliance with the UK GDPR and Data Protection Act 2018.",
    url: "https://zentogroup.co.uk/privacy-policy",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Privacy & Data Protection Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Data Protection Policy | Zento Group",
    description:
      "Learn how Zento Group Limited collects, uses, and protects your personal information in compliance with UK GDPR.",
    images: ["/brand-image.png"],
  },
};

const sections = [
  { id: "section-1", title: "1. Who we are" },
  { id: "section-2", title: "2. Who this policy applies to" },
  { id: "section-3", title: "3. The personal information we collect" },
  { id: "section-4", title: "4. Special category (sensitive) data" },
  { id: "section-5", title: "5. How we collect your information" },
  { id: "section-6", title: "6. Our lawful bases for using your information" },
  { id: "section-7", title: "7. How we use your information" },
  { id: "section-8", title: "8. Cookies" },
  { id: "section-9", title: "9. Who we share your information with" },
  { id: "section-10", title: "10. Storing and transferring your information" },
  { id: "section-11", title: "11. How long we keep your information" },
  { id: "section-12", title: "12. Keeping your information secure" },
  { id: "section-13", title: "13. Your rights" },
  { id: "section-14", title: "14. How to complain" },
  { id: "section-15", title: "15. Changes to this policy" },
  { id: "section-16", title: "16. Contact us" },
];

const lawfulBasesData = [
  {
    purpose: "Responding to your website enquiry or contact request",
    basis: "Legitimate interests / steps prior to entering a contract",
  },
  {
    purpose: "Assessing care needs and providing care and support",
    basis: "Contract; provision of health and social care (Article 9(2)(h) special category)",
  },
  {
    purpose: "Keeping people safe (safeguarding)",
    basis: "Legal obligation; vital interests; substantial public interest",
  },
  {
    purpose: "Meeting regulatory and legal duties (Care Inspectorate, HMRC)",
    basis: "Legal obligation",
  },
  {
    purpose: "Managing and improving our service, and quality assurance",
    basis: "Legitimate interests",
  },
  {
    purpose: "Sending you marketing or updates (where relevant)",
    basis: "Consent",
  },
  {
    purpose: "Website cookies and analytics",
    basis: "Consent (except strictly necessary cookies)",
  },
];

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy & Data Protection Policy | Zento Group",
    description:
      "Privacy and data protection policy statement for Zento Group Limited under UK GDPR and Data Protection Act 2018.",
    url: "https://zentogroup.co.uk/privacy-policy",
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
        name: "Privacy Policy",
        item: "https://zentogroup.co.uk/privacy-policy",
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
                    Privacy &amp; Data Protection Policy
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
                  <ShieldCheck className="h-3.5 w-3.5" /> UK GDPR &amp; Data Protection
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Privacy &amp; Data Protection{" "}
                  <span className="text-primary">Policy</span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
                  How Zento Group Limited collects, uses, shares and protects your
                  personal information in line with the UK General Data Protection
                  Regulation (UK GDPR) and Data Protection Act 2018.
                </p>
              </div>

              <div className="page-cta-group">
                <ModalButton
                  type="general"
                  className="page-cta-primary"
                >
                  Contact Privacy Lead <ArrowRight className="w-5 h-5" />
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
                  <nav aria-label="Policy sections" className="space-y-1">
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

                {/* Privacy Lead Contact Box */}
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <UserCheck className="w-4 h-4" /> Data Protection Lead
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Have questions regarding your personal information or want to exercise your data rights?
                  </p>
                  <div className="space-y-1.5 pt-1 text-xs">
                    <a
                      href="mailto:baalaj@zentogroup.co.uk"
                      className="flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" /> baalaj@zentogroup.co.uk
                    </a>
                    <a
                      href="tel:01764790095"
                      className="flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-primary" /> 01764 790095
                    </a>
                  </div>
                </div>
              </aside>

              {/* MAIN TEXT COLUMN */}
              <div className="lg:col-span-8 space-y-12 text-zinc-700 leading-relaxed">
                
                {/* Intro Card */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-base sm:text-lg leading-relaxed text-zinc-700 font-medium">
                    This Privacy &amp; Data Protection Policy explains how Zento Group Limited (&ldquo;Zento&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, shares and protects your personal information when you visit our website, contact us, enquire about our services, or use the care and support we provide. We are committed to protecting your privacy and handling your personal information lawfully, fairly and transparently, in line with the <strong className="text-secondary">UK General Data Protection Regulation (UK GDPR)</strong> and the <strong className="text-secondary">Data Protection Act 2018</strong>.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="section-1" className="scroll-mt-24 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      1
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Who we are
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      Zento Group Limited is a private, nurse-led provider of care at home and housing support, registered with the Care Inspectorate in Scotland. For the purposes of data protection law, Zento is the <strong>&ldquo;data controller&rdquo;</strong> responsible for your personal information.
                    </p>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                          Registered Office
                        </span>
                        <p className="font-semibold text-secondary">
                          East High Street, Crieff PH7
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                          Company Registration
                        </span>
                        <p className="font-semibold text-secondary">
                          Company Number: SC875709
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                          ICO Registration
                        </span>
                        <p className="font-semibold text-secondary">
                          Number: ZC198381
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                          Privacy Lead Contact
                        </span>
                        <p className="font-semibold text-secondary">
                          <a href="mailto:baalaj@zentogroup.co.uk" className="hover:text-primary transition-colors">
                            baalaj@zentogroup.co.uk
                          </a>{" "}
                          &bull;{" "}
                          <a href="tel:01764790095" className="hover:text-primary transition-colors">
                            01764 790095
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="section-2" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      2
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Who this policy applies to
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      This policy applies to visitors to our website, people who contact or enquire with us, prospective clients, the people we support (our clients / service users) and their families, representatives and carers.
                    </p>
                    <p className="text-sm bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-zinc-600">
                      <strong>Note for staff:</strong> Our employees, workers and job applicants are covered by a separate staff privacy notice, which is provided to them directly upon application or employment.
                    </p>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="section-3" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      3
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      The personal information we collect
                    </h2>
                  </div>
                  <div className="space-y-5 pl-0 sm:pl-12">
                    <div className="rounded-2xl border border-zinc-200 p-5 space-y-2">
                      <h3 className="font-bold text-secondary text-base">
                        A. Information you give us
                      </h3>
                      <ul className="space-y-2 text-sm text-zinc-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span><strong>Contact and enquiry details:</strong> your name, telephone number, email address, postal address, and details you provide when completing a form on our website, calling us, or emailing us.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span><strong>Care enquiry information:</strong> information about the care or support needed, which may include details concerning the health, routine, or personal circumstances of the individual requiring assistance.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 p-5 space-y-2">
                      <h3 className="font-bold text-secondary text-base">
                        B. Information about the people we support
                      </h3>
                      <p className="text-sm text-zinc-600">
                        Where you or a family member become a client, we collect the information we need to plan and deliver safe, person-centred care. This includes:
                      </p>
                      <ul className="space-y-1.5 text-sm text-zinc-600 pl-2">
                        <li>&bull; Contact details and emergency contacts / next of kin</li>
                        <li>&bull; GP and other medical/health professionals involved in your care</li>
                        <li>&bull; Funding and payment arrangements</li>
                        <li>&bull; <strong className="text-secondary">Special category data:</strong> health and care needs, medical conditions, medication administration details, and any factors vital to keeping you safe and well</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 p-5 space-y-2">
                      <h3 className="font-bold text-secondary text-base">
                        C. Information we collect automatically from our website
                      </h3>
                      <p className="text-sm text-zinc-600">
                        <strong>Technical and usage data:</strong> your IP address, browser type, device information, and how you interact with our website, gathered through cookies and related technologies in accordance with section 8.
                      </p>
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
                      Special category (sensitive) data
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                      <p className="text-sm text-zinc-700 leading-relaxed">
                        Delivering nurse-led care means we necessarily process <strong>&ldquo;special category&rdquo;</strong> data, in particular health and medical records. We only process this where the law allows &mdash; principally because it is necessary for the provision of health and social care and treatment (<strong>Article 9(2)(h) UK GDPR</strong>), for safeguarding, or, where required, with your explicit consent.
                      </p>
                      <p className="text-sm text-zinc-700 leading-relaxed font-semibold">
                        We handle all sensitive medical information with heightened confidentiality and restrict access strictly to team members who require it to provide care.
                      </p>
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
                      How we collect your information
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>We collect information through multiple channels:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <li className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Directly from you via website forms, telephone calls, emails, and face-to-face consultations</span>
                      </li>
                      <li className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>From family members, appointed guardians, or legal representatives</span>
                      </li>
                      <li className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>From local authorities (such as Perth &amp; Kinross Council and Lothian local authorities)</span>
                      </li>
                      <li className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>From the NHS, GP surgeries, hospital discharge teams, social workers, and care professionals</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="section-6" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      6
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Our lawful bases for using your information
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      Under UK data protection law, we must have a valid lawful basis for processing personal information. The main bases we rely on include:
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-secondary text-white font-bold text-xs uppercase tracking-wider">
                            <tr>
                              <th className="px-5 py-3.5">Purpose of Processing</th>
                              <th className="px-5 py-3.5">Lawful Basis (UK GDPR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-200 bg-white">
                            {lawfulBasesData.map((row, index) => (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}
                              >
                                <td className="px-5 py-3.5 font-semibold text-secondary">
                                  {row.purpose}
                                </td>
                                <td className="px-5 py-3.5 text-zinc-600">
                                  {row.basis}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                      How we use your information
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <ul className="space-y-2.5 text-sm text-zinc-600">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To respond to your enquiries and provide guidance on our care services.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To assess care needs, draft personalised care plans, deliver care, review outcomes, and enhance quality.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To safeguard the people we support and uphold adult protection requirements.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To process funding, issue invoices, and manage client accounts and payments.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To comply with legal, regulatory, and reporting obligations to the Care Inspectorate, the SSSC, and HMRC.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>To maintain accurate clinical and administrative records and conduct internal quality assurance.</span>
                      </li>
                    </ul>
                    <p className="text-xs text-zinc-500 italic pt-2">
                      * We will never subject your information to automated decision-making or profiling that produces legal or similarly significant effects.
                    </p>
                  </div>
                </section>

                {/* Section 8 */}
                <section id="section-8" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      8
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Cookies
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      Our website uses cookies and similar technologies to ensure proper operation and to understand how visitors engage with our pages.
                    </p>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 space-y-2">
                      <p>
                        <strong>Strictly Necessary Cookies:</strong> Essential for site functionality, security, and accessibility. These remain active by default.
                      </p>
                      <p>
                        <strong>Analytics &amp; Performance Cookies:</strong> Deployed only with your active consent through our cookie settings. You can manage or revoke your cookie preferences at any time.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 9 */}
                <section id="section-9" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      9
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Who we share your information with
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      <strong className="text-secondary">We do not sell your personal information.</strong> We disclose data strictly on a need-to-know basis to parties bound by confidentiality and legal compliance:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Health and social care partners:</strong> Local authorities (e.g. Perth &amp; Kinross Council, Edinburgh City Council, Lothian Councils), NHS trusts, General Practitioners, district nurses, and assigned social workers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Regulators and statutory bodies:</strong> The Care Inspectorate, Scottish Social Services Council (SSSC), Disclosure Scotland, and HMRC.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Contracted data processors:</strong> Secure IT infrastructure providers, accredited electronic care planning software, and payroll systems.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Professional advisers:</strong> Legal counsel, auditors, and insurers when required.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 10 */}
                <section id="section-10" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      10
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Storing and transferring your information
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      We store personal data on secure, encrypted systems within the United Kingdom. Where third-party service providers process data outside the UK, we enforce strict legal safeguards (such as UK Adequacy Regulations or standard contractual clauses) to guarantee an equivalent degree of protection.
                    </p>
                  </div>
                </section>

                {/* Section 11 */}
                <section id="section-11" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      11
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      How long we keep your information
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      We retain your personal records only for as long as necessary to fulfil the purposes for which they were gathered, and to comply with health and social care regulatory, statutory accounting, and legal requirements.
                    </p>
                    <p className="text-sm text-zinc-600">
                      Care and clinical records are stored according to Scottish health and social care retention schedules. Our full retention schedule is available on request.
                    </p>
                  </div>
                </section>

                {/* Section 12 */}
                <section id="section-12" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      12
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Keeping your information secure
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      We deploy robust technical and organisational security measures to safeguard against loss, unauthorised disclosure, alteration, or unlawful access. Measures include role-based access restrictions, end-to-end encryption, regular staff data protection training, and documented data breach response procedures.
                    </p>
                  </div>
                </section>

                {/* Section 13 */}
                <section id="section-13" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      13
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Your rights
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>Under data protection law, you possess key rights regarding your personal information:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Right to be Informed</strong>
                        <span>Transparent information regarding data collection and usage (as detailed in this notice).</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Right of Access (SAR)</strong>
                        <span>Request a copy of the personal information we hold about you.</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Right to Rectification</strong>
                        <span>Request correction of inaccurate or incomplete records.</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Right to Erasure</strong>
                        <span>Request deletion of personal data where no overriding lawful basis applies.</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Right to Restrict or Object</strong>
                        <span>Object to processing or request restriction under qualifying conditions.</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-zinc-200 bg-white">
                        <strong className="text-secondary block mb-1">Data Portability &amp; Consent</strong>
                        <span>Receive data in a standard format or withdraw consent at any time.</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-primary/30 bg-zinc-50 p-4 text-sm flex items-center justify-between flex-wrap gap-3">
                      <span>To exercise any of these rights, email us at: <a href="mailto:info@zentogroup.co.uk" className="font-bold text-primary hover:underline">info@zentogroup.co.uk</a></span>
                      <span className="text-xs font-semibold bg-white border border-zinc-200 px-3 py-1 rounded-full text-zinc-500">
                        Response time: within 1 calendar month
                      </span>
                    </div>
                  </div>
                </section>

                {/* Section 14 */}
                <section id="section-14" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      14
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      How to complain
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <p>
                      If you are unhappy about how we have handled your personal information, please contact our privacy lead first so we can work to put things right immediately.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-secondary">
                          <Scale className="w-4 h-4 text-primary" /> Information Commissioner&apos;s Office (ICO)
                        </div>
                        <p className="text-xs text-zinc-600">
                          The UK independent regulator for data protection:
                        </p>
                        <div className="text-xs space-y-1 pt-1 font-medium">
                          <div>Website: <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">www.ico.org.uk <ExternalLink className="w-3 h-3" /></a></div>
                          <div>Helpline: <strong>0303 123 1113</strong></div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-secondary">
                          <AlertCircle className="w-4 h-4 text-secondary" /> Care Inspectorate (Scotland)
                        </div>
                        <p className="text-xs text-zinc-600">
                          For complaints regarding service delivery or care quality:
                        </p>
                        <div className="text-xs space-y-1 pt-1 font-medium">
                          <div>Website: <a href="https://www.careinspectorate.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">www.careinspectorate.com <ExternalLink className="w-3 h-3" /></a></div>
                          <div>Reg No: <strong>CS2026000326</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 15 */}
                <section id="section-15" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      15
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Changes to this policy
                    </h2>
                  </div>
                  <div className="space-y-3 pl-0 sm:pl-12">
                    <p>
                      We may update this policy periodically to reflect evolving regulatory guidance or operational improvements. The latest version will always be published on this page, with the active revision date clearly stated.
                    </p>
                  </div>
                </section>

                {/* Section 16 */}
                <section id="section-16" className="scroll-mt-24 space-y-4 border-t border-zinc-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-black text-sm">
                      16
                    </div>
                    <h2 className="text-2xl font-black text-secondary">
                      Contact us
                    </h2>
                  </div>
                  <div className="space-y-4 pl-0 sm:pl-12">
                    <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-8 shadow-sm space-y-4">
                      <h3 className="text-xl font-bold text-secondary">
                        Zento Group Limited
                      </h3>
                      <p className="text-sm text-zinc-600">
                        East High Street, Crieff PH7
                      </p>
                      <div className="flex flex-wrap gap-6 text-sm pt-2">
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
                          Send us a message <ArrowRight className="w-5 h-5" />
                        </ModalButton>
                        <Link
                          href="/contact"
                          className="page-cta-phone"
                        >
                          View office locations
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

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
                    Data Protection &amp; Inquiries
                  </span>
                  <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                    Have questions about your data?
                  </h2>
                  <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                    Our data protection lead and nursing management team are here to help. Reach out directly with any privacy enquiries or requests.
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
                        Privacy Email
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
