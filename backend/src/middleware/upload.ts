import multer from "multer";
import { AppError } from "../utils/AppError.js";

const allowedImages = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const allowedVideos = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    if (!allowedImages.has(file.mimetype)) {
      return callback(new AppError(422, "Only JPEG, PNG, WebP and AVIF images are allowed"));
    }
    callback(null, true);
  }
});

export const uploadVideo = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    if (!allowedVideos.has(file.mimetype)) {
      return callback(new AppError(422, "Only MP4, WebM and MOV videos are allowed"));
    }
    callback(null, true);
  }
});
