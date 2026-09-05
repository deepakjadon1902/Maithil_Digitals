export type SEO = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  robots?: string;
};

export type Media = {
  src: string;
  alt: string;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  logo: Media;
  phone: string[];
  whatsapp?: string;
  email: string;
  address: string;
  socials: { label: string; url: string }[];
  footerDescription: string;
  seo: SEO;
};

export type SeoMap = Record<string, SEO>;

export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  cta?: string;
  includes?: string[];
  image: Media;
  videoUrl?: string;
  overview: string;
  problems: string[];
  approach: string[];
  capabilities: string[];
  faq: FAQ[];
  seo: SEO;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: Media;
  summary: string;
  result?: string;
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  gallery: Media[];
  videoUrl?: string;
  seo: SEO;
};

export type VideoItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: Media;
  duration?: string;
  publishDate: string;
  videoUrl: string;
  seo: SEO;
};

export type Testimonial = {
  name: string;
  designation: string;
  company: string;
  photo: Media;
  testimonial: string;
  rating?: number;
};

export type TeamMember = {
  name: string;
  role: string;
  photo: Media;
};

export type Stat = {
  value: string;
  label: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: Media;
  body: string[];
  seo: SEO;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  businessName?: string;
  businessType?: string;
  service?: string;
  servicesRequired?: string;
  budget?: string;
  message: string;
};

export type PackagePlan = {
  name: string;
  label: string;
  description: string;
  badge?: string;
  price?: string;
  category?: string;
  timeline?: string;
  bestFor?: string;
  cta: string;
  features: string[];
};

export type PackageCategory = {
  title: string;
  description: string;
  services: string[];
};

export type Industry = {
  title: string;
  description: string;
};
