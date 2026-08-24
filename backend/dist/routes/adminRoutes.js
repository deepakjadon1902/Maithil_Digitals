import { Router } from "express";
import { dashboard, upsertAbout, upsertHome, upsertSeo, upsertSettings } from "../controllers/adminController.js";
import { createCrudController } from "../controllers/adminCrudController.js";
import { deleteEnquiry, listEnquiries, updateEnquiryStatus } from "../controllers/contactController.js";
import { deleteMedia, uploadMedia, uploadVideoMedia } from "../controllers/mediaController.js";
import { requireAdmin, requireRole } from "../middleware/auth.js";
import { uploadImage, uploadVideo } from "../middleware/upload.js";
import { FAQ } from "../models/FAQ.js";
import { Insight } from "../models/Insight.js";
import { Project } from "../models/Project.js";
import { Service } from "../models/Service.js";
import { Statistic } from "../models/Statistic.js";
import { TeamMember } from "../models/TeamMember.js";
import { Testimonial } from "../models/Testimonial.js";
import { Video } from "../models/Video.js";
import { faqSchema, insightSchema, projectSchema, serviceSchema, statisticSchema, teamSchema, testimonialSchema, videoSchema } from "../validators/cmsValidators.js";
export const adminRoutes = Router();
adminRoutes.use(requireAdmin, requireRole("admin"));
adminRoutes.get("/dashboard", dashboard);
adminRoutes.put("/settings", upsertSettings);
adminRoutes.put("/home", upsertHome);
adminRoutes.put("/about", upsertAbout);
adminRoutes.put("/seo", upsertSeo);
adminRoutes.post("/media/images", uploadImage.single("image"), uploadMedia);
adminRoutes.post("/media/videos", uploadVideo.single("video"), uploadVideoMedia);
adminRoutes.post("/media", uploadImage.single("image"), uploadMedia);
adminRoutes.delete("/media/:fileId", deleteMedia);
adminRoutes.get("/enquiries", listEnquiries);
adminRoutes.patch("/enquiries/:id/status", updateEnquiryStatus);
adminRoutes.delete("/enquiries/:id", deleteEnquiry);
const resources = [
    ["services", createCrudController({ model: Service, schema: serviceSchema, label: "Service", searchFields: ["title", "shortDescription", "category"] })],
    ["projects", createCrudController({ model: Project, schema: projectSchema, label: "Project", searchFields: ["title", "client", "category"] })],
    ["videos", createCrudController({ model: Video, schema: videoSchema, label: "Video", searchFields: ["title", "description", "category"] })],
    ["testimonials", createCrudController({ model: Testimonial, schema: testimonialSchema, label: "Testimonial", searchFields: ["clientName", "company"] })],
    ["team", createCrudController({ model: TeamMember, schema: teamSchema, label: "Team member", searchFields: ["name", "designation"] })],
    ["statistics", createCrudController({ model: Statistic, schema: statisticSchema, label: "Statistic", searchFields: ["label", "value"] })],
    ["insights", createCrudController({ model: Insight, schema: insightSchema, label: "Insight", searchFields: ["title", "excerpt", "category"] })],
    ["faqs", createCrudController({ model: FAQ, schema: faqSchema, label: "FAQ", searchFields: ["question", "answer", "category"] })]
];
for (const [path, controller] of resources) {
    adminRoutes.get(`/${path}`, controller.list);
    adminRoutes.post(`/${path}`, controller.create);
    adminRoutes.put(`/${path}/:id`, controller.update);
    adminRoutes.delete(`/${path}/:id`, controller.remove);
}
