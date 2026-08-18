"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";

interface SignsSectionGridProps {
  category?: string;
  title?: string;
  subtitle?: string;
  signs: string[];
  ctaText?: string;
  ctaType?: "assessment" | "callback" | "quote" | "general";
}

const parseSign = (text: string, index: number) => {
  if (text.includes(" — ")) {
    const [lead, ...rest] = text.split(" — ");
    return { lead: lead.trim(), detail: rest.join(" — ").trim() };
  }
  if (text.includes(": ")) {
    const [lead, ...rest] = text.split(": ");
    return { lead: lead.trim(), detail: rest.join(": ").trim() };
  }
  return {
    lead: `Sign ${index + 1}`,
    detail: text.trim(),
  };
};

export default function SignsSectionGrid({
  category = "Clinical Observation",
  title = "Signs your loved one may need support at home",
  subtitle = "Recognising when someone needs extra help is not always straightforward. If several of these signs feel familiar, our registered nurses can provide a gentle, confidential assessment.",
  signs,
  ctaText = "Book a free nursing assessment",
  ctaType = "assessment",
}: SignsSectionGridProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-20 md:py-24 border-t border-zinc-100">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
        {/* Section Header */}
        <AnimateContainer animation="fade-up" className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-4 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            {category}
          </span>
          <h2 className="text-3xl font-black leading-tight text-secondary sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-primary mb-5" />
          <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
            {subtitle}
          </p>
        </AnimateContainer>

        {/* 2-Column Responsive Bento Grid with Staggered Scroll Reveals */}
        <AnimateContainer
          animation="stagger"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto mb-14"
        >
          {signs.map((sign, i) => {
            const { lead, detail } = parseSign(sign, i);
            const numStr = (i + 1).toString().padStart(2, "0");

            return (
              <AnimateItem key={i} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:bg-slate-50/40"
                >
                  {/* Top indicator bar */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Badge & Number Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          {numStr}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-secondary transition-colors">
                          Noticeable Change
                        </span>
                      </div>

                      <div className="h-2 w-2 rounded-full bg-zinc-200 group-hover:bg-primary transition-colors" />
                    </div>

                    {/* Main content */}
                    {lead && (
                      <h3 className="text-lg sm:text-xl font-bold leading-snug text-secondary group-hover:text-primary transition-colors duration-200 mb-2">
                        {lead}
                      </h3>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-600 font-normal">
                      {detail}
                    </p>
                  </div>

                  {/* Bottom confirmation marker */}
                  <div className="mt-5 flex items-center gap-2 pt-3 border-t border-zinc-100 text-xs font-medium text-zinc-400 group-hover:text-secondary transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Clinical assessment indicator</span>
                  </div>
                </motion.div>
              </AnimateItem>
            );
          })}
        </AnimateContainer>

        {/* Bottom Callout Banner & Action */}
        <AnimateContainer animation="fade-up" delay={0.15}>
          <div className="max-w-4xl mx-auto rounded-3xl bg-secondary p-8 sm:p-10 text-white shadow-xl shadow-secondary/15 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                  No Pressure · Honest Advice
                </div>
                <h4 className="text-xl sm:text-2xl font-black leading-tight">
                  Noticing two or more of these signs?
                </h4>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Our nurse-led team can visit your parent at home in Edinburgh or Perthshire to carry out an honest, clinical evaluation.
                </p>
              </div>

              <ModalButton
                type={ctaType}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90"
              >
                {ctaText} <ArrowRight className="w-4 h-4" />
              </ModalButton>
            </div>
          </div>
        </AnimateContainer>
      </div>
    </section>
  );
}
