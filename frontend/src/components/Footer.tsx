import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { SiteSettings } from "../types/content";

const quickLinks = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Our Work", "/work"],
  ["Packages", "/packages"],
  ["About Us", "/about"],
  ["Contact", "/contact"]
];

const services = ["Social Media Management", "Reels & Video", "Photography", "Photoshoots", "Creative Design", "Branding", "Digital Advertising"];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-navy/10 bg-white text-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img className="h-14 w-14 rounded-premium object-cover" src={settings.logo.src} alt={settings.logo.alt} />
            <div>
              <span className="block font-display text-2xl font-black">{settings.siteName}</span>
              <span className="text-sm font-bold text-orange">{settings.tagline ?? "Your Digital Identity"}</span>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-navy/65">{settings.footerDescription}</p>
        </div>
        <FooterColumn title="Quick Links">
          {quickLinks.map(([label, href]) => <Link key={href} className="hover:text-orange" to={href}>{label}</Link>)}
        </FooterColumn>
        <FooterColumn title="Services">
          {services.map((service) => <Link key={service} className="hover:text-orange" to="/services">{service}</Link>)}
        </FooterColumn>
        <FooterColumn title="Connect">
          {settings.socials.map((social) => <a key={social.label} className="hover:text-orange" href={social.url}>{social.label}</a>)}
          <a className="hover:text-orange" href={`tel:${settings.phone[0]}`}>Call Us</a>
        </FooterColumn>
      </div>
      <div className="border-t border-navy/10 px-4 py-5 text-center text-xs font-semibold text-navy/55">© 2026 Maithil Digitals. All Rights Reserved.</div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-orange">{title}</h2>
      <div className="mt-5 grid gap-3 text-sm font-semibold text-navy/65">{children}</div>
    </div>
  );
}
