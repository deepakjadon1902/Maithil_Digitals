import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { stats } from "../data/fallback";
import { pageSeo, useContent } from "../hooks/useContent";

const approach = ["Understand the business.", "Understand the audience.", "Create meaningful content.", "Build a stronger digital presence."];
const pillars = ["Strategy", "Creativity", "Content", "Growth"];

export function About() {
  const { settings } = useContent();
  return (
    <>
      <SEO seo={pageSeo("about", { title: "About Us | Maithil Digitals", description: "Maithil Digitals helps businesses look better online with strategy, content, creativity and growth." })} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <SectionHeading eyebrow="About Us" title="We help businesses look better online." description="Maithil Digitals is a digital marketing and creative content agency focused on helping businesses build a strong and consistent digital presence." />
          <div className="rounded-premium border border-navy/10 bg-[#F5F8FC] p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">{settings.siteName}</p>
            <p className="mt-4 text-2xl font-black leading-tight text-navy">{settings.tagline ?? "Your Digital Identity"}</p>
            <p className="mt-4 leading-8 text-navy/65">Strategy. Content. Creativity. Growth.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-premium border border-navy/10 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black">What we bring together</h2>
            <p className="mt-5 leading-8 text-navy/65">From creating scroll-stopping reels and professional photographs to managing social media and developing digital campaigns, we bring strategy and creativity together under one roof.</p>
          </div>
          <div className="grid gap-3">
            {approach.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-premium border border-navy/10 bg-white p-4 font-black text-navy shadow-sm"><span className="text-orange">0{index + 1}</span>{item}</div>)}
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-fr gap-4 md:grid-cols-4">
            {pillars.map((pillar) => <div key={pillar} className="rounded-premium border border-navy/10 bg-white p-6 text-2xl font-black shadow-sm transition hover:-translate-y-1 hover:border-orange">{pillar}</div>)}
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl auto-rows-fr gap-4 md:grid-cols-4">
          {stats.map((stat) => <div key={stat.label} className="rounded-premium border border-navy/10 bg-white p-6 shadow-sm"><p className="text-4xl font-black text-orange">{stat.value}</p><p className="mt-2 font-black text-navy">{stat.label}</p></div>)}
        </div>
      </section>
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading title="Ready to build a stronger presence?" description="Let's turn your business into a brand people notice, remember and choose." />
          <Button href="/contact">Get Started</Button>
        </div>
      </section>
    </>
  );
}
