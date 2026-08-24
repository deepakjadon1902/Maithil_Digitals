(function () {
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduceMotion) return;

  function attachTilt(card) {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const percentX = (x / rect.width - 0.5) * 2;
      const percentY = (y / rect.height - 0.5) * 2;
      const rotateY = percentX * 9;
      const rotateX = percentY * -9;

      card.classList.add("is-tilting");
      card.style.transition = "transform 80ms ease-out, box-shadow 240ms ease-out";
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-tilting");
      card.style.transition = "transform 360ms ease-out, box-shadow 360ms ease-out";
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
      window.setTimeout(() => {
        if (!card.classList.contains("is-tilting")) {
          card.style.transform = "";
          card.style.transition = "";
        }
      }, 380);
    });
  }

  function init() {
    document.querySelectorAll(".tilt-card").forEach(attachTilt);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
