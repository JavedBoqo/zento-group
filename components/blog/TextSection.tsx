import ArticleContent from "./ArticleContent";
import ContentImage from "./ContentImage";
import type { TextSectionData } from "@/lib/blog";

interface Props {
  formatted?: boolean;
  section: TextSectionData;
}

export default function TextSection({ section, formatted = false }: Props) {
  const Body = formatted ? "div" : "p";
  return (
    <div className="space-y-6">
      <h2 className="border-b border-zinc-200/80 pb-2 text-2xl font-black tracking-tight text-secondary sm:text-3xl">
        {section.heading}
      </h2>
      <ContentImage image={section.image} />

      <div className="space-y-4">
        {section.body.map((para, i) => (
          <Body
            key={i}
            className="text-base leading-relaxed text-zinc-600 sm:text-lg"
          >
            <ArticleContent text={para} formatted={formatted} />
          </Body>
        ))}
      </div>
    </div>
  );
}
