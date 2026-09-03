import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { FAQAccordion } from "../components/FAQAccordion";
import { Image } from "../components/Image";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ProjectGrid } from "../components/ProjectGrid";
import { faqSchema, serviceSchema } from "../lib/schema";
import { useContent } from "../hooks/useContent";

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const { projects, services } = useContent();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundMini label="Service not found" />;

  return (
    <>
      <SEO seo={service.seo} schema={[serviceSchema(service), faqSchema(service.faq)]} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <SectionHeading eyebrow={service.number} title={service.title} description={service.overview} />
            <Image media={service.image} className="max-h-[440px] w-full rounded-premium border border-navy/10 object-cover shadow-sm" loading="eager" />
          </div>
        </div>
      </section>
      {service.videoUrl ? <VideoSection title={`${service.title} video`} url={service.videoUrl} /> : null}
      {service.problems.length ? <DetailBlocks title="Problems we solve" items={service.problems} /> : null}
      {service.approach.length ? <DetailBlocks title="Our approach" items={service.approach} alternate /> : null}
      {service.capabilities.length ? <DetailBlocks title="Capabilities" items={service.capabilities} /> : null}
      {projects.length ? <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Relevant work" /><div className="mt-10"><ProjectGrid projects={projects.slice(0, 2)} /></div></div></section> : null}
      {service.faq.length ? <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><SectionHeading title="Service FAQ" /><div className="mt-10"><FAQAccordion faqs={service.faq} /></div></div></section> : null}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><SectionHeading title="Ready to plan this service?" description="Share your business goals and we will help shape the right path." /><Button href="/contact">Start a Conversation</Button></div></section>
    </>
  );
}

function VideoSection({ title, url }: { title: string; url: string }) {
  return <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><SectionHeading title={title} /><div className="mt-10 overflow-hidden rounded-premium border border-navy/10 bg-white shadow-sm"><iframe className="aspect-video w-full" src={toEmbedUrl(url)} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div></section>;
}

function toEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  return url;
}

function DetailBlocks({ title, items, alternate = false }: { title: string; items: string[]; alternate?: boolean }) {
  return <section className={`${alternate ? "bg-[#F5F8FC]" : "bg-white"} px-4 py-16 text-navy sm:px-6 lg:px-8`}><div className="mx-auto max-w-7xl"><SectionHeading title={title} /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <article key={item} className="rounded-premium border border-navy/10 bg-white p-5 shadow-sm"><span className="text-sm font-black text-orange">0{index + 1}</span><p className="mt-3 font-bold text-navy">{item}</p></article>)}</div></div></section>;
}

function NotFoundMini({ label }: { label: string }) {
  return <section className="bg-white px-4 py-40 text-center text-navy"><h1 className="text-4xl font-black">{label}</h1><Button className="mt-8" href="/">Go home</Button></section>;
}
