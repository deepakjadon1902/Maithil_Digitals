import type { Project } from "../types/content";
import { requestJson } from "./api";

export const getProjects = () => requestJson<Project[]>("/projects", []);
export const getProjectBySlug = (slug: string) => requestJson<Project | undefined>(`/projects/${slug}`, undefined);
