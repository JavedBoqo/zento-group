import type { SignsSectionData } from "@/lib/blog";

interface Props {
  section: SignsSectionData;
}

export default function SignsSection({ section }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black tracking-tight text-secondary sm:text-3xl">
        {section.heading}
      </h2>

      <div className="space-y-7">
        {section.items.map((item) => (
          <div key={item.number} className="group">
            <h3 className="border-b border-zinc-200/80 pb-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary sm:text-xl">
              {item.number}. {item.title}
            </h3>
            <p className="mt-2.5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
