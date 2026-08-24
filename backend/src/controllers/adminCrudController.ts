import type { Request, Response } from "express";
import type { Model } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { createDocument, deleteDocument, listDocuments, updateDocument } from "../services/cmsService.js";
import { paginationSchema } from "../validators/common.js";

type CrudOptions<T> = {
  model: Model<any>;
  schema: { parse(input: unknown): T };
  label: string;
  searchFields?: string[];
};

export function createCrudController<T extends Record<string, unknown> & { title?: string; slug?: string }>(options: CrudOptions<T>) {
  return {
    list: asyncHandler(async (req: Request, res: Response) => {
      const query = paginationSchema.parse(req.query);
      return successResponse(res, `${options.label} loaded`, await listDocuments(options.model, { ...query, searchFields: options.searchFields }));
    }),
    create: asyncHandler(async (req: Request, res: Response) => {
      const payload = options.schema.parse(req.body);
      return successResponse(res, `${options.label} created`, await createDocument(options.model, payload), 201);
    }),
    update: asyncHandler(async (req: Request, res: Response) => {
      const payload = options.schema.parse(req.body);
      return successResponse(res, `${options.label} updated`, await updateDocument(options.model, String(req.params.id), payload));
    }),
    remove: asyncHandler(async (req: Request, res: Response) => {
      await deleteDocument(options.model, String(req.params.id));
      return successResponse(res, `${options.label} deleted`);
    })
  };
}
