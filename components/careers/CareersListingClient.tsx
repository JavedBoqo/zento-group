"use client";

import { useState } from "react";
import { Search, MapPin, X, Briefcase } from "lucide-react";
import { JobListing } from "@/lib/jobs";
import JobCard from "@/components/careers/JobCard";

interface CareersListingClientProps {
  jobs: JobListing[];
}

export default function CareersListingClient({ jobs }: CareersListingClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    // Category pill filter
    if (activeFilter === "edinburgh" && !job.region.toLowerCase().includes("edinburgh")) {
      return false;
    }
    if (activeFilter === "perthshire" && !job.region.toLowerCase().includes("perthshire")) {
      return false;
    }
    if (activeFilter === "fulltime" && !job.contractTypes.includes("Full-time")) {
      return false;
    }
    if (activeFilter === "parttime" && !job.contractTypes.includes("Part-time")) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.overview.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const filterTabs = [
    { id: "all", label: "View all" },
    { id: "perthshire", label: "Perthshire & Crieff" },
    { id: "edinburgh", label: "Edinburgh & Lothians" },
    { id: "fulltime", label: "Full-time" },
    { id: "parttime", label: "Part-time" },
  ];

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Bar (Inspired by Untitled UI Design Idea) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles..."
            className="w-full rounded-full border border-zinc-200 bg-zinc-50/50 py-2 pl-10 pr-8 text-xs sm:text-sm text-secondary focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Vacancy Rows / Cards */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
          <p className="text-sm font-bold text-secondary">No roles found matching this filter.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="mt-3 text-xs font-bold text-primary hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
