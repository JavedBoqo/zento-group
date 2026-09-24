"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuickApplyForm from "@/components/careers/QuickApplyForm";
import { getAllJobs } from "@/lib/jobs";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const jobSlug = searchParams.get("job");
  const allJobs = getAllJobs();

  const matchingJob = allJobs.find((j) => j.slug === jobSlug);
  const initialRole = matchingJob
    ? `${matchingJob.title} (${matchingJob.location})`
    : "Care Workers (Crieff & Perthshire)";

  return (
    <div className="max-w-4xl mx-auto">
      <QuickApplyForm initialRole={initialRole} />
    </div>
  );
}

export default function ApplyPageClient() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-sm text-zinc-500">
          Loading application form...
        </div>
      }
    >
      <ApplyFormContent />
    </Suspense>
  );
}
