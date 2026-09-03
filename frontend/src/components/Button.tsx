import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  icon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ children, variant = "primary", href, icon = true, className, ...props }: Props) {
  const classes = clsx(
    "md-micro-hover inline-flex min-h-11 items-center justify-center gap-2 rounded-premium px-5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange",
    variant === "primary" && "bg-orange text-white hover:bg-orangeHover",
    variant === "secondary" && "border border-white/15 bg-white text-ink hover:bg-soft",
    variant === "ghost" && "border border-white/15 text-white hover:border-orange hover:text-orange",
    className
  );

  const content = (
    <>
      {children}
      {icon ? <ArrowRight aria-hidden size={17} /> : null}
    </>
  );

  if (href) {
    return href.startsWith("http") ? (
      <a className={classes} href={href} data-magnetic="10" {...props}>
        {content}
      </a>
    ) : (
      <Link className={classes} to={href} data-magnetic="10" {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} data-magnetic="10" {...props}>
      {content}
    </button>
  );
}
