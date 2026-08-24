import type { FAQ, Industry, Insight, PackageCategory, PackagePlan, Project, Service, SiteSettings, Stat, TeamMember, Testimonial, VideoItem } from "../types/content";

const imageMap: Record<string, string> = {
  "social-media-management": "https://cdn.prod.website-files.com/62dfda81ce23007b548b3798/6468e97aab58adc3583bbea8_Restaurant%20social%20media%20ideas.webp",
  "reels-video-content": "https://images.unsplash.com/photo-1616702449922-f05b1a14292d?auto=format&fit=crop&w=1400&q=80",
  "photoshoots-photography": "https://acquireconvert-cms.vercel.app/api/media/file/amazon-product-photography-los-angeles-studio-setup-with-ecommerce-products-on-w.jpg",
  "creative-design": "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=1400&q=80",
  "digital-advertising": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  "branding-digital-identity": "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1400&q=80",
  "restaurant-content-system": "https://cdn.prod.website-files.com/62dfda81ce23007b548b3798/6468e97aab58adc3583bbea8_Restaurant%20social%20media%20ideas.webp",
  "restaurant-content-gallery-1": "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/post-comida-instagram-406.webp",
  "restaurant-content-gallery-2": "https://www.topkee.com.sg/topkeeoss/529372718286639104-public/%E7%BF%BB%E8%AF%91/ig-reels/4.png.webp",
  "salon-visual-content": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
  "salon-visual-gallery-1": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
  "salon-visual-gallery-2": "https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=1400&q=80",
  "real-estate-promotion": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  "real-estate-gallery-1": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  "real-estate-gallery-2": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  "campaign-showreel-thumbnail": "https://www.topkee.com.sg/topkeeoss/529372718286639104-public/%E7%BF%BB%E8%AF%91/ig-reels/4.png.webp",
  "maithil-team": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
  "building-a-digital-identity": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
};

const img = (seed: string, alt: string) => ({
  src: imageMap[seed] ?? `https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80`,
  alt
});

export const settings: SiteSettings = {
  siteName: "Maithil Digitals",
  tagline: "Your Digital Identity",
  logo: { src: "/brand/logo.jpg.jpeg", alt: "Maithil Digitals logo" },
  phone: ["9917006983", "9625643209"],
  whatsapp: "9917006983",
  email: "maithildigitals@gmail.com",
  address: "Kosi Kalan, Mathura, Uttar Pradesh, India",
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Facebook", url: "https://facebook.com/" },
    { label: "WhatsApp", url: "https://wa.me/919917006983" },
    { label: "Email", url: "mailto:maithildigitals@gmail.com" }
  ],
  footerDescription: "Strategy. Content. Creativity. Growth. We help businesses build a digital presence that looks professional, connects with their audience and helps them grow.",
  seo: {
    title: "Maithil Digitals | Digital Marketing, Content Creation & Photography",
    description: "Maithil Digitals helps businesses in Mathura, Kosi and nearby areas build a professional digital identity through social media, reels, photography, branding and digital advertising.",
    image: "/brand/logo.jpg.jpeg"
  }
};

export const faqs: FAQ[] = [
  { question: "What businesses do you work with?", answer: "We work with restaurants, cafes, schools, real estate businesses, salons, hotels, boutiques, jewellery businesses, local businesses and more." },
  { question: "Do you provide professional photoshoots?", answer: "Yes. We provide professional photography and video shoots depending on the business requirements and selected package." },
  { question: "Do you create reels?", answer: "Yes. We plan, shoot and edit short-form video content for Instagram and Facebook." },
  { question: "Do you manage Instagram accounts?", answer: "Yes. Our social media management can include content planning, creative design, captions, posting, scheduling and account management." },
  { question: "Do you run paid advertisements?", answer: "Yes. We can create and manage Meta advertising campaigns based on the client's goals." },
  { question: "Can I get a custom package?", answer: "Yes. Packages can be customized according to the business requirements." },
  { question: "Do you work outside Mathura?", answer: "Yes. We can work with businesses in nearby cities and remotely depending on the service required." }
];

export const stats: Stat[] = [
  { value: "360", label: "Digital presence" },
  { value: "8+", label: "Business categories" },
  { value: "1", label: "Creative team" },
  { value: "100%", label: "Custom strategy" }
];

export const services: Service[] = [
  {
    slug: "social-media-management",
    number: "01",
    title: "Social Media Management",
    description: "We manage your social media presence from strategy to publishing.",
    tags: ["Instagram", "Facebook", "Planning"],
    cta: "Explore Social Media",
    includes: ["Content planning", "Instagram management", "Facebook management", "Captions and hashtags", "Posting and scheduling", "Monthly content strategy", "Performance monitoring"],
    image: img("social-media-management", "Social media layouts and content calendar"),
    overview: "A structured social presence helps people understand, trust and remember your business.",
    problems: ["Irregular posting", "Weak social identity", "Low engagement", "No content plan"],
    approach: ["Understand your business", "Plan monthly content", "Create posts and captions", "Publish and review performance"],
    capabilities: ["Content planning", "Account management", "Captions", "Scheduling"],
    faq: faqs.slice(0, 4),
    seo: { title: "Social Media Management | Maithil Digitals", description: "Instagram and Facebook content planning, posting, captions and social media management." }
  },
  {
    slug: "reels-video-content",
    number: "02",
    title: "Reels & Video Content",
    description: "Short-form video content designed to capture attention and showcase your business.",
    tags: ["Reels", "Promos", "Editing"],
    cta: "Create With Us",
    includes: ["Instagram Reels", "Promotional videos", "Product videos", "Food videos", "Business videos", "Event content", "Short-form video editing"],
    image: img("reels-video-content", "Reels and video content production"),
    overview: "Reels and short videos make your products, space and story easier to notice online.",
    problems: ["Low attention", "No video ideas", "Weak editing", "Inconsistent content"],
    approach: ["Plan concepts", "Shoot content", "Edit for platforms", "Publish with purpose"],
    capabilities: ["Reels", "Promo videos", "Product videos", "Video editing"],
    faq: faqs.slice(1, 5),
    seo: { title: "Reels and Video Content | Maithil Digitals", description: "Reels, promotional videos, product videos and short-form editing for businesses." }
  },
  {
    slug: "photoshoots-photography",
    number: "03",
    title: "Photoshoots & Photography",
    description: "Professional visual content that makes your business look as good as it deserves.",
    tags: ["Food", "Product", "Business"],
    cta: "Book A Shoot",
    includes: ["Food photography", "Product photography", "Interior photography", "Fashion photography", "Business photography", "Lifestyle photography", "Promotional photography"],
    image: img("photoshoots-photography", "Professional photoshoot setup"),
    overview: "Great content starts with visuals that make the business feel real, premium and trustworthy.",
    problems: ["Poor product visuals", "Unclear business presentation", "Generic content", "Low visual trust"],
    approach: ["Plan shot list", "Shoot products or space", "Edit clean visuals", "Package for social and ads"],
    capabilities: ["Food shoots", "Product shoots", "Interior shoots", "Lifestyle photography"],
    faq: faqs.slice(1, 4),
    seo: { title: "Photoshoots and Photography | Maithil Digitals", description: "Food, product, interior, business and lifestyle photography for brands." }
  },
  {
    slug: "creative-design",
    number: "04",
    title: "Creative Design",
    description: "We turn your offers, products and ideas into content people notice.",
    tags: ["Posts", "Stories", "Campaigns"],
    cta: "Design My Content",
    includes: ["Social media posts", "Story designs", "Offer creatives", "Festival creatives", "Menu creatives", "Promotional designs", "Campaign creatives"],
    image: img("creative-design", "Creative social media design layouts"),
    overview: "Creative design gives your offers, events and campaigns a clear visual language.",
    problems: ["Unpolished posts", "Weak offers", "Inconsistent layouts", "Low recall"],
    approach: ["Understand the offer", "Create visual direction", "Design assets", "Adapt for platforms"],
    capabilities: ["Post design", "Story design", "Offer creatives", "Campaign creatives"],
    faq: faqs.slice(0, 4),
    seo: { title: "Creative Design | Maithil Digitals", description: "Social media posts, story designs, offer creatives and campaign creatives." }
  },
  {
    slug: "digital-advertising",
    number: "05",
    title: "Digital Advertising",
    description: "Reach the right audience and turn attention into enquiries.",
    tags: ["Meta Ads", "Leads", "Campaigns"],
    cta: "Run My Ads",
    includes: ["Instagram Ads", "Facebook Ads", "Meta Ads", "Lead generation campaigns", "Promotional campaigns", "Campaign optimization"],
    image: img("digital-advertising", "Digital advertising campaign dashboard"),
    overview: "Digital advertising helps your content reach the people most likely to enquire, visit or buy.",
    problems: ["Low reach", "Wasted ad spend", "Poor targeting", "No enquiry flow"],
    approach: ["Define goal", "Build audience", "Launch campaign", "Optimize performance"],
    capabilities: ["Instagram ads", "Facebook ads", "Lead campaigns", "Campaign optimization"],
    faq: faqs.slice(4, 7),
    seo: { title: "Digital Advertising | Maithil Digitals", description: "Instagram, Facebook and Meta ad campaigns for enquiries and promotions." }
  },
  {
    slug: "branding-digital-identity",
    number: "06",
    title: "Branding & Digital Identity",
    description: "We help businesses create a consistent and professional visual identity.",
    tags: ["Identity", "Branding", "Growth"],
    cta: "Build My Identity",
    includes: ["Logo design", "Brand identity", "Social media branding", "Visual direction", "Marketing creatives", "Brand consistency"],
    image: img("branding-digital-identity", "Brand identity and social media system"),
    overview: "A consistent digital identity makes your business easier to recognize, trust and choose.",
    problems: ["Inconsistent branding", "Weak first impression", "Poor recall", "Unclear visual direction"],
    approach: ["Clarify positioning", "Create identity system", "Design brand assets", "Maintain consistency"],
    capabilities: ["Logo design", "Visual direction", "Social media branding", "Brand consistency"],
    faq: faqs.slice(0, 5),
    seo: { title: "Branding and Digital Identity | Maithil Digitals", description: "Logo design, brand identity, social media branding and visual direction." }
  }
];

export const industries: Industry[] = [
  { title: "Restaurants & Cafes", description: "Make people hungry before they visit." },
  { title: "Hotels & Resorts", description: "Showcase the experience before the guest arrives." },
  { title: "Real Estate", description: "Turn properties into opportunities." },
  { title: "Schools & Institutions", description: "Build trust and communicate your story." },
  { title: "Salons & Beauty Businesses", description: "Showcase your work and attract new customers." },
  { title: "Fashion & Boutiques", description: "Create a visual identity people remember." },
  { title: "Jewellery Businesses", description: "Make every product look premium." },
  { title: "Local Businesses", description: "Build a stronger presence in your market." }
];

export const packages: PackagePlan[] = [
  { name: "Starter", label: "For businesses starting their digital journey.", description: "A simple monthly foundation for businesses that need a professional beginning.", cta: "View Package", features: ["Basic content planning", "Social media creatives", "Monthly posting support", "Starter guidance"] },
  { name: "Growth", label: "For businesses ready to build a consistent online presence.", description: "A stronger content and marketing rhythm for businesses that want regular visibility.", badge: "Most Popular", cta: "View Package", features: ["Monthly content strategy", "Reels and designs", "Photoshoot support", "Performance review"] },
  { name: "Custom", label: "For businesses that need a complete digital solution.", description: "A tailored plan across social media, shoots, reels, branding and advertising.", cta: "Talk To Us", features: ["Custom strategy", "Creative production", "Digital advertising", "Complete digital presence"] }
];

export const packageCategories: PackageCategory[] = [
  { title: "Restaurants & Cafes", description: "Social media, food photography, reels and offers designed to make people hungry before they visit.", services: ["Social Media Management", "Food Photography", "Reels", "Creative Design", "Meta Ads"] },
  { title: "Schools", description: "Build trust with parents through clean communication, event coverage, creative posts and admission campaigns.", services: ["Social Media Management", "Photography", "Creative Design", "Digital Advertising"] },
  { title: "Real Estate", description: "Turn properties into opportunities with property photography, reels, walkthroughs and enquiry-focused ads.", services: ["Property Photography", "Reels", "Digital Advertising", "Lead Creatives"] },
  { title: "Salons / Beauty", description: "Showcase transformations, services and ambience with reels, shoots and polished social media content.", services: ["Content Shoot", "Reels", "Social Media Management", "Creative Design"] },
  { title: "Hotels / Resorts", description: "Present rooms, food, amenities and guest experiences before the guest arrives.", services: ["Photography", "Reels", "Branding", "Digital Advertising"] },
  { title: "Fashion / Boutiques", description: "Create a visual identity for collections, launches and boutique promotions.", services: ["Fashion Photography", "Reels", "Creative Design", "Social Media"] },
  { title: "Jewellery", description: "Make every product look premium with product photography, campaign creatives and trust-building content.", services: ["Product Photography", "Branding", "Creative Design", "Social Media"] },
  { title: "Other Local Businesses", description: "A flexible digital presence plan for shops, services and local brands that want more visibility.", services: ["Social Media", "Photography", "Branding", "Digital Advertising"] }
];

export const contentProductionImages = [
  img("restaurant-content-gallery-1", "Food photography for restaurant marketing"),
  img("reels-video-content", "Professional video production camera"),
  img("photoshoots-photography", "Product photoshoot studio setup"),
  img("salon-visual-content", "Beauty business content shoot")
];

export const projects: Project[] = [
  {
    slug: "restaurant-content-system",
    number: "01",
    title: "Restaurant Content System",
    client: "Restaurant Project",
    category: "Social Media",
    year: "2026",
    image: img("restaurant-content-system", "Food photography and restaurant social content"),
    summary: "Social media management, food photography and reels for a restaurant presence.",
    challenge: "The business needed stronger food visuals and a consistent social media presence.",
    strategy: "Plan content around food appeal, offers and local discovery.",
    execution: "Created food photography, reels concepts and social media layouts.",
    deliverables: ["Food photography", "Reels", "Social media creatives", "Content plan"],
    gallery: [img("restaurant-content-gallery-1", "Food photography gallery"), img("restaurant-content-gallery-2", "Restaurant reels preview")],
    seo: { title: "Restaurant Content Project | Maithil Digitals", description: "Restaurant social media, food photography and reels project." }
  },
  {
    slug: "salon-visual-content",
    number: "02",
    title: "Salon Visual Content",
    client: "Salon Project",
    category: "Photography",
    year: "2026",
    image: img("salon-visual-content", "Salon content shoot and reels"),
    summary: "Content shoot, reels and social media management for a beauty business.",
    challenge: "The salon needed content that showcased service quality and customer experience.",
    strategy: "Use visual storytelling, service highlights and polished creative layouts.",
    execution: "Produced shoot content, short videos and social media creatives.",
    deliverables: ["Content shoot", "Reels", "Creative designs", "Social media support"],
    gallery: [img("salon-visual-gallery-1", "Salon shoot gallery"), img("salon-visual-gallery-2", "Beauty business creative")],
    seo: { title: "Salon Content Project | Maithil Digitals", description: "Salon content shoot, reels and social media project." }
  },
  {
    slug: "real-estate-promotion",
    number: "03",
    title: "Real Estate Promotion",
    client: "Real Estate Project",
    category: "Digital Advertising",
    year: "2026",
    image: img("real-estate-promotion", "Real estate photography and advertising"),
    summary: "Property photography, reels and digital advertising for real estate enquiries.",
    challenge: "The project needed to present properties clearly and generate quality enquiries.",
    strategy: "Combine property visuals, short videos and lead-focused ads.",
    execution: "Created property media, campaign creatives and advertising assets.",
    deliverables: ["Property photography", "Reels", "Digital ads", "Lead creatives"],
    gallery: [img("real-estate-gallery-1", "Property gallery"), img("real-estate-gallery-2", "Real estate campaign creative")],
    seo: { title: "Real Estate Digital Project | Maithil Digitals", description: "Real estate photography, reels and digital advertising project." }
  }
];

export const videos: VideoItem[] = [
  {
    slug: "campaign-showreel",
    title: "Campaign Showreel",
    category: "Brand Video",
    description: "A short-format showcase of creative direction, reels and digital storytelling.",
    thumbnail: img("campaign-showreel-thumbnail", "Campaign showreel thumbnail"),
    duration: "01:24",
    publishDate: "2026-08-01",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    seo: { title: "Campaign Showreel | Maithil Digitals Videos", description: "Watch a Maithil Digitals video showcase." }
  }
];

export const testimonials: Testimonial[] = [];
export const team: TeamMember[] = [
  { name: "Maithil Digitals Team", role: "Strategy + Creativity + Content + Growth", photo: img("maithil-team", "Maithil Digitals team") }
];

export const insights: Insight[] = [
  {
    slug: "building-a-digital-identity",
    title: "What A Strong Digital Identity Means For Local Businesses",
    category: "Digital Identity",
    excerpt: "A practical look at why content, visuals, social media and brand consistency matter for growing businesses.",
    author: "Maithil Digitals",
    publishDate: "2026-08-10",
    readTime: "4 min read",
    image: img("building-a-digital-identity", "Digital identity editorial visual"),
    body: [
      "A strong digital identity is more than posting online. It is the complete impression your business creates before a customer visits, calls or enquires.",
      "When social media, photography, reels, branding and advertising work together, the business looks more professional and easier to trust.",
      "For local businesses, the biggest opportunity is often consistency: clear visuals, useful content and direct paths for enquiries."
    ],
    seo: { title: "Building A Digital Identity | Maithil Digitals", description: "Why content, visuals, social media and branding matter for local businesses." }
  }
];
