import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Brain,
  Users,
  Utensils,
  Building2,
  Sun,
  Home,
  Moon,
  Clock4,
  ArrowRight,
} from "lucide-react";
import ServiceTabs from "@/components/ServiceTabs";
import AnimateContainer from "@/components/AnimateContainer";

interface ServiceItem {
  name: string;
  category: "Home Care" | "Live-in Care";
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const homeCareServices: ServiceItem[] = [
  {
    name: "Personal Care",
    category: "Home Care",
    href: "/home-care/personal-care/",
    icon: Heart,
    description:
      "Support with daily routines including washing, dressing, continence care, and mobility.",
  },
  {
    name: "Medication Support",
    category: "Home Care",
    href: "/home-care/medication-support/",
    icon: ShieldCheck,
    description:
      "Safe prompting, administration, and monitoring with nurse-led oversight.",
  },
  {
    name: "Dementia Care",
    category: "Home Care",
    href: "/home-care/dementia-care/",
    icon: Brain,
    description:
      "Calm, structured routines delivered by consistent carers to support safety and familiarity.",
  },
  {
    name: "Companionship",
    category: "Home Care",
    href: "/home-care/companionship/",
    icon: Users,
    description:
      "Meaningful engagement, activities, and emotional support to reduce loneliness.",
  },
  {
    name: "Meal Preparation",
    category: "Home Care",
    href: "/home-care/meal-preparation/",
    icon: Utensils,
    description: "Nutritional support, hydration, and routine meal planning.",
  },
  {
    name: "Hospital Discharge",
    category: "Home Care",
    href: "/home-care/hospital-discharge/",
    icon: Building2,
    description: "Helping clients transition safely back home after hospital stays.",
  },
  {
    name: "Respite Care",
    category: "Home Care",
    href: "/home-care/respite-care/",
    icon: Sun,
    description:
      "Short-term support to give families rest, reassurance, and peace of mind.",
  },
];

const liveInCareServices: ServiceItem[] = [
  {
    name: "Live-in Care",
    category: "Live-in Care",
    href: "/live-in-care/",
    icon: Home,
    description:
      "Round-the-clock dedicated caregiver living in your home for complete peace of mind.",
  },
  {
    name: "Overnight Care",
    category: "Live-in Care",
    href: "/live-in-care/overnight-care/",
    icon: Moon,
    description:
      "Sleep-in or waking night care for safety, reassurance, and peace of mind.",
  },
  {
    name: "24-Hour Care",
    category: "Live-in Care",
    href: "/live-in-care/24-hour-care/",
    icon: Clock4,
    description:
      "Continuous 24/7 rotational care team for complex medical or high-dependency needs.",
  },
];

export default function Services() {
  const renderCard = (service: ServiceItem, index: number) => {
    const IconComp = service.icon;
    const isLiveIn = service.category === "Live-in Care";

    return (
      <div
        key={index}
        className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
      >
        <div>
          {/* Main Category Badge Only */}
          <div className="mb-5 flex items-center justify-between">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                isLiveIn
                  ? "border-secondary/20 bg-secondary/10 text-secondary"
                  : "border-primary/20 bg-primary/10 text-primary"
              }`}
            >
              {service.category}
            </span>
          </div>

          {/* Icon & Title */}
          <div className="mb-4 flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                isLiveIn
                  ? "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
              }`}
            >
              <IconComp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-secondary leading-snug">
              {service.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-600 mb-6">
            {service.description}
          </p>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-zinc-100">
          <Link
            href={service.href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
          >
            Learn more about {service.name}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="py-24 bg-zinc-50/50">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <AnimateContainer animation="fade-up" className="mb-12 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-3">
            Nurse-Led Care Options
          </span>
          <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
            Tailored home care and live-in care options designed around your personal health, comfort, and independence.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary"></div>
        </AnimateContainer>

        {/* SEO-Safe Accessible Tabs & Panels */}
        <ServiceTabs
          homeCount={homeCareServices.length}
          liveInCount={liveInCareServices.length}
          homeCarePanel={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {homeCareServices.map((service, index) => renderCard(service, index))}
            </div>
          }
          liveInCarePanel={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveInCareServices.map((service, index) => renderCard(service, index))}
            </div>
          }
        />
      </div>
    </section>
  );
}
