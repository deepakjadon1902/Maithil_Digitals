import { Schema, model } from "mongoose";
const enquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    company: { type: String, default: "" },
    service: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: ["New", "Contacted", "In Progress", "Converted", "Closed"], default: "New", index: true }
}, { timestamps: true });
export const Enquiry = model("Enquiry", enquirySchema);
