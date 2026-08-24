import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { insights } from "../data/fallback";
import { articleSchema } from "../lib/schema";

export function InsightDetail() {
  const { slug = "" } = useParams();
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return <section className="bg-ink px-4 py-40 text-center text-white"><h1 className="text-4xl font-black">Insight not found</h1><Button className="mt-8" href="/insights">Back to insights</Button></section>;
  return (
    <>
      <SEO seo={insight.seo} schema={articleSchema(insight)} />
      <article className="bg-bone text-ink">
        <header className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><SectionHeading eyebrow={`${insight.category} • ${insight.readTime}`} title={insight.title} description={insight.excerpt} /><p className="mt-6 text-sm text-muted">{insight.author} • {insight.publishDate}</p></div></header>
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"><Image media={insight.image} className="max-h-[560px] w-full rounded-premium object-cover" loading="eager" /><div className="prose prose-lg mt-12 max-w-none">{insight.body.map((paragraph) => <p key={paragraph} className="text-xl leading-9 text-ink/70">{paragraph}</p>)}</div></div>
      </article>
    </>
  );
}
