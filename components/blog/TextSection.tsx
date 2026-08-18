import type { TextSectionData } from "@/lib/blog";

interface Props {
  section: TextSectionData;
}

export default function TextSection({ section }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="border-b border-zinc-200/80 pb-2 text-2xl font-black tracking-tight text-secondary sm:text-3xl">
        {section.heading}
      </h2>

      <div className="space-y-4">
        {section.body.map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
