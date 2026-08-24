import { ArrowUpRight, BadgeCheck, ClipboardCheck, Layers3, LineChart, MousePointer2, SearchCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";

const growthPaths = [
  {
    title: "Visibility Sprint",
    bestFor: "Businesses that need to be found",
    description: "Local SEO, Google Business Profile polish, website essentials and search-ready content foundations.",
    points: ["Local discovery", "SEO basics", "Conversion checks"]
  },
  {
    title: "Campaign Build",
    bestFor: "Brands launching offers or services",
    description: "Creative direction, landing-page messaging, paid campaign assets and weekly performance review.",
    points: ["Ad creative", "Landing flow", "Lead tracking"]
  },
  {
    title: "Brand Presence System",
    bestFor: "Teams ready for consistent growth",
    description: "A complete monthly content, campaign and reporting rhythm shaped around a stronger digital identity.",
    points: ["Social calendar", "Campaign themes", "Monthly insights"]
  }
];

const focusAreas = [
  { icon: SearchCheck, title: "Search visibility", text: "SEO, local search and content structure that helps customers find you." },
  { icon: Sparkles, title: "Creative recall", text: "Social visuals, campaign messaging and brand moments that feel consistent." },
  { icon: MousePointer2, title: "Lead journeys", text: "Clear CTAs, useful pages and forms designed to reduce friction." },
  { icon: LineChart, title: "Performance rhythm", text: "Simple reporting loops that show what to improve next." }
];

const trustSteps = [
  "Audit the current digital presence",
  "Map goals, channels and customer intent",
  "Create assets with platform-specific purpose",
  "Launch, measure and refine from real signals"
];

export function GrowthPaths() {
  return (
    <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Growth paths"
            title="Choose the right starting point, then scale with clarity."
            description="Inspired by strong agency service packaging, these paths keep the decision simple without locking your business into a one-size-fits-all template."
          />
        <p className="md-float-soft text-lg leading-8 text-muted">
            Pricing and timelines should stay CMS-managed. The public site can show the structure, while final scope is shaped after a conversation.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {growthPaths.map((path, index) => (
            <RevealCard key={path.title} delay={index * 0.08}>
              <article className={`tilt-card group h-full rounded-premium border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange ${index === 1 ? "tilt-card--featured" : ""}`}>
                {index === 1 ? <span className="tilt-card-ribbon">Most Popular</span> : null}
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-black text-orange">0{index + 1}</span>
                  <ArrowUpRight className="text-muted transition group-hover:text-orange" size={20} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">{path.bestFor}</p>
                <h3 className="mt-4 font-display text-3xl font-black">{path.title}</h3>
                <p className="mt-4 min-h-24 text-sm leading-7 text-muted">{path.description}</p>
                <div className="mt-6 grid gap-2">
                  {path.points.map((point) => <span key={point} className="tilt-card-chip rounded-premium border border-white/10 px-3 py-2 text-sm font-bold text-white">{point}</span>)}
                </div>
              </article>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FocusAreas() {
  return (
    <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What improves"
          title="A digital presence is a system, not a pile of posts."
          description="The best reference pattern here is clarity: show customers what changes when strategy, creative and performance work together."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, index) => (
            <RevealCard key={area.title} delay={index * 0.06}>
              <article className="tilt-card h-full rounded-premium border border-ink/10 bg-white p-6 transition hover:border-orange">
                <area.icon className={index % 2 === 0 ? "md-float-soft text-orange" : "md-float-soft-alt text-orange"} size={28} />
                <h3 className="mt-6 text-2xl font-black">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/65">{area.text}</p>
              </article>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProofProcess() {
  return (
    <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="How we work" title="Transparent execution, from first audit to next optimization." />
          <Button className="mt-8" href="/contact">Plan your project</Button>
        </div>
        <div className="grid gap-4">
          {trustSteps.map((step, index) => (
            <RevealCard key={step} delay={index * 0.07}>
              <div className="tilt-card grid gap-4 rounded-premium border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[72px_1fr] sm:items-center">
                <div className={index % 2 === 0 ? "md-float-soft grid h-14 w-14 place-items-center rounded-premium bg-orange text-xl font-black" : "md-float-soft-alt grid h-14 w-14 place-items-center rounded-premium bg-orange text-xl font-black"}>0{index + 1}</div>
                <div>
                  <h3 className="text-xl font-black">{step}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">Simple enough to follow, structured enough to keep momentum visible.</p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceSignalStrip() {
  const signals = [
    { icon: Layers3, label: "Services mapped to business goals" },
    { icon: ClipboardCheck, label: "CMS-ready content structure" },
    { icon: BadgeCheck, label: "No fake claims or invented metrics" }
  ];

  return (
    <div className="mt-10 grid gap-3 md:grid-cols-3">
      {signals.map((signal) => (
        <div key={signal.label} className="tilt-card rounded-premium border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-muted">
          <signal.icon className="md-float-soft mb-3 text-orange" size={20} />
          {signal.label}
        </div>
      ))}
    </div>
  );
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
