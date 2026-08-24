import { Link } from "react-router-dom";
import { Image } from "../components/Image";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { insights } from "../data/fallback";

export function Insights() {
  return (
    <>
      <SEO seo={{ title: "Insights | Maithil Digitals", description: "Read digital marketing, SEO, branding, performance and website strategy insights." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Insights" title="Editorial thinking for digital growth." /></div></section>
      <section className="bg-bone px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{insights.map((item) => <Link key={item.slug} to={`/insights/${item.slug}`} className="overflow-hidden rounded-premium border border-ink/10 bg-white"><Image media={item.image} className="aspect-[16/10] w-full object-cover" /><div className="p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{item.category} • {item.readTime}</p><h2 className="mt-3 text-3xl font-black text-ink">{item.title}</h2><p className="mt-3 text-sm leading-7 text-ink/65">{item.excerpt}</p></div></Link>)}</div></section>
    </>
  );
}
