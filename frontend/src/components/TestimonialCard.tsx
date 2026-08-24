import type { Testimonial } from "../types/content";
import { Image } from "./Image";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="tilt-card flex h-full min-h-[280px] flex-col rounded-premium border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-ink/10">
      <p className="line-clamp-5 text-lg leading-8 text-ink">"{testimonial.testimonial}"</p>
      <div className="mt-auto flex items-center gap-4 pt-6">
        <Image media={testimonial.photo} className="md-breathe size-12 shrink-0 rounded-full object-cover" width={180} />
        <div className="min-w-0">
          <h3 className="truncate font-black text-ink">{testimonial.name}</h3>
          <p className="truncate text-sm text-ink/60">{testimonial.designation}, {testimonial.company}</p>
        </div>
      </div>
    </article>
  );
}
