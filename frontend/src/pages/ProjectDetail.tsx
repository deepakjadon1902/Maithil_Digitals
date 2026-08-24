import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { projects } from "../data/fallback";

export function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <section className="bg-ink px-4 py-40 text-center text-white"><h1 className="text-4xl font-black">Project not found</h1><Button className="mt-8" href="/work">Back to work</Button></section>;
  return (
    <>
      <SEO seo={project.seo} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <SectionHeading eyebrow={`${project.category} • ${project.year}`} title={project.title} description={project.summary} />
            <div className="rounded-premium border border-white/10 p-5 text-sm text-muted"><p>Client: <strong className="text-white">{project.client}</strong></p><p className="mt-2">Category: <strong className="text-white">{project.category}</strong></p></div>
          </div>
          <Image media={project.image} className="mt-12 max-h-[640px] w-full rounded-premium object-cover" loading="eager" />
        </div>
      </section>
      <ProjectText title="Challenge" text={project.challenge} />
      <ProjectText dark title="Strategy" text={project.strategy} />
      <ProjectText title="Execution" text={project.execution} />
      <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Deliverables" /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{project.deliverables.map((item) => <div key={item} className="rounded-premium border border-white/10 bg-white/[0.04] p-5 font-bold">{item}</div>)}</div></div></section>
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Gallery" /><div className="mt-10 grid gap-6 md:grid-cols-2">{project.gallery.map((media) => <Image key={media.src} media={media} className="aspect-[4/3] rounded-premium object-cover" />)}</div></div></section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Related work" /><div className="mt-10"><ProjectGrid projects={projects.filter((item) => item.slug !== project.slug).slice(0, 2)} /></div></div></section>
    </>
  );
}

function ProjectText({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return <section className={`${dark ? "bg-deep text-white" : "bg-soft text-ink"} px-4 py-20 sm:px-6 lg:px-8`}><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.45fr_1fr]"><SectionHeading title={title} /><p className="text-xl leading-9 text-current/70">{text}</p></div></section>;
}
