import type { Request, Response } from "express";
import { AboutPage } from "../models/AboutPage.js";
import { Enquiry } from "../models/Enquiry.js";
import { FAQ } from "../models/FAQ.js";
import { HomePage } from "../models/HomePage.js";
import { Insight } from "../models/Insight.js";
import { Project } from "../models/Project.js";
import { Service } from "../models/Service.js";
import { Settings } from "../models/Settings.js";
import { Testimonial } from "../models/Testimonial.js";
import { Video } from "../models/Video.js";
import { successResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboard = asyncHandler(async (_req: Request, res: Response) => {
  const [totalServices, totalProjects, totalVideos, totalInsights, totalTestimonials, totalEnquiries, recentEnquiries, recentProjects, recentVideos] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    Video.countDocuments(),
    Insight.countDocuments(),
    Testimonial.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    Project.find().sort({ updatedAt: -1 }).limit(5).lean(),
    Video.find().sort({ updatedAt: -1 }).limit(5).lean()
  ]);

  return successResponse(res, "Dashboard loaded", { totalServices, totalProjects, totalVideos, totalInsights, totalTestimonials, totalEnquiries, recentEnquiries, recentProjects, recentVideos });
});

export const upsertSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
  return successResponse(res, "Settings saved", settings);
});

export const upsertHome = asyncHandler(async (req: Request, res: Response) => {
  const home = await HomePage.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
  return successResponse(res, "Home content saved", home);
});

export const upsertAbout = asyncHandler(async (req: Request, res: Response) => {
  const about = await AboutPage.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
  return successResponse(res, "About content saved", about);
});

export const upsertSeo = asyncHandler(async (req: Request, res: Response) => {
  const settings = await Settings.findOneAndUpdate({}, { seo: req.body }, { new: true, upsert: true, runValidators: true });
  return successResponse(res, "SEO settings saved", settings?.seo);
});
