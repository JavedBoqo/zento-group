"use client";

export const COOKIE_PREFERENCES_EVENT = "zento:cookie-preferences";

export interface TrackingEvent {
  event: "page_view" | "button_click";
  button?:
    | "Contact"
    | "Email"
    | "Phone"
    | "Book Consultation"
    | "Request Callback"
    | "Get Quote"
    | "Service Inquiry"
    | "Apply Now";
  action?:
    | "contact"
    | "email"
    | "phone"
    | "consultation"
    | "callback_request"
    | "quote_request"
    | "service_inquiry"
    | "job_application";
  page: string;
  job?: string;
}

export function readAnalyticsConsent(): "accepted" | "rejected" | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("zento-analytics="))
    ?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent() === "accepted";
}

export function trackEvent(event: TrackingEvent) {
  if (!hasAnalyticsConsent() || event.page.startsWith("/admin")) return;
  void fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...event, consent: true }),
    keepalive: true,
  }).catch(() => {});
}
