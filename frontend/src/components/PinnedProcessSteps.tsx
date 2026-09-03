import { useEffect, useRef, useState } from "react";
import type { Media } from "../types/content";
import { Image } from "./Image";

type Step = {
  title: string;
  text: string;
  image: Media;
};

export function PinnedProcessSteps({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !steps.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const stepNodes = Array.from(section.querySelectorAll<HTMLElement>(".pin-steps__item"));
      const viewportCenter = window.innerHeight * 0.52;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      stepNodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
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
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  if (!steps.length) return null;

  return (
    <section className="pin-steps" ref={sectionRef}>
      <div className="pin-steps__inner">
        <div className="pin-steps__media hme-reveal">
          {steps.map((step, index) => (
            <Image key={step.title} media={step.image} className={index === active ? "is-active" : ""} width={1000} />
          ))}
        </div>
        <div className="pin-steps__list">
          <div className="hme-reveal">
            <p>Process</p>
            <h2>How we turn attention into trust.</h2>
          </div>
          {steps.map((step, index) => (
            <article className={`pin-steps__item ${index === active ? "is-active" : ""}`} key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
