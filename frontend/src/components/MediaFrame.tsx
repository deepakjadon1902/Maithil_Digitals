import { useState } from "react";
import { Image } from "./Image";
import type { Media } from "../types/content";

type Props = {
  media: Media;
  title: string;
  eyebrow?: string;
  className?: string;
  imageClassName?: string;
};

export function MediaFrame({ media, title, eyebrow, className = "aspect-[4/3]", imageClassName = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const isPlaceholder = failed || !media.src || media.src.includes("/brand/logo") || media.src.startsWith("blob:");

  if (isPlaceholder) {
    return (
      <div className={`${className} premium-media-fallback`}>
        <div>
          <p>{eyebrow ?? "Maithil Digitals"}</p>
          <h3>{title}</h3>
          <span />
        </div>
      </div>
    );
  }

  return <Image media={media} className={`${className} ${imageClassName} object-cover`} onError={() => setFailed(true)} />;
}
