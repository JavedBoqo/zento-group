"use client";

import { ToastProvider } from "@/components/ToastProvider";
import { ModalProvider } from "@/components/ModalContext";
import Script from "next/script";
import { usePathname } from "next/navigation";
import WebsiteAnalytics from "./WebsiteAnalytics";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <ToastProvider>
      {pathname.startsWith("/admin") ? (
        children
      ) : (
        <ModalProvider>
          {siteKey && (
            <Script
              src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
              strategy="afterInteractive"
            />
          )}
          {children}
          <WebsiteAnalytics />
        </ModalProvider>
      )}
    </ToastProvider>
  );
}
