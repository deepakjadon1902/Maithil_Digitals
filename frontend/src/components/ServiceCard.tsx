import type { Service } from "../types/content";
import { Button } from "./Button";

export function ServiceCard({ service }: { service: Service }) {
  const items = service.includes?.slice(0, 4) ?? service.tags.slice(0, 4);

  return (
    <article className="tilt-card flex h-full min-h-[320px] flex-col rounded-premium border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-navy/10 md:p-6">
      <span className="text-sm font-black text-orange">{service.number}</span>
      <h2 className="mt-4 text-2xl font-black leading-tight text-navy">{service.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-navy/65">{service.description}</p>
      <ul className="mt-5 grid gap-2 text-sm font-semibold text-navy/70">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />{item}</li>)}
      </ul>
      <Button className="mt-auto w-full sm:w-fit" href={`/services/${service.slug}`}>{service.cta ?? "Explore service"}</Button>
    </article>
  );
}
