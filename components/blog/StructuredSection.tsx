import type { ContentSection, ContentBlock } from "@/lib/article-content";
import ContentImage from "./ContentImage";
import CtaSectionBlock from "./CtaSectionBlock";
import RichTextView, { InlineView } from "./RichTextView";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import TextWithListSection from "./TextWithListSection";

function Block({ block, light }: { block: ContentBlock; light: boolean }) {
  switch (block.type) {
    case "richText":
      return (
        <div
          className={`leading-relaxed ${light ? "text-sm sm:text-base text-white/90" : "text-base sm:text-lg text-zinc-600"}`}
        >
          <RichTextView value={block.content} light={light} />
        </div>
      );
    case "image":
      return <ContentImage image={block} />;
    case "subheading":
      return (
        <div>
          {block.icon?.src && (
            <Image
              src={block.icon.src}
              alt={block.icon.alt}
              width={48}
              height={48}
              className="mb-2 h-12 w-12 object-contain"
            />
          )}
          <h3
            className={`border-b pb-2 text-lg font-bold sm:text-xl ${light ? "border-white/20 text-white" : "border-zinc-200/80 text-secondary"}`}
          >
            {block.number !== undefined && `${block.number}. `}
            {block.text}
          </h3>
        </div>
      );
    case "callout":
      return (
        <blockquote className="rounded-xl border-l-4 border-primary bg-zinc-50 p-4 text-base leading-relaxed text-zinc-700 italic sm:p-5">
          <RichTextView value={block.content} compact />
        </blockquote>
      );
    case "list": {
      if (block.ordered)
        return (
          <ol
            className={`list-decimal space-y-3 pl-6 leading-relaxed ${light ? "text-sm sm:text-base text-white/90" : "text-base sm:text-lg text-zinc-700"}`}
          >
            {block.items.map((item, index) => (
              <li key={index}>
                <InlineView parts={item} />
              </li>
            ))}
          </ol>
        );
      return (
        <ul className="space-y-3.5 pl-1">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <span
                className={`leading-relaxed ${light ? "text-sm sm:text-base text-white/90" : "text-base sm:text-lg text-zinc-700"}`}
              >
                <InlineView parts={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default function StructuredSection({
  section,
  preview = false,
}: {
  section: ContentSection;
  preview?: boolean;
}) {
  const body = (
    <div className="space-y-6">
      {section.blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          light={section.type === "cta" || section.layout === "service"}
        />
      ))}
    </div>
  );
  if (section.type === "checklist")
    return (
      <TextWithListSection
        section={{
          type: "text_with_list",
          heading: section.title,
          intro: "",
          list: [],
        }}
        richItems={section.items.map((item) => (
          <InlineView key={item.id} parts={item.content} />
        ))}
      >
        {body}
      </TextWithListSection>
    );
  if (section.type === "cta" || section.layout === "service")
    return (
      <CtaSectionBlock
        section={{ heading: section.title, type: "cta_section", body: [] }}
        primaryAction={
          section.type === "cta" ? section.primaryAction : undefined
        }
        secondaryAction={
          section.type === "cta" ? section.secondaryAction || null : undefined
        }
        preview={preview}
      >
        {body}
      </CtaSectionBlock>
    );
  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-black tracking-tight text-secondary sm:text-3xl ${section.layout === "numbered" ? "" : "border-b border-zinc-200/80 pb-2"}`}
      >
        {section.title}
      </h2>
      {body}
    </div>
  );
}
