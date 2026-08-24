import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/fallback";

export function Videos() {
  return (
    <>
      <SEO seo={{ title: "Videos | Maithil Digitals", description: "Watch campaign videos, brand videos and social media content by Maithil Digitals." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Videos" title="Video showcase." description="Thumbnails, metadata and URLs are ready to come from the CMS/backend." /></div></section>
      <section className="bg-deep px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{videos.map((video) => <VideoCard key={video.slug} video={video} />)}</div></section>
    </>
  );
}
