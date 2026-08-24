import { Schema } from "mongoose";
export const mediaSchema = new Schema({
    url: { type: String, default: "" },
    fileId: { type: String, default: "" },
    alt: { type: String, default: "" }
}, { _id: false });
export const seoSchema = new Schema({
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    robots: { type: String, default: "index,follow" }
}, { _id: false });
export const faqItemSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, { _id: false });
