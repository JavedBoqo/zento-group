"use client";

import AnimateContainer from "@/components/AnimateContainer";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  badgeIcon?: React.ReactNode;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
  badgeIcon,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <AnimateContainer
      animation="fade-up"
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl mb-14 md:mb-16 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-4 shadow-xs">
        {badgeIcon}
        {badge}
      </span>
      <h2 className="text-3xl font-black leading-tight text-secondary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className={`${isCenter ? "mx-auto" : ""} mt-4 h-1.5 w-20 rounded-full bg-primary mb-5`} />
      {subtitle && (
        <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
          {subtitle}
        </p>
      )}
    </AnimateContainer>
  );
}
