import type { Testimonial } from "../types/content";
import { Image } from "./Image";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="tilt-card rounded-premium border border-ink/10 bg-white p-6">
      <p className="text-lg leading-8 text-ink">"{testimonial.testimonial}"</p>
      <div className="mt-6 flex items-center gap-4">
        <Image media={testimonial.photo} className="md-breathe h-12 w-12 rounded-full object-cover" width={180} />
        <div>
          <h3 className="font-black text-ink">{testimonial.name}</h3>
          <p className="text-sm text-ink/60">{testimonial.designation}, {testimonial.company}</p>
        </div>
      </div>
    </article>
  );
}
