"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export interface TrustLogo {
  id: string;
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  iframeSrc?: string;
  iframeWidth?: number;
  iframeHeight?: number;
}

const trustLogos: TrustLogo[] = [
  {
    id: "disability-confident",
    name: "Disability Confident Committed",
    imageSrc: "/trustedby/disability-confident-clean.png",
    imageAlt: "Disability Confident Committed Employer Badge",
    width: 240,
    height: 110,
  },
  {
    id: "disclosure-scotland",
    name: "Disclosure Scotland & PVG Scheme",
    imageSrc: "/trustedby/disclosure-scotland-clean.png",
    imageAlt: "Disclosure Scotland PVG Scheme Logo",
    width: 280,
    height: 90,
  },
  {
    id: "care-inspectorate",
    name: "Care Inspectorate Registration",
    iframeSrc: "https://www.careinspectorate.scot/ciWidget/4/Q1MyMDI2MDAwMzI2X1NISGJRazJwTDNZSDhMMlU%3D",
    iframeWidth: 120,
    iframeHeight: 126,
  },
];

const AUTO_SCROLL_MS = 4000;

function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(3);
      else if (window.innerWidth >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return slidesToShow;
}

export default function TrustedBySection() {
  const slidesToShow = useSlidesToShow();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = trustLogos.length;
  const canScroll = totalSlides > slidesToShow;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const goNext = useCallback(() => {
    if (!canScroll) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [canScroll, maxIndex]);

  const goPrev = useCallback(() => {
    if (!canScroll) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [canScroll, maxIndex]);

  useEffect(() => {
    if (!canScroll || isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(goNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [canScroll, isPaused, prefersReducedMotion, goNext]);

  const trackWidthPercent = (totalSlides / slidesToShow) * 100;
  const slideWidthPercent = 100 / totalSlides;
  const translateXPercent = (safeIndex / totalSlides) * 100;

  return (
    <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-50/50 py-20 md:py-28">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <SectionHeader
          badge="Accreditations & Vetting"
          badgeIcon={<ShieldCheck className="h-3.5 w-3.5" />}
          title="Trusted, Certified & Vetted Standards"
          subtitle="We uphold rigorous Scottish and UK clinical and safeguarding standards, ensuring your family receives safe, ethical, and fully verified care."
        />

        <div
          className="relative mx-auto max-w-4xl -mt-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {canScroll && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous logo"
                className="absolute top-1/2 -left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-secondary shadow-md transition-all hover:border-primary/30 hover:bg-primary hover:text-white sm:-left-6 sm:h-11 sm:w-11 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next logo"
                className="absolute top-1/2 -right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-secondary shadow-md transition-all hover:border-primary/30 hover:bg-primary hover:text-white sm:-right-6 sm:h-11 sm:w-11 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          <div className="overflow-x-hidden overflow-y-visible py-4">
            <motion.div
              className="flex items-center"
              style={{ width: `${trackWidthPercent}%` }}
              animate={{ x: `-${translateXPercent}%` }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {trustLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="shrink-0 px-4 sm:px-6"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <div className="flex h-28 sm:h-32 w-full items-center justify-center transition-all duration-300">
                    <div className="relative flex h-full w-full max-w-[260px] items-center justify-center">
                      {logo.iframeSrc ? (
                        <a
                          href="https://www.careinspectorate.scot/find-care/search-for-care/care-services/CS2026000326/zento"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Zento Care on Care Inspectorate Scotland"
                          className="relative block shrink-0 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                        >
                          <div className="pointer-events-none">
                            <iframe
                              title={logo.name}
                              src={logo.iframeSrc}
                              width={logo.iframeWidth || 120}
                              height={logo.iframeHeight || 126}
                              scrolling="no"
                              style={{ border: 0 }}
                            />
                          </div>
                        </a>
                      ) : (
                        <Image
                          src={logo.imageSrc!}
                          alt={logo.imageAlt || logo.name}
                          width={logo.width || 200}
                          height={logo.height || 100}
                          className="max-h-20 sm:max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {canScroll && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-zinc-300 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
