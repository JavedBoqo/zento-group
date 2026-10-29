import ArticleContent from "./ArticleContent";
import ContentImage from "./ContentImage";
import { Phone, ArrowRight } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import { OFFICES } from "@/constants";
import type { CtaSectionData } from "@/lib/blog";
import type { ReactNode } from "react";
import { ctaActionSchema, type CTAAction } from "@/lib/article-content";

interface Props {
  children?: ReactNode;
  formatted?: boolean;
  section: CtaSectionData;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction | null;
  preview?: boolean;
}

function Action({
  action,
  className,
  preview,
}: {
  action: CTAAction;
  className: string;
  preview: boolean;
}) {
  if (!ctaActionSchema.safeParse(action).success) return null;
  const icon =
    action.type === "phone" ? (
      <Phone className="h-4 w-4" />
    ) : (
      <ArrowRight className="h-4 w-4" />
    );
  if (preview)
    return (
      <span className={className}>
        {action.type === "phone" && icon}
        {action.label}
        {action.type !== "phone" && icon}
      </span>
    );
  if (action.type === "consultation" || action.type === "contact")
    return (
      <ModalButton
        type={action.type === "consultation" ? "assessment" : "general"}
        className={className}
      >
        {action.label}
        {icon}
      </ModalButton>
    );
  return (
    <a href={action.destination} className={className}>
      {action.type === "phone" && icon}
      {action.label}
      {action.type !== "phone" && icon}
    </a>
  );
}

export default function CtaSectionBlock({
  section,
  formatted = false,
  children,
  primaryAction,
  secondaryAction,
  preview = false,
}: Props) {
  const phone = OFFICES[0]?.phone ?? "0176 479 0095";
  const phoneHref = OFFICES[0]?.phoneHref ?? "tel:01764790095";

  const Body = formatted ? "div" : "p";
  return (
    <div className="overflow-hidden rounded-2xl bg-secondary p-7 text-white sm:p-9 shadow-lg shadow-secondary/10">
      <h3 className="text-xl font-black leading-tight sm:text-2xl">
        {section.heading}
      </h3>
      <ContentImage image={section.image} />

      <div className="mt-3 space-y-3">
        {children}
        {section.body.map((para, i) => (
          <Body
            key={i}
            className="text-sm sm:text-base leading-relaxed text-white/90"
          >
            <ArticleContent text={para} formatted={formatted} />
          </Body>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Action
          action={
            primaryAction || {
              type: "consultation",
              label: "Book a Free Consultation",
            }
          }
          preview={preview}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02]"
        />

        {secondaryAction !== null && (
          <Action
            action={
              secondaryAction || {
                type: "phone",
                label: `Call ${phone}`,
                destination: phoneHref,
              }
            }
            preview={preview}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          />
        )}
      </div>
    </div>
  );
}
