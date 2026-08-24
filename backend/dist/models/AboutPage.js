import { Schema, model } from "mongoose";
import { mediaSchema } from "./shared.js";
const contentBlockSchema = new Schema({ title: String, body: String, image: { type: mediaSchema, default: {} } }, { _id: false });
const aboutPageSchema = new Schema({
    heroTitle: { type: String, default: "Ideas are everywhere. Execution creates impact." },
    description: { type: String, default: "Maithil Digitals is a digital agency built to help businesses communicate clearly and grow with practical strategy." },
    story: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    values: [{ type: String }],
    philosophy: { type: String, default: "" },
    process: [{ title: String, description: String }],
    teamIntroduction: { type: String, default: "" },
    images: [mediaSchema],
    contentBlocks: [contentBlockSchema]
}, { timestamps: true });
export const AboutPage = model("AboutPage", aboutPageSchema);
