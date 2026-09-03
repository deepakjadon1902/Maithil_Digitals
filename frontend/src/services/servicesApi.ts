import type { Service } from "../types/content";
import { requestJson } from "./api";

export const getServices = () => requestJson<Service[]>("/services", []);
export const getServiceBySlug = (slug: string) => requestJson<Service | undefined>(`/services/${slug}`, undefined);
