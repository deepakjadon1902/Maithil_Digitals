import { ZodError } from "zod";
import { isProduction } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/apiResponse.js";
export function notFound(req, _res, next) {
    next(new AppError(404, `Route not found: ${req.originalUrl}`));
}
export function errorHandler(error, _req, res, _next) {
    if (error instanceof ZodError) {
        return errorResponse(res, 422, "Validation failed", error.errors);
    }
    if (error instanceof AppError) {
        return errorResponse(res, error.statusCode, error.message, error.errors);
    }
    const err = error;
    if (!isProduction) {
        console.error(err);
    }
    return errorResponse(res, 500, "Something went wrong", isProduction ? [] : [err.message]);
}
