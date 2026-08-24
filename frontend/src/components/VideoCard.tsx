import { Play } from "lucide-react";
import type { VideoItem } from "../types/content";
import { Image } from "./Image";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <a href={`/videos/${video.slug}`} className="tilt-card group block overflow-hidden rounded-premium border border-white/10 bg-white/[0.04]">
      <div className="relative aspect-video">
        <Image media={video.thumbnail} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        <span className="md-float-soft absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-orange text-white"><Play size={18} fill="currentColor" /></span>
        {video.duration ? <span className="md-float-soft-alt absolute bottom-4 right-4 rounded bg-ink/80 px-2 py-1 text-xs font-bold text-white">{video.duration}</span> : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{video.category}</p>
        <h2 className="mt-3 text-2xl font-black text-white">{video.title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{video.description}</p>
      </div>
    </a>
  );
}
