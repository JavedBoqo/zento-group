import { ArrowRight, Phone } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";
import type { ClosingCtaData } from "@/lib/blog";

interface Props {
  cta: ClosingCtaData;
}

export default function ClosingCta({ cta }: Props) {
  const phoneHref = OFFICES[0]?.phoneHref ?? "tel:01764790095";
  const phone = OFFICES[0]?.phone ?? "0176 479 0095";

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 px-5 py-12 text-center text-white shadow-2xl shadow-primary/20 sm:px-10 sm:py-16 md:py-20">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-5">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl lg:text-5xl">
              {cta.heading}
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              {cta.body}
            </p>

            <div className="page-cta-group-dark">
              <ModalButton
                type="assessment"
                className="page-cta-secondary-solid cursor-pointer"
              >
                Book a free consultation <ArrowRight className="h-4 w-4 shrink-0" />
              </ModalButton>

              <a
                href={phoneHref}
                className="page-cta-on-dark-outline"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Call {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
