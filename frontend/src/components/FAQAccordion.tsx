import { Plus } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "../types/content";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="overflow-hidden rounded-premium border border-ink/10 bg-white">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="border-b border-ink/10 last:border-b-0">
          <button className="flex min-h-20 w-full items-center justify-between gap-4 px-5 text-left transition hover:bg-soft" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="text-lg font-black leading-tight text-ink md:text-xl">{faq.question}</span>
            <Plus className={`shrink-0 text-orange transition ${open === index ? "rotate-45" : ""}`} />
          </button>
          {open === index ? <p className="max-w-3xl px-5 pb-6 text-base leading-8 text-ink/65">{faq.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
