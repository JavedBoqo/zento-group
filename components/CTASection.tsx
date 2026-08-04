import { Phone } from "lucide-react";
import ModalButton from "@/components/ModalButton";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 py-16 px-8 text-center text-white shadow-2xl shadow-primary/20 md:py-24">
          <div className="relative z-10 mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
              Need support today? Speak with our team.
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace(/\s+/g, "") || "01312100095"}`}
                className="flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 min-[400px]:px-8 min-[400px]:py-4"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <ModalButton
                type="callback"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary shadow-lg transition-all hover:scale-105 min-[400px]:px-8 min-[400px]:py-4 cursor-pointer"
              >
                Request Callback
              </ModalButton>
              <ModalButton
                type="quote"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-6 py-3 font-bold text-white transition-all hover:bg-white/10 min-[400px]:px-8 min-[400px]:py-4 cursor-pointer"
              >
                Get Quote
              </ModalButton>
            </div>
          </div>
          {/* Abstract decorative circles */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
