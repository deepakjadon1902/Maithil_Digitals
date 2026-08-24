import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/fallback";

export function VideoDetail() {
  const { slug = "" } = useParams();
  const video = videos.find((item) => item.slug === slug);
  if (!video) return <section className="bg-ink px-4 py-40 text-center text-white"><h1 className="text-4xl font-black">Video not found</h1><Button className="mt-8" href="/videos">Back to videos</Button></section>;
  return (
    <>
      <SEO seo={video.seo} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow={video.category} title={video.title} description={video.description} />
          <div className="mt-10 aspect-video overflow-hidden rounded-premium border border-white/10 bg-black">
            <iframe className="h-full w-full" src={video.videoUrl} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>
      <section className="bg-deep px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading title="Related videos" /><div className="mt-10 grid gap-6 md:grid-cols-2">{videos.filter((item) => item.slug !== video.slug).map((item) => <VideoCard key={item.slug} video={item} />)}</div></div></section>
    </>
  );
}
