import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import { env, isProduction } from "../config/env.js";

export function applySecurity(app: Express) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(morgan(isProduction ? "combined" : "dev"));
  app.use(
    cors({
      origin(origin, callback) {
        const extraOrigins = env.ALLOWED_ORIGINS.split(",").map((item) => item.trim()).filter(Boolean);
        const allowed = new Set([env.CLIENT_URL, env.ADMIN_URL, "http://localhost:5173", "http://127.0.0.1:5173", ...extraOrigins]);
        if (!origin || allowed.has(origin)) return callback(null, true);
        callback(new Error("CORS origin not allowed"));
      },
      credentials: true
    })
  );
}
