import { deleteFromImageKit, uploadToImageKit, uploadVideoToImageKit } from "../services/imageKitService.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const uploadMedia = asyncHandler(async (req, res) => {
    if (!req.file)
        throw new AppError(422, "Image file is required");
    return successResponse(res, "Image optimized to WebP and uploaded", await uploadToImageKit(req.file), 201);
});
export const uploadVideoMedia = asyncHandler(async (req, res) => {
    if (!req.file)
        throw new AppError(422, "Video file is required");
    return successResponse(res, "Video uploaded with optimized ImageKit delivery URL", await uploadVideoToImageKit(req.file), 201);
});
export const deleteMedia = asyncHandler(async (req, res) => {
    await deleteFromImageKit(String(req.params.fileId));
    return successResponse(res, "Image deleted");
});
