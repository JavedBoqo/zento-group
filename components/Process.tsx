"use client";

import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Book a Consultation", desc: "A Registered Nurse visits to understand your needs and preferences." },
  { step: "02", title: "Personalised Care Plan", desc: "We build a structured routine tailored to your desired outcomes." },
  { step: "03", title: "Consistent Support", desc: "We match you with reliable carers for familiar, ongoing care." },
  { step: "04", title: "Regular Reviews", desc: "Continuous clinical oversight to ensure safety and quality." },
];

export default function Process() {
  return (
    <section id="how-it-works" className="bg-zinc-50 py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">

        <AnimateContainer animation="fade-up" className="mb-16 text-center">
          <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">How It Works</h2>
          <p className="mt-4 text-zinc-600">Starting your care journey is simple and stress-free.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
        </AnimateContainer>

        <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-4 mb-16">
          {steps.map((item, index) => (
            <AnimateItem key={index} className="relative text-center">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col items-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold text-secondary">{item.title}</h3>
                <p className="text-zinc-600">{item.desc}</p>
              </motion.div>
            </AnimateItem>
          ))}
        </AnimateContainer>

        <AnimateContainer animation="fade-up" delay={0.1} className="flex justify-center">
          <ModalButton
            type="assessment"
            className="rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
          >
            Start Your Journey Today
          </ModalButton>
        </AnimateContainer>

      </div>
    </section>
  );
}
