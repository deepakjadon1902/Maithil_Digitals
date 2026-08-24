import { Link } from "react-router-dom";
import type { SiteSettings } from "../types/content";

const links = ["Home", "About", "Services", "Work", "Videos", "Insights", "Contact"];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img className="h-14 w-14 rounded-premium object-cover" src={settings.logo.src} alt={settings.logo.alt} />
            <span className="font-display text-2xl font-black">{settings.siteName}</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">{settings.footerDescription}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Navigation</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted">
            {links.map((label) => (
              <Link key={label} className="hover:text-white" to={label === "Home" ? "/" : `/${label.toLowerCase()}`}>
                {label}
              </Link>
            ))}
            <Link className="hover:text-white" to="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-white" to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Contact</h2>
          <address className="mt-5 space-y-3 text-sm not-italic text-muted">
            <p>{settings.address}</p>
            {settings.phone.map((phone) => <p key={phone}><a href={`tel:${phone}`} className="hover:text-white">{phone}</a></p>)}
            <p><a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></p>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            {settings.socials.map((social) => (
              <a key={social.label} href={social.url} className="rounded-premium border border-white/10 px-3 py-2 text-xs font-bold text-white hover:border-orange hover:text-orange">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-muted">© {new Date().getFullYear()} Maithil Digitals. All rights reserved.</div>
    </footer>
  );
}
