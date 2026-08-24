import { services } from "../data/fallback";
import type { Service } from "../types/content";
import { requestJson } from "./api";

export const getServices = () => requestJson<Service[]>("/services", services);
export const getServiceBySlug = (slug: string) => requestJson<Service | undefined>(`/services/${slug}`, services.find((item) => item.slug === slug));
