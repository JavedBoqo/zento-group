"use client";

import Image from "next/image";
import { Phone, Mail, Menu } from "lucide-react";
import { OFFICES, CONTACT_EMAIL } from "@/app/lib/contact";

interface NavbarProps {
  onMenuOpen: () => void;
  onOpenModal: () => void;
}

export default function Navbar({ onMenuOpen, onOpenModal }: NavbarProps) {
  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-secondary py-2 text-white sm:block" id="home">
        <div className="container mx-auto flex justify-between px-6 sm:px-6 md:px-12 lg:px-24 text-sm font-medium">
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
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 shrink-0" /> {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center gap-2">
            <div className="relative h-18 w-44 overflow-hidden rounded-lg min-[400px]:w-52">
              <a href="#home">
                <Image
                  src="/logo.svg"
                  alt="Zento Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 192px"
                  className="object-contain object-left"
                />
              </a>
            </div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="font-semibold text-secondary hover:text-primary transition-colors">Services</a>
            <a href="#about-us" className="font-semibold text-secondary hover:text-primary transition-colors">About Us</a>
            <a href="#how-it-works" className="font-semibold text-secondary hover:text-primary transition-colors">How It Works</a>
            <a href="#contact" className="font-semibold text-secondary hover:text-primary transition-colors">Contact</a>
            <button 
              onClick={onOpenModal}
              className="rounded-full bg-primary px-6 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
            >
              Book a Consultation
            </button>
          </nav>
          <button className="p-2 md:hidden" onClick={onMenuOpen}>
            <Menu className="w-6 h-6 text-secondary" />
          </button>
        </div>
      </header>
    </>
  );
}
