import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ServiceCard } from "../components/ServiceCard";
import { pageSeo, useContent } from "../hooks/useContent";

export function Services() {
  const { services } = useContent();
  return (
    <>
      <SEO seo={pageSeo("services", { title: "Services | Maithil Digitals", description: "Social media management, reels, photography, creative design, branding and digital advertising by Maithil Digitals." })} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <SectionHeading eyebrow="What We Do" title="Everything you need to build a stronger digital presence." description="Digital marketing, content creation, photography, reels, branding and advertising brought together in one practical workflow." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {services.slice(0, 6).map((service) => (
              <div key={service.slug} className="overflow-hidden rounded-premium border border-navy/10 bg-[#F5F8FC] shadow-sm">
                <img className="aspect-square h-full w-full object-cover transition duration-500 hover:scale-[1.05]" src={service.image.src} alt={service.image.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </section>
      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-premium border border-navy/10 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">Complete Digital Presence</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Need more than one service?</h2>
            <p className="mt-2 max-w-2xl leading-7 text-navy/65">We can combine strategy, shoots, reels, designs, posting and ads into a package built around your business.</p>
          </div>
          <Button href="/contact">Get Started</Button>
        </div>
      </section>
    </>
  );
}
