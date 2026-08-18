import { CheckCircle2 } from "lucide-react";
import type { TextWithListSectionData } from "@/lib/blog";

interface Props {
  section: TextWithListSectionData;
}

export default function TextWithListSection({ section }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="border-b border-zinc-200/80 pb-2 text-2xl font-black tracking-tight text-secondary sm:text-3xl">
        {section.heading}
      </h2>

      <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
        {section.intro}
      </p>

      <ul className="space-y-3.5 pl-1">
        {section.list.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-base leading-relaxed text-zinc-700 sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {section.outro && (
        <div className="mt-6 rounded-xl border-l-4 border-primary bg-zinc-50 p-5">
          <p className="text-base leading-relaxed text-zinc-700 italic">
            {section.outro}
          </p>
        </div>
      )}
    </div>
  );
}
