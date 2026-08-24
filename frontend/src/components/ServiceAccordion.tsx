import { useState } from "react";
import type { Service } from "../types/content";
import { Button } from "./Button";
import { MediaFrame } from "./MediaFrame";

export function ServiceAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(services[0]?.slug ?? "");
  const activeService = services.find((service) => service.slug === active) ?? services[0];
  if (!activeService) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1fr] lg:items-stretch">
      <div className="overflow-hidden rounded-premium border border-white/10">
        {services.map((service) => (
          <button key={service.slug} className="w-full border-b border-white/10 px-5 py-4 text-left transition last:border-b-0 hover:bg-white/[0.04]" onClick={() => setActive(service.slug)}>
            <div className="flex gap-5">
              <span className="text-sm font-black text-orange">{service.number}</span>
              <div>
                <h3 className={`text-xl font-black leading-tight transition md:text-2xl ${active === service.slug ? "text-white" : "text-white/58"}`}>{service.title}</h3>
                {active === service.slug ? <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{service.description}</p> : null}
              </div>
            </div>
          </button>
        ))}
      </div>
      <article className="flex h-full min-h-[390px] flex-col overflow-hidden rounded-premium border border-white/10 bg-white/[0.04]">
        <MediaFrame media={activeService.image} title={activeService.title} eyebrow="Service" className="aspect-[16/7] w-full" imageClassName="transition duration-500 hover:scale-[1.03]" />
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-5 flex min-h-8 flex-wrap gap-2">
            {activeService.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-muted">{tag}</span>)}
          </div>
          <h3 className="font-display text-2xl font-black leading-tight text-white">{activeService.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{activeService.overview}</p>
          <Button className="mt-auto w-full pt-0 sm:w-fit" href={`/services/${activeService.slug}`}>Explore service</Button>
        </div>
      </article>
    </div>
  );
}
