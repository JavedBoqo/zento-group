import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Clock,
  PoundSterling,
  Users,
  Phone,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import FaqAccordion from "@/components/FaqAccordion";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import CareersListingClient from "@/components/careers/CareersListingClient";
import { getAllJobs } from "@/lib/jobs";
import { OFFICES } from "@/constants";

export const metadata: Metadata = {
  title: "Careers & Vacancies | Nurse-Led Care Team | Zento Care",
  description:
    "Join Zento Group's nurse-led care team. Care Worker positions in Crieff, Strathearn, Perthshire, Edinburgh & Lothians. £14.50-£16.50/hr, full paid training, £200 refer a friend bonus.",
  alternates: {
    canonical: "https://zentogroup.co.uk/careers",
  },
  robots: { index: true, follow: true },
};

const benefits = [
  {
    title: "£14.50 – £16.50 / hour",
    desc: "Competitive hourly pay rates plus holiday accrual and workplace pension.",
    icon: PoundSterling,
  },
  {
    title: "£200 Referral Bonus",
    desc: "Earn £200 every time you refer a friend or colleague who joins our care team.",
    icon: Sparkles,
  },
  {
    title: "Full Paid Training",
    desc: "No experience needed. Comprehensive paid induction, shadow shifts, and funded SVQ Level 2 & 3.",
    icon: GraduationCap,
  },
  {
    title: "Nurse-Led Mentorship",
    desc: "Direct support and clinical advice from experienced registered nurses whenever you need it.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Shift Patterns",
    desc: "Morning, evening, weekend, or flexible zero-hour contracts to fit your life.",
    icon: Clock,
  },
  {
    title: "Work Close to Home",
    desc: "Local community rounds in Perthshire or Edinburgh & Lothians with generous paid mileage.",
    icon: HeartHandshake,
  },
];

const candidateFaqs = [
  {
    q: "Do I need previous care experience to apply?",
    a: "No prior experience is necessary for our Care Worker positions. We hire for heart, kindness, and reliability. All new staff receive a comprehensive paid induction, classroom training, and 1-to-1 shadowed shifts with experienced senior carers before working independently.",
  },
  {
    q: "What hourly pay and benefits does Zento offer?",
    a: "We pay industry-leading rates of £14.50 to £16.50 per hour. In addition, we offer a £200 refer-a-friend cash bonus, paid mileage allowance (45p/mile), paid travel time between visits, company pension, fully funded SVQ qualifications, and free uniforms and PPE.",
  },
  {
    q: "What shifts and hours are available?",
    a: "We offer flexible full-time, part-time, weekend-only, and zero-hour contracts. Shift patterns include early mornings (7:00am - 2:00pm), late afternoons/evenings (4:00pm - 10:00pm), or bespoke rotas to fit around your family life or studies.",
  },
  {
    q: "Do I need a driving licence and access to a car?",
    a: "For our Perthshire (Crieff & Strathearn) and Lothian positions, a valid driving licence and access to a vehicle is preferred due to rural and suburban rounds. In central Edinburgh, walking and public transport rounds are available.",
  },
  {
    q: "How does the recruitment process work?",
    a: "Our process is simple and welcoming: 1) Submit your 2-minute quick application online. 2) A recruitment coordinator will call you for a friendly 10-minute chat. 3) An informal in-person interview. 4) PVG background check and references. 5) Welcome to paid induction training!",
  },
];

export default function CareersPage() {
  const jobs = getAllJobs();

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
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
                  <span className="font-semibold text-secondary" aria-current="page">
                    Careers &amp; Vacancies
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── HERO SECTION (Inspired by Untitled UI Design Idea) ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white pt-10 pb-10 md:pt-14 md:pb-14">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[100px]" />

          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <AnimateContainer animation="fade-up" className="mx-auto max-w-3xl space-y-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-bold text-secondary shadow-xs mb-3">
                  <span className="flex h-2 w-2 rounded-full bg-primary" />
                  We&apos;re hiring!
                </span>

                <h1 className="text-3xl font-black leading-tight text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                  Join Our <span className="text-primary">Nurse-Led</span> Care Team
                </h1>

                <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-primary mb-4" />

                <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
                  We&apos;re looking for passionate people to join our care team across Perthshire, Edinburgh, and the Lothians.
                </p>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* ── CURRENT VACANCIES LIST WITH PILL FILTERS ── */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <CareersListingClient jobs={jobs} />
          </div>
        </section>

        {/* ── BENEFITS SECTION ── */}
        <section className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <SectionHeader
              badge="Why Work With Us"
              title="Rewards &amp; Benefits of Working at Zento"
              subtitle="We believe that outstanding care starts with valuing and supporting our care staff."
            />

            <AnimateContainer animation="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <AnimateItem key={i}>
                    <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-secondary">{b.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>
          </div>
        </section>

        {/* ── FAQS SECTION ── */}
        <section className="py-16 md:py-24 bg-white border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <FaqAccordion
              badge="Candidate FAQs"
              title="Frequently Asked Questions"
              faqs={candidateFaqs}
            />
          </div>
        </section>

        {/* ── DIRECT CALL BANNER ── */}
        <section className="py-16 bg-zinc-50 border-t border-zinc-100">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-secondary">
                Have questions before applying?
              </h2>
              <p className="text-sm text-zinc-600">
                Give our local recruitment team a call to have an informal chat about hours and training.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                {OFFICES.map((office) => (
                  <a
                    key={office.id}
                    href={office.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-secondary bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-secondary hover:bg-secondary hover:text-white transition-all shadow-xs"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {office.name}: {office.phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
