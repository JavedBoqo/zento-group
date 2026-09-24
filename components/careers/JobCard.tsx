import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, CheckCircle2, Phone, Send, Sparkles, ArrowUpRight } from "lucide-react";
import { JobListing } from "@/lib/jobs";

interface JobCardProps {
  job: JobListing;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-3 flex-1">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
            {job.salary}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
            <Sparkles className="h-3 w-3" /> Refer a friend: {job.referralBonus}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-secondary">
            <Link href={`/careers/${job.slug}`} className="hover:text-primary transition-colors">
              {job.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
            {job.overview}
          </p>
        </div>

        {/* Location & Contract Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 font-medium">
            <Clock className="h-3.5 w-3.5 text-primary" /> {job.contractTypes.join(" · ")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No experience needed
          </span>
        </div>
      </div>

      {/* Right Actions (Inspired by Untitled UI Design Idea) */}
      <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
        <Link
          href={`/careers/apply?job=${job.slug}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all text-center"
        >
          <span>Apply</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <Link
          href={`/careers/${job.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors py-1"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
