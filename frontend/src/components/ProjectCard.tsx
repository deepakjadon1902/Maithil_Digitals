import type { Project } from "../types/content";
import { Image } from "./Image";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <a href={`/work/${project.slug}`} className={`tilt-card group block overflow-hidden rounded-premium border border-ink/10 bg-white ${large ? "md:col-span-2" : ""}`}>
      <div className={large ? "aspect-[16/8]" : "aspect-[4/3]"}>
        <Image media={project.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-orange">
          <span>{project.number}</span>
          <span>{project.year}</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-black text-ink">{project.title}</h2>
        <p className="mt-3 text-sm leading-7 text-ink/65">{project.summary}</p>
        {project.result ? <p className="mt-4 text-sm font-bold text-ink">{project.result}</p> : null}
      </div>
    </a>
  );
}
