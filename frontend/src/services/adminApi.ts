const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://maithil-digitals.onrender.com/api";
const DEMO_EMAIL = "maithildigitals@gmail.com";
const DEMO_PASSWORD = "maithildigitals@108";
const SESSION_KEY = "md_demo_admin_session";
const PASSWORD_KEY = "md_demo_admin_password";
const STORE_PREFIX = "md_demo_admin_";
const CONTENT_EVENT = "md-content-updated";

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
  window.dispatchEvent(new Event(CONTENT_EVENT));
}

function readSingleton(resource: string) {
  if (!hasStorage()) return demoSingletons[resource] ?? {};
  const key = `${STORE_PREFIX}${resource}`;
  const stored = window.localStorage.getItem(key);
  if (stored) {
    const parsed = JSON.parse(stored) as Record<string, unknown>;
    if (resource === "seo" && !("home" in parsed) && !("services" in parsed)) return demoSingletons.seo;
    return { ...(demoSingletons[resource] ?? {}), ...parsed };
  }

  const seeded = demoSingletons[resource] ?? {};
  window.localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
}

function writeSingleton(resource: string, value: Record<string, unknown>) {
  if (!hasStorage()) return;
  window.localStorage.setItem(`${STORE_PREFIX}${resource}`, JSON.stringify(value));
  window.dispatchEvent(new Event(CONTENT_EVENT));
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
    () => adminRequest(`/admin/${resource}`, { method: "POST", body: JSON.stringify(toApiPayload(resource, payload)) }),
    () => {
      requireDemoSession();
      const items = readItems(resource);
      const item = { ...payload, _id: `demo-${Date.now()}` };
      writeItems(resource, [item, ...items]);
      return item;
    }
  ),
  update: (resource: string, id: string, payload: Record<string, unknown>) => withDemoFallback(
    () => adminRequest(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(toApiPayload(resource, payload)) }),
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
    () => adminRequest(`/admin/${resource}`, { method: "PUT", body: JSON.stringify(toApiSingletonPayload(resource, payload)) }),
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
    { _id: "demo-service-1", title: "Social Media Management", slug: "social-media-management", shortDescription: "We manage your social media presence from strategy to publishing.", category: "Social Media", cta: "Explore Social Media", includes: "Content planning, Instagram management, Facebook management, Captions and hashtags, Posting and scheduling", tags: "Instagram, Facebook, Strategy" }
  ],
  projects: [
    { _id: "demo-project-1", title: "Restaurant Content System", slug: "restaurant-content-system", client: "Restaurant Project", category: "Food Photography", year: "2026", shortDescription: "Social media management, food photography and reels for a local restaurant.", status: "published" }
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
    { _id: "demo-enquiry-1", name: "Demo Visitor", email: "visitor@example.com", phone: "9999999999", businessName: "Demo Business", businessType: "Local Business", servicesRequired: "Complete Digital Marketing", status: "New", message: "This is a demo enquiry." }
  ]
};

const demoSingletons: Record<string, Record<string, unknown>> = {
  settings: {
    siteName: "Maithil Digitals",
    tagline: "Your Digital Identity",
    email: DEMO_EMAIL,
    phone: ["9917006983", "9625643209"],
    whatsapp: "9917006983",
    address: "Kosi Kalan, Mathura, Uttar Pradesh, India",
    footerDescription: "Strategy. Content. Creativity. Growth. We help businesses build a digital presence that looks professional, connects with their audience and helps them grow.",
    instagramUrl: "https://instagram.com/",
    facebookUrl: "https://facebook.com/",
    whatsappUrl: "https://wa.me/919917006983",
    emailUrl: "mailto:maithildigitals@gmail.com"
  },
  packages: {
    items: [
      { name: "Local Launch", label: "For new and local businesses starting professionally.", description: "A clean monthly presence plan with content direction, basic creatives and consistent posting for Indian local brands.", price: "From Rs. 14,999/month", category: "Other Local Businesses", timeline: "30 days", bestFor: "Clinics, shops, coaching centers and local service brands", cta: "View Package", features: ["Monthly content calendar", "12 static creatives", "4 short reels edits", "Basic profile optimization", "Monthly performance note"] },
      { name: "Growth Campaign", label: "For businesses ready to build regular visibility.", description: "A stronger content and marketing rhythm with shoot planning, reels, ad creatives and monthly reporting.", badge: "Most Popular", price: "From Rs. 29,999/month", category: "Restaurants & Cafes", timeline: "30 days", bestFor: "Restaurants, cafes, salons, boutiques and retail businesses", cta: "View Package", features: ["Monthly strategy plan", "16 social creatives", "8 reels edits", "1 content shoot direction", "Meta ad creative set", "Performance review"] },
      { name: "Premium Presence", label: "For brands that need a complete digital system.", description: "A full-service monthly package across visual production, content, campaigns, creative direction and lead-focused ads.", price: "From Rs. 54,999/month", category: "Schools", timeline: "45 days", bestFor: "Schools, real estate, hotels, jewellery and premium local brands", cta: "Talk To Us", features: ["Brand content strategy", "24 social creatives", "12 reels edits", "Campaign landing direction", "Meta ads management", "Monthly analytics deck"] },
      { name: "Admission Builder", label: "For schools and institutes running admission campaigns.", description: "Trust-building communication, parent-focused creatives, event coverage and enquiry campaigns for education brands.", price: "From Rs. 37,999/month", category: "Schools", timeline: "45 days", bestFor: "Schools, colleges, play schools and coaching institutes", cta: "View Package", features: ["Admission campaign plan", "Parent trust creatives", "Event coverage edits", "10 reels/video snippets", "Lead ad creative set", "Weekly campaign review"] },
      { name: "Property Lead Kit", label: "For real estate projects that need premium enquiries.", description: "Property visuals, walkthrough reels, listing creatives and lead-generation assets built for Indian real estate buyers.", price: "From Rs. 44,999/month", category: "Real Estate", timeline: "30-45 days", bestFor: "Builders, brokers, plotted developments and rental brands", cta: "View Package", features: ["Property shoot direction", "Walkthrough reels", "Listing creative set", "Offer campaign assets", "Lead ad creative pack", "WhatsApp enquiry flow"] },
      { name: "Product Prestige", label: "For product-led brands that need premium visuals.", description: "Product photography direction, launch creatives, reels and trust-building content for jewellery, fashion and ecommerce brands.", price: "From Rs. 39,999/month", category: "Jewellery", timeline: "30 days", bestFor: "Jewellery, fashion, beauty products and boutique launches", cta: "View Package", features: ["Product shoot plan", "Launch creative set", "8 reels edits", "Catalog-style social posts", "Offer creatives", "Brand story captions"] }
    ]
  },
  seo: {
    home: { title: "Maithil Digitals | Digital Marketing, Content Creation & Photography", description: "Maithil Digitals helps businesses in Mathura, Kosi and nearby areas build a professional digital identity through social media, reels, photography, branding and digital advertising.", robots: "index,follow" },
    services: { title: "Services | Maithil Digitals", description: "Explore digital marketing, SEO, social media, advertising, branding, web design and video production services.", robots: "index,follow" },
    work: { title: "Selected Work | Maithil Digitals", description: "Explore brand, campaign, website and video work by Maithil Digitals.", robots: "index,follow" },
    videos: { title: "Videos | Maithil Digitals", description: "Watch campaign videos, brand videos and social media content by Maithil Digitals.", robots: "index,follow" },
    contact: { title: "Contact Maithil Digitals", description: "Start a project with Maithil Digitals in Kosi Kalan, Mathura.", robots: "index,follow" }
  }
};

function mediaFrom(url: unknown, alt: unknown) {
  return typeof url === "string" && url.trim() ? { src: url.trim(), alt: typeof alt === "string" ? alt : "Maithil Digitals media" } : undefined;
}

function toArray(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function toFaqItems(value: unknown) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value.split(/\n+/).map((line) => {
    const [question, ...answerParts] = line.split("|");
    return { question: question?.trim(), answer: answerParts.join("|").trim() };
  }).filter((item) => item.question && item.answer);
}

function toApiPayload(resource: string, payload: Record<string, unknown>) {
  if (resource === "services") {
    return {
      ...payload,
      featuredImage: mediaFrom(payload.imageUrl, payload.title),
      includes: toArray(payload.includes),
      features: toArray(payload.includes).length ? toArray(payload.includes) : toArray(payload.tags),
      problems: toArray(payload.problems),
      approach: toArray(payload.approach),
      capabilities: toArray(payload.capabilities),
      faq: toFaqItems(payload.faq),
      isActive: payload.isActive ?? true
    };
  }
  if (resource === "projects") {
    return {
      ...payload,
      heroImage: mediaFrom(payload.imageUrl, payload.title),
      imageUrl: payload.imageUrl,
      deliverables: toArray(payload.deliverables),
      status: payload.status ?? "published"
    };
  }
  if (resource === "videos") {
    return {
      ...payload,
      thumbnail: mediaFrom(payload.thumbnailUrl ?? payload.imageUrl, payload.title),
      isPublished: payload.isPublished ?? true
    };
  }
  if (resource === "insights") {
    return {
      ...payload,
      featuredImage: mediaFrom(payload.imageUrl, payload.title),
      tags: toArray(payload.tags),
      status: payload.status ?? "published"
    };
  }
  if (resource === "testimonials") {
    return {
      ...payload,
      photo: mediaFrom(payload.imageUrl, payload.clientName ?? payload.name),
      rating: Number(payload.rating || 5),
      isPublished: payload.isPublished ?? true
    };
  }
  if (resource === "team") {
    return {
      ...payload,
      photo: mediaFrom(payload.imageUrl, payload.name),
      isActive: payload.isActive ?? true
    };
  }
  if (resource === "statistics") {
    return {
      ...payload,
      sortOrder: Number(payload.sortOrder || 0),
      isActive: payload.isActive ?? true
    };
  }
  if (resource === "faqs") {
    return {
      ...payload,
      sortOrder: Number(payload.sortOrder || 0),
      isPublished: payload.isPublished ?? true
    };
  }
  return payload;
}

function toApiSingletonPayload(resource: string, payload: Record<string, unknown>) {
  if (resource === "packages") {
    const items = Array.isArray(payload.items) ? payload.items as Record<string, unknown>[] : [];
    const categories = Array.isArray(payload.categories) ? payload.categories as Record<string, unknown>[] : [];
    return {
      items: items.map((item) => ({ ...item, features: toArray(item.features) })),
      categories: categories.map((category) => ({ ...category, services: toArray(category.services) }))
    };
  }
  if (resource !== "settings") return payload;
  const phone = toArray(payload.phone);
  return {
    companyName: payload.siteName,
    tagline: payload.tagline,
    shortDescription: payload.footerDescription,
    contact: {
      address: payload.address,
      phone1: phone[0] ?? "",
      phone2: phone[1] ?? "",
      email: payload.email,
      whatsapp: payload.whatsapp
    },
    social: {
      instagram: payload.instagramUrl,
      facebook: payload.facebookUrl,
      whatsapp: payload.whatsappUrl,
      email: payload.emailUrl
    },
    footer: {
      description: payload.footerDescription
    }
  };
}
