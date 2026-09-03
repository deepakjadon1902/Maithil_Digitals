import type { Project } from "../types/content";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "./State";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return <EmptyState label="No work has been uploaded from the admin panel yet." />;
  }

  return (
    <div className="hme-stagger stagger-masonry grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} large={index % 7 === 0 && projects.length > 4} />)}
    </div>
  );
}
