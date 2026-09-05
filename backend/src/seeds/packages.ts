import { connectDatabase } from "../config/db.js";
import { PackageConfig } from "../models/PackageConfig.js";

const packageItems = [
  {
    name: "Local Launch",
    label: "For new and local businesses starting professionally.",
    description: "A clean monthly presence plan with content direction, basic creatives and consistent posting for Indian local brands.",
    price: "From Rs. 14,999/month",
    category: "Other Local Businesses",
    timeline: "30 days",
    bestFor: "Clinics, shops, coaching centers and local service brands",
    cta: "View Package",
    features: ["Monthly content calendar", "12 static creatives", "4 short reels edits", "Basic profile optimization", "Monthly performance note"]
  },
  {
    name: "Growth Campaign",
    label: "For businesses ready to build regular visibility.",
    description: "A stronger content and marketing rhythm with shoot planning, reels, ad creatives and monthly reporting.",
    badge: "Most Popular",
    price: "From Rs. 29,999/month",
    category: "Restaurants & Cafes",
    timeline: "30 days",
    bestFor: "Restaurants, cafes, salons, boutiques and retail businesses",
    cta: "View Package",
    features: ["Monthly strategy plan", "16 social creatives", "8 reels edits", "1 content shoot direction", "Meta ad creative set", "Performance review"]
  },
  {
    name: "Premium Presence",
    label: "For brands that need a complete digital system.",
    description: "A full-service monthly package across visual production, content, campaigns, creative direction and lead-focused ads.",
    price: "From Rs. 54,999/month",
    category: "Schools",
    timeline: "45 days",
    bestFor: "Schools, real estate, hotels, jewellery and premium local brands",
    cta: "Talk To Us",
    features: ["Brand content strategy", "24 social creatives", "12 reels edits", "Campaign landing direction", "Meta ads management", "Monthly analytics deck"]
  },
  {
    name: "Admission Builder",
    label: "For schools and institutes running admission campaigns.",
    description: "Trust-building communication, parent-focused creatives, event coverage and enquiry campaigns for education brands.",
    price: "From Rs. 37,999/month",
    category: "Schools",
    timeline: "45 days",
    bestFor: "Schools, colleges, play schools and coaching institutes",
    cta: "View Package",
    features: ["Admission campaign plan", "Parent trust creatives", "Event coverage edits", "10 reels/video snippets", "Lead ad creative set", "Weekly campaign review"]
  },
  {
    name: "Property Lead Kit",
    label: "For real estate projects that need premium enquiries.",
    description: "Property visuals, walkthrough reels, listing creatives and lead-generation assets built for Indian real estate buyers.",
    price: "From Rs. 44,999/month",
    category: "Real Estate",
    timeline: "30-45 days",
    bestFor: "Builders, brokers, plotted developments and rental brands",
    cta: "View Package",
    features: ["Property shoot direction", "Walkthrough reels", "Listing creative set", "Offer campaign assets", "Lead ad creative pack", "WhatsApp enquiry flow"]
  },
  {
    name: "Product Prestige",
    label: "For product-led brands that need premium visuals.",
    description: "Product photography direction, launch creatives, reels and trust-building content for jewellery, fashion and ecommerce brands.",
    price: "From Rs. 39,999/month",
    category: "Jewellery",
    timeline: "30 days",
    bestFor: "Jewellery, fashion, beauty products and boutique launches",
    cta: "View Package",
    features: ["Product shoot plan", "Launch creative set", "8 reels edits", "Catalog-style social posts", "Offer creatives", "Brand story captions"]
  }
];

const categories = [
  { title: "Restaurants & Cafes", description: "Social media, food photography, reels and offers designed to make people hungry before they visit.", services: ["Social Media Management", "Food Photography", "Reels", "Creative Design", "Meta Ads"] },
  { title: "Schools", description: "Build trust with parents through clean communication, event coverage, creative posts and admission campaigns.", services: ["Social Media Management", "Photography", "Creative Design", "Digital Advertising"] },
  { title: "Real Estate", description: "Turn properties into opportunities with property photography, reels, walkthroughs and enquiry-focused ads.", services: ["Property Photography", "Reels", "Digital Advertising", "Lead Creatives"] },
  { title: "Salons / Beauty", description: "Showcase transformations, services and ambience with reels, shoots and polished social media content.", services: ["Content Shoot", "Reels", "Social Media Management", "Creative Design"] },
  { title: "Hotels / Resorts", description: "Present rooms, food, amenities and guest experiences before the guest arrives.", services: ["Photography", "Reels", "Branding", "Digital Advertising"] },
  { title: "Fashion / Boutiques", description: "Create a visual identity for collections, launches and boutique promotions.", services: ["Fashion Photography", "Reels", "Creative Design", "Social Media"] },
  { title: "Jewellery", description: "Make every product look premium with product photography, campaign creatives and trust-building content.", services: ["Product Photography", "Branding", "Creative Design", "Social Media"] },
  { title: "Other Local Businesses", description: "A flexible digital presence plan for shops, services and local brands that want more visibility.", services: ["Social Media", "Photography", "Branding", "Digital Advertising"] }
];

async function seedPackages() {
  await connectDatabase();
  const packages = await PackageConfig.findOneAndUpdate(
    {},
    { items: packageItems, categories },
    { new: true, upsert: true, runValidators: true }
  );

  console.log(`Saved ${packages.items.length} package plans and ${packages.categories.length} package categories.`);
  process.exit(0);
}

seedPackages().catch((error) => {
  console.error(error);
  process.exit(1);
});
