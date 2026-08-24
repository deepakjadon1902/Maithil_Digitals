import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { StatCard } from "../components/StatCard";
import { TeamCard } from "../components/TeamCard";
import { services, settings, stats, team } from "../data/fallback";

export function About() {
  return (
    <>
      <SEO seo={{ title: "About Maithil Digitals", description: "Learn about Maithil Digitals, a digital marketing agency in Kosi Kalan, Mathura." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="About" title="Ideas are everywhere. Execution creates impact." description="Maithil Digitals is a digital agency built to help businesses communicate clearly, show up consistently and grow through practical strategy." />
        </div>
      </section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><SectionHeading title="Who we are" description="We combine marketing strategy, content, design, web experience and performance thinking into one connected digital presence." /><SectionHeading title="Our philosophy" description="The best digital work is not noise. It is clear, useful, consistent and designed around how people actually make decisions." /></div></section>
      <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="What we believe" /><div className="mt-10 grid gap-4 md:grid-cols-3">{["Strategy before posting", "Creative with commercial purpose", "Technology that removes friction"].map((item) => <div key={item} className="rounded-premium border border-white/10 bg-white/[0.04] p-6 text-xl font-black">{item}</div>)}</div></div></section>
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Our capabilities" /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <div key={service.slug} className="rounded-premium border border-ink/10 bg-white p-5"><span className="text-sm font-black text-orange">{service.number}</span><h2 className="mt-3 font-black">{service.title}</h2></div>)}</div></div></section>
      <section className="bg-soft px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Our process" /><div className="mt-10 grid gap-4 md:grid-cols-5">{["Discover", "Strategize", "Create", "Launch", "Optimize"].map((step, index) => <div key={step} className="rounded-premium border border-ink/10 bg-white p-5"><span className="text-sm font-black text-orange">0{index + 1}</span><h2 className="mt-2 font-black">{step}</h2></div>)}</div></div></section>
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Team" /><div className="mt-10 grid gap-6 md:grid-cols-3">{team.map((member) => <TeamCard key={member.name} member={member} />)}</div></div></section>
      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div></section>
      <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><SectionHeading title={`Build your digital identity with ${settings.siteName}.`} /><Button href="/contact">Let's Talk</Button></div></section>
    </>
  );
}
