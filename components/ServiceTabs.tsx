"use client";

import { useState, useRef, KeyboardEvent, ReactNode } from "react";

interface ServiceTabsProps {
  homeCarePanel: ReactNode;
  liveInCarePanel: ReactNode;
  homeCount: number;
  liveInCount: number;
}

export default function ServiceTabs({
  homeCarePanel,
  liveInCarePanel,
  homeCount,
  liveInCount,
}: ServiceTabsProps) {
  const [tab, setTab] = useState<"home" | "live-in">("home");
  const homeTabRef = useRef<HTMLButtonElement>(null);
  const liveInTabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    currentTab: "home" | "live-in"
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const target = currentTab === "home" ? "live-in" : "home";
      setTab(target);
      if (target === "home") homeTabRef.current?.focus();
      else liveInTabRef.current?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setTab("home");
      homeTabRef.current?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setTab("live-in");
      liveInTabRef.current?.focus();
    }
  };

  return (
    <div>
      {/* WAI-ARIA Tab List */}
      <div className="mb-12 flex justify-center">
        <div
          role="tablist"
          aria-label="Service categories"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white p-1.5 shadow-sm sm:gap-2"
        >
          <button
            ref={homeTabRef}
            role="tab"
            id="tab-home"
            aria-selected={tab === "home"}
            aria-controls="panel-home"
            tabIndex={tab === "home" ? 0 : -1}
            onClick={() => setTab("home")}
            onKeyDown={(e) => handleKeyDown(e, "home")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:px-6 sm:py-2.5 sm:text-sm font-bold transition-all cursor-pointer ${
              tab === "home"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-zinc-600 hover:text-secondary hover:bg-zinc-100"
            }`}
          >
            <span>Home Care</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                tab === "home"
                  ? "bg-white/20 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {homeCount}
            </span>
          </button>

          <button
            ref={liveInTabRef}
            role="tab"
            id="tab-live-in"
            aria-selected={tab === "live-in"}
            aria-controls="panel-live-in"
            tabIndex={tab === "live-in" ? 0 : -1}
            onClick={() => setTab("live-in")}
            onKeyDown={(e) => handleKeyDown(e, "live-in")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:px-6 sm:py-2.5 sm:text-sm font-bold transition-all cursor-pointer ${
              tab === "live-in"
                ? "bg-secondary text-white shadow-md shadow-secondary/20"
                : "text-zinc-600 hover:text-secondary hover:bg-zinc-100"
            }`}
          >
            <span>Live-in Care</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                tab === "live-in"
                  ? "bg-white/20 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {liveInCount}
            </span>
          </button>
        </div>
      </div>

      {/* Both Panels present in HTML for SEO crawlers — toggled via hidden attribute */}
      <div
        id="panel-home"
        role="tabpanel"
        aria-labelledby="tab-home"
        hidden={tab !== "home"}
      >
        {homeCarePanel}
      </div>

      <div
        id="panel-live-in"
        role="tabpanel"
        aria-labelledby="tab-live-in"
        hidden={tab !== "live-in"}
      >
        {liveInCarePanel}
      </div>
    </div>
  );
}
