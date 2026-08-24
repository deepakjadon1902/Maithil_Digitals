import type { FAQ, Insight, Project, Service, SiteSettings, Stat, TeamMember, Testimonial, VideoItem } from "../types/content";

const img = (seed: string, alt: string) => ({
  src: `https://ik.imagekit.io/maithildigitals/tr:w-1400,fo-auto/${seed}.jpg`,
  alt
});

export const settings: SiteSettings = {
  siteName: "Maithil Digitals",
  logo: { src: "/brand/logo.jpg.jpeg", alt: "Maithil Digitals logo" },
  phone: ["9917006983", "9625643209"],
  email: "maithildigitals@gmail.com",
  address: "Kosi Kalan, Mathura, Uttar Pradesh, India",
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "YouTube", url: "https://youtube.com/" }
  ],
  footerDescription: "Premium digital marketing, brand, content and web experiences for businesses ready to grow with clarity.",
  seo: {
    title: "Maithil Digitals | Digital Marketing Agency in Mathura",
    description: "A premium digital marketing agency in Kosi Kalan, Mathura helping brands grow through strategy, creative content, SEO, ads and websites.",
    image: "/brand/logo.jpg.jpeg"
  }
};

export const faqs: FAQ[] = [
  { question: "What services do you provide?", answer: "We provide digital marketing, SEO, paid advertising, social media marketing, content creation, branding, website design and video campaigns." },
  { question: "How does your process work?", answer: "We understand your goals, build a strategy, create the assets, launch the work and keep optimizing from real performance signals." },
  { question: "Do you work with small businesses?", answer: "Yes. The engagement is shaped around your business stage, budget, audience and growth goals." },
  { question: "How can I start a project?", answer: "Use the enquiry form or call the team. We will review your requirements and suggest the right next step." }
];

export const stats: Stat[] = [
  { value: "10+", label: "Services" },
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Commitment" },
  { value: "24/7", label: "Digital Presence" }
];

export const services: Service[] = [
  {
    slug: "digital-marketing",
    number: "01",
    title: "Digital Marketing",
    description: "SEO, social media, campaigns, performance marketing and growth strategy.",
    tags: ["Strategy", "Growth", "Campaigns"],
    image: img("digital-marketing-command-center", "Digital marketing strategy dashboard"),
    overview: "A connected growth system for brands that need stronger reach, better visibility and more meaningful customer journeys.",
    problems: ["Unclear digital positioning", "Scattered campaign execution", "Low quality traffic", "Weak lead conversion"],
    approach: ["Audit the brand and audience", "Create a channel strategy", "Build campaign assets", "Measure, learn and improve"],
    capabilities: ["Funnel planning", "Campaign calendars", "Performance reporting", "Creative direction"],
    faq: faqs.slice(0, 3),
    seo: { title: "Digital Marketing Services | Maithil Digitals", description: "Growth-focused digital marketing strategy, campaigns and performance execution." }
  },
  {
    slug: "social-media-marketing",
    number: "02",
    title: "Social Media Marketing",
    description: "Content strategy, creative campaigns, social presence and audience engagement.",
    tags: ["Social", "Content", "Community"],
    image: img("social-media-campaign-studio", "Social media content planning board"),
    overview: "Social systems that move beyond posting and build a recognizable, consistent brand voice.",
    problems: ["Inconsistent posting", "Low engagement", "Weak creative direction", "No content rhythm"],
    approach: ["Define brand voice", "Plan monthly content", "Create campaign assets", "Review engagement insights"],
    capabilities: ["Content calendars", "Creative posts", "Reels concepts", "Community prompts"],
    faq: faqs.slice(0, 3),
    seo: { title: "Social Media Marketing | Maithil Digitals", description: "Social media strategy, content and creative campaigns for growing brands." }
  },
  {
    slug: "search-engine-optimization",
    number: "03",
    title: "Search Engine Optimization",
    description: "Technical SEO, local SEO, content strategy and organic growth.",
    tags: ["SEO", "Local", "Content"],
    image: img("seo-organic-growth-map", "SEO keyword and growth planning"),
    overview: "Search visibility built through technical health, useful content and local relevance.",
    problems: ["Poor rankings", "Thin content", "Technical site issues", "Weak local discovery"],
    approach: ["Audit the website", "Map keywords", "Improve technical SEO", "Publish useful content"],
    capabilities: ["Technical SEO", "Local SEO", "On-page SEO", "Content briefs"],
    faq: faqs.slice(0, 3),
    seo: { title: "SEO Services | Maithil Digitals", description: "Technical SEO, local SEO and content strategy for sustainable organic growth." }
  },
  {
    slug: "paid-advertising",
    number: "04",
    title: "Paid Advertising",
    description: "Google Ads, Meta Ads and performance-focused advertising campaigns.",
    tags: ["Google Ads", "Meta Ads", "ROI"],
    image: img("paid-advertising-performance", "Paid advertising performance creative"),
    overview: "Conversion-focused ad systems that pair sharp targeting with strong creative and clean measurement.",
    problems: ["Wasted ad spend", "Poor targeting", "Weak landing pages", "No performance feedback"],
    approach: ["Define offers", "Build audiences", "Launch controlled tests", "Optimize budget allocation"],
    capabilities: ["Google Ads", "Meta Ads", "Landing page alignment", "Reporting"],
    faq: faqs.slice(0, 3),
    seo: { title: "Paid Advertising | Maithil Digitals", description: "Google Ads and Meta Ads campaigns designed for measurable growth." }
  },
  {
    slug: "content-creation",
    number: "05",
    title: "Content Creation",
    description: "Creative content, visual storytelling, campaign content and promotional material.",
    tags: ["Creative", "Story", "Design"],
    image: img("content-creation-studio", "Creative content production setup"),
    overview: "Content shaped to make the brand easier to notice, trust and remember.",
    problems: ["Generic visuals", "Weak messaging", "No content system", "Campaign fatigue"],
    approach: ["Clarify message", "Design content themes", "Produce assets", "Package for platforms"],
    capabilities: ["Post creatives", "Campaign visuals", "Copywriting", "Visual storytelling"],
    faq: faqs.slice(0, 3),
    seo: { title: "Content Creation | Maithil Digitals", description: "Campaign content, visual storytelling and promotional creative for digital channels." }
  },
  {
    slug: "branding-and-creative",
    number: "06",
    title: "Branding & Creative",
    description: "Brand identity, visual direction, social creatives and campaign design.",
    tags: ["Brand", "Identity", "Design"],
    image: img("brand-identity-system", "Brand identity boards and design system"),
    overview: "Visual and verbal direction that gives your business a confident, consistent presence.",
    problems: ["Unclear identity", "Inconsistent visuals", "Weak recall", "Unpolished campaigns"],
    approach: ["Discover the brand", "Define the system", "Create key assets", "Document usage"],
    capabilities: ["Identity design", "Creative direction", "Campaign systems", "Brand guidelines"],
    faq: faqs.slice(0, 3),
    seo: { title: "Branding and Creative | Maithil Digitals", description: "Brand identity, visual systems and creative direction for modern businesses." }
  },
  {
    slug: "web-design-development",
    number: "07",
    title: "Web Design & Development",
    description: "Modern, responsive and conversion-focused websites.",
    tags: ["Web", "UX", "Conversion"],
    image: img("website-experience-design", "Premium responsive website interface"),
    overview: "Fast, responsive websites that communicate clearly and guide visitors toward action.",
    problems: ["Outdated website", "Poor mobile experience", "Low enquiry rate", "Slow performance"],
    approach: ["Plan the journey", "Design the interface", "Build responsively", "Optimize launch"],
    capabilities: ["UI design", "React frontend", "Landing pages", "SEO foundations"],
    faq: faqs.slice(0, 3),
    seo: { title: "Web Design and Development | Maithil Digitals", description: "Modern responsive websites built for brand clarity, speed and conversion." }
  },
  {
    slug: "video-production",
    number: "08",
    title: "Video Production",
    description: "Promotional videos, social videos, brand videos and digital campaigns.",
    tags: ["Video", "Reels", "Campaign"],
    image: img("video-production-campaign", "Video production timeline and preview"),
    overview: "Video content designed for digital attention, brand storytelling and campaign performance.",
    problems: ["Low retention", "Weak campaign assets", "No video plan", "Poor story structure"],
    approach: ["Shape the idea", "Plan shots and scripts", "Produce edits", "Publish platform cuts"],
    capabilities: ["Brand videos", "Social videos", "Promo edits", "Video thumbnails"],
    faq: faqs.slice(0, 3),
    seo: { title: "Video Production | Maithil Digitals", description: "Promotional videos and social-first campaign content for digital brands." }
  }
];

export const projects: Project[] = [
  {
    slug: "brand-growth-campaign",
    number: "01",
    title: "Brand Growth Campaign",
    client: "Local retail brand",
    category: "Digital Marketing",
    year: "2026",
    image: img("brand-growth-campaign", "Campaign creative previews"),
    summary: "A focused campaign system for improving digital brand presence and customer recall.",
    challenge: "The brand needed a more consistent digital presence and clearer messaging across platforms.",
    strategy: "We aligned campaign themes, content pillars and conversion paths around the business goals.",
    execution: "Created content packs, platform-specific creatives and a monthly measurement rhythm.",
    deliverables: ["Campaign strategy", "Social creatives", "Content calendar", "Performance review"],
    gallery: [img("brand-growth-campaign-gallery-1", "Campaign gallery visual"), img("brand-growth-campaign-gallery-2", "Social campaign mockup")],
    seo: { title: "Brand Growth Campaign | Maithil Digitals Work", description: "A digital marketing campaign case study by Maithil Digitals." }
  },
  {
    slug: "social-media-transformation",
    number: "02",
    title: "Social Media Transformation",
    client: "Service business",
    category: "Social Media",
    year: "2026",
    image: img("social-media-transformation", "Social media transformation visuals"),
    summary: "A refreshed social presence built around clearer storytelling and consistent creative direction.",
    challenge: "Content looked disconnected and did not communicate the brand's strengths.",
    strategy: "We created repeatable content themes and a sharper visual system.",
    execution: "Produced launch creatives, reels ideas, captions and content rhythm guidance.",
    deliverables: ["Content pillars", "Post templates", "Reels concepts", "Monthly plan"],
    gallery: [img("social-media-transformation-gallery-1", "Social profile preview"), img("social-media-transformation-gallery-2", "Creative grid preview")],
    seo: { title: "Social Media Transformation | Maithil Digitals Work", description: "Social media creative and strategy work by Maithil Digitals." }
  },
  {
    slug: "website-experience",
    number: "03",
    title: "Website Experience",
    client: "Growing business",
    category: "Web Design",
    year: "2026",
    image: img("website-experience", "Responsive website experience"),
    summary: "A modern website experience designed to make services easier to understand and act on.",
    challenge: "Visitors were not finding the right information quickly enough.",
    strategy: "We rebuilt the information architecture around user intent and conversion actions.",
    execution: "Designed responsive pages, clean CTAs and SEO-ready content structure.",
    deliverables: ["UX structure", "Responsive UI", "Frontend build", "Contact flow"],
    gallery: [img("website-experience-gallery-1", "Website desktop preview"), img("website-experience-gallery-2", "Website mobile preview")],
    seo: { title: "Website Experience | Maithil Digitals Work", description: "Responsive website case study by Maithil Digitals." }
  }
];

export const videos: VideoItem[] = [
  {
    slug: "campaign-showreel",
    title: "Campaign Showreel",
    category: "Brand Video",
    description: "A short-format showcase of campaign thinking, creative direction and digital storytelling.",
    thumbnail: img("campaign-showreel-thumbnail", "Campaign showreel thumbnail"),
    duration: "01:24",
    publishDate: "2026-08-01",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    seo: { title: "Campaign Showreel | Maithil Digitals Videos", description: "Watch a Maithil Digitals video showcase." }
  },
  {
    slug: "social-content-system",
    title: "Social Content System",
    category: "Social Media",
    description: "How a consistent content system makes brand communication easier to remember.",
    thumbnail: img("social-content-system-thumbnail", "Social content video thumbnail"),
    duration: "02:08",
    publishDate: "2026-07-18",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    seo: { title: "Social Content System | Maithil Digitals Videos", description: "Social media video content from Maithil Digitals." }
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "CMS managed client",
    designation: "Business Owner",
    company: "Client Company",
    photo: img("testimonial-client", "Client portrait"),
    testimonial: "This testimonial is sample CMS content. Replace it from the admin system before publishing real client claims.",
    rating: 5
  }
];

export const team: TeamMember[] = [
  { name: "Maithil Digitals Team", role: "Strategy, creative and growth", photo: img("maithil-team", "Maithil Digitals team") }
];

export const insights: Insight[] = [
  {
    slug: "digital-marketing-trends",
    title: "Digital Marketing Trends That Reward Clear Strategy",
    category: "Digital Marketing",
    excerpt: "A practical look at why stronger positioning, content systems and measurement matter more than noisy posting.",
    author: "Maithil Digitals",
    publishDate: "2026-08-10",
    readTime: "4 min read",
    image: img("digital-marketing-trends", "Editorial marketing trend visual"),
    body: [
      "Digital growth becomes easier when every channel is connected to a clear business goal. Brands that communicate consistently, measure useful signals and refine their creative systems are better positioned to earn attention.",
      "The strongest campaigns start with audience understanding. Once the audience is clear, content, SEO, social media and paid advertising can work together instead of competing for attention.",
      "For local and regional businesses, the biggest opportunity is often clarity: a stronger website, better search visibility, consistent social proof and direct enquiry paths."
    ],
    seo: { title: "Digital Marketing Trends | Maithil Digitals Insights", description: "Marketing trends and strategy notes from Maithil Digitals." }
  }
];
