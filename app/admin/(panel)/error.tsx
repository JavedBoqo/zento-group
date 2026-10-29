"use client";
import { RefreshCw, CircleAlert } from "lucide-react";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="admin-card mx-auto flex max-w-lg flex-col items-center !px-8 !py-14 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e1ebd6] bg-[#f0f6e7] text-[#5d7044]">
        <CircleAlert size={27} strokeWidth={1.4} />
      </span>
      <p className="admin-eyebrow">Workspace unavailable</p>
      <h1 className="mt-2 text-2xl font-bold">We couldn’t load this page.</h1>
      <p className="mb-7 mt-4 text-xs leading-7 text-[#67715f]">
        Your workspace is temporarily unavailable. Give it another try in a
        moment.
      </p>
      <button className="admin-primary" onClick={reset}>
        <RefreshCw size={14} />
        Try again
      </button>
    </section>
  );
}
