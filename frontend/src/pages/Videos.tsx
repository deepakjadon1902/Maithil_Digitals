import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { VideoCard } from "../components/VideoCard";
import { pageSeo, useContent } from "../hooks/useContent";

export function Videos() {
  const { seo, videos } = useContent();
  return (
    <>
      <SEO seo={seo.videos ?? pageSeo("videos", { title: "Videos | Maithil Digitals", description: "Watch reels, campaign videos, brand videos and social media content by Maithil Digitals." })} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Videos" title="Reels, campaign videos and brand stories." description="Admin-added YouTube, social or uploaded video records appear here with their title, category, thumbnail and public video link." />
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => <VideoCard key={video.slug} video={video} />)}
        </div>
      </section>
    </>
  );
}
