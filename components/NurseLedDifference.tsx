import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function NurseLedDifference() {
  return (
    <section className="bg-secondary py-24 text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"></div>

      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="mb-8 text-3xl font-black leading-[1.1] tracking-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
              The Zento <br />
              <span className="text-primary">Nurse-Led</span> Difference
            </h2>
            <div className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "Safe medication routines and clinical oversight",
                "Personalised care planning and regular reviews",
                "Clear communication with families",
                "Reliable, consistent carers",
                "Responsive and flexible support",
                "Book a consultation available",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 justify-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary shrink-0 shadow-lg shadow-primary/20 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-left">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
            <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
              <Image
                src="/brand-image.png"
                alt="Zento Trusted Caregiver and Client Team"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
