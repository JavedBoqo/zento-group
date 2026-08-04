"use client";

import { ReactNode } from "react";
import { useModal, ModalType } from "@/components/ModalContext";

interface ModalButtonProps {
  type?: ModalType;
  className?: string;
  children: ReactNode;
}

export default function ModalButton({
  type = "assessment",
  className,
  children,
}: ModalButtonProps) {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      onClick={() => openModal(type)}
      className={className}
    >
      {children}
    </button>
  );
}
