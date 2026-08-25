import { useEffect, useMemo, useState } from "react";
import { faqs, insights, packageCategories, packages, projects, services, settings, stats, team, testimonials, videos } from "../data/fallback";
import type { FAQ, Insight, PackageCategory, PackagePlan, Project, SEO, SeoMap, Service, SiteSettings, Stat, TeamMember, Testimonial, VideoItem } from "../types/content";

const STORE_PREFIX = "md_demo_admin_";
const CONTENT_EVENT = "md-content-updated";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://maithil-digitals.onrender.com/api";

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(`${STORE_PREFIX}${key}`);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

function image(src?: unknown, alt?: unknown) {
  if (src && typeof src === "object" && ("src" in src || "url" in src)) {
    const media = src as { src?: unknown; alt?: unknown; url?: unknown };
    return image(media.src ?? media.url, media.alt ?? alt);
  }
  return {
    src: typeof src === "string" && src ? src : "/brand/logo.jpg.jpeg",
    alt: typeof alt === "string" && alt ? alt : "Maithil Digitals"
  };
}

function list(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function seoFrom(record: Record<string, unknown>, fallback: SEO): SEO {
  return {
    title: text(record.metaTitle ?? record.seoTitle ?? record.title, fallback.title),
    description: text(record.metaDescription ?? record.seoDescription ?? record.description, fallback.description),
    canonical: text(record.canonical, fallback.canonical ?? ""),
    image: text(record.ogImage ?? record.imageUrl, fallback.image ?? ""),
    robots: text(record.robots, fallback.robots ?? "index,follow")
  };
}

function normalizeService(record: Record<string, unknown>, index: number): Service {
  const fallback = services[index] ?? services[0];
  const title = text(record.title, fallback.title);
  const media = record.imageUrl ?? record.featuredImage;
  return {
    ...fallback,
    number: text(record.number, String(index + 1).padStart(2, "0")),
    title,
    slug: text(record.slug, title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    description: text(record.shortDescription ?? record.description, fallback.description),
    tags: list(record.tags).length ? list(record.tags) : list(record.features).length ? list(record.features) : fallback.tags,
    cta: text(record.cta, fallback.cta ?? "Explore service"),
    includes: list(record.includes).length ? list(record.includes) : list(record.features).length ? list(record.features) : fallback.includes,
    image: media ? image(media, `${title} visual`) : fallback.image,
    videoUrl: text(record.videoUrl, fallback.videoUrl ?? ""),
    overview: text(record.overview ?? record.description, fallback.overview),
    problems: list(record.problems).length ? list(record.problems) : fallback.problems,
    approach: list(record.approach).length ? list(record.approach) : fallback.approach,
    capabilities: list(record.capabilities).length ? list(record.capabilities) : fallback.capabilities,
    faq: Array.isArray(record.faq) && record.faq.length ? (record.faq as Record<string, unknown>[]).map((item, itemIndex) => normalizeFaq(item, itemIndex)) : fallback.faq,
    seo: seoFrom(record, fallback.seo)
  };
}

function normalizeProject(record: Record<string, unknown>, index: number): Project {
  const fallback = projects[index] ?? projects[0];
  const title = text(record.title, fallback.title);
  const media = record.imageUrl ?? record.heroImage;
  return {
    ...fallback,
    number: text(record.number, String(index + 1).padStart(2, "0")),
    title,
    slug: text(record.slug, title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    client: text(record.client, fallback.client),
    category: text(record.category, fallback.category),
    year: text(record.year, fallback.year),
    image: media ? image(media, `${title} visual`) : fallback.image,
    summary: text(record.shortDescription ?? record.summary, fallback.summary),
    challenge: text(record.challenge, fallback.challenge),
    strategy: text(record.strategy, fallback.strategy),
    execution: text(record.execution, fallback.execution),
    deliverables: list(record.deliverables).length ? list(record.deliverables) : fallback.deliverables,
    videoUrl: text(record.videoUrl, fallback.videoUrl ?? ""),
    seo: seoFrom(record, fallback.seo)
  };
}

function normalizeVideo(record: Record<string, unknown>, index: number): VideoItem {
  const fallback = videos[index] ?? videos[0];
  const title = text(record.title, fallback.title);
  const media = record.thumbnailUrl ?? record.imageUrl ?? record.thumbnail;
  return {
    ...fallback,
    title,
    slug: text(record.slug, title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    category: text(record.category, fallback.category),
    description: text(record.description, fallback.description),
    thumbnail: media ? image(media, `${title} thumbnail`) : fallback.thumbnail,
    duration: text(record.duration, fallback.duration ?? ""),
    publishDate: text(record.publishDate, fallback.publishDate),
    videoUrl: text(record.videoUrl, fallback.videoUrl),
    seo: seoFrom(record, fallback.seo)
  };
}

function normalizeFaq(record: Record<string, unknown>, index: number): FAQ {
  const fallback = faqs[index] ?? faqs[0];
  return {
    question: text(record.question, fallback.question),
    answer: text(record.answer, fallback.answer)
  };
}

function normalizeStat(record: Record<string, unknown>, index: number): Stat {
  const fallback = stats[index] ?? stats[0];
  return {
    value: text(record.value, fallback.value),
    label: text(record.label, fallback.label)
  };
}

function normalizeTestimonial(record: Record<string, unknown>, index: number): Testimonial {
  const fallback = testimonials[index] ?? {
    name: "Client",
    designation: "Business Owner",
    company: "Maithil Digitals client",
    testimonial: "",
    photo: image("", "Client photo")
  };
  const name = text(record.clientName ?? record.name, fallback.name);
  return {
    name,
    designation: text(record.designation, fallback.designation),
    company: text(record.company, fallback.company),
    testimonial: text(record.testimonial, fallback.testimonial),
    rating: Number(record.rating ?? fallback.rating ?? 5),
    photo: image(record.photo, `${name} photo`)
  };
}

function normalizeTeamMember(record: Record<string, unknown>, index: number): TeamMember {
  const fallback = team[index] ?? team[0];
  const name = text(record.name, fallback.name);
  return {
    name,
    role: text(record.role ?? record.designation ?? record.bio, fallback.role),
    photo: image(record.photo, `${name} photo`)
  };
}

function normalizeInsight(record: Record<string, unknown>, index: number): Insight {
  const fallback = insights[index] ?? insights[0];
  const title = text(record.title, fallback.title);
  const content = text(record.content ?? record.body, fallback.body.join("\n\n"));
  return {
    ...fallback,
    title,
    slug: text(record.slug, title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    category: text(record.category, fallback.category),
    excerpt: text(record.excerpt, fallback.excerpt),
    author: text(record.author, fallback.author),
    publishDate: text(record.publishDate, fallback.publishDate).slice(0, 10),
    readTime: text(record.readTime, fallback.readTime),
    image: image(record.featuredImage ?? record.imageUrl, `${title} visual`),
    body: content.split(/\n{2,}|\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
    seo: seoFrom(record, fallback.seo)
  };
}

function readSettings(): SiteSettings {
  const stored = readStored<Record<string, unknown>>("settings", {});
  const contact = typeof stored.contact === "object" && stored.contact ? stored.contact as Record<string, unknown> : {};
  const social = typeof stored.social === "object" && stored.social ? stored.social as Record<string, unknown> : {};
  const footer = typeof stored.footer === "object" && stored.footer ? stored.footer as Record<string, unknown> : {};
  return {
    ...settings,
    siteName: text(stored.siteName ?? stored.companyName, settings.siteName),
    tagline: text(stored.tagline, settings.tagline ?? "Your Digital Identity"),
    email: text(stored.email ?? contact.email, settings.email),
    whatsapp: text(stored.whatsapp ?? contact.whatsapp ?? contact.phone1, settings.whatsapp ?? settings.phone[0]),
    address: text(stored.address ?? contact.address, settings.address),
    footerDescription: text(stored.footerDescription ?? footer.description, settings.footerDescription),
    phone: list(stored.phone).length ? list(stored.phone) : [contact.phone1, contact.phone2].map(String).filter(Boolean).length ? [contact.phone1, contact.phone2].map(String).filter(Boolean) : settings.phone,
    socials: settings.socials.map((item) => ({ ...item, url: text(stored[`${item.label.toLowerCase()}Url`] ?? social[item.label.toLowerCase()], item.url) })),
    seo: seoFrom(stored, settings.seo)
  };
}

function normalizePackage(record: Record<string, unknown>, index: number): PackagePlan {
  const fallback = packages[index] ?? packages[0];
  return {
    name: text(record.name ?? record.title, fallback.name),
    label: text(record.label, fallback.label),
    description: text(record.description, fallback.description),
    badge: text(record.badge, fallback.badge ?? ""),
    cta: text(record.cta, fallback.cta),
    features: list(record.features).length ? list(record.features) : fallback.features
  };
}

function normalizePackageCategory(record: Record<string, unknown>, index: number): PackageCategory {
  const fallback = packageCategories[index] ?? packageCategories[0];
  return {
    title: text(record.title ?? record.name, fallback.title),
    description: text(record.description, fallback.description),
    services: list(record.services).length ? list(record.services) : fallback.services
  };
}

function readSeoMap() {
  return readStored<Record<string, SEO>>("seo", {});
}

function seoMapFrom(value?: Record<string, unknown>): SeoMap {
  const remoteSeo = value?.seo;
  if (remoteSeo && typeof remoteSeo === "object") return remoteSeo as SeoMap;
  return readSeoMap();
}

export function pageSeo(key: string, fallback: SEO) {
  return readSeoMap()[key] ?? fallback;
}

async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE_URL) return fallback;
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) return fallback;
    const json = await response.json() as { success?: boolean; data?: unknown };
    return (json && typeof json === "object" && "data" in json ? json.data : json) as T;
  } catch {
    return fallback;
  }
}

function itemsFrom(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value as Record<string, unknown>[];
  if (value && typeof value === "object" && Array.isArray((value as { items?: unknown }).items)) return (value as { items: Record<string, unknown>[] }).items;
  return [];
}

export function useContent() {
  const [version, setVersion] = useState(0);
  const [remote, setRemote] = useState<{
    settings?: Record<string, unknown>;
    services?: Record<string, unknown>[];
    projects?: Record<string, unknown>[];
    videos?: Record<string, unknown>[];
    packages?: Record<string, unknown>[];
    packageCategories?: Record<string, unknown>[];
    faqs?: Record<string, unknown>[];
    stats?: Record<string, unknown>[];
    testimonials?: Record<string, unknown>[];
    team?: Record<string, unknown>[];
    insights?: Record<string, unknown>[];
  }>({});

  useEffect(() => {
    const refresh = () => setVersion((value) => value + 1);
    window.addEventListener("storage", refresh);
    window.addEventListener(CONTENT_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(CONTENT_EVENT, refresh);
    };
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchApi<Record<string, unknown> | null>("/settings", null),
      fetchApi<unknown>("/services?limit=100", null),
      fetchApi<unknown>("/projects?limit=100", null),
      fetchApi<unknown>("/videos?limit=100", null),
      fetchApi<unknown>("/packages", null),
      fetchApi<unknown>("/faqs", null),
      fetchApi<unknown>("/statistics", null),
      fetchApi<unknown>("/testimonials", null),
      fetchApi<unknown>("/team", null),
      fetchApi<unknown>("/insights?limit=100", null)
    ]).then(([remoteSettings, remoteServices, remoteProjects, remoteVideos, remotePackages, remoteFaqs, remoteStats, remoteTestimonials, remoteTeam, remoteInsights]) => {
      if (!active) return;
      const packageConfig = remotePackages && typeof remotePackages === "object" ? remotePackages as { items?: Record<string, unknown>[]; categories?: Record<string, unknown>[] } : {};
      setRemote({
        settings: remoteSettings ?? undefined,
        services: itemsFrom(remoteServices),
        projects: itemsFrom(remoteProjects),
        videos: itemsFrom(remoteVideos),
        packages: packageConfig.items ?? itemsFrom(remotePackages),
        packageCategories: packageConfig.categories ?? [],
        faqs: itemsFrom(remoteFaqs),
        stats: itemsFrom(remoteStats),
        testimonials: itemsFrom(remoteTestimonials),
        team: itemsFrom(remoteTeam),
        insights: itemsFrom(remoteInsights)
      });
    });
    return () => { active = false; };
  }, [version]);

  return useMemo(() => {
    const storedServices = readStored<Record<string, unknown>[]>("services", []);
    const storedProjects = readStored<Record<string, unknown>[]>("projects", []);
    const storedVideos = readStored<Record<string, unknown>[]>("videos", []);
    const storedFaqs = readStored<Record<string, unknown>[]>("faqs", []);
    const storedStats = readStored<Record<string, unknown>[]>("statistics", []);
    const storedTestimonials = readStored<Record<string, unknown>[]>("testimonials", []);
    const storedTeam = readStored<Record<string, unknown>[]>("team", []);
    const storedInsights = readStored<Record<string, unknown>[]>("insights", []);
    const storedPackages = readStored<{ items?: Record<string, unknown>[] }>("packages", {});
    const storedPackageCategories = readStored<{ items?: Record<string, unknown>[] }>("packageCategories", {});
    const serviceRecords = storedServices.length ? storedServices : remote.services?.length ? remote.services : [];
    const projectRecords = storedProjects.length ? storedProjects : remote.projects?.length ? remote.projects : [];
    const videoRecords = storedVideos.length ? storedVideos : remote.videos?.length ? remote.videos : [];
    const faqRecords = storedFaqs.length ? storedFaqs : remote.faqs?.length ? remote.faqs : [];
    const statRecords = storedStats.length ? storedStats : remote.stats?.length ? remote.stats : [];
    const testimonialRecords = storedTestimonials.length ? storedTestimonials : remote.testimonials?.length ? remote.testimonials : [];
    const teamRecords = storedTeam.length ? storedTeam : remote.team?.length ? remote.team : [];
    const insightRecords = storedInsights.length ? storedInsights : remote.insights?.length ? remote.insights : [];
    const packageRecords = storedPackages.items?.length ? storedPackages.items : remote.packages?.length ? remote.packages : [];
    const categoryRecords = storedPackageCategories.items?.length ? storedPackageCategories.items : remote.packageCategories?.length ? remote.packageCategories : [];

    return {
      settings: remote.settings ? readSettingsFrom(remote.settings) : readSettings(),
      services: serviceRecords.length ? serviceRecords.map(normalizeService) : services,
      projects: projectRecords.length ? projectRecords.map(normalizeProject) : projects,
      videos: videoRecords.length ? videoRecords.map(normalizeVideo) : videos,
      packages: packageRecords.length ? packageRecords.map(normalizePackage) : packages,
      packageCategories: categoryRecords.length ? categoryRecords.map(normalizePackageCategory) : packageCategories,
      faqs: faqRecords.length ? faqRecords.map(normalizeFaq) : faqs,
      stats: statRecords.length ? statRecords.map(normalizeStat) : stats,
      testimonials: testimonialRecords.length ? testimonialRecords.map(normalizeTestimonial).filter((item) => item.testimonial) : testimonials,
      team: teamRecords.length ? teamRecords.map(normalizeTeamMember) : team,
      insights: insightRecords.length ? insightRecords.map(normalizeInsight) : insights,
      seo: seoMapFrom(remote.settings)
    };
  }, [remote, version]);
}

function readSettingsFrom(value: Record<string, unknown>) {
  const existing = typeof window !== "undefined" ? window.localStorage.getItem(`${STORE_PREFIX}settings`) : null;
  if (existing) return readSettings();
  return readSettingsWith(value);
}

function readSettingsWith(value: Record<string, unknown>): SiteSettings {
  const key = `${STORE_PREFIX}settings`;
  if (typeof window !== "undefined") {
    const previous = window.localStorage.getItem(key);
    window.localStorage.setItem(key, JSON.stringify(value));
    const result = readSettings();
    if (previous) window.localStorage.setItem(key, previous);
    else window.localStorage.removeItem(key);
    return result;
  }
  return settings;
}
