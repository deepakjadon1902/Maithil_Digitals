import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".hme-reveal, .hme-stagger > *"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("hme-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hme-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    nodes.forEach((node, index) => {
      if (!node.style.getPropertyValue("--hme-stagger-index")) {
        node.style.setProperty("--hme-stagger-index", String(index % 8));
      }
      observer.observe(node);
    });

    return () => observer.disconnect();
  });
}
