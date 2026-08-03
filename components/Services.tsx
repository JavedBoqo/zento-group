"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, Info, Users, Clock } from "lucide-react";

const services = [
  { name: "Personal Care", icon: <Heart className="w-6 h-6" />, description: "Support with daily routines including washing, dressing, continence care, and mobility." },
  { name: "Medication Support", icon: <ShieldCheck className="w-6 h-6" />, description: "Safe prompting, administration, and monitoring with nurse-led oversight." },
  { name: "Dementia Care", icon: <Info className="w-6 h-6" />, description: "Calm, structured routines delivered by consistent carers to support safety and familiarity." },
  { name: "Companionship", icon: <Users className="w-6 h-6" />, description: "Meaningful engagement, activities, and emotional support to reduce loneliness." },
  { name: "Meal Preparation", icon: <Clock className="w-6 h-6" />, description: "Nutritional support, hydration, and routine meal planning." },
  { name: "Respite Care", icon: <Heart className="w-6 h-6" />, description: "Short-term support to give families rest, reassurance, and peace of mind." },
  { name: "Overnight Care", icon: <Clock className="w-6 h-6" />, description: "Sleep-in or waking night care for safety, reassurance, and peace of mind." },
  { name: "Hospital Discharge", icon: <ShieldCheck className="w-6 h-6" />, description: "Helping clients transition safely back home after hospital stays." },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">Our Services</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">{service.name}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
