import type { Project } from "../types/content";
import { MediaFrame } from "./MediaFrame";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <a href={`/work/${project.slug}`} className={`tilt-card group flex h-full min-h-[330px] flex-col overflow-hidden rounded-premium border border-ink/10 bg-white transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-ink/10 ${large ? "md:col-span-2" : ""}`}>
      <MediaFrame media={project.image} title={project.title} eyebrow={project.category} className="aspect-[16/9]" imageClassName="transition duration-500 group-hover:scale-[1.04]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-orange">
          <span>{project.number}</span>
          <span>{project.year}</span>
        </div>
        <h2 className="mt-3 font-display text-xl font-black leading-tight text-ink">{project.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/65">{project.summary}</p>
        {project.result ? <p className="mt-auto pt-3 text-sm font-bold text-ink">{project.result}</p> : <span className="mt-auto pt-3 text-sm font-black text-orange">View project</span>}
      </div>
    </a>
  );
}
