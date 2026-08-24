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
  const isPlaceholder = !media.src || media.src.includes("/brand/logo") || media.src.startsWith("blob:");

  if (isPlaceholder) {
    return (
      <div className={`${className} grid place-items-center overflow-hidden bg-[linear-gradient(135deg,#1F2040_0%,#111226_52%,#0B0C18_100%)] p-5`}>
        <div className="w-full max-w-xs">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">{eyebrow ?? "Maithil Digitals"}</p>
          <h3 className="mt-3 text-xl font-black leading-tight text-white md:text-2xl">{title}</h3>
          <div className="mt-5 h-1.5 w-16 rounded-full bg-orange" />
        </div>
      </div>
    );
  }

  return <Image media={media} className={`${className} ${imageClassName} object-cover`} />;
}
