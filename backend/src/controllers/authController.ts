import type { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import { changePasswordSchema, loginSchema } from "../validators/authValidators.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clearAuthCookie, setAuthCookie, signAdminToken } from "../middleware/auth.js";
import { successResponse } from "../utils/apiResponse.js";

const LOCK_MINUTES = 15;
const MAX_FAILED_ATTEMPTS = 5;

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const admin = await Admin.findOne({ email: body.email.toLowerCase() }).select("+password");

  const genericError = new AppError(401, "Invalid credentials");
  if (!admin) throw genericError;
  if (admin.lockUntil && admin.lockUntil > new Date()) throw new AppError(429, "Too many failed attempts. Please try again later.");

  const valid = await admin.comparePassword(body.password);
  if (!valid) {
    admin.failedLoginAttempts += 1;
    if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      admin.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
    }
    await admin.save();
    throw genericError;
  }

  admin.failedLoginAttempts = 0;
  admin.lockUntil = undefined;
  admin.lastLoginAt = new Date();
  await admin.save();

  const token = signAdminToken({ id: admin.id, email: admin.email, role: "admin", tokenVersion: admin.tokenVersion });
  setAuthCookie(res, token);
  return successResponse(res, "Login successful", { admin: { id: admin.id, email: admin.email, role: admin.role } });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  return successResponse(res, "Logged out");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  return successResponse(res, "Session valid", { admin: req.admin });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const body = changePasswordSchema.parse(req.body);
  const admin = await Admin.findById(req.admin?.id).select("+password");
  if (!admin) throw new AppError(401, "Authentication required");

  const valid = await admin.comparePassword(body.currentPassword);
  if (!valid) throw new AppError(401, "Invalid credentials");

  admin.password = body.newPassword;
  admin.tokenVersion += 1;
  await admin.save();
  clearAuthCookie(res);
  return successResponse(res, "Password changed. Please sign in again.");
});
