"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "error" | "success" | "info";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

export interface ShowToastOptions {
  type?: ToastType;
  title: string;
  message: string;
  duration?: number;
}

const toastStyles: Record<
  ToastType,
  { icon: typeof AlertTriangle; iconWrap: string }
> = {
  error: {
    icon: AlertTriangle,
    iconWrap: "bg-red-50 text-red-600",
  },
  success: {
    icon: CheckCircle2,
    iconWrap: "bg-primary/10 text-primary",
  },
  info: {
    icon: Info,
    iconWrap: "bg-secondary/10 text-secondary",
  },
};

interface ToastProps {
  toast: ToastData;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const style = toastStyles[toast.type];
  const Icon = style.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      role="alert"
      aria-live="assertive"
      className="group pointer-events-auto relative w-full max-w-sm rounded-2xl border-2 border-zinc-200 bg-white font-sans shadow-2xl shadow-secondary/10"
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute left-0 top-0 z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-zinc-400 opacity-0 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-secondary group-hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-start gap-3 p-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${style.iconWrap}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold leading-snug text-secondary">{toast.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{toast.message}</p>
        </div>
      </div>
    </motion.div>
  );
}
