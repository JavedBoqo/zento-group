"use client";

import { ToastProvider } from "@/components/ToastProvider";
import { ModalProvider } from "@/components/ModalContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  );
}
