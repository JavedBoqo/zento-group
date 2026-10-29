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
  const trackingAction = {
    callback: "callback_request",
    quote: "quote_request",
    general: "contact",
    assessment: "consultation",
  }[type];

  return (
    <button
      type="button"
      data-track-action={trackingAction}
      onClick={() => openModal(type)}
      className={className}
    >
      {children}
    </button>
  );
}
