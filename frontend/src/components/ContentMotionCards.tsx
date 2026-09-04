import { useEffect, useRef, useState, type CSSProperties } from "react";

type ContentCard = {
  src: string;
  alt: string;
  label: string;
};

const cardMotion = [
  { delay: "0ms", startY: "5.6rem", gatherX: "6.8rem", gatherY: "-2.5rem", finalX: "0rem", finalY: "0rem", rotate: "-8deg", midRotate: "3deg" },
  { delay: "80ms", startY: "2.8rem", gatherX: "-0.2rem", gatherY: "-1.6rem", finalX: "0rem", finalY: "0rem", rotate: "6deg", midRotate: "-2deg" },
  { delay: "160ms", startY: "0rem", gatherX: "4rem", gatherY: "1.4rem", finalX: "0rem", finalY: "0rem", rotate: "-5deg", midRotate: "2deg" },
  { delay: "240ms", startY: "-2.5rem", gatherX: "-2.8rem", gatherY: "2.1rem", finalX: "0rem", finalY: "0rem", rotate: "7deg", midRotate: "-3deg" },
  { delay: "320ms", startY: "-5.2rem", gatherX: "1.2rem", gatherY: "4.4rem", finalX: "0rem", finalY: "0rem", rotate: "-4deg", midRotate: "1.6deg" }
];

export function ContentMotionCards({ items }: { items: ContentCard[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setEntered(true);
      setSettled(true);
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.32, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered || settled) return;
    const timeout = window.setTimeout(() => setSettled(true), 3400);
    return () => window.clearTimeout(timeout);
  }, [entered, settled]);

  return (
    <div ref={stageRef} className={`content-motion-grid relative ${entered ? "is-animating" : ""} ${settled ? "is-settled" : ""}`}>
      <div className="content-motion-grid__ring content-motion-grid__ring--one" />
      <div className="content-motion-grid__ring content-motion-grid__ring--two" />
      {items.map((media, index) => {
        const motion = cardMotion[index % cardMotion.length];
        return (
          <div
            key={media.src}
            style={{
              "--card-delay": motion.delay,
              "--card-start-y": motion.startY,
              "--card-gather-x": motion.gatherX,
              "--card-gather-y": motion.gatherY,
              "--card-final-x": motion.finalX,
              "--card-final-y": motion.finalY,
              "--card-rotate": motion.rotate,
              "--card-mid-rotate": motion.midRotate
            } as CSSProperties}
            className={`content-motion-card tilt-card group relative overflow-hidden rounded-premium border border-navy/10 bg-[#F5F8FC] shadow-sm transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-navy/10 ${index === items.length - 1 ? "content-motion-card--center" : ""}`}
          >
            <img className="aspect-[4/3] h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]" src={media.src} alt={media.alt} loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/58 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 rounded-premium border border-white/15 bg-white/92 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-navy shadow-sm backdrop-blur">
              {media.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
