import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { VideoCard } from "../components/VideoCard";
import { useContent } from "../hooks/useContent";

export function VideoDetail() {
  const { slug = "" } = useParams();
  const { videos } = useContent();
  const video = videos.find((item) => item.slug === slug);
  if (!video) return <section className="bg-white px-4 py-40 text-center text-navy"><h1 className="text-4xl font-black">Video not found</h1><Button className="mt-8" href="/videos">Back to videos</Button></section>;

  return (
    <>
      <SEO seo={video.seo} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow={video.category} title={video.title} description={video.description} />
          <div className="mt-10 aspect-video overflow-hidden rounded-premium border border-navy/10 bg-white shadow-sm">
            <iframe className="h-full w-full" src={toEmbedUrl(video.videoUrl)} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Related videos" />
          <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.filter((item) => item.slug !== video.slug).map((item) => <VideoCard key={item.slug} video={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function toEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  return url;
}
