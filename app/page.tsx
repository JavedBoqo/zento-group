"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import NurseLedDifference from "@/components/NurseLedDifference";
import About from "@/components/About";
import Process from "@/components/Process";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<"callback" | "quote" | "assessment" | "general">("general");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (type: "callback" | "quote" | "assessment" | "general") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} onOpenModal={() => openModal("assessment")} />

      <main>
        <Hero onOpenModal={() => openModal("assessment")} />
        <Services />
        <NurseLedDifference />
        <About />
        <Process onOpenModal={() => openModal("assessment")} />
        <ContactSection onOpenModal={() => openModal("general")} />
        <CTASection onOpenModal={openModal} />
      </main>ß

      <Footer onOpenModal={() => openModal("general")} />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={() => {
          setIsMenuOpen(false);
          openModal("assessment");
        }}
      />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}
