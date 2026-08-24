import { Link } from "react-router-dom";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-semibold text-navy/55">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.href ? <Link className="hover:text-orange" to={item.href}>{item.label}</Link> : <span className="text-navy">{item.label}</span>}
          {index < items.length - 1 ? <span className="mx-2">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
