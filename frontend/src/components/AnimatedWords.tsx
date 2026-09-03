import type { CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  startDelay?: number;
};

export function AnimatedWords({ text, className = "", wordClassName = "", startDelay = 0 }: Props) {
  const words = text.split(" ").filter(Boolean);

  return (
    <span className={`word-drop ${className}`}>
      {words.map((word, index) => (
        <span
          className={`word-drop__word ${wordClassName}`}
          key={`${word}-${index}`}
          style={{ "--word-index": index, "--word-start": `${startDelay}ms` } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
