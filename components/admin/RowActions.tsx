"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import DeleteRecord from "./DeleteRecord";

export default function RowActions({
  links,
  deleteUrl,
  label,
}: {
  links: { label: string; href: string; external?: boolean }[];
  deleteUrl: string;
  label: string;
}) {
  const id = useId();
  const popover = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [open, setOpen] = useState(false);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: Math.min(bounds.bottom + 6, window.innerHeight - 160),
      left: Math.max(8, bounds.right - 176),
    });
    popover.current?.togglePopover();
  }

  return (
    <>
      <button
        type="button"
        aria-label={`Actions for ${label}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e9d9] bg-white text-[#636d5a] hover:bg-[#f4f8ed]"
      >
        <MoreHorizontal size={16} />
      </button>
      <div
        id={id}
        ref={popover}
        popover="auto"
        onToggle={() =>
          setOpen(popover.current?.matches(":popover-open") || false)
        }
        style={{ inset: "auto", ...position }}
        className="fixed z-50 m-0 w-44 rounded-xl border border-[#e2e9d9] bg-white p-2 text-[#5b7350] shadow-lg"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-[12px] hover:bg-[#f4f8ed]"
          >
            {link.label}
            <ArrowUpRight size={12} className="text-[#6a725f]" />
          </Link>
        ))}
        <div className="mt-1 border-t border-[#eef2e8] px-3 py-2">
          <DeleteRecord url={deleteUrl} label={label} />
        </div>
      </div>
    </>
  );
}
