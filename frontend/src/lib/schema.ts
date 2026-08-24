import type { FAQ, Insight, Service, SiteSettings } from "../types/content";

export const organizationSchema = (settings: SiteSettings) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: settings.siteName,
  image: settings.logo.src,
  telephone: settings.phone,
  email: settings.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kosi Kalan",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN"
  }
});

export const serviceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.description,
  provider: { "@type": "LocalBusiness", name: "Maithil Digitals" }
});

export const articleSchema = (insight: Insight) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: insight.title,
  description: insight.excerpt,
  image: insight.image.src,
  author: { "@type": "Organization", name: insight.author },
  datePublished: insight.publishDate
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer }
  }))
});
