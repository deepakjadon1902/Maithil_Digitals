(function () {
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouch) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.className = "md-cursor-dot";
  ring.className = "md-cursor-ring";
  document.body.append(dot, ring);
  root.classList.add("md-custom-cursor");

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const trail = { x: mouse.x, y: mouse.y };
  let frame = 0;

  const clickableSelector = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "summary",
    "[role='button']",
    "[role='link']",
    ".clickable",
    "[data-clickable]"
  ].join(",");

  function moveElement(element, x, y) {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
  }

  function render() {
    if (reduceMotion) {
      trail.x = mouse.x;
      trail.y = mouse.y;
    } else {
      trail.x += (mouse.x - trail.x) * 0.15;
      trail.y += (mouse.y - trail.y) * 0.15;
    }

    moveElement(dot, mouse.x, mouse.y);
    moveElement(ring, trail.x, trail.y);
    frame = window.requestAnimationFrame(render);
  }

  document.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    root.classList.add("md-cursor-visible");
  }, { passive: true });

  document.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(clickableSelector)) {
      root.classList.add("md-cursor-hovering");
    }
  }, true);

  document.addEventListener("mouseout", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(clickableSelector)) {
      root.classList.remove("md-cursor-hovering");
    }
  }, true);

  document.addEventListener("mouseleave", () => {
    root.classList.remove("md-cursor-visible", "md-cursor-hovering");
  });

  document.addEventListener("mouseenter", () => {
    root.classList.add("md-cursor-visible");
  });

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(frame);
  });

  render();
})();
