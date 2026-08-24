import type { FilterQuery, Model } from "mongoose";
import { AppError } from "../utils/AppError.js";
import { createSlug } from "../utils/slug.js";

type ListOptions = {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  filter?: FilterQuery<unknown>;
  sort?: Record<string, 1 | -1>;
};

type CmsPayload = Record<string, unknown> & { title?: string; slug?: string };
type AnyCmsModel = Model<any>;

export async function listDocuments(model: AnyCmsModel, options: ListOptions = {}) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const filter: FilterQuery<unknown> = { ...(options.filter as FilterQuery<unknown>) };

  if (options.search && options.searchFields?.length) {
    filter.$or = options.searchFields.map((field) => ({ [field]: new RegExp(options.search ?? "", "i") })) as FilterQuery<unknown>[];
  }

  const [items, total] = await Promise.all([
    model.find(filter).sort(options.sort ?? { sortOrder: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    model.countDocuments(filter)
  ]);

  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 } };
}

export async function createDocument(model: AnyCmsModel, payload: CmsPayload) {
  if (!payload.slug && payload.title) payload.slug = createSlug(payload.title);
  return model.create(payload);
}

export async function updateDocument(model: AnyCmsModel, id: string, payload: Partial<CmsPayload>) {
  const updated = await model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!updated) throw new AppError(404, "Content not found");
  return updated;
}

export async function deleteDocument(model: AnyCmsModel, id: string) {
  const deleted = await model.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, "Content not found");
  return deleted;
}

export async function getBySlug(model: AnyCmsModel, slug: string, filter: FilterQuery<unknown> = {}) {
  const item = await model.findOne({ slug, ...filter }).lean();
  if (!item) throw new AppError(404, "Content not found");
  return item;
}
