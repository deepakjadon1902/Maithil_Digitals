import type { Response } from "express";

export function successResponse<T>(res: Response, message: string, data?: T, status = 200) {
  return res.status(status).json({ success: true, message, data: data ?? {} });
}

export function errorResponse(res: Response, status: number, message: string, errors: unknown[] = []) {
  return res.status(status).json({ success: false, message, errors });
}
