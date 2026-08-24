import { Plus } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "../types/content";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="py-5">
          <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="text-xl font-black text-ink">{faq.question}</span>
            <Plus className={`shrink-0 text-orange transition ${open === index ? "rotate-45" : ""}`} />
          </button>
          {open === index ? <p className="mt-4 max-w-3xl text-base leading-8 text-ink/65">{faq.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
