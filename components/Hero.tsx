import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import { CONTACT_NUMBER, OFFICES } from "@/constants";

export default function Hero() {
  const primaryOffice = OFFICES[0];

  return (
    <section className="relative overflow-hidden bg-zinc-50 pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-16">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left Content */}
          <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary mb-4">
                Nurse-Led Home Care in Edinburgh &amp; Lothian
              </span>
              <h1 className="text-4xl font-black leading-tight text-secondary min-[400px]:text-5xl sm:text-5xl lg:text-5xl xl:text-6xl">
                Compassionate Care, <br />
                <span className="text-primary">Nurse-Led</span> Excellence.
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 max-w-xl mx-auto lg:mx-0">
                Zento provides high-quality home care that combines clinical oversight with compassionate, relationship-led support, helping you live independently in your own home.
              </p>
            </div>

            {/* CTAs: Consultation + Call Now */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <ModalButton
                type="assessment"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
              >
                Book a Free Consultation <ArrowRight className="w-5 h-5" />
              </ModalButton>

              <a
                href={primaryOffice?.phoneHref || `tel:${CONTACT_NUMBER.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-secondary px-6 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call Now: {CONTACT_NUMBER}
              </a>
            </div>
          </div>

          {/* Right Image Container (Tall Responsive Height) */}
          <div className="relative h-[380px] min-[400px]:h-[440px] sm:h-[480px] lg:h-[540px] w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-200 shadow-xl lg:w-1/2">
            <Image
              src="/hero-image.png"
              alt="Zento Caregiver assisting elderly client with compassionate home care"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
