import ArticleContent from "./ArticleContent";
import ContentImage from "./ContentImage";
import Image from "next/image";
import type { SignsSectionData } from "@/lib/blog";

interface Props {
  formatted?: boolean;
  section: SignsSectionData;
}

export default function SignsSection({ section, formatted = false }: Props) {
  const Body = formatted ? "div" : "p";
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black tracking-tight text-secondary sm:text-3xl">
        {section.heading}
      </h2>
      <ContentImage image={section.image} />

      <div className="space-y-7">
        {section.items.map((item) => (
          <div key={item.number} className="group">
            {item.icon?.src && (
              <Image
                src={item.icon.src}
                alt={item.icon.alt}
                width={48}
                height={48}
                className="mb-2 h-12 w-12 object-contain"
              />
            )}
            <h3 className="border-b border-zinc-200/80 pb-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary sm:text-xl">
              {item.number}. {item.title}
            </h3>
            <Body className="mt-2.5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              <ArticleContent text={item.body} formatted={formatted} />
            </Body>
          </div>
        ))}
      </div>
    </div>
  );
}
