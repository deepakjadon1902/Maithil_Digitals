import { faqs } from "../data/fallback";
import type { FAQ } from "../types/content";
import { requestJson } from "./api";

export const getFaqs = () => requestJson<FAQ[]>("/faqs", faqs);
