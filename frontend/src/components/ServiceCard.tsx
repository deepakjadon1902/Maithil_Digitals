import type { Service } from "../types/content";
import { Button } from "./Button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="tilt-card rounded-premium border border-ink/10 bg-white p-6 transition hover:border-orange">
      <span className="text-sm font-black text-orange">{service.number}</span>
      <h2 className="mt-4 text-2xl font-black text-ink">{service.title}</h2>
      <p className="mt-3 min-h-20 text-sm leading-7 text-ink/65">{service.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.tags.map((tag) => <span key={tag} className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-ink/70">{tag}</span>)}
      </div>
      <Button className="mt-6" href={`/services/${service.slug}`}>Explore service</Button>
    </article>
  );
}
