import Image from "next/image";
import type { ReactNode } from "react";
import { articleBlocks, safeArticleURL } from "@/lib/article-editor";
import ContentImage from "./ContentImage";

/** Render a safe Markdown subset as React elements; raw HTML is always text. */
export function InlineContent({ text }: { text: string }) {
  const pattern =
    /(!?\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|_[^_\n]+_|`[^`\n]+`)/g;
  const nodes: ReactNode[] = [];
  let end = 0;
  for (const match of text.matchAll(pattern)) {
    nodes.push(text.slice(end, match.index));
    const value = match[0];
    const link = value.match(/^(!?)\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && safeArticleURL(link[3], Boolean(link[1]))) {
      nodes.push(
        link[1] ? (
          <Image
            key={match.index}
            src={link[3]}
            width={800}
            height={500}
            unoptimized
            alt={link[2]}
            className="my-4 h-auto max-w-full rounded-2xl"
          />
        ) : (
          <a
            key={match.index}
            href={link[3]}
            className="font-medium underline underline-offset-2"
          >
            <InlineContent text={link[2]} />
          </a>
        ),
      );
    } else if (link) nodes.push(value);
    else if (value.startsWith("**") || value.startsWith("__"))
      nodes.push(<strong key={match.index}>{value.slice(2, -2)}</strong>);
    else if (value.startsWith("`"))
      nodes.push(<code key={match.index}>{value.slice(1, -1)}</code>);
    else nodes.push(<em key={match.index}>{value.slice(1, -1)}</em>);
    end = match.index! + value.length;
  }
  nodes.push(text.slice(end));
  return <>{nodes}</>;
}

export default function ArticleContent({
  text,
  formatted = false,
}: {
  text: string;
  formatted?: boolean;
}) {
  if (!formatted) return <>{text}</>;
  return (
    <>
      {articleBlocks(text).map((block, index) => {
        const content = <InlineContent text={block.text} />;
        if (block.type === "image")
          return <ContentImage key={index} image={block.image} />;
        if (block.type === "heading") {
          const Heading = `h${Math.max(3, block.level || 3)}` as
            "h3" | "h4" | "h5" | "h6";
          return (
            <Heading
              key={index}
              className="mb-3 mt-6 text-lg font-bold text-secondary sm:text-xl"
            >
              {content}
            </Heading>
          );
        }
        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List
              key={index}
              className={`my-4 space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`}
            >
              {block.items!.map((item, i) => (
                <li key={i}>
                  <InlineContent text={item} />
                </li>
              ))}
            </List>
          );
        }
        if (block.type === "quote")
          return (
            <blockquote
              key={index}
              className="my-4 rounded-xl border-l-4 border-primary bg-zinc-50 p-5 text-zinc-700 italic"
            >
              {content}
            </blockquote>
          );
        if (block.type === "code")
          return (
            <pre
              key={index}
              className="my-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-zinc-50 p-4 text-sm"
            >
              {block.text}
            </pre>
          );
        return (
          <p key={index} className={index > 0 ? "mt-4" : undefined}>
            {content}
          </p>
        );
      })}
    </>
  );
}
