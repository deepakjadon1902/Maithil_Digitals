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
  logo: Media;
  phone: string[];
  email: string;
  address: string;
  socials: { label: string; url: string }[];
  footerDescription: string;
  seo: SEO;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: Media;
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
  service?: string;
  budget?: string;
  message: string;
};
