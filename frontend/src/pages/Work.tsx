import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { projects } from "../data/fallback";

export function Work() {
  return (
    <>
      <SEO seo={{ title: "Selected Work | Maithil Digitals", description: "Explore brand, campaign, website and video work by Maithil Digitals." }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Work" title="Selected Work." description="Some of the brands, campaigns and digital experiences we've helped shape." /></div></section>
      <section className="bg-bone px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><ProjectGrid projects={projects} /></div></section>
    </>
  );
}
