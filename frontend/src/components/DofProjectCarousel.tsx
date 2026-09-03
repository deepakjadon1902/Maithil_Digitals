import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../types/content";
import { Image } from "./Image";

export function DofProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = useMemo(() => projects.slice(0, 6), [projects]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        const progress = Math.min(distance / (track.clientWidth * 0.55), 1);
        const scale = 1 - progress * 0.1;
        const blur = progress * 4;
        card.style.setProperty("--hme-dof-scale", scale.toFixed(3));
        card.style.setProperty("--hme-dof-blur", `${blur.toFixed(2)}px`);
        card.style.setProperty("--hme-dof-opacity", String(1 - progress * 0.28));

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });
      setActive(closest);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    track.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      track.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (!items.length) return null;

  return (
    <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div className="hme-reveal max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-orange">Project Focus</p>
            <h2 className="font-display text-4xl font-black leading-[0.98] md:text-6xl">Depth, detail and direction.</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button className="dof-carousel__button" onClick={() => scrollToIndex(Math.max(active - 1, 0))} aria-label="Previous project">
              <ChevronLeft size={20} />
            </button>
            <button className="dof-carousel__button" onClick={() => scrollToIndex(Math.min(active + 1, items.length - 1))} aria-label="Next project">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="dof-carousel" ref={trackRef}>
          {items.map((project) => (
            <a className="dof-carousel__card" href={`/work/${project.slug}`} key={project.slug}>
              <Image media={project.image} className="aspect-[4/5] w-full object-cover" width={820} />
              <span>{project.number}</span>
              <h3>{project.title}</h3>
            </a>
          ))}
        </div>
        <p className="dof-carousel__caption" aria-live="polite">
          <span>{items[active]?.category}</span>
          {items[active]?.summary}
        </p>
      </div>
    </section>
  );
}
