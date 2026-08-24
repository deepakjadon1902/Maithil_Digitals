import { Schema, model } from "mongoose";
import { mediaSchema, seoSchema } from "./shared.js";

const insightSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: mediaSchema, default: {} },
    category: { type: String, default: "Digital Marketing", index: true },
    author: { type: String, default: "Maithil Digitals" },
    tags: [{ type: String }],
    publishDate: { type: Date, default: Date.now },
    readTime: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published", "scheduled"], default: "draft", index: true },
    featured: { type: Boolean, default: false },
    seo: { type: seoSchema, default: {} }
  },
  { timestamps: true }
);

export const Insight = model("Insight", insightSchema);
