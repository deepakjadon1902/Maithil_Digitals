import { useMemo, useState } from "react";
import { ProjectGrid } from "../components/ProjectGrid";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { pageSeo, useContent } from "../hooks/useContent";

const categories = ["All", "Social Media", "Reels", "Photography", "Design", "Branding"];

export function Work() {
  const { projects, seo } = useContent();
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    if (active === "All") return projects;
    const key = active.toLowerCase();
    return projects.filter((project) => {
      const haystack = [project.title, project.category, project.summary, ...project.deliverables].join(" ").toLowerCase();
      if (key === "reels") return haystack.includes("reel") || haystack.includes("video");
      if (key === "design") return haystack.includes("design") || haystack.includes("creative");
      return haystack.includes(key);
    });
  }, [active, projects]);

  return (
    <>
      <SEO seo={seo.work ?? pageSeo("work", { title: "Our Work | Maithil Digitals", description: "A selection of content, campaigns, photography, reels and creative work by Maithil Digitals." })} />
      <section className="bg-white px-4 pb-14 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our Work" title="Let the work speak." description="Filter projects by social media, reels, photography, design and branding. Admin-added work appears here automatically." />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} onClick={() => setActive(category)} className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${active === category ? "border-orange bg-orange text-white" : "border-navy/10 bg-white text-black hover:border-orange hover:text-orange"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filtered.length ? <ProjectGrid projects={filtered} /> : <div className="rounded-premium border border-navy/10 bg-white p-8 text-navy shadow-sm"><h2 className="text-2xl font-black">No {active.toLowerCase()} work yet</h2><p className="mt-2 text-navy/65">Add matching projects from the admin panel and they will appear here.</p></div>}
        </div>
      </section>
    </>
  );
}
