"use client";

import { COOKIE_PREFERENCES_EVENT } from "@/lib/analytics";

export default function CookiePreferences() {
  return (
    <button
      type="button"
      data-tracking-skip
      aria-controls="cookie-preferences"
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
      className="rounded transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
    >
      Cookie Preferences
    </button>
  );
}
