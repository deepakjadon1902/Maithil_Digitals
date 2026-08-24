import { ServiceCard } from "../components/ServiceCard";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { services } from "../data/fallback";

export function Services() {
  return (
    <>
      <SEO seo={{ title: "Services | Maithil Digitals", description: "Explore digital marketing, SEO, social media, advertising, branding, web design and video production services." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Digital services shaped around growth." description="Each service can be managed from the backend and expanded into a detail page." />
        </div>
      </section>
      <section className="bg-soft px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </section>
    </>
  );
}
