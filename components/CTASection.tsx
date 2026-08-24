"use client";

import { Phone } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import AnimateContainer from "@/components/AnimateContainer";
import { CONTACT_NUMBER } from "@/constants";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <AnimateContainer animation="scale-up">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
            <div className="relative z-10 mx-auto max-w-3xl space-y-8">
              <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                Need support today? Speak with our team.
              </h2>
              <div className="page-cta-group">
                <a
                  href={`tel:${CONTACT_NUMBER.replace(/\s+/g, "")}`}
                  className="page-cta-secondary-solid"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <ModalButton
                  type="callback"
                  className="page-cta-white-solid"
                >
                  Request Callback
                </ModalButton>
                <ModalButton
                  type="quote"
                  className="page-cta-white-outline"
                >
                  Get Quote
                </ModalButton>
              </div>
            </div>
            {/* Abstract decorative circles */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
          </div>
        </AnimateContainer>
      </div>
    </section>
  );
}
