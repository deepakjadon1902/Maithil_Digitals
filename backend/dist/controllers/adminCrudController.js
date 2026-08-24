import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { createDocument, deleteDocument, listDocuments, updateDocument } from "../services/cmsService.js";
import { paginationSchema } from "../validators/common.js";
export function createCrudController(options) {
    return {
        list: asyncHandler(async (req, res) => {
            const query = paginationSchema.parse(req.query);
            return successResponse(res, `${options.label} loaded`, await listDocuments(options.model, { ...query, searchFields: options.searchFields }));
        }),
        create: asyncHandler(async (req, res) => {
            const payload = options.schema.parse(req.body);
            return successResponse(res, `${options.label} created`, await createDocument(options.model, payload), 201);
        }),
        update: asyncHandler(async (req, res) => {
            const payload = options.schema.parse(req.body);
            return successResponse(res, `${options.label} updated`, await updateDocument(options.model, String(req.params.id), payload));
        }),
        remove: asyncHandler(async (req, res) => {
            await deleteDocument(options.model, String(req.params.id));
            return successResponse(res, `${options.label} deleted`);
        })
    };
}
