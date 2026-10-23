"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Menu,
  ChevronDown,
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
  Sparkles,
  MapPin,
} from "lucide-react";
import { OFFICES, CONTACT_EMAIL, SOCIAL_LINKS } from "@/constants";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { useModal } from "@/components/ModalContext";
import { PERTHSHIRE_NAV_LINKS } from "@/lib/navigation";

interface NavbarProps {
  onMenuOpen?: () => void;
  onOpenModal?: () => void;
}

export default function Navbar({ onMenuOpen, onOpenModal }: NavbarProps = {}) {
  const { openModal: contextOpenModal, openMobileMenu: contextOpenMenu } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const handleOpenModal = onOpenModal || (() => contextOpenModal("assessment"));
  const handleOpenMenu = onMenuOpen || contextOpenMenu;

  const toggleRegion = (region: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedRegion((prev) => (prev === region ? null : region));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeCareServices = [
    {
      name: "Personal Care",
      href: "/home-care/personal-care",
      desc: "Washing, dressing & mobility support",
      icon: Heart,
    },
    {
      name: "Medication Support",
      href: "/home-care/medication-support",
      desc: "Nurse-monitored administration",
      icon: ShieldCheck,
    },
    {
      name: "Dementia Care",
      href: "/home-care/dementia-care",
      desc: "Structured, familiar daily routines",
      icon: Brain,
    },
    {
      name: "Companionship",
      href: "/home-care/companionship",
      desc: "Social engagement & activities",
      icon: Users,
    },
    {
      name: "Meal Preparation",
      href: "/home-care/meal-preparation",
      desc: "Nutritional support & meal planning",
      icon: Utensils,
    },
    {
      name: "Hospital Discharge",
      href: "/home-care/hospital-discharge",
      desc: "Safe transition back home",
      icon: Building2,
    },
    {
      name: "Respite Care",
      href: "/home-care/respite-care",
      desc: "Short-term relief for family carers",
      icon: Sun,
    },
  ];

  const liveInCareServices = [
    {
      name: "Live-in Care Overview",
      href: "/live-in-care",
      desc: "Round-the-clock dedicated caregiver",
      icon: Home,
    },
    {
      name: "Overnight Care",
      href: "/live-in-care/overnight-care",
      desc: "Sleep-in or waking night support",
      icon: Moon,
    },
    {
      name: "24-Hour Care",
      href: "/live-in-care/24-hour-care",
      desc: "Continuous 24/7 rotational care",
      icon: Clock4,
    },
  ];

  const locationGroups = [
    {
      region: "Edinburgh",
      href: "/locations/edinburgh",
      desc: "All Edinburgh postcodes",
      icon: Home,
      color: "primary" as const,
    },
    {
      region: "Lothian",
      href: "/locations/lothian",
      desc: "Midlothian, East & West Lothian",
      icon: MapPin,
      color: "primary" as const,
      subAreas: [
        { name: "Lothian Region Hub", href: "/locations/lothian", desc: "All Lothian regional care" },
        { name: "Midlothian", href: "/locations/lothian/midlothian", desc: "Dalkeith, Penicuik, Bonnyrigg" },
        { name: "East Lothian", href: "/locations/lothian/east-lothian", desc: "Musselburgh, Haddington, N. Berwick" },
        { name: "West Lothian", href: "/locations/lothian/west-lothian", desc: "Livingston, Bathgate, Linlithgow" },
      ],
    },
    {
      region: "Perthshire",
      href: "/locations/perthshire",
      desc: "Crieff, Comrie & surrounds",
      icon: MapPin,
      color: "secondary" as const,
      subAreas: PERTHSHIRE_NAV_LINKS,
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-secondary py-2 text-white sm:block" id="home">
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-6 md:px-12 lg:px-24 text-sm font-medium">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {OFFICES.map((office) => (
              <a
                key={office.name}
                href={office.phoneHref}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {office.name.replace(" Office", "")}: {office.phone}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" /> {CONTACT_EMAIL}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hover:text-primary transition-colors flex items-center justify-center"
              >
                {social.iconName === "facebook" && <FacebookIcon />}
                {social.iconName === "instagram" && <InstagramIcon />}
                {social.iconName === "linkedin" && <LinkedinIcon />}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-sm" : ""
          }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-6 md:px-12 lg:px-24 py-2 sm:py-2.5 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative h-12 w-36 min-[400px]:w-40 overflow-hidden rounded-lg transition-all duration-300">
              <Link href="/" aria-label="Zento Care home" className="relative block h-full w-full">
                <Image
                  src="/logo.svg"
                  alt="Nurse-Led Home Care in Edinburgh & Perthshire | Zento"
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 160px"
                  className="object-contain object-left"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {/* 1. Home Link */}
            <Link
              href="/"
              className="font-semibold text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>

            {/* 2. Services Link with Mega-Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/services"
                className="flex items-center gap-1 font-semibold text-secondary hover:text-primary transition-colors"
              >
                Services
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-zinc-400 group-hover:text-primary" />
              </Link>

              {/* Mega Dropdown Menu — pointer-events only on true hover devices */}
              <div className="absolute top-full -left-44 w-[760px] max-w-[calc(100vw-2rem)] pt-3 opacity-0 invisible translate-y-2 pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/98 backdrop-blur-2xl p-6 shadow-2xl ring-1 ring-black/5">
                  <div className="grid grid-cols-12 gap-8">
                    {/* Category 1: Home Care (6 Columns) */}
                    <div className="col-span-6 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                        <Link
                          href="/home-care"
                          className="flex items-center gap-2.5 group/cat shrink-0"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/cat:bg-primary group-hover/cat:text-white">
                            <Home className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-secondary text-base whitespace-nowrap group-hover/cat:text-primary transition-colors">
                            Home Care
                          </span>
                        </Link>
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                          Hourly &amp; Daily
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        {homeCareServices.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="group/item flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-primary/5"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover/item:bg-primary group-hover/item:text-white">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-secondary truncate group-hover/item:text-primary transition-colors">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-zinc-500 truncate leading-tight">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Category 2: Live-in Care (6 Columns) */}
                    <div className="col-span-6 flex flex-col justify-between border-l border-zinc-100 pl-8 space-y-4">
                      <div>
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                          <Link
                            href="/live-in-care"
                            className="flex items-center gap-2.5 group/cat shrink-0"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover/cat:bg-secondary group-hover/cat:text-white">
                              <Clock4 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-secondary text-base whitespace-nowrap group-hover/cat:text-primary transition-colors">
                              Live-in Care
                            </span>
                          </Link>
                          <span className="shrink-0 whitespace-nowrap rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary">
                            24/7 Full Support
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-2">
                          {liveInCareServices.map((item) => {
                            const IconComp = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="group/item flex items-center gap-3 rounded-xl p-2.5 border border-zinc-100/60 bg-zinc-50/50 transition-all hover:bg-secondary/5 hover:border-secondary/20"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs text-zinc-600 transition-colors group-hover/item:bg-secondary group-hover/item:text-white">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold text-secondary truncate group-hover/item:text-primary transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-zinc-500 truncate leading-tight">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dropdown CTA Box */}
                      <div className="rounded-2xl bg-gradient-to-br from-zinc-50 via-primary/5 to-white p-4 border border-zinc-200/60 shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-secondary mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span>Unsure which care fits?</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug">
                          Speak with a qualified nurse for a free assessment.
                        </p>
                        <button
                          type="button"
                          onClick={handleOpenModal}
                          className="mt-3 w-full rounded-full bg-primary py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Book Free Assessment <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Locations Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/locations"
                className="flex items-center gap-1 font-semibold text-secondary hover:text-primary transition-colors"
              >
                Locations
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-zinc-400 group-hover:text-primary" />
              </Link>

              {/* Locations Dropdown — pointer-events only on true hover devices */}
              <div className="absolute top-full left-0 w-72 sm:w-80 pt-3 opacity-0 invisible translate-y-2 pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 z-[60]">
                <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-2xl ring-1 ring-black/5">
                  <Link
                    href="/locations"
                    className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-100 group/all"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/all:bg-primary group-hover/all:text-white">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secondary group-hover/all:text-primary transition-colors">All Service Areas</p>
                      <p className="text-[11px] text-zinc-500">View all locations</p>
                    </div>
                  </Link>

                  <div className="space-y-1">
                    {locationGroups.map((group) => {
                      const IconComp = group.icon;
                      const hasSubAreas = group.subAreas && group.subAreas.length > 0;

                      const isExpanded = expandedRegion === group.region;

                      return (
                        <div key={group.region}>
                          <div className="flex items-stretch gap-1 rounded-xl transition-all hover:bg-primary/5">
                            <Link
                              href={group.href}
                              className="group/loc flex items-center gap-2.5 rounded-xl p-2 flex-1 min-w-0"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover/loc:bg-primary group-hover/loc:text-white">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-secondary group-hover/loc:text-primary transition-colors">
                                  {group.region}
                                </p>
                                <p className="text-[11px] text-zinc-500 truncate">
                                  {group.desc}
                                </p>
                              </div>
                            </Link>
                            {hasSubAreas && (
                              <button
                                type="button"
                                onClick={(e) => toggleRegion(group.region, e)}
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.region} sub-areas`}
                                className="shrink-0 flex items-center justify-center w-8 rounded-xl text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer my-1"
                              >
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                              </button>
                            )}
                          </div>

                          {hasSubAreas && (
                            <div className={`grid overflow-hidden transition-all duration-200 ease-out ${isExpanded ? "grid-rows-[1fr] mt-1" : "grid-rows-[0fr]"}`}>
                              <div className="min-h-0 overflow-hidden" inert={!isExpanded}>
                                <div className="ml-9 mr-2 border-l border-zinc-200 pl-3 space-y-1 pb-1">
                                  {group.subAreas.map((sub) => (
                                    <div key={sub.name}>
                                      <Link
                                        href={sub.href}
                                        className="group/item flex items-center justify-between rounded-lg py-1.5 px-2 transition-all hover:bg-primary/5"
                                      >
                                        <div className="min-w-0 flex-1">
                                          <p className="text-[11px] font-bold text-secondary truncate group-hover/item:text-primary transition-colors">
                                            {sub.name}
                                          </p>
                                          <p className="text-[10px] text-zinc-500 truncate leading-tight">
                                            {sub.desc}
                                          </p>
                                        </div>
                                        <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all shrink-0" />
                                      </Link>
                                      {"children" in sub && sub.children && (
                                        <div className="ml-2 mb-2 border-l border-primary/20 pl-2">
                                          {sub.children.map((service) => (
                                            <Link
                                              key={service.href}
                                              href={service.href}
                                              className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-primary/5 hover:text-primary"
                                            >
                                              {service.name}
                                              <ArrowRight className="h-3 w-3 shrink-0" />
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/about-us"
              className="font-semibold text-secondary hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className="font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-secondary hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={handleOpenModal}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
            >
              Book a Consultation
            </button>
          </nav>

          {/* Mobile Menu Button — z-[70] ensures it always sits above any dropdown overlay */}
          <button
            aria-label="Open mobile menu"
            className="relative z-[70] p-3 md:hidden cursor-pointer touch-manipulation"
            onClick={handleOpenMenu}
            type="button"
          >
            <Menu className="w-6 h-6 text-secondary" />
          </button>
        </div>
      </header>
    </>
  );
}
