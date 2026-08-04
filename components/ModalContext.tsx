"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "@/components/ContactModal";
import MobileMenu from "@/components/MobileMenu";

export type ModalType = "callback" | "quote" | "assessment" | "general";

interface ModalContextValue {
  isMenuOpen: boolean;
  isModalOpen: boolean;
  modalType: ModalType;
  openModal: (type?: ModalType) => void;
  closeModal: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("general");

  const openModal = (type: ModalType = "assessment") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openMobileMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isMenuOpen,
        isModalOpen,
        modalType,
        openModal,
        closeModal,
        openMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMobileMenu}
        onOpenModal={() => {
          closeMobileMenu();
          openModal("assessment");
        }}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
