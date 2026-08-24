import { z } from "zod";
import { mediaSchema, seoSchema, slugSchema } from "./common.js";

const faqItem = z.object({ question: z.string().min(2), answer: z.string().min(2) });
const processItem = z.object({ title: z.string().min(1), description: z.string().optional().default("") });

export const serviceSchema = z.object({
  title: z.string().min(2).max(140),
  slug: slugSchema.optional(),
  shortDescription: z.string().min(2).max(280),
  description: z.string().optional().default(""),
  category: z.string().optional().default("Digital Marketing"),
  icon: z.string().optional().default(""),
  featuredImage: mediaSchema.optional(),
  gallery: z.array(mediaSchema).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  process: z.array(processItem).optional().default([]),
  faq: z.array(faqItem).optional().default([]),
  seo: seoSchema.optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional()
});

export const projectSchema = z.object({
  title: z.string().min(2).max(160),
  slug: slugSchema.optional(),
  client: z.string().optional().default(""),
  category: z.string().optional().default(""),
  year: z.string().optional().default(""),
  shortDescription: z.string().optional().default(""),
  overview: z.string().optional().default(""),
  challenge: z.string().optional().default(""),
  strategy: z.string().optional().default(""),
  execution: z.string().optional().default(""),
  deliverables: z.array(z.string()).optional().default([]),
  results: z.array(z.object({ label: z.string(), value: z.string() })).optional().default([]),
  heroImage: mediaSchema.optional(),
  gallery: z.array(mediaSchema).optional().default([]),
  videoUrl: z.string().url().optional().or(z.literal("")).default(""),
  relatedServices: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  sortOrder: z.number().optional(),
  seo: seoSchema.optional()
});

export const videoSchema = z.object({
  title: z.string().min(2).max(160),
  slug: slugSchema.optional(),
  description: z.string().optional().default(""),
  category: z.string().optional().default(""),
  thumbnail: mediaSchema.optional(),
  videoUrl: z.string().url(),
  duration: z.string().optional().default(""),
  featured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  publishDate: z.coerce.date().optional(),
  seo: seoSchema.optional()
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2),
  designation: z.string().optional().default(""),
  company: z.string().optional().default(""),
  photo: mediaSchema.optional(),
  testimonial: z.string().min(5),
  rating: z.number().min(1).max(5).optional(),
  featured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().optional()
});

export const teamSchema = z.object({
  name: z.string().min(2),
  designation: z.string().min(2),
  photo: mediaSchema.optional(),
  bio: z.string().optional().default(""),
  linkedin: z.string().url().optional().or(z.literal("")).default(""),
  instagram: z.string().url().optional().or(z.literal("")).default(""),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional()
});

export const statisticSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().optional().default(""),
  icon: z.string().optional().default(""),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional()
});

export const insightSchema = z.object({
  title: z.string().min(2).max(180),
  slug: slugSchema.optional(),
  excerpt: z.string().min(5).max(320),
  content: z.string().min(5),
  featuredImage: mediaSchema.optional(),
  category: z.string().optional().default("Digital Marketing"),
  author: z.string().optional().default("Maithil Digitals"),
  tags: z.array(z.string()).optional().default([]),
  publishDate: z.coerce.date().optional(),
  readTime: z.string().optional().default(""),
  status: z.enum(["draft", "published", "scheduled"]).optional(),
  featured: z.boolean().optional(),
  seo: seoSchema.optional()
});

export const faqSchema = z.object({
  question: z.string().min(2),
  answer: z.string().min(2),
  category: z.string().optional().default("General"),
  sortOrder: z.number().optional(),
  isPublished: z.boolean().optional()
});

export const enquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(20).regex(/^[0-9+\-\s()]+$/),
  company: z.string().max(120).optional().default(""),
  service: z.string().max(120).optional().default(""),
  budget: z.string().max(80).optional().default(""),
  message: z.string().min(10).max(3000)
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["New", "Contacted", "In Progress", "Converted", "Closed"])
});
