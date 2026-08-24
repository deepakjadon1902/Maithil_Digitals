import type { Project } from "../types/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
    </div>
  );
}
