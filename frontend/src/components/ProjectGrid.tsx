import type { Project } from "../types/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} large={index === 0} />)}
    </div>
  );
}
