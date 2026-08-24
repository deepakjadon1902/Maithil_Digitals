import { FAQAccordion } from "../components/FAQAccordion";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { ServiceAccordion } from "../components/ServiceAccordion";
import { StatCard } from "../components/StatCard";
import { TestimonialCard } from "../components/TestimonialCard";
import { VideoCard } from "../components/VideoCard";
import { faqs, projects, services, settings, stats, testimonials, videos } from "../data/fallback";
import { faqSchema, organizationSchema } from "../lib/schema";
import { Button } from "../components/Button";
import { FocusAreas, GrowthPaths, ProofProcess, ServiceSignalStrip } from "../components/HomeEnhancements";

export function Home() {
  return (
    <>
      <SEO seo={settings.seo} schema={[organizationSchema(settings), faqSchema(faqs)]} />
      <Hero />
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.85fr]">
          <SectionHeading eyebrow="Who we are" title="We build digital presence that people remember." description="From brand presence to digital campaigns, we combine strategy, creativity and technology to help businesses move forward." />
          <div className="grid grid-cols-2 gap-4 self-end">
            {stats.map((stat) => <div key={stat.label} className="rounded-premium border border-ink/10 bg-white p-5"><strong className="font-display text-3xl font-black">{stat.value}</strong><p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{stat.label}</p></div>)}
          </div>
        </div>
      </section>
      <FocusAreas />
      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Strategy, creative and performance under one roof." description="Explore the core services Maithil Digitals can shape through backend-managed content." />
          <ServiceSignalStrip />
          <div className="mt-12"><ServiceAccordion services={services} /></div>
        </div>
      </section>
      <GrowthPaths />
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Selected Work" title="Selected Work." description="Some of the brands, campaigns and digital experiences we've helped shape." />
            <Button href="/work">View all work</Button>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Video" title="Campaign stories in motion." description="Video content is treated as a first-class format, with thumbnails, categories and detail pages ready for CMS control." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">{videos.map((video) => <VideoCard key={video.slug} video={video} />)}</div>
        </div>
      </section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Process" title="From discovery to optimization." />
          <div className="grid gap-4">
            {["Discover", "Strategize", "Create", "Launch", "Optimize"].map((step, index) => <div key={step} className="rounded-premium border border-ink/10 bg-white p-5"><span className="text-sm font-black text-orange">0{index + 1}</span><h3 className="mt-2 text-xl font-black">{step}</h3></div>)}
          </div>
        </div>
      </section>
      <ProofProcess />
      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
      </section>
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="Client words, controlled by CMS." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((item) => <TestimonialCard key={item.name} testimonial={item} />)}</div>
        </div>
      </section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions before we begin." />
          <div className="mt-10"><FAQAccordion faqs={faqs} /></div>
        </div>
      </section>
      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading title="Have a project in mind?" description="Tell us what you're building, growing or trying to solve." />
          <Button href="/contact">Start a Conversation</Button>
        </div>
      </section>
    </>
  );
}
