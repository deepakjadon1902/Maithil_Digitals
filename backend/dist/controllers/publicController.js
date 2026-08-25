import { AboutPage } from "../models/AboutPage.js";
import { FAQ } from "../models/FAQ.js";
import { HomePage } from "../models/HomePage.js";
import { Insight } from "../models/Insight.js";
import { PackageConfig } from "../models/PackageConfig.js";
import { Project } from "../models/Project.js";
import { Service } from "../models/Service.js";
import { Settings } from "../models/Settings.js";
import { Statistic } from "../models/Statistic.js";
import { TeamMember } from "../models/TeamMember.js";
import { Testimonial } from "../models/Testimonial.js";
import { Video } from "../models/Video.js";
import { successResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getBySlug, listDocuments } from "../services/cmsService.js";
import { paginationSchema } from "../validators/common.js";
export const health = asyncHandler(async (_req, res) => {
    return successResponse(res, "Maithil Digitals API is running");
});
export const getSettings = asyncHandler(async (_req, res) => {
    const settings = await Settings.findOne().lean();
    return successResponse(res, "Settings loaded", settings);
});
export const getHome = asyncHandler(async (_req, res) => {
    const home = await HomePage.findOne().lean();
    return successResponse(res, "Home content loaded", home);
});
export const getAbout = asyncHandler(async (_req, res) => {
    const about = await AboutPage.findOne().lean();
    return successResponse(res, "About content loaded", about);
});
export const getPackages = asyncHandler(async (_req, res) => {
    const packages = await PackageConfig.findOne().lean();
    return successResponse(res, "Packages loaded", packages);
});
export const listServices = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const data = await listDocuments(Service, { ...query, filter: { isActive: true }, searchFields: ["title", "shortDescription", "category"] });
    return successResponse(res, "Services loaded", data);
});
export const getService = asyncHandler(async (req, res) => {
    return successResponse(res, "Service loaded", await getBySlug(Service, String(req.params.slug), { isActive: true }));
});
export const listProjects = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const data = await listDocuments(Project, { ...query, filter: { status: "published" }, searchFields: ["title", "client", "category"] });
    return successResponse(res, "Projects loaded", data);
});
export const getProject = asyncHandler(async (req, res) => {
    return successResponse(res, "Project loaded", await getBySlug(Project, String(req.params.slug), { status: "published" }));
});
export const listVideos = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const data = await listDocuments(Video, { ...query, filter: { isPublished: true }, searchFields: ["title", "description", "category"] });
    return successResponse(res, "Videos loaded", data);
});
export const getVideo = asyncHandler(async (req, res) => {
    return successResponse(res, "Video loaded", await getBySlug(Video, String(req.params.slug), { isPublished: true }));
});
export const listTestimonials = asyncHandler(async (_req, res) => {
    return successResponse(res, "Testimonials loaded", await Testimonial.find({ isPublished: true }).sort({ sortOrder: 1 }).lean());
});
export const listTeam = asyncHandler(async (_req, res) => {
    return successResponse(res, "Team loaded", await TeamMember.find({ isActive: true }).sort({ sortOrder: 1 }).lean());
});
export const listStatistics = asyncHandler(async (_req, res) => {
    return successResponse(res, "Statistics loaded", await Statistic.find({ isActive: true }).sort({ sortOrder: 1 }).lean());
});
export const listInsights = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const data = await listDocuments(Insight, { ...query, filter: { status: "published" }, searchFields: ["title", "excerpt", "category", "tags"] });
    return successResponse(res, "Insights loaded", data);
});
export const getInsight = asyncHandler(async (req, res) => {
    return successResponse(res, "Insight loaded", await getBySlug(Insight, String(req.params.slug), { status: "published" }));
});
export const listFaqs = asyncHandler(async (_req, res) => {
    return successResponse(res, "FAQs loaded", await FAQ.find({ isPublished: true }).sort({ sortOrder: 1 }).lean());
});
