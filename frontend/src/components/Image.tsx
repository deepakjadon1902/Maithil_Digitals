import { imageKit } from "../lib/imagekit";
import type { Media } from "../types/content";
import type { ImgHTMLAttributes } from "react";

type Props = {
  media: Media;
  className?: string;
  width?: number;
  loading?: "lazy" | "eager";
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "loading">;

export function Image({ media, className, width = 1200, loading = "lazy", ...props }: Props) {
  return <img className={className} src={imageKit(media.src, width)} alt={media.alt} loading={loading} decoding="async" {...props} />;
}
