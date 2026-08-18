import { Phone, ArrowRight } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";
import type { CtaSectionData } from "@/lib/blog";

interface Props {
  section: CtaSectionData;
}

export default function CtaSectionBlock({ section }: Props) {
  const phone = OFFICES[0]?.phone ?? "0131 210 0095";
  const phoneHref = OFFICES[0]?.phoneHref ?? "tel:01312100095";

  return (
    <div className="overflow-hidden rounded-2xl bg-secondary p-7 text-white sm:p-9 shadow-lg shadow-secondary/10">
      <h3 className="text-xl font-black leading-tight sm:text-2xl">
        {section.heading}
      </h3>

      <div className="mt-3 space-y-3">
        {section.body.map((para, i) => (
          <p key={i} className="text-sm sm:text-base leading-relaxed text-white/90">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ModalButton
          type="assessment"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02]"
        >
          Book a Free Consultation
          <ArrowRight className="h-4 w-4" />
        </ModalButton>

        <a
          href={phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          <Phone className="h-4 w-4" />
          Call {phone}
        </a>
      </div>
    </div>
  );
}
