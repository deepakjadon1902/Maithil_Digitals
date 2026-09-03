import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { SiteSettings } from "../types/content";

const SESSION_KEY = "maithil-brand-intro-played";

function splitLetters(text: string) {
  return text.split("").map((letter, index) => (
    <span key={`${letter}-${index}`} style={{ "--hme-letter-index": index } as CSSProperties}>
      {letter === " " ? "\u00a0" : letter}
    </span>
  ));
}

export function BrandIntro({ settings }: { settings: SiteSettings }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="brand-intro" aria-hidden="true">
      <div className="brand-intro__mark">
        <span className="brand-intro__chip brand-intro__chip--one" />
        <span className="brand-intro__chip brand-intro__chip--two" />
        <div className="brand-intro__line brand-intro__line--top">{splitLetters("Maithil")}</div>
        <div className="brand-intro__line brand-intro__line--accent">{splitLetters("Digitals")}</div>
        <p>{settings.tagline}</p>
      </div>
    </div>
  );
}
