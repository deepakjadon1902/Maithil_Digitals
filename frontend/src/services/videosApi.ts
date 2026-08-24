import { videos } from "../data/fallback";
import type { VideoItem } from "../types/content";
import { requestJson } from "./api";

export const getVideos = () => requestJson<VideoItem[]>("/videos", videos);
export const getVideoBySlug = (slug: string) => requestJson<VideoItem | undefined>(`/videos/${slug}`, videos.find((item) => item.slug === slug));
