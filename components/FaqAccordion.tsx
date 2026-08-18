"use client";

import { ChevronDown } from "lucide-react";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  badge?: string;
  title?: string;
  faqs: FaqItem[];
  className?: string;
}

export default function FaqAccordion({
  badge = "FAQs",
  title = "Frequently asked questions",
  faqs,
  className = "",
}: FaqAccordionProps) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      {/* Header */}
      <AnimateContainer animation="fade-up" className="mb-12 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
          {badge}
        </span>
        <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
          {title}
        </h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
      </AnimateContainer>

      {/* FAQ Items */}
      <AnimateContainer animation="stagger" className="space-y-3">
        {faqs.map((faq, i) => (
          <AnimateItem key={i}>
            <details className="group rounded-2xl border border-zinc-200 bg-zinc-50 open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-sm leading-relaxed text-zinc-600">{faq.a}</p>
              </div>
            </details>
          </AnimateItem>
        ))}
      </AnimateContainer>
    </div>
  );
}
