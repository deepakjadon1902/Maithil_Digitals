# Maithil Digitals Frontend

Premium digital marketing agency frontend built with React, TypeScript, Vite and Tailwind CSS. Admin login is available at `/admin/login`; authenticated admins land on `/admin/dashboard`.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Backend Contract

Set `VITE_API_BASE_URL` to the REST API base URL. The frontend includes typed service modules for settings, services, projects, videos, testimonials, team, FAQs, insights and contact enquiries. Local fallback content is only for development preview and should be replaced by CMS/admin-managed content for production.

## Admin

The administration entry is `/control-panel`. Route naming is not treated as security; backend authentication must protect the real admin APIs.
