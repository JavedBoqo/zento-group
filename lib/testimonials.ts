import testimonialsData from "@/mock/testimonials.json";
import type { TestimonialItem } from "@/components/TestimonialsSection";

export type TestimonialKey =
  | "services"
  | "homeCare"
  | "homeCare.personalCare"
  | "homeCare.medicationSupport"
  | "homeCare.dementiaCare"
  | "homeCare.companionship"
  | "homeCare.mealPreparation"
  | "homeCare.hospitalDischarge"
  | "homeCare.respiteCare"
  | "liveInCare"
  | "liveInCare.overnightCare"
  | "liveInCare.twentyFourHourCare"
  | "locations.edinburgh"
  | "locations.lothian"
  | "locations.lothian.midlothian"
  | "locations.lothian.eastLothian"
  | "locations.lothian.westLothian"
  | "locations.perthshire"
  | "locations.perthshire.crieff"
  | "locations.perthshire.comrie";

const MIN_TESTIMONIALS = 3;

const fallbackPool: TestimonialItem[] = [
  {
    quote:
      "Good communication from the start and a proper nurse assessment. Not the cheapest locally, but you can tell there's clinical oversight behind it.",
    author: "Helen C.",
    location: "West Lothian",
    rating: 4,
  },
  {
    quote:
      "Eight months in and we've had the same morning carer most weeks. Mum actually waits by the door now, which says more than I can.",
    author: "Sarah L.",
    location: "Musselburgh, East Lothian",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Carers are consistent and kind. Nurse reviews give us confidence something clinical won't get missed.",
    author: "Andrew M.",
    location: "Edinburgh",
    rating: 4,
    source: "Google Review",
  },
];

function isTestimonialArray(value: unknown): value is TestimonialItem[] {
  return Array.isArray(value);
}

function hasReviews(value: unknown): value is { reviews: TestimonialItem[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "reviews" in value &&
    Array.isArray((value as { reviews: unknown }).reviews)
  );
}

function resolvePath(key: TestimonialKey): TestimonialItem[] {
  const parts = key.split(".");
  let current: unknown = testimonialsData;

  for (const part of parts) {
    if (typeof current !== "object" || current === null) return [];
    current = (current as Record<string, unknown>)[part];
  }

  if (isTestimonialArray(current)) return current;
  if (hasReviews(current)) return current.reviews;
  return [];
}

function padTestimonials(reviews: TestimonialItem[]): TestimonialItem[] {
  if (reviews.length >= MIN_TESTIMONIALS) return reviews;

  const padded = [...reviews];
  const usedQuotes = new Set(reviews.map((r) => r.quote));

  for (const item of fallbackPool) {
    if (padded.length >= MIN_TESTIMONIALS) break;
    if (!usedQuotes.has(item.quote)) {
      padded.push(item);
      usedQuotes.add(item.quote);
    }
  }

  return padded;
}

export function getTestimonials(key: TestimonialKey): TestimonialItem[] {
  return padTestimonials(resolvePath(key));
}
