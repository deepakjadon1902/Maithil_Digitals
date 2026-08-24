import { Play } from "lucide-react";
import type { VideoItem } from "../types/content";
import { MediaFrame } from "./MediaFrame";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <a href={`/videos/${video.slug}`} className="tilt-card group flex h-full min-h-[300px] flex-col overflow-hidden rounded-premium border border-navy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-navy/10">
      <div className="relative aspect-video">
        <MediaFrame media={video.thumbnail} title={video.title} eyebrow={video.category} className="h-full w-full" imageClassName="transition duration-500 group-hover:scale-[1.04]" />
        <span className="md-float-soft absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-orange text-white"><Play size={18} fill="currentColor" /></span>
        {video.duration ? <span className="md-float-soft-alt absolute bottom-4 right-4 rounded bg-ink/80 px-2 py-1 text-xs font-bold text-white">{video.duration}</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{video.category}</p>
        <h2 className="mt-3 text-xl font-black leading-tight text-navy">{video.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-navy/65">{video.description}</p>
        <span className="mt-auto pt-4 text-sm font-black text-orange">Watch video</span>
      </div>
    </a>
  );
}
