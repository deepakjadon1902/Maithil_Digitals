type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      {eyebrow ? <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-orange">{eyebrow}</p> : null}
      <h2 className="font-display text-4xl font-black leading-[0.98] text-current md:text-6xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-current/70 md:text-lg">{description}</p> : null}
    </div>
  );
}
