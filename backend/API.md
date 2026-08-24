# Maithil Digitals API Contract

All responses use:

```json
{ "success": true, "message": "Operation successful", "data": {} }
```

Errors use:

```json
{ "success": false, "message": "Readable error message", "errors": [] }
```

## Auth

- `POST /api/auth/login` `{ "email": "...", "password": "..." }`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/change-password` `{ "currentPassword": "...", "newPassword": "..." }`

Authentication uses an HTTP-only cookie named `md_admin_session`. Admin endpoints return `401` when the cookie is missing or expired. The frontend admin login route is `/admin/login`, and the dashboard route is `/admin/dashboard`.

## Public Read API

- `GET /api/health`
- `GET /api/settings`
- `GET /api/home`
- `GET /api/about`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/videos`
- `GET /api/videos/:slug`
- `GET /api/testimonials`
- `GET /api/team`
- `GET /api/statistics`
- `GET /api/insights`
- `GET /api/insights/:slug`
- `GET /api/faqs`
- `POST /api/contact`

Public list endpoints return only active or published content where applicable.

## Admin API

All routes below require admin authentication:

- `GET /api/admin/dashboard`
- `PUT /api/admin/settings`
- `PUT /api/admin/home`
- `PUT /api/admin/about`
- `PUT /api/admin/seo`
- `POST /api/admin/media`
- `DELETE /api/admin/media/:fileId`
- `GET /api/admin/enquiries`
- `PATCH /api/admin/enquiries/:id/status`
- `DELETE /api/admin/enquiries/:id`

CRUD resources:

- `/api/admin/services`
- `/api/admin/projects`
- `/api/admin/videos`
- `/api/admin/testimonials`
- `/api/admin/team`
- `/api/admin/statistics`
- `/api/admin/insights`
- `/api/admin/faqs`

Each supports:

- `GET /api/admin/:resource?page=1&limit=20&search=`
- `POST /api/admin/:resource`
- `PUT /api/admin/:resource/:id`
- `DELETE /api/admin/:resource/:id`

## Uploads

`POST /api/admin/media/images` accepts multipart form field `image`. Allowed formats are JPEG, PNG, WebP and AVIF up to 5 MB. The backend converts the image to optimized WebP, strips metadata, resizes it within 1920x1920, uploads the WebP to ImageKit, and returns original size, optimized size, saved bytes, URL and file ID.

`POST /api/admin/media/videos` accepts multipart form field `video`. Allowed formats are MP4, WebM and MOV up to 100 MB. Videos are uploaded to ImageKit and returned with an optimized delivery URL using ImageKit automatic quality/format transformations. Large video binaries are never stored in MongoDB.

`POST /api/admin/media` remains as a backward-compatible image upload alias.
