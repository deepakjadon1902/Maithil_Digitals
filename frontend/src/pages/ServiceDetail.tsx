import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { FAQAccordion } from "../components/FAQAccordion";
import { Image } from "../components/Image";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ProjectGrid } from "../components/ProjectGrid";
import { projects, services } from "../data/fallback";
import { faqSchema, serviceSchema } from "../lib/schema";

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundMini label="Service not found" />;

  return (
    <>
      <SEO seo={service.seo} schema={[serviceSchema(service), faqSchema(service.faq)]} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <SectionHeading eyebrow={service.number} title={service.title} description={service.overview} />
            <Image media={service.image} className="max-h-[520px] w-full rounded-premium object-cover" loading="eager" />
          </div>
        </div>
      </section>
      <DetailBlocks title="Problems we solve" items={service.problems} />
      <DetailBlocks dark title="Our approach" items={service.approach} />
      <DetailBlocks title="Capabilities" items={service.capabilities} />
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Relevant work" /><div className="mt-10"><ProjectGrid projects={projects.slice(0, 2)} /></div></div></section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><SectionHeading title="Service FAQ" /><div className="mt-10"><FAQAccordion faqs={service.faq} /></div></div></section>
      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><SectionHeading title="Ready to plan this service?" description="Share your business goals and we will help shape the right path." /><Button href="/contact">Start a Conversation</Button></div></section>
    </>
  );
}

function DetailBlocks({ title, items, dark = false }: { title: string; items: string[]; dark?: boolean }) {
  return <section className={`${dark ? "bg-deep text-white" : "bg-soft text-ink"} px-4 py-20 sm:px-6 lg:px-8`}><div className="mx-auto max-w-7xl"><SectionHeading title={title} /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <article key={item} className={`rounded-premium border p-5 ${dark ? "border-white/10 bg-white/[0.04]" : "border-ink/10 bg-white"}`}><span className="text-sm font-black text-orange">0{index + 1}</span><p className="mt-3 font-bold">{item}</p></article>)}</div></div></section>;
}

function NotFoundMini({ label }: { label: string }) {
  return <section className="bg-ink px-4 py-40 text-center text-white"><h1 className="text-4xl font-black">{label}</h1><Button className="mt-8" href="/">Go home</Button></section>;
}
