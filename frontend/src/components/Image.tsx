import { imageKit } from "../lib/imagekit";
import type { Media } from "../types/content";

type Props = {
  media: Media;
  className?: string;
  width?: number;
  loading?: "lazy" | "eager";
};

export function Image({ media, className, width = 1200, loading = "lazy" }: Props) {
  return <img className={className} src={imageKit(media.src, width)} alt={media.alt} loading={loading} decoding="async" />;
}
