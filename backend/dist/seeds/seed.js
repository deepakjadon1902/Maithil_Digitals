import { connectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { Admin } from "../models/Admin.js";
import { AboutPage } from "../models/AboutPage.js";
import { FAQ } from "../models/FAQ.js";
import { HomePage } from "../models/HomePage.js";
import { Project } from "../models/Project.js";
import { Service } from "../models/Service.js";
import { Settings } from "../models/Settings.js";
import { Statistic } from "../models/Statistic.js";
import { TeamMember } from "../models/TeamMember.js";
import { Testimonial } from "../models/Testimonial.js";
import { Video } from "../models/Video.js";
async function seed() {
    await connectDatabase();
    const adminPassword = env.ADMIN_PASSWORD ?? "ChangeMe123!";
    const admin = await Admin.findOne({ email: env.ADMIN_EMAIL }).select("+password");
    if (admin) {
        admin.password = adminPassword;
        admin.tokenVersion += 1;
        await admin.save();
    }
    else {
        await Admin.create({ email: env.ADMIN_EMAIL, password: adminPassword, role: "admin" });
    }
    await Settings.findOneAndUpdate({}, {}, { upsert: true, setDefaultsOnInsert: true });
    await HomePage.findOneAndUpdate({}, {}, { upsert: true, setDefaultsOnInsert: true });
    await AboutPage.findOneAndUpdate({}, {}, { upsert: true, setDefaultsOnInsert: true });
    await Service.deleteMany({});
    await Service.insertMany([
        { title: "Digital Marketing", slug: "digital-marketing", shortDescription: "Digital strategy built around your business.", description: "Campaign planning, positioning and channel execution.", isActive: true, isFeatured: true, sortOrder: 1 },
        { title: "Social Media Marketing", slug: "social-media-marketing", shortDescription: "Creative that earns attention across social platforms.", description: "Content systems, social campaigns and audience engagement.", isActive: true, isFeatured: true, sortOrder: 2 },
        { title: "Search Engine Optimization", slug: "seo", shortDescription: "Search visibility for local and growth-focused businesses.", description: "Technical SEO, local SEO and content strategy.", isActive: true, sortOrder: 3 }
    ]);
    await Project.deleteMany({});
    await Project.insertMany([
        { title: "Brand Growth Campaign", slug: "brand-growth-campaign", client: "Demo client", category: "Digital Marketing", year: "2026", shortDescription: "Development sample project structure. Replace with real company work.", status: "draft" }
    ]);
    await Video.deleteMany({});
    await Video.insertMany([
        { title: "Campaign Showreel", slug: "campaign-showreel", description: "Development sample video entry.", category: "Brand Video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isPublished: false }
    ]);
    await Testimonial.deleteMany({});
    await Testimonial.insertMany([
        { clientName: "Demo CMS Client", designation: "Business Owner", company: "Demo Company", testimonial: "Development demo testimonial. Replace before publishing.", isPublished: false }
    ]);
    await TeamMember.deleteMany({});
    await TeamMember.insertMany([{ name: "Maithil Digitals Team", designation: "Strategy, creative and growth", isActive: true }]);
    await Statistic.deleteMany({});
    await Statistic.insertMany([
        { value: "10+", label: "Services", description: "Development placeholder controlled by CMS.", sortOrder: 1 },
        { value: "50+", label: "Projects", description: "Development placeholder controlled by CMS.", sortOrder: 2 },
        { value: "100%", label: "Commitment", description: "Development placeholder controlled by CMS.", sortOrder: 3 }
    ]);
    await FAQ.deleteMany({});
    await FAQ.insertMany([
        { question: "What services do you provide?", answer: "Digital marketing, SEO, social media, branding, web design, content and video support.", sortOrder: 1 },
        { question: "How can I start a project?", answer: "Submit the enquiry form or contact Maithil Digitals directly.", sortOrder: 2 }
    ]);
    console.log("Seed completed");
    process.exit(0);
}
seed().catch((error) => {
    console.error(error);
    process.exit(1);
});
