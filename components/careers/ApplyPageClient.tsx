"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuickApplyForm from "@/components/careers/QuickApplyForm";
import type { JobListing } from "@/lib/jobs";

function ApplyFormContent({ jobs }: { jobs: JobListing[] }) {
  const searchParams = useSearchParams();
  const jobSlug = searchParams.get("job");
  const allJobs = jobs;

  const matchingJob = allJobs.find((j) => j.slug === jobSlug);
  const initialRole = matchingJob
    ? `${matchingJob.title} (${matchingJob.location})`
    : "Care Workers (Crieff & Perthshire)";

  return (
    <div className="max-w-4xl mx-auto">
      {jobs.length ? (
        <QuickApplyForm
          initialRole={initialRole}
          jobs={jobs}
          initialJobSlug={matchingJob?.slug || jobs[0].slug}
        />
      ) : (
        <p className="rounded-2xl border p-8 text-center">
          There are no open positions at the moment. Please check back soon.
        </p>
      )}
    </div>
  );
}

export default function ApplyPageClient({ jobs }: { jobs: JobListing[] }) {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-sm text-zinc-500">
          Loading application form...
        </div>
      }
    >
      <ApplyFormContent jobs={jobs} />
    </Suspense>
  );
}
