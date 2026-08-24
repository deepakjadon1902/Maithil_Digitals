import { Schema, model } from "mongoose";
import { mediaSchema, seoSchema } from "./shared.js";
const projectSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    client: { type: String, default: "" },
    category: { type: String, default: "" },
    year: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    overview: { type: String, default: "" },
    challenge: { type: String, default: "" },
    strategy: { type: String, default: "" },
    execution: { type: String, default: "" },
    deliverables: [{ type: String }],
    results: [{ label: String, value: String }],
    heroImage: { type: mediaSchema, default: {} },
    imageUrl: { type: String, default: "" },
    gallery: [mediaSchema],
    videoUrl: { type: String, default: "" },
    relatedServices: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    sortOrder: { type: Number, default: 0 },
    seo: { type: seoSchema, default: {} }
}, { timestamps: true });
export const Project = model("Project", projectSchema);
