"use client";

import { ArrowRight, Phone, Mail } from "lucide-react";
import AnimateContainer from "@/components/AnimateContainer";
import ModalButton from "@/components/ModalButton";

interface FinalCTASectionProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  ctaText?: string;
  ctaType?: "assessment" | "callback" | "quote" | "general";
  className?: string;
}

export default function FinalCTASection({
  title,
  subtitle,
  tagline = "No pressure. No obligation. Honest advice from registered nurses.",
  phone,
  email,
  ctaText = "Book a free consultation",
  ctaType = "assessment",
  className = "",
}: FinalCTASectionProps) {
  return (
    <div className={`container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 ${className}`}>
      <AnimateContainer animation="scale-up">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/75 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
              {title}
            </h2>

            {subtitle && (
              <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

            {tagline && (
              <p className="text-sm font-semibold text-white/70 italic">{tagline}</p>
            )}

            <div className="page-cta-group-dark">
              <ModalButton
                type={ctaType}
                className="page-cta-on-dark-primary"
              >
                {ctaText} <ArrowRight className="w-5 h-5" />
              </ModalButton>

              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="page-cta-on-dark-outline"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {phone}
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="page-cta-on-dark-outline"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {email}
                </a>
              )}
            </div>
          </div>
        </div>
      </AnimateContainer>
    </div>
  );
}
