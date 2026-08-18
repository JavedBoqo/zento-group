"use client";

import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Home,
  Sun,
  Clock4,
  Brain,
  Heart,
  Building2,
  ShieldCheck,
  Users,
  Utensils,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  "live-in-care": Home,
  "24-hour-care": Home,
  sun: Sun,
  "respite-care": Sun,
  clock: Clock4,
  "overnight-care": Clock4,
  brain: Brain,
  "dementia-care": Brain,
  heart: Heart,
  "personal-care": Heart,
  building: Building2,
  "hospital-discharge": Building2,
  shield: ShieldCheck,
  "medication-support": ShieldCheck,
  users: Users,
  companionship: Users,
  utensils: Utensils,
  "meal-preparation": Utensils,
  moon: Moon,
};

export interface ServiceCardItem {
  id: string;
  title: string;
  desc: string;
  extraDesc?: string;
  href: string;
  linkText: string;
  iconName?: string;
  vocalLink?: { text: string; href: string };
}

interface ServiceCardsGridProps {
  services: ServiceCardItem[];
  className?: string;
}

export default function ServiceCardsGrid({ services, className = "" }: ServiceCardsGridProps) {
  return (
    <AnimateContainer
      animation="stagger"
      className={`grid gap-8 md:grid-cols-2 ${className}`}
    >
      {services.map((service) => {
        const IconComp =
          (service.iconName && iconMap[service.iconName]) ||
          iconMap[service.id] ||
          Home;

        return (
          <AnimateItem key={service.id} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary leading-snug group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-zinc-600">{service.desc}</p>

                {service.extraDesc && (
                  <p className="text-sm leading-relaxed text-zinc-600">{service.extraDesc}</p>
                )}

                {service.vocalLink && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-secondary">
                    <span className="font-bold">Local Carer Support: </span>
                    <a
                      href={service.vocalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      {service.vocalLink.text}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/60">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                >
                  {service.linkText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimateItem>
        );
      })}
    </AnimateContainer>
  );
}
