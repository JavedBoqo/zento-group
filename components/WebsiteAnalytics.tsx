"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Cookie } from "lucide-react";
import {
  trackEvent,
  hasAnalyticsConsent,
  type TrackingEvent,
  COOKIE_PREFERENCES_EVENT,
  readAnalyticsConsent,
} from "@/lib/analytics";

export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"accepted" | "rejected" | null>();
  const [showPreferences, setShowPreferences] = useState(false);
  const lastPage = useRef("");
  const card = useRef<HTMLElement>(null);
  const preferenceTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Synchronize the saved browser preference after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(readAnalyticsConsent());
  }, [pathname]);

  useEffect(() => {
    const open = () => {
      preferenceTrigger.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setShowPreferences(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (showPreferences) card.current?.focus();
  }, [showPreferences]);

  useEffect(() => {
    if (
      choice !== "accepted" ||
      !hasAnalyticsConsent() ||
      pathname.startsWith("/admin")
    )
      return;
    if (lastPage.current !== pathname) {
      trackEvent({ event: "page_view", page: pathname });
      lastPage.current = pathname;
    }
  }, [pathname, choice]);

  useEffect(() => {
    if (choice !== "accepted" || pathname.startsWith("/admin")) return;
    function handleClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest("a,button")
          : null;
      if (!target || target.hasAttribute("data-tracking-skip")) return;
      const link = target.getAttribute("href") || "";
      const configured = target.getAttribute("data-track-action");
      let action: TrackingEvent["action"];
      let button: TrackingEvent["button"];
      if (configured === "callback_request") {
        action = "callback_request";
        button = "Request Callback";
      } else if (configured === "consultation") {
        action = "consultation";
        button = "Book Consultation";
      } else if (configured === "quote_request") {
        action = "quote_request";
        button = "Get Quote";
      } else if (configured === "contact") {
        action = "contact";
        button = "Contact";
      } else if (link.startsWith("mailto:")) {
        action = "email";
        button = "Email";
      } else if (link.startsWith("tel:")) {
        action = "phone";
        button = "Phone";
      } else if (link.startsWith("/careers/apply")) {
        action = "job_application";
        button = "Apply Now";
      } else if (link === "/contact") {
        action = "service_inquiry";
        button = "Service Inquiry";
      }
      if (action && button) {
        const job = link.startsWith("/careers/apply")
          ? new URL(link, location.origin).searchParams.get("job") || undefined
          : undefined;
        trackEvent({
          event: "button_click",
          button,
          action,
          page: pathname,
          ...(job ? { job } : {}),
        });
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, choice]);

  function choose(value: "accepted" | "rejected") {
    document.cookie = `zento-analytics=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setChoice(value);
    setShowPreferences(false);
    if (value === "rejected") lastPage.current = "";
    if (showPreferences) preferenceTrigger.current?.focus();
  }

  if (choice === undefined || pathname.startsWith("/admin")) return null;
  return (
    <>
      {choice === null || showPreferences ? (
        <aside
          id="cookie-preferences"
          ref={card}
          tabIndex={-1}
          aria-label="Cookie preferences"
          aria-labelledby="cookie-consent-heading"
          className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-3 right-3 z-[150] max-w-[420px] rounded-2xl border border-secondary/10 bg-white p-5 text-zinc-700 shadow-[0_8px_32px_-8px_rgba(46,90,165,0.22)] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[420px]"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cookie size={19} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2
              id="cookie-consent-heading"
              className="text-base font-bold tracking-tight text-secondary"
            >
              Your privacy matters
            </h2>
          </div>
          <p className="text-[13px] leading-6">
            Choose whether to allow optional cookies. You can update your choice
            at any time.
          </p>
          <Link
            className="mt-1 inline-block rounded text-xs font-medium text-secondary underline decoration-secondary/30 underline-offset-4 transition-colors hover:decoration-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            href="/privacy-policy"
          >
            Privacy policy
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              data-tracking-skip
              onClick={() => choose("rejected")}
              className="min-h-11 rounded-xl border border-secondary/30 bg-white px-3 py-2.5 text-[13px] font-semibold text-secondary transition-colors hover:border-secondary hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Reject optional
            </button>
            <button
              type="button"
              data-tracking-skip
              onClick={() => choose("accepted")}
              className="min-h-11 rounded-xl border border-secondary bg-secondary px-3 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-secondary/90 hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Accept all
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
