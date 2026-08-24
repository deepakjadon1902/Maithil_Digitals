import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(24, "JWT_SECRET must be at least 24 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_EMAIL: z.string().email().default("maithildigitals@gmail.com"),
  ADMIN_PASSWORD: z.string().min(8).default("maithildigitals@108"),
  IMAGEKIT_PUBLIC_KEY: z.string().optional(),
  IMAGEKIT_PRIVATE_KEY: z.string().optional(),
  IMAGEKIT_URL_ENDPOINT: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default("Maithil Digitals <onboarding@resend.dev>"),
  CLIENT_URL: z.string().url().default("https://maithil-digitals.vercel.app"),
  ADMIN_URL: z.string().url().default("https://maithil-digitals.vercel.app"),
  API_URL: z.string().url().default("https://maithil-digitals.onrender.com"),
  ALLOWED_ORIGINS: z.string().optional().default("https://maithil-digitals.vercel.app")
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";
