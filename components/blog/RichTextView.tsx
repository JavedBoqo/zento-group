import type { InlineText, RichText } from "@/lib/article-content";
import { safeArticleURL } from "@/lib/article-editor";
import { CheckCircle2 } from "lucide-react";

export function InlineView({ parts }: { parts: InlineText[] }) {
  return (
    <>
      {parts.map((part, index) => {
        let node = <>{part.text}</>;
        if (part.bold) node = <strong>{node}</strong>;
        if (part.italic) node = <em>{node}</em>;
        if (part.href && safeArticleURL(part.href))
          node = (
            <a
              href={part.href}
              className="font-medium underline underline-offset-2"
            >
              {node}
            </a>
          );
        return (
          <span key={index} className="whitespace-pre-wrap">
            {node}
          </span>
        );
      })}
    </>
  );
}
export default function RichTextView({
  value,
  light = false,
  compact = false,
}: {
  value: RichText;
  light?: boolean;
  compact?: boolean;
}) {
  const nodes = value.filter((node) =>
    node.type === "paragraph" || node.type === "heading"
      ? node.content.some((part) => part.text.trim())
      : node.items.some((item) => item.some((part) => part.text.trim())),
  );
  return (
    <div className={compact ? "space-y-2" : "space-y-4"}>
      {nodes.map((node, index) => {
        if (node.type === "heading") {
          const Heading = node.level === 3 ? "h3" : "h4";
          return (
            <Heading
              key={index}
              className={`border-b pb-2 text-lg font-bold ${light ? "border-white/20 text-white" : "border-zinc-200/80 text-secondary"} sm:text-xl`}
            >
              <InlineView parts={node.content} />
            </Heading>
          );
        }
        if (node.type === "paragraph")
          return (
            <p
              key={index}
              className={
                nodes[index - 1]?.type === "heading" ? "!mt-2.5" : undefined
              }
            >
              <InlineView parts={node.content} />
            </p>
          );
        const List = node.type === "orderedList" ? "ol" : "ul";
        return (
          <List
            key={index}
            className={
              node.type === "orderedList"
                ? "list-decimal space-y-3 pl-6"
                : "space-y-3.5 pl-1"
            }
          >
            {node.items
              .filter((item) => item.some((part) => part.text.trim()))
              .map((item, i) => (
                <li
                  key={i}
                  className={
                    node.type === "bulletList"
                      ? "flex items-start gap-3"
                      : undefined
                  }
                >
                  {node.type === "bulletList" && (
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <InlineView parts={item} />
                  </span>
                </li>
              ))}
          </List>
        );
      })}
    </div>
  );
}
