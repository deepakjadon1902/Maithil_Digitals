import { Schema, model } from "mongoose";
import { mediaSchema } from "./shared.js";

const testimonialSchema = new Schema(
  {
    clientName: { type: String, required: true },
    designation: { type: String, default: "" },
    company: { type: String, default: "" },
    photo: { type: mediaSchema, default: {} },
    testimonial: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Testimonial = model("Testimonial", testimonialSchema);
