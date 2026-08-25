import { Router } from "express";
import { createEnquiry } from "../controllers/contactController.js";
import {
  getAbout,
  getHome,
  getInsight,
  getPackages,
  getProject,
  getService,
  getSettings,
  getVideo,
  health,
  listFaqs,
  listInsights,
  listProjects,
  listServices,
  listStatistics,
  listTeam,
  listTestimonials,
  listVideos
} from "../controllers/publicController.js";

export const publicRoutes = Router();

publicRoutes.get("/health", health);
publicRoutes.get("/settings", getSettings);
publicRoutes.get("/home", getHome);
publicRoutes.get("/about", getAbout);
publicRoutes.get("/packages", getPackages);
publicRoutes.get("/services", listServices);
publicRoutes.get("/services/:slug", getService);
publicRoutes.get("/projects", listProjects);
publicRoutes.get("/projects/:slug", getProject);
publicRoutes.get("/videos", listVideos);
publicRoutes.get("/videos/:slug", getVideo);
publicRoutes.get("/testimonials", listTestimonials);
publicRoutes.get("/team", listTeam);
publicRoutes.get("/statistics", listStatistics);
publicRoutes.get("/insights", listInsights);
publicRoutes.get("/insights/:slug", getInsight);
publicRoutes.get("/faqs", listFaqs);
publicRoutes.post("/contact", createEnquiry);
