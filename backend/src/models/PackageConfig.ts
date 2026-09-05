import { Schema, model } from "mongoose";

const packagePlanSchema = new Schema(
  {
    name: { type: String, required: true },
    label: { type: String, default: "" },
    description: { type: String, default: "" },
    badge: { type: String, default: "" },
    price: { type: String, default: "" },
    category: { type: String, default: "" },
    timeline: { type: String, default: "" },
    bestFor: { type: String, default: "" },
    cta: { type: String, default: "View Package" },
    features: [{ type: String }]
  },
  { _id: false }
);

const packageCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    services: [{ type: String }]
  },
  { _id: false }
);

const packageConfigSchema = new Schema(
  {
    items: [packagePlanSchema],
    categories: [packageCategorySchema]
  },
  { timestamps: true }
);

export const PackageConfig = model("PackageConfig", packageConfigSchema);
