import type { Project } from "../types/content";
import { MediaFrame } from "./MediaFrame";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <a href={`/work/${project.slug}`} className={`premium-project-card group ${large ? "md:col-span-2" : ""}`}>
      <div className="premium-project-card__media">
        <MediaFrame media={project.image} title={project.title} eyebrow={project.category} className="aspect-[16/10]" imageClassName="premium-project-card__image" />
        <div className="premium-project-card__veil" />
        <div className="premium-project-card__badge">{project.category}</div>
      </div>
      <div className="premium-project-card__body">
        <div className="premium-project-card__meta">
          <span>{project.number}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <h2>{project.title}</h2>
        {project.summary ? <p>{project.summary}</p> : null}
        <span className="premium-project-card__link">{project.result || "View project"}</span>
      </div>
    </a>
  );
}
