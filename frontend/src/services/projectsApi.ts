import { projects } from "../data/fallback";
import type { Project } from "../types/content";
import { requestJson } from "./api";

export const getProjects = () => requestJson<Project[]>("/projects", projects);
export const getProjectBySlug = (slug: string) => requestJson<Project | undefined>(`/projects/${slug}`, projects.find((item) => item.slug === slug));
