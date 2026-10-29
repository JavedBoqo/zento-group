import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import ModalButton from "@/components/ModalButton";

const SERVICES = [
  { name: "Personal Care & Hygiene", href: "/home-care/personal-care/" },
  { name: "Dementia & Memory Care", href: "/home-care/dementia-care/" },
  { name: "Companionship & Wellbeing", href: "/home-care/companionship/" },
  { name: "Respite & Family Relief", href: "/home-care/respite-care/" },
  {
    name: "Medication & Health Support",
    href: "/home-care/medication-support/",
  },
  { name: "Overnight & 24/7 Care", href: "/live-in-care/overnight-care/" },
];

export default function BlogSidebar() {
  return (
    <aside className="min-w-0 space-y-5 break-words">
      {/* ── Card 1: Contact / CTA ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="h-1.5 w-full bg-secondary" />
        <div className="p-5">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Nurse-Led Care
          </div>

          <h3 className="text-lg font-black text-secondary leading-snug">
            Need Care Advice?
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
            Speak directly with our registered nursing team across Edinburgh,
            the Lothians &amp; Perthshire.
          </p>

          <div className="mt-3.5 space-y-2">
            <ModalButton
              type="assessment"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-secondary/15 transition-all hover:bg-secondary/90 hover:scale-[1.02]"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </ModalButton>

            <ModalButton
              type="callback"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-secondary"
            >
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              Request a Callback
            </ModalButton>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-400">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <span>Free consultation • No obligation</span>
          </div>
        </div>
      </div>

      {/* ── Card 2: Care Services Quick Links ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 bg-zinc-50/80 px-5 py-3.5">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
            <HeartHandshake className="h-4 w-4 text-primary" />
            Our Care Services
          </h4>
        </div>
        <div className="divide-y divide-zinc-100 p-1.5">
          {SERVICES.map((service, idx) => (
            <Link
              key={idx}
              href={service.href}
              className="group flex items-center justify-between rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-secondary"
            >
              <span className="min-w-0">{service.name}</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
