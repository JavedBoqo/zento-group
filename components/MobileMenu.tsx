"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail } from "lucide-react";
import { OFFICES, CONTACT_EMAIL } from "@/app/lib/contact";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenModal }: MobileMenuProps) {
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
              <Image 
                src="/logo.svg" 
                alt="Zento Logo" 
                fill 
                sizes="192px"
                className="object-contain object-left" 
              />
            </div>
            <button onClick={onClose} className="p-2 text-secondary">
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Content Body */}
          <div className="px-8 flex-1">
            {/* Top-Weighted Stack */}
            <div className="mt-16 flex flex-col space-y-7">
              {["Services", "About Us", "How It Works", "Contact"].map((item) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={onClose}
                  className="text-sm font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Integrated Contact Section */}
            <div className="mt-12 border-t border-zinc-100 pt-10">
              <div className="flex flex-col gap-6">
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
              <div className="mt-10 pb-12">
                <button 
                  onClick={onOpenModal}
                  className="w-full rounded-full bg-secondary py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-secondary/20"
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
