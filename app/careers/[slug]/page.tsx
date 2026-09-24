import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  PoundSterling,
  Sparkles,
  CheckCircle2,
  Phone,
  Building2,
  ArrowRight,
  Send,
  ShieldCheck,
  GraduationCap,
  Download,
  FileText,
  Bookmark,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateContainer from "@/components/AnimateContainer";
import { getAllJobs, getJobBySlug } from "@/lib/jobs";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Job Not Found | Zento Care" };
  }

  return {
    title: `${job.title} (${job.location}) | Careers at Zento Care`,
    description: `${job.title} vacancy in ${job.location}. ${job.salary}, full paid training, £200 refer a friend bonus, and flexible hours.`,
    alternates: {
      canonical: `https://zentogroup.co.uk/careers/${job.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const allJobs = getAllJobs();
  const otherJobs = allJobs.filter((j) => j.slug !== job.slug);

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
                  <Link href="/careers" className="hover:text-primary transition-colors font-medium">
                    Careers
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span className="font-semibold text-secondary truncate max-w-[200px]" aria-current="page">
                    {job.title} ({job.location})
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── JOB HEADER (Inspired by WerkLinker Design Idea) ── */}
        <section className="border-b border-zinc-100 bg-zinc-50/50 py-10 md:py-14">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white font-black text-xl shadow-xs">
                    Z
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-secondary">
                      {job.title}
                    </h1>
                    <p className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600">
                      <span className="text-primary font-bold">Zento Care</span>
                      <span className="text-zinc-300">·</span>
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{job.location}</span>
                    </p>
                  </div>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                    {job.salary}
                  </span>
                  <span className="inline-flex rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
                    Refer a friend: {job.referralBonus}
                  </span>
                  {job.contractTypes.map((t) => (
                    <span
                      key={t}
                      className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Right Action Button */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/careers/apply?job=${job.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-center shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span>Apply Now</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT & SIDEBAR ── */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Structured Job Details */}
              <div className="lg:col-span-8 space-y-10">
                {/* About this role */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-secondary">About this role</h2>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {job.overview}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 space-y-3">
                  <h3 className="text-base font-bold text-secondary">
                    Role Highlights &amp; Perks
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-700">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="space-y-3 border-t border-zinc-100 pt-8">
                  <h2 className="text-xl font-bold text-secondary">Responsibilities</h2>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Offer */}
                <div className="space-y-3 border-t border-zinc-100 pt-8">
                  <h2 className="text-xl font-bold text-secondary">What We Offer</h2>
                  <ul className="space-y-2.5">
                    {job.whatWeOffer.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements & Qualifications */}
                <div className="space-y-3 border-t border-zinc-100 pt-8">
                  <h2 className="text-xl font-bold text-secondary">Requirements &amp; Qualifications</h2>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Official Advert Graphic Attachment Card (Inspired by WerkLinker Attachment) */}
                <div className="space-y-3 border-t border-zinc-100 pt-8">
                  <h2 className="text-xl font-bold text-secondary">Official Job Advert</h2>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative aspect-square w-36 h-36 rounded-xl overflow-hidden bg-secondary shrink-0 shadow-xs">
                      <Image
                        src={job.image}
                        alt={`${job.title} official flyer`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <h4 className="text-sm font-bold text-secondary">{job.title} — Official Hiring Flyer</h4>
                      <p className="text-xs text-zinc-500">
                        {job.location} · {job.salary} · {job.office}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <a
                          href={job.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 px-4 py-2 text-xs font-bold text-secondary hover:border-primary hover:text-primary transition-all"
                        >
                          <FileText className="h-3.5 w-3.5" /> View Full Graphic
                        </a>
                        <a
                          href={job.image}
                          download
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-600 hover:text-secondary transition-all"
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Apply Action & Similar Jobs */}
              <div className="lg:col-span-4 space-y-6">
                {/* Apply Box */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg space-y-4">
                  <h3 className="text-lg font-bold text-secondary">
                    Apply for this position
                  </h3>
                  <div className="rounded-xl bg-zinc-50 p-3.5 space-y-2 text-xs border border-zinc-100">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Rate:</span>
                      <span className="font-bold text-primary">{job.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Location:</span>
                      <span className="font-semibold text-secondary">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Office:</span>
                      <span className="text-zinc-700">{job.office}</span>
                    </div>
                  </div>

                  <Link
                    href={`/careers/apply?job=${job.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all text-center"
                  >
                    <Send className="h-4 w-4" />
                    <span>Apply Now Online</span>
                  </Link>

                  <a
                    href={job.phoneHref}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-secondary py-2.5 text-xs font-bold text-secondary hover:bg-secondary hover:text-white transition-all text-center"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Call {job.phone}</span>
                  </a>
                </div>

                {/* Similar / Other Jobs (Inspired by WerkLinker) */}
                {otherJobs.length > 0 && (
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-secondary">
                      Other Open Vacancies
                    </h3>
                    <div className="space-y-3">
                      {otherJobs.map((oj) => (
                        <div
                          key={oj.id}
                          className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4 transition-all hover:border-primary/30"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-primary">{oj.location}</span>
                            <span className="text-[11px] font-bold text-secondary">{oj.salary}</span>
                          </div>
                          <h4 className="text-sm font-bold text-secondary">{oj.title}</h4>
                          <div className="mt-3 flex justify-between items-center text-xs">
                            <span className="text-[11px] text-zinc-400">{oj.contractTypes[0]}</span>
                            <Link
                              href={`/careers/${oj.slug}`}
                              className="font-bold text-primary hover:underline"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
