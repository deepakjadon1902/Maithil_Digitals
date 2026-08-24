import ImageKit from "imagekit";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { buildOptimizedVideoUrl, optimizeImageForWeb } from "./mediaOptimizerService.js";

const imagekit = env.IMAGEKIT_PUBLIC_KEY && env.IMAGEKIT_PRIVATE_KEY && env.IMAGEKIT_URL_ENDPOINT
  ? new ImageKit({
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT
    })
  : null;

export async function uploadToImageKit(file: Express.Multer.File, folder = "/maithil-digitals") {
  if (!imagekit) throw new AppError(500, "ImageKit is not configured");
  const optimized = await optimizeImageForWeb(file);
  const uploaded = await imagekit.upload({
    file: optimized.buffer,
    fileName: sanitizeFileName(optimized.fileName),
    folder
  });

  return {
    url: uploaded.url,
    optimizedUrl: uploaded.url,
    fileId: uploaded.fileId,
    alt: file.originalname,
    format: "webp",
    mimeType: optimized.mimeType,
    originalSize: optimized.originalSize,
    optimizedSize: optimized.optimizedSize,
    savedBytes: Math.max(optimized.originalSize - optimized.optimizedSize, 0)
  };
}

export async function uploadVideoToImageKit(file: Express.Multer.File, folder = "/maithil-digitals/videos") {
  if (!imagekit) throw new AppError(500, "ImageKit is not configured");
  const uploaded = await imagekit.upload({
    file: file.buffer,
    fileName: sanitizeFileName(file.originalname),
    folder
  });

  return {
    url: uploaded.url,
    optimizedUrl: buildOptimizedVideoUrl(uploaded.url),
    fileId: uploaded.fileId,
    alt: file.originalname,
    format: file.mimetype.split("/")[1] ?? "video",
    mimeType: file.mimetype,
    originalSize: file.size,
    optimizedSize: file.size,
    savedBytes: 0,
    note: "Video is stored in ImageKit and delivered through automatic quality/format optimization."
  };
}

export async function deleteFromImageKit(fileId: string) {
  if (!imagekit) throw new AppError(500, "ImageKit is not configured");
  await imagekit.deleteFile(fileId);
}

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-");
}
