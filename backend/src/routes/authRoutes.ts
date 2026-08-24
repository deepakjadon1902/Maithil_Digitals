import { Router } from "express";
import { changePassword, login, logout, me } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";

export const authRoutes = Router();

authRoutes.post("/login", authLimiter, login);
authRoutes.post("/logout", requireAdmin, logout);
authRoutes.get("/me", requireAdmin, me);
authRoutes.post("/change-password", requireAdmin, changePassword);
