import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/blog";

interface Props {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: Props) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-zinc-200 bg-white open:bg-white open:border-primary/30 open:shadow-lg open:shadow-primary/5 transition-all duration-200"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
            <h3 className="text-base font-bold text-secondary group-open:text-primary transition-colors">
              {faq.question}
            </h3>
            <ChevronDown className="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
          </summary>
          <div className="px-6 pb-6">
            <p className="text-sm leading-relaxed text-zinc-600">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}



