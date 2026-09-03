import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { useContent } from "../hooks/useContent";

export function ProjectDetail() {
  const { slug = "" } = useParams();
  const { projects } = useContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <section className="bg-white px-4 py-40 text-center text-navy"><h1 className="text-4xl font-black">Project not found</h1><Button className="mt-8" href="/work">Back to work</Button></section>;

  return (
    <>
      <SEO seo={project.seo} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <SectionHeading eyebrow={`${project.category} / ${project.year}`} title={project.title} description={project.summary} />
            <div className="rounded-premium border border-navy/10 bg-[#F5F8FC] p-5 text-sm text-navy/65 shadow-sm">
              <p>Client: <strong className="text-navy">{project.client}</strong></p>
              <p className="mt-2">Category: <strong className="text-navy">{project.category}</strong></p>
            </div>
          </div>
          <Image media={project.image} className="mt-12 max-h-[520px] w-full rounded-premium border border-navy/10 object-cover shadow-sm" loading="eager" />
        </div>
      </section>
      {project.videoUrl ? <ProjectVideo title={`${project.title} video`} url={project.videoUrl} /> : null}
      {project.challenge ? <ProjectText title="Challenge" text={project.challenge} /> : null}
      {project.strategy ? <ProjectText alternate title="Strategy" text={project.strategy} /> : null}
      {project.execution ? <ProjectText title="Execution" text={project.execution} /> : null}
      {project.deliverables.length ? (
        <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Deliverables" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {project.deliverables.map((item) => <div key={item} className="rounded-premium border border-navy/10 bg-white p-5 font-bold shadow-sm">{item}</div>)}
            </div>
          </div>
        </section>
      ) : null}
      {project.gallery.length ? (
        <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Gallery" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {project.gallery.map((media) => <Image key={media.src} media={media} className="aspect-[4/3] rounded-premium border border-navy/10 object-cover shadow-sm" />)}
            </div>
          </div>
        </section>
      ) : null}
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Related work" />
          <div className="mt-10"><ProjectGrid projects={projects.filter((item) => item.slug !== project.slug).slice(0, 2)} /></div>
        </div>
      </section>
    </>
  );
}

function ProjectVideo({ title, url }: { title: string; url: string }) {
  return (
    <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={title} />
        <div className="mt-10 overflow-hidden rounded-premium border border-navy/10 bg-white shadow-sm">
          <iframe className="aspect-video w-full" src={toEmbedUrl(url)} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      </div>
    </section>
  );
}

function toEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  return url;
}

function ProjectText({ title, text, alternate = false }: { title: string; text: string; alternate?: boolean }) {
  return <section className={`${alternate ? "bg-[#F5F8FC]" : "bg-white"} px-4 py-16 text-navy sm:px-6 lg:px-8`}><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.45fr_1fr]"><SectionHeading title={title} /><p className="text-xl leading-9 text-navy/70">{text}</p></div></section>;
}
