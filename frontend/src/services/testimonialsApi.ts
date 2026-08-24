import { testimonials } from "../data/fallback";
import type { Testimonial } from "../types/content";
import { requestJson } from "./api";

export const getTestimonials = () => requestJson<Testimonial[]>("/testimonials", testimonials);
