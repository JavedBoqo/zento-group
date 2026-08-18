"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import ModalButton from "@/components/ModalButton";

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  badge?: string;
  title?: string;
  steps: ProcessStep[];
  ctaText?: string;
  ctaType?: "assessment" | "callback" | "quote" | "general";
  className?: string;
}

export default function ProcessSteps({
  badge = "4-Step Process",
  title = "How to arrange home care",
  steps,
  ctaText = "Start with a free consultation",
  ctaType = "assessment",
  className = "",
}: ProcessStepsProps) {
  return (
    <div className={className}>
      {/* Header */}
      <AnimateContainer animation="fade-up" className="mb-16 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
          {badge}
        </span>
        <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
          {title}
        </h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
      </AnimateContainer>

      {/* Steps Grid */}
      <AnimateContainer
        animation="stagger"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16"
      >
        {steps.map((item, index) => (
          <AnimateItem key={index} className="relative flex flex-col">
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px bg-primary/20 lg:block" />
            )}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-2xl font-black text-primary shadow-lg ring-1 ring-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/30">
                {item.step}
              </div>
              <h3 className="mb-3 text-lg font-bold text-secondary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{item.desc}</p>
            </motion.div>
          </AnimateItem>
        ))}
      </AnimateContainer>

      {/* CTA */}
      <AnimateContainer animation="fade-up" delay={0.1} className="flex flex-col items-center gap-4 text-center">
        <ModalButton
          type={ctaType}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
        >
          {ctaText} <ArrowRight className="w-5 h-5" />
        </ModalButton>
      </AnimateContainer>
    </div>
  );
}
