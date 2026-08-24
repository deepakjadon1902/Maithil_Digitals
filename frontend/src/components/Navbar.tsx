import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { SiteSettings } from "../types/content";
import { Button } from "./Button";

const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Packages", href: "/packages" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHeroRoute = location.pathname === "/";
  const lightNav = open || scrolled || !isDarkHeroRoute;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl transition ${lightNav ? "border-black/10 bg-white/94 shadow-sm" : "border-white/10 bg-ink/18"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" aria-label="Maithil Digitals home">
          <img className="h-12 w-12 rounded-premium object-cover" src={settings.logo.src} alt={settings.logo.alt} />
          <span className={`hidden font-display text-lg font-black sm:block ${lightNav ? "text-black" : "text-white"}`}>{settings.siteName}</span>
        </NavLink>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => `text-sm font-semibold transition ${isActive ? "text-orange" : lightNav ? "text-black hover:text-orange" : "text-white hover:text-orange"}`}>
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
