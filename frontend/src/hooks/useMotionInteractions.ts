import { useEffect } from "react";

export function useMotionInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const root = document.documentElement;
    const cursor = document.createElement("div");
    cursor.className = "motion-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    let frame = 0;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let activeMagnetic: HTMLElement | null = null;

    const resetMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.setProperty("--magnetic-x", "0px");
      activeMagnetic.style.setProperty("--magnetic-y", "0px");
      activeMagnetic = null;
    };

    const update = () => {
      frame = 0;
      root.style.setProperty("--pointer-x", (((cursorX / window.innerWidth) - 0.5) * 2).toFixed(4));
      root.style.setProperty("--pointer-y", (((cursorY / window.innerHeight) - 0.5) * 2).toFixed(4));
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);

      const interactive = (event.target as Element | null)?.closest<HTMLElement>("a, button, [data-cursor-label]");
      cursor.classList.toggle("is-active", Boolean(interactive));
      cursor.dataset.label = interactive?.dataset.cursorLabel ?? "";

      const magnetic = (event.target as Element | null)?.closest<HTMLElement>("[data-magnetic]");
      if (!magnetic) {
        resetMagnetic();
        return;
      }

      if (activeMagnetic && activeMagnetic !== magnetic) resetMagnetic();
      activeMagnetic = magnetic;
      const rect = magnetic.getBoundingClientRect();
      const strength = Number(magnetic.dataset.magnetic || 8);
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
      magnetic.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      magnetic.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    };

    const onPointerLeave = () => {
      cursor.classList.remove("is-active");
      resetMagnetic();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      resetMagnetic();
      if (frame) window.cancelAnimationFrame(frame);
      cursor.remove();
    };
  }, []);
}
