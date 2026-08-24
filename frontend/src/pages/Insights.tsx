import { Link } from "react-router-dom";
import { MediaFrame } from "../components/MediaFrame";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { insights } from "../data/fallback";

export function Insights() {
  return (
    <>
      <SEO seo={{ title: "Insights | Maithil Digitals", description: "Read digital marketing, content, branding and growth thinking from Maithil Digitals." }} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Insights" title="Practical thinking for digital growth." description="Optional articles can be added here later when the content plan is ready." />
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl auto-rows-fr gap-6 md:grid-cols-2">
          {insights.map((item) => (
            <Link key={item.slug} to={`/insights/${item.slug}`} className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-premium border border-navy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-navy/10">
              <MediaFrame media={item.image} title={item.title} eyebrow={item.category} className="aspect-[16/8] w-full" imageClassName="transition duration-500 group-hover:scale-[1.04]" />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{item.category} / {item.readTime}</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-navy md:text-3xl">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-navy/65">{item.excerpt}</p>
                <span className="mt-auto pt-5 text-sm font-black text-orange">Read insight</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
