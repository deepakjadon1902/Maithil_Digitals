import { Schema, model } from "mongoose";
import { mediaSchema } from "./shared.js";
const linkSchema = new Schema({ label: String, url: String }, { _id: false });
const homePageSchema = new Schema({
    hero: {
        eyebrow: { type: String, default: "Digital Marketing • Creative • Growth" },
        heading: { type: String, default: "We turn ideas into digital growth." },
        description: { type: String, default: "Maithil Digitals helps businesses build stronger brands, reach the right audience and create meaningful digital experiences through strategy, creativity and technology." },
        image: { type: mediaSchema, default: {} },
        videoUrl: { type: String, default: "" },
        primaryCta: { type: linkSchema, default: { label: "Start a Conversation", url: "/contact" } },
        secondaryCta: { type: linkSchema, default: { label: "Explore Our Work", url: "/work" } }
    },
    intro: { title: String, description: String, image: { type: mediaSchema, default: {} } },
    sections: {
        servicesTitle: String,
        servicesDescription: String,
        selectedWorkTitle: String,
        selectedWorkDescription: String,
        testimonialsHeading: String,
        videoTitle: String,
        videoDescription: String,
        ctaTitle: String,
        ctaDescription: String
    }
}, { timestamps: true });
export const HomePage = model("HomePage", homePageSchema);
