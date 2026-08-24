import { useState } from "react";
import type { Service } from "../types/content";
import { Button } from "./Button";
import { Image } from "./Image";

export function ServiceAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(services[0]?.slug ?? "");
  const activeService = services.find((service) => service.slug === active) ?? services[0];
  if (!activeService) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div className="divide-y divide-white/10 border-y border-white/10">
        {services.map((service) => (
          <button key={service.slug} className="w-full py-6 text-left" onClick={() => setActive(service.slug)}>
            <div className="flex gap-5">
              <span className="text-sm font-black text-orange">{service.number}</span>
              <div>
                <h3 className={`text-2xl font-black transition ${active === service.slug ? "text-white" : "text-white/58"}`}>{service.title}</h3>
                {active === service.slug ? <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{service.description}</p> : null}
              </div>
            </div>
          </button>
        ))}
      </div>
      <article className="overflow-hidden rounded-premium border border-white/10 bg-white/[0.04]">
        <Image media={activeService.image} className="h-72 w-full object-cover transition duration-500 hover:scale-[1.03]" />
        <div className="p-6 md:p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            {activeService.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-muted">{tag}</span>)}
          </div>
          <h3 className="font-display text-3xl font-black text-white">{activeService.title}</h3>
          <p className="mt-4 text-muted">{activeService.overview}</p>
          <Button className="mt-6" href={`/services/${activeService.slug}`}>Explore service</Button>
        </div>
      </article>
    </div>
  );
}
