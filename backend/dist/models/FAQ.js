import { Schema, model } from "mongoose";
const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General", index: true },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true }
}, { timestamps: true });
export const FAQ = model("FAQ", faqSchema);
