"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Star,
  MapPin,
  Quote,
  ShieldCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnimateContainer from "@/components/AnimateContainer";

export interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
  rating?: number;
  source?: string;
}

interface TestimonialsSectionProps {
  category?: string;
  title?: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
}

const AUTO_SCROLL_MS = 5000;

function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(3);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return slidesToShow;
}

function StarRating({ rating = 5 }: { rating?: number }) {
  const safeRating = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <div className="mb-4 flex items-center gap-1 sm:mb-5">
      {Array.from({ length: 5 }).map((_, si) => (
        <Star
          key={si}
          className={`h-3.5 w-3.5 transition-transform sm:h-4 sm:w-4 ${
            si < safeRating
              ? "fill-amber-400 text-amber-400"
              : "fill-zinc-200 text-zinc-200"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const initial = testimonial.author.trim().charAt(0) || "Z";

  return (
    <div className="relative h-full pt-4">
      <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white via-white to-slate-50/50 p-6 shadow-xs transition-all duration-300 hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10 sm:p-7 md:p-8">
        <div className="pointer-events-none absolute -top-4 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-white shadow-md shadow-secondary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary sm:right-7">
          <Quote className="h-4 w-4" />
        </div>

      <div>
        <StarRating rating={testimonial.rating} />

        <p className="text-sm font-normal leading-relaxed text-zinc-700 sm:text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4 sm:mt-8 sm:gap-3.5 sm:pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/15 to-primary/20 text-sm font-black text-secondary ring-2 ring-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary sm:h-11 sm:w-11 sm:text-base">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-bold text-secondary sm:text-base">{testimonial.author}</h4>
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{testimonial.location}</span>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  category = "Real Experiences",
  title = "What families say about our nurse-led care",
  subtitle = "Direct feedback from family members across Edinburgh, the Lothians, and Perthshire who trust Zento to care for their loved ones.",
  testimonials,
}: TestimonialsSectionProps) {
  const slidesToShow = useSlidesToShow();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = testimonials.length;
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

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / testimonials.length
      : 5;

  return (
    <section className="relative overflow-hidden border-t border-zinc-100 bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute top-10 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <AnimateContainer animation="fade-up" className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {category}
          </div>

          <h2 className="text-3xl font-black leading-tight text-secondary sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <div className="mx-auto mt-4 mb-5 h-1.5 w-20 rounded-full bg-primary" />

          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">{subtitle}</p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 px-5 py-2.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-zinc-200 text-zinc-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-secondary">
              {averageRating.toFixed(1)} / 5.0 average
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-zinc-500">
              <CheckCircle className="h-3.5 w-3.5 text-primary" /> Verified Family Feedback
            </span>
          </div>
        </AnimateContainer>

        <AnimateContainer
          animation="fade-up"
          delay={0.1}
          className="relative mx-auto max-w-7xl"
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
                aria-label="Previous testimonial"
                className="absolute top-1/2 -left-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-secondary shadow-lg transition-all hover:border-primary/30 hover:bg-primary hover:text-white sm:-left-4 sm:h-11 sm:w-11 md:-left-5 md:h-12 md:w-12 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="absolute top-1/2 -right-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-secondary shadow-lg transition-all hover:border-primary/30 hover:bg-primary hover:text-white sm:-right-4 sm:h-11 sm:w-11 md:-right-5 md:h-12 md:w-12 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="overflow-x-hidden overflow-y-visible">
            <motion.div
              className="flex"
              style={{ width: `${trackWidthPercent}%` }}
              animate={{ x: `-${translateXPercent}%` }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {testimonials.map((testimonial, i) => (
                <div
                  key={`${testimonial.author}-${i}`}
                  className="shrink-0 overflow-visible px-2 sm:px-3"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {canScroll && (
            <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-zinc-300 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </AnimateContainer>
      </div>
    </section>
  );
}
