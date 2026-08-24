export function successResponse(res, message, data, status = 200) {
    return res.status(status).json({ success: true, message, data: data ?? {} });
}
export function errorResponse(res, status, message, errors = []) {
    return res.status(status).json({ success: false, message, errors });
}
