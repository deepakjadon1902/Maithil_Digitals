import { Schema, model } from "mongoose";
import { mediaSchema, seoSchema } from "./shared.js";

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    thumbnail: { type: mediaSchema, default: {} },
    thumbnailUrl: { type: String, default: "" },
    videoUrl: { type: String, required: true },
    duration: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: false, index: true },
    publishDate: { type: Date, default: Date.now },
    seo: { type: seoSchema, default: {} }
  },
  { timestamps: true }
);

export const Video = model("Video", videoSchema);
