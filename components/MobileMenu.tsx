"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, ChevronDown, Home, Clock4 } from "lucide-react";
import { OFFICES, CONTACT_EMAIL } from "@/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenModal }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const homeCareLinks = [
    { name: "Home Care Overview", href: "/home-care/" },
    { name: "Personal Care", href: "/home-care/personal-care/" },
    { name: "Medication Support", href: "/home-care/medication-support/" },
    { name: "Dementia Care", href: "/home-care/dementia-care/" },
    { name: "Companionship", href: "/home-care/companionship/" },
    { name: "Meal Preparation", href: "/home-care/meal-preparation/" },
    { name: "Hospital Discharge", href: "/home-care/hospital-discharge/" },
    { name: "Respite Care", href: "/home-care/respite-care/" },
  ];

  const liveInCareLinks = [
    { name: "Live-in Care Overview", href: "/live-in-care/" },
    { name: "Overnight Care", href: "/live-in-care/overnight-care/" },
    { name: "24-Hour Care", href: "/live-in-care/24-hour-care/" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-white py-4 md:hidden overflow-y-auto"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="relative h-18 w-44 min-[400px]:w-52">
              <Link href="/" onClick={onClose} aria-label="Zento Care Home">
                <Image
                  src="/logo.svg"
                  alt="Zento Logo"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </Link>
            </div>
            <button onClick={onClose} className="p-2 text-secondary cursor-pointer">
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Content Body */}
          <div className="px-8 flex-1">
            <div className="mt-10 flex flex-col space-y-5">
              {/* Home */}
              <Link
                href="/"
                onClick={onClose}
                className="text-sm font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors"
              >
                Home
              </Link>

              {/* Collapsible Services Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex w-full items-center justify-between text-sm font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isServicesOpen ? "rotate-180 text-primary" : "text-zinc-400"
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="mt-3 space-y-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
                    {/* Category 1: Home Care */}
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                        <Home className="w-3.5 h-3.5" /> Home Care
                      </p>
                      <div className="space-y-1.5 pl-2 border-l-2 border-primary/20">
                        {homeCareLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className="block text-xs font-semibold text-zinc-700 hover:text-primary transition-colors py-0.5"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Category 2: Live-in Care */}
                    <div className="pt-2 border-t border-zinc-200">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        <Clock4 className="w-3.5 h-3.5" /> Live-in Care
                      </p>
                      <div className="space-y-1.5 pl-2 border-l-2 border-secondary/20">
                        {liveInCareLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className="block text-xs font-semibold text-zinc-700 hover:text-primary transition-colors py-0.5"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              {["About Us", "How It Works", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Contact" ? "/contact" : `/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  className="text-sm font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Integrated Contact Section */}
            <div className="mt-10 border-t border-zinc-100 pt-8">
              <div className="flex flex-col gap-4">
                {OFFICES.map((office) => (
                  <a
                    key={office.name}
                    href={office.phoneHref}
                    className="flex items-center gap-4 text-secondary font-bold group"
                  >
                    <div className="rounded-full bg-zinc-50 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {office.name.replace(" Office", "")}: {office.phone}
                    </span>
                  </a>
                ))}
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 text-secondary font-bold group">
                  <div className="rounded-full bg-zinc-50 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">{CONTACT_EMAIL}</span>
                </a>
              </div>
              <div className="mt-8 pb-8">
                <button
                  onClick={onOpenModal}
                  className="w-full rounded-full bg-secondary py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-secondary/20 cursor-pointer"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
