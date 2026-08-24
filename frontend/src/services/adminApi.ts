const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const DEMO_EMAIL = "maithildigitals@gmail.com";
const DEMO_PASSWORD = "maithildigitals@108";
const SESSION_KEY = "md_demo_admin_session";
const PASSWORD_KEY = "md_demo_admin_password";
const STORE_PREFIX = "md_demo_admin_";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
};

type ListResult = {
  items: Record<string, unknown>[];
  pagination: Record<string, number>;
};

async function adminRequest<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: options.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    ...options
  });
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !json.success) throw new Error(json.message || "Request failed");
  return json.data;
}

function hasStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function demoPassword() {
  return hasStorage() ? window.localStorage.getItem(PASSWORD_KEY) ?? DEMO_PASSWORD : DEMO_PASSWORD;
}

function setDemoSession(active: boolean) {
  if (!hasStorage()) return;
  if (active) window.localStorage.setItem(SESSION_KEY, "true");
  else window.localStorage.removeItem(SESSION_KEY);
}

function hasDemoSession() {
  return hasStorage() && window.localStorage.getItem(SESSION_KEY) === "true";
}

function readItems(resource: string) {
  if (!hasStorage()) return demoSeeds[resource] ?? [];
  const key = `${STORE_PREFIX}${resource}`;
  const stored = window.localStorage.getItem(key);
  if (stored) return JSON.parse(stored) as Record<string, unknown>[];

  const seeded = demoSeeds[resource] ?? [];
  window.localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
}

function writeItems(resource: string, items: Record<string, unknown>[]) {
  if (!hasStorage()) return;
  window.localStorage.setItem(`${STORE_PREFIX}${resource}`, JSON.stringify(items));
}

function readSingleton(resource: string) {
  if (!hasStorage()) return demoSingletons[resource] ?? {};
  const key = `${STORE_PREFIX}${resource}`;
  const stored = window.localStorage.getItem(key);
  if (stored) return JSON.parse(stored) as Record<string, unknown>;

  const seeded = demoSingletons[resource] ?? {};
  window.localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
}

function writeSingleton(resource: string, value: Record<string, unknown>) {
  if (!hasStorage()) return;
  window.localStorage.setItem(`${STORE_PREFIX}${resource}`, JSON.stringify(value));
}

function requireDemoSession() {
  if (!hasDemoSession()) throw new Error("Authentication required");
}

function demoList(resource: string): ListResult {
  requireDemoSession();
  const items = readItems(resource);
  return { items, pagination: { page: 1, limit: items.length, total: items.length, pages: 1 } };
}

function demoDashboard() {
  requireDemoSession();
  return {
    totalServices: readItems("services").length,
    totalProjects: readItems("projects").length,
    totalVideos: readItems("videos").length,
    totalInsights: readItems("insights").length,
    totalTestimonials: readItems("testimonials").length,
    totalEnquiries: readItems("enquiries").length
  };
}

async function withDemoFallback<T>(remote: () => Promise<T>, demo: () => T | Promise<T>) {
  try {
    return await remote();
  } catch {
    return demo();
  }
}

export const adminApi = {
  login: (payload: { email: string; password: string }) => withDemoFallback(
    () => adminRequest<{ admin: { email: string } }>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
    () => {
      if (payload.email.trim().toLowerCase() !== DEMO_EMAIL || payload.password !== demoPassword()) {
        throw new Error("Invalid credentials");
      }
      setDemoSession(true);
      return { admin: { email: DEMO_EMAIL } };
    }
  ),
  logout: () => withDemoFallback(
    () => adminRequest("/auth/logout", { method: "POST" }),
    () => {
      setDemoSession(false);
      return {};
    }
  ),
  me: () => withDemoFallback(
    () => adminRequest<{ admin: { email: string } }>("/auth/me"),
    () => {
      requireDemoSession();
      return { admin: { email: DEMO_EMAIL } };
    }
  ),
  changePassword: (payload: { currentPassword: string; newPassword: string }) => withDemoFallback(
    () => adminRequest("/auth/change-password", { method: "POST", body: JSON.stringify(payload) }),
    () => {
      requireDemoSession();
      if (payload.currentPassword !== demoPassword()) throw new Error("Invalid credentials");
      if (hasStorage()) window.localStorage.setItem(PASSWORD_KEY, payload.newPassword);
      setDemoSession(false);
      return {};
    }
  ),
  dashboard: () => withDemoFallback(() => adminRequest<Record<string, unknown>>("/admin/dashboard"), demoDashboard),
  list: (resource: string) => withDemoFallback(() => adminRequest<ListResult>(`/admin/${resource}`), () => demoList(resource)),
  create: (resource: string, payload: Record<string, unknown>) => withDemoFallback(
    () => adminRequest(`/admin/${resource}`, { method: "POST", body: JSON.stringify(payload) }),
    () => {
      requireDemoSession();
      const items = readItems(resource);
      const item = { ...payload, _id: `demo-${Date.now()}` };
      writeItems(resource, [item, ...items]);
      return item;
    }
  ),
  update: (resource: string, id: string, payload: Record<string, unknown>) => withDemoFallback(
    () => adminRequest(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    () => {
      requireDemoSession();
      const items = readItems(resource).map((item) => String(item._id) === id ? { ...item, ...payload, _id: id } : item);
      writeItems(resource, items);
      return items.find((item) => String(item._id) === id) ?? payload;
    }
  ),
  remove: (resource: string, id: string) => withDemoFallback(
    () => adminRequest(`/admin/${resource}/${id}`, { method: "DELETE" }),
    () => {
      requireDemoSession();
      writeItems(resource, readItems(resource).filter((item) => String(item._id) !== id));
      return {};
    }
  ),
  updateSingleton: (resource: string, payload: Record<string, unknown>) => withDemoFallback(
    () => adminRequest(`/admin/${resource}`, { method: "PUT", body: JSON.stringify(payload) }),
    () => {
      requireDemoSession();
      writeSingleton(resource, payload);
      return payload;
    }
  ),
  enquiries: () => withDemoFallback(() => adminRequest<ListResult>("/admin/enquiries"), () => demoList("enquiries")),
  updateEnquiryStatus: (id: string, status: string) => withDemoFallback(
    () => adminRequest(`/admin/enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    () => {
      requireDemoSession();
      const items = readItems("enquiries").map((item) => String(item._id) === id ? { ...item, status } : item);
      writeItems("enquiries", items);
      return items.find((item) => String(item._id) === id) ?? {};
    }
  ),
  uploadImage: (file: File) => {
    const data = new FormData();
    data.append("image", file);
    return withDemoFallback(
      () => adminRequest<{ url: string; optimizedUrl: string; fileId: string; alt: string; originalSize: number; optimizedSize: number; savedBytes: number }>("/admin/media/images", { method: "POST", body: data }),
      () => demoUpload(file, "Image saved in demo mode.")
    );
  },
  uploadVideo: (file: File) => {
    const data = new FormData();
    data.append("video", file);
    return withDemoFallback(
      () => adminRequest<{ url: string; optimizedUrl: string; fileId: string; alt: string; originalSize: number; optimizedSize: number; savedBytes: number; note?: string }>("/admin/media/videos", { method: "POST", body: data }),
      () => ({ ...demoUpload(file, "Video saved in demo mode."), note: "Demo mode uses a temporary browser URL until the API is connected." })
    );
  },
  getSingleton: (resource: string) => readSingleton(resource)
};

function demoUpload(file: File, alt: string) {
  const url = URL.createObjectURL(file);
  return {
    url,
    optimizedUrl: url,
    fileId: `demo-${Date.now()}`,
    alt,
    originalSize: file.size,
    optimizedSize: file.size,
    savedBytes: 0
  };
}

const demoSeeds: Record<string, Record<string, unknown>[]> = {
  services: [
    { _id: "demo-service-1", title: "Digital Marketing", slug: "digital-marketing", shortDescription: "Digital strategy built around your business.", category: "Growth", description: "Campaign planning, positioning and channel execution." }
  ],
  projects: [
    { _id: "demo-project-1", title: "Brand Growth Campaign", slug: "brand-growth-campaign", client: "Local retail brand", category: "Digital Marketing", year: "2026", shortDescription: "A focused campaign system for digital presence." }
  ],
  videos: [
    { _id: "demo-video-1", title: "Campaign Showreel", slug: "campaign-showreel", category: "Brand Video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Sample campaign video entry." }
  ],
  testimonials: [
    { _id: "demo-testimonial-1", clientName: "Demo CMS Client", designation: "Business Owner", company: "Demo Company", testimonial: "Replace this testimonial from the admin panel." }
  ],
  team: [
    { _id: "demo-team-1", name: "Maithil Digitals Team", designation: "Strategy, creative and growth", bio: "Demo team profile.", linkedin: "" }
  ],
  statistics: [
    { _id: "demo-stat-1", label: "Services", value: "10+", description: "Demo statistic controlled by CMS.", icon: "chart" }
  ],
  insights: [
    { _id: "demo-insight-1", title: "Digital Marketing Trends", slug: "digital-marketing-trends", excerpt: "A practical note on clear strategy.", category: "Digital Marketing", content: "Demo article content." }
  ],
  faqs: [
    { _id: "demo-faq-1", question: "What services do you provide?", answer: "Digital marketing, SEO, social media, branding, websites and video support.", category: "General", sortOrder: 1 }
  ],
  enquiries: [
    { _id: "demo-enquiry-1", name: "Demo Visitor", email: "visitor@example.com", phone: "9999999999", status: "new", message: "This is a demo enquiry." }
  ]
};

const demoSingletons: Record<string, Record<string, unknown>> = {
  settings: { siteName: "Maithil Digitals", email: DEMO_EMAIL, phone: ["9917006983", "9625643209"] },
  home: { heroTitle: "Maithil Digitals", heroSubtitle: "Digital marketing, creative and web experiences." },
  about: { title: "About Maithil Digitals", description: "Demo about page content." },
  seo: { title: "Maithil Digitals", description: "Demo SEO settings.", robots: "index,follow" }
};
