import { Button } from "../components/Button";
import { ArcPathGallery } from "../components/ArcPathGallery";
import { ContentMotionCards } from "../components/ContentMotionCards";
import { DofProjectCarousel } from "../components/DofProjectCarousel";
import { FAQAccordion } from "../components/FAQAccordion";
import { PinnedProcessSteps } from "../components/PinnedProcessSteps";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ServiceCard } from "../components/ServiceCard";
import { EmptyState } from "../components/State";
import { industries } from "../data/fallback";
import { pageSeo, useContent } from "../hooks/useContent";
import { faqSchema, organizationSchema } from "../lib/schema";

const why = [
  ["Strategy First", "Every piece of content has a purpose, from building awareness to creating engagement and generating enquiries."],
  ["Content That Looks Good", "Professional photography, reels and creative designs built around your brand."],
  ["Business-Focused", "We create content that communicates what makes your business worth choosing."],
  ["Everything Under One Roof", "Strategy, content, photography, design, social media and advertising handled by one team."]
];

const process = [
  ["Discover", "We understand your business, audience, competitors and goals."],
  ["Plan", "We create a customized content and marketing strategy."],
  ["Create", "We shoot, design, write and produce your content."],
  ["Publish", "We manage and distribute your content across digital platforms."],
  ["Optimize", "We monitor performance and improve the strategy over time."]
];

const processImages = [
  { src: "/brand/01_Discover.png", alt: "Maithil Digitals discovery and business planning visual" },
  { src: "/brand/02_Plan.png", alt: "Maithil Digitals content planning visual" },
  { src: "/brand/03_Create.png", alt: "Maithil Digitals content creation visual" },
  { src: "/brand/04_Publish.png", alt: "Maithil Digitals publishing and campaign management visual" },
  { src: "/brand/05_Optimize.png", alt: "Maithil Digitals optimization and growth reporting visual" }
];

const contentShowcaseImages = [
  { src: "/brand/food.png", alt: "Food content production by Maithil Digitals", label: "Food" },
  { src: "/brand/reels.png", alt: "Reels video production by Maithil Digitals", label: "Reels" },
  { src: "/brand/product.png", alt: "Product content production by Maithil Digitals", label: "Product" },
  { src: "/brand/lifestyle.png", alt: "Lifestyle brand content by Maithil Digitals", label: "Lifestyle" },
  { src: "/brand/fashion.png", alt: "Fashion content production by Maithil Digitals", label: "Fashion" }
];

export function Home() {
  const { faqs, packages, projects, seo, services, settings } = useContent();
  const featuredServices = services.slice(0, 6);
  const processSteps = process.map(([title, text], index) => ({
    title,
    text,
    image: processImages[index]
  }));

  return (
    <>
      <SEO seo={seo.home ?? pageSeo("home", settings.seo)} schema={[organizationSchema(settings), faqSchema(faqs)]} />
      <ArcPathGallery />

      <section className="border-y border-navy/10 bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading eyebrow="Introduction" title="We build more than social media." description="Your digital presence is often the first impression people have of your business." />
          <div className="rounded-premium border border-navy/10 bg-white p-6 text-lg leading-9 text-navy/70 shadow-sm">
            <p>At Maithil Digitals, we combine strategy, creativity and content to help businesses look professional, connect with their audience and grow online.</p>
            <p className="mt-5">From managing your social media to creating professional photographs and reels, we bring everything together under one roof.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What We Do" title="Everything you need to build a stronger digital presence." />
          {featuredServices.length ? (
            <div className="fall-stagger mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
            </div>
          ) : <div className="mt-10"><EmptyState label="No services have been uploaded from the admin panel yet." /></div>}
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Maithil Digitals" title="We don't just post. We build your presence." description="Every business is different. That's why we don't believe in a one-size-fits-all content strategy." />
          <div className="hme-stagger mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {why.map(([title, text], index) => <InfoCard key={title} number={index + 1} title={title} text={text} />)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Content Production" title="Your business deserves to look as good as it is." description="Great content starts with great visuals. We create professional photographs and videos that showcase your products, services, space and brand in the best possible way." />
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em] text-navy/70">
              {["Food", "Product", "Fashion", "Interior", "Business", "Lifestyle"].map((item) => <span key={item} className="rounded-full border border-navy/10 px-3 py-2">{item}</span>)}
            </div>
            <Button className="mt-8" href="/contact">Book A Content Shoot</Button>
          </div>
          <ContentMotionCards items={contentShowcaseImages} />
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Industries" title="Built for businesses that want to grow." description="We create customized digital strategies for different types of businesses." />
          <div className="hme-stagger mt-10 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => <InfoCard key={industry.title} title={industry.title} text={industry.description} />)}
          </div>
        </div>
      </section>

      <DofProjectCarousel projects={projects} />

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our Work" title="Let the work speak." description="A selection of content, campaigns and creative work created for businesses." />
            <Button href="/work">View Our Work</Button>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <PinnedProcessSteps steps={processSteps} />

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Packages" title="Find the right plan for your business." description="Flexible digital marketing and content packages designed for different business needs." />
          <div className="fall-stagger mt-10 grid auto-rows-fr gap-5 md:grid-cols-3">
            {packages.map((plan) => (
              <div key={plan.name} className="relative flex min-h-64 flex-col rounded-premium border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange">
                {plan.badge ? <span className="absolute right-5 top-5 rounded-full bg-orange px-3 py-1 text-xs font-black uppercase text-white">{plan.badge}</span> : null}
                <h3 className="text-2xl font-black text-navy">{plan.name}</h3>
                {plan.price ? <p className="mt-3 font-display text-2xl font-black text-orange">{plan.price}</p> : null}
                <p className="mt-3 text-sm leading-7 text-navy/65">{plan.label}</p>
                <Button className="mt-auto w-full" href="/packages">{plan.cta}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions businesses ask us." />
          <div className="mt-10"><FAQAccordion faqs={faqs} /></div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading title="Ready to build your digital identity?" description="Let's turn your business into a brand people notice, remember and choose." />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Start Your Project</Button>
            <Button href={`https://wa.me/91${settings.whatsapp ?? settings.phone[0]}`} variant="secondary">WhatsApp Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ number, title, text }: { number?: number; title: string; text: string }) {
  return (
    <div className="rounded-premium border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange">
      {number ? <span className="text-sm font-black text-orange">0{number}</span> : null}
      <h3 className={`${number ? "mt-4" : ""} text-xl font-black leading-tight text-navy`}>{title}</h3>
      <p className="mt-3 text-sm leading-7 text-navy/65">{text}</p>
    </div>
  );
}
