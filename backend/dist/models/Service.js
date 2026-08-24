import { Schema, model } from "mongoose";
import { faqItemSchema, mediaSchema, seoSchema } from "./shared.js";
const serviceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "Digital Marketing" },
    icon: { type: String, default: "" },
    featuredImage: { type: mediaSchema, default: {} },
    gallery: [mediaSchema],
    features: [{ type: String }],
    process: [{ title: String, description: String }],
    faq: [faqItemSchema],
    seo: { type: seoSchema, default: {} },
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0, index: true }
}, { timestamps: true });
export const Service = model("Service", serviceSchema);
