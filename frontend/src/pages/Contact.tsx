import { ContactForm } from "../components/ContactForm";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { settings } from "../data/fallback";

export function Contact() {
  return (
    <>
      <SEO seo={{ title: "Contact Maithil Digitals", description: "Start a project with Maithil Digitals in Kosi Kalan, Mathura." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Contact" title="Have a project in mind?" description="Tell us what you're building, growing or trying to solve." />
            <address className="mt-10 space-y-4 not-italic text-muted">
              <p>{settings.address}</p>
              {settings.phone.map((phone) => <p key={phone}><a className="hover:text-white" href={`tel:${phone}`}>{phone}</a></p>)}
              <p><a className="hover:text-white" href={`mailto:${settings.email}`}>{settings.email}</a></p>
            </address>
          </div>
          <div className="rounded-premium border border-white/10 bg-white/[0.04] p-5 md:p-8"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
