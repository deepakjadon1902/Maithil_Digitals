import { Enquiry } from "../models/Enquiry.js";
import { sendEnquiryNotification } from "../services/emailService.js";
import { successResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { enquirySchema, enquiryStatusSchema } from "../validators/cmsValidators.js";
import { paginationSchema } from "../validators/common.js";
import { listDocuments } from "../services/cmsService.js";
import { AppError } from "../utils/AppError.js";
export const createEnquiry = asyncHandler(async (req, res) => {
    const payload = enquirySchema.parse(req.body);
    const enquiry = await Enquiry.create(payload);
    await sendEnquiryNotification(payload).catch((error) => {
        console.error("Enquiry saved, but email notification failed:", error instanceof Error ? error.message : error);
    });
    return successResponse(res, "Enquiry received", { id: enquiry.id }, 201);
});
export const listEnquiries = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const filter = query.status ? { status: query.status } : {};
    const data = await listDocuments(Enquiry, { ...query, filter, searchFields: ["name", "email", "phone", "company", "businessName", "businessType", "service", "servicesRequired"], sort: { createdAt: -1 } });
    return successResponse(res, "Enquiries loaded", data);
});
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
    const body = enquiryStatusSchema.parse(req.body);
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!enquiry)
        throw new AppError(404, "Enquiry not found");
    return successResponse(res, "Enquiry updated", enquiry);
});
export const deleteEnquiry = asyncHandler(async (req, res) => {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry)
        throw new AppError(404, "Enquiry not found");
    return successResponse(res, "Enquiry deleted");
});
