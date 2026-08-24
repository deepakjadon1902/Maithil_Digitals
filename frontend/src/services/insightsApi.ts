import { insights } from "../data/fallback";
import type { Insight } from "../types/content";
import { requestJson } from "./api";

export const getInsights = () => requestJson<Insight[]>("/insights", insights);
export const getInsightBySlug = (slug: string) => requestJson<Insight | undefined>(`/insights/${slug}`, insights.find((item) => item.slug === slug));
