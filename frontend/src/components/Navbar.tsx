import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { SiteSettings } from "../types/content";
import { Button } from "./Button";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Packages", href: "/packages" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let frame = 0;

    const parseRgb = (value: string) => {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match || match[4] === "0") return null;
      return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
    };

    const readBackground = (element: Element | null) => {
      let current = element;
      while (current && current !== document.documentElement) {
        const color = parseRgb(getComputedStyle(current).backgroundColor);
        if (color) return color;
        current = current.parentElement;
      }
      return parseRgb(getComputedStyle(document.body).backgroundColor) ?? [255, 255, 255];
    };

    const updateTheme = () => {
      frame = 0;
      const sampleX = Math.min(Math.max(window.innerWidth / 2, 24), window.innerWidth - 24);
      const sampleY = Math.min(92, window.innerHeight - 1);
      const [red, green, blue] = readBackground(document.elementFromPoint(sampleX, sampleY));
      const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
      setNavOnDark(luminance < 142);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTheme);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const lightNav = open || !navOnDark;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${lightNav ? "text-black" : "text-white"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" aria-label="Maithil Digitals home">
          <img className="h-12 w-12 rounded-premium object-cover" src={settings.logo.src} alt={settings.logo.alt} />
          <span className={`hidden font-display text-lg font-black lg:block ${lightNav ? "text-black" : "text-white"}`}>{settings.siteName}</span>
        </NavLink>
        <nav className={`nav-glass-capsule hidden items-center gap-1 lg:flex ${lightNav ? "nav-glass-capsule--light" : "nav-glass-capsule--dark"}`} aria-label="Primary navigation">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href} data-magnetic="6" className={({ isActive }) => `nav-magnetic nav-glass-link text-sm font-semibold transition ${isActive ? "is-active text-orange" : lightNav ? "text-black hover:text-orange" : "text-white hover:text-orange"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact">Get Started</Button>
        </div>
        <button className={`rounded-premium border p-3 lg:hidden ${lightNav ? "border-black/15 text-black" : "border-white/15 text-white"}`} onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-black/10 bg-white px-4 pb-6 pt-3 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {nav.map((item) => (
              <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)} className="rounded-premium px-3 py-4 text-lg font-bold text-navy hover:bg-soft">
                {item.label}
              </NavLink>
            ))}
            <Button className="mt-3 w-full" href="/contact">Get Started</Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
