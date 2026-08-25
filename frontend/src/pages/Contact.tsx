import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { pageSeo, useContent } from "../hooks/useContent";

export function Contact() {
  const { seo, settings } = useContent();
  const whatsapp = settings.whatsapp ?? settings.phone[0];
  const instagram = settings.socials.find((social) => social.label.toLowerCase().includes("instagram"))?.url ?? "#";
  const contactLinks = [
    ["Call Us", `tel:${settings.phone[0]}`, Phone],
    ["WhatsApp Us", `https://wa.me/91${whatsapp}`, MessageCircle],
    ["Instagram", instagram, Instagram],
    ["Email Us", `mailto:${settings.email}`, Mail]
  ] as const;

  return (
    <>
      <SEO seo={seo.contact ?? pageSeo("contact", { title: "Contact Maithil Digitals", description: "Send an enquiry to Maithil Digitals for social media, reels, photography, branding and digital marketing." })} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Contact" title="Let's talk about your business." description="Tell us a little about your business and what you're looking to achieve. We'll get back to you to discuss the right solution." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {contactLinks.map(([label, href, Icon]) => (
                <a key={label} className="flex min-h-20 items-center gap-3 rounded-premium border border-navy/10 bg-[#F5F8FC] p-4 font-black text-navy transition hover:-translate-y-1 hover:border-orange hover:text-orange" href={href}>
                  <Icon size={20} />
                  {label}
                </a>
              ))}
            </div>
            <address className="mt-8 space-y-3 not-italic leading-7 text-navy/65">
              <p>{settings.address}</p>
              <p>{settings.phone.join(" / ")}</p>
              <p>{settings.email}</p>
            </address>
          </div>
          <div className="rounded-premium border border-navy/10 bg-[#F5F8FC] p-5 shadow-sm md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
