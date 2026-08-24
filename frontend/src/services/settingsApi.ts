import { settings } from "../data/fallback";
import type { SiteSettings } from "../types/content";
import { requestJson } from "./api";

export const getSettings = () => requestJson<SiteSettings>("/settings", settings);
