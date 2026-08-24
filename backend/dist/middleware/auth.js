import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { env, isProduction } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
export function signAdminToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}
export function setAuthCookie(res, token) {
    res.cookie("md_admin_session", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}
export function clearAuthCookie(res) {
    res.clearCookie("md_admin_session", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
}
export async function requireAdmin(req, _res, next) {
    try {
        const token = req.cookies?.md_admin_session;
        if (!token)
            throw new AppError(401, "Authentication required");
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id).lean();
        if (!admin || admin.tokenVersion !== decoded.tokenVersion) {
            throw new AppError(401, "Session expired");
        }
        req.admin = decoded;
        next();
    }
    catch (error) {
        next(error instanceof AppError ? error : new AppError(401, "Authentication required"));
    }
}
export function requireRole(_role) {
    return (req, _res, next) => {
        if (!req.admin)
            return next(new AppError(401, "Authentication required"));
        if (req.admin.role !== "admin")
            return next(new AppError(403, "Forbidden"));
        next();
    };
}
