import { Schema, model } from "mongoose";
import { mediaSchema, seoSchema } from "./shared.js";
const settingsSchema = new Schema({
    companyName: { type: String, default: "Maithil Digitals" },
    tagline: { type: String, default: "Your Digital Identity" },
    shortDescription: { type: String, default: "Premium digital marketing, brand, content and web experiences." },
    logo: { type: mediaSchema, default: {} },
    favicon: { type: mediaSchema, default: {} },
    contact: {
        address: { type: String, default: "Kosi Kalan, Mathura, Uttar Pradesh, India" },
        phone1: { type: String, default: "9917006983" },
        phone2: { type: String, default: "9625643209" },
        email: { type: String, default: "maithildigitals@gmail.com" }
    },
    social: {
        instagram: { type: String, default: "" },
        facebook: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        youtube: { type: String, default: "" },
        twitter: { type: String, default: "" }
    },
    branding: {
        primaryColor: { type: String, default: "#1F2040" },
        accentColor: { type: String, default: "#F06A00" }
    },
    seo: { type: seoSchema, default: {} },
    footer: {
        description: { type: String, default: "Premium digital marketing, brand, content and web experiences for businesses ready to grow with clarity." },
        copyrightText: { type: String, default: "Maithil Digitals. All rights reserved." },
        navigationLabels: [{ type: String }]
    }
}, { timestamps: true });
export const Settings = model("Settings", settingsSchema);
