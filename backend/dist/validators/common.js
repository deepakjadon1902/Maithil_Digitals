import { z } from "zod";
export const slugSchema = z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const urlSchema = z.string().url().or(z.literal(""));
export const seoSchema = z.object({
    metaTitle: z.string().max(160).optional().default(""),
    metaDescription: z.string().max(300).optional().default(""),
    canonicalUrl: z.string().url().optional().or(z.literal("")).default(""),
    ogTitle: z.string().max(160).optional().default(""),
    ogDescription: z.string().max(300).optional().default(""),
    ogImage: z.string().optional().default(""),
    robots: z.string().optional().default("index,follow")
});
export const mediaSchema = z.object({
    url: z.string().min(1),
    fileId: z.string().optional().default(""),
    alt: z.string().max(180).optional().default("")
});
export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().optional().default(""),
    status: z.string().optional().default("")
});
