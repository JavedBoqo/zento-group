"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-50 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          <div className="w-full space-y-8 text-center lg:w-1/2 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-6">
                Nurse-Led Home Care in Edinburgh & Lothian
              </span>
              <h1 className="text-4xl font-black leading-tight text-secondary min-[400px]:text-5xl sm:text-6xl lg:text-6xl xl:text-7xl">
                Compassionate Care, <br />
                <span className="text-primary">Nurse-Led</span> Excellence.
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-zinc-600 max-w-lg mx-auto lg:mx-0">
                Zento provides high-quality home care that combines clinical oversight with compassionate, relationship-led support, helping you live independently in your own home.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <button 
                onClick={onOpenModal}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 min-[400px]:px-8 min-[400px]:py-4 min-[400px]:text-lg"
              >
                Book a Free Consultation <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl bg-zinc-200 shadow-2xl lg:aspect-square lg:w-1/2"
          >
            <Image 
              src="/hero-image.png" 
              alt="Zento Caregiver assisting elderly client" 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
