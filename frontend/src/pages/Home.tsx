import { Button } from "../components/Button";
import { FAQAccordion } from "../components/FAQAccordion";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ServiceCard } from "../components/ServiceCard";
import { contentProductionImages, faqs, industries } from "../data/fallback";
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

export function Home() {
  const { packages, projects, services, settings } = useContent();
  const featuredServices = services.slice(0, 6);

  return (
    <>
      <SEO seo={pageSeo("home", settings.seo)} schema={[organizationSchema(settings), faqSchema(faqs)]} />
      <Hero />

      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
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
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Maithil Digitals" title="We don't just post. We build your presence." description="Every business is different. That's why we don't believe in a one-size-fits-all content strategy." />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
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
          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="pointer-events-none absolute -left-6 top-10 h-20 w-20 rounded-full border border-orange/20" />
            <div className="pointer-events-none absolute -right-4 bottom-12 h-28 w-28 rounded-full bg-orange/10 blur-2xl" />
            {contentProductionImages.map((media, index) => (
              <div key={media.src} className={`${index === 1 ? "sm:mt-8" : ""} ${index === 2 ? "sm:-mt-2" : ""} ${index % 3 === 0 ? "md-float-soft" : index % 3 === 1 ? "md-float-soft-alt" : "md-float-soft-slow"} tilt-card group relative overflow-hidden rounded-premium border border-navy/10 bg-[#F5F8FC] shadow-sm transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-navy/10`}>
                <img className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]" src={media.src} alt={media.alt} loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/58 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 rounded-premium border border-white/15 bg-white/92 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-navy shadow-sm backdrop-blur">
                  {["Food", "Reels", "Product", "Lifestyle"][index] ?? "Content"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Industries" title="Built for businesses that want to grow." description="We create customized digital strategies for different types of businesses." />
          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => <InfoCard key={industry.title} title={industry.title} text={industry.description} />)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our Work" title="Let the work speak." description="A selection of content, campaigns and creative work created for businesses." />
            <Button href="/work">View Our Work</Button>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title="How we work" />
          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-5">
            {process.map(([title, text], index) => <InfoCard key={title} number={index + 1} title={title} text={text} />)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Packages" title="Find the right plan for your business." description="Flexible digital marketing and content packages designed for different business needs." />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-3">
            {packages.map((plan) => (
              <div key={plan.name} className="relative flex min-h-64 flex-col rounded-premium border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange">
                {plan.badge ? <span className="absolute right-5 top-5 rounded-full bg-orange px-3 py-1 text-xs font-black uppercase text-white">{plan.badge}</span> : null}
                <h3 className="text-2xl font-black text-navy">{plan.name}</h3>
                <p className="mt-3 text-sm leading-7 text-navy/65">{plan.label}</p>
                <Button className="mt-auto w-full" href="/packages">{plan.cta}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions businesses ask us." />
          <div className="mt-10"><FAQAccordion faqs={faqs} /></div>
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading title="Ready to build your digital identity?" description="Let's turn your business into a brand people notice, remember and choose." />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Start Your Project</Button>
            <Button href={`https://wa.me/91${settings.whatsapp ?? settings.phone[0]}`} variant="ghost">WhatsApp Us</Button>
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
