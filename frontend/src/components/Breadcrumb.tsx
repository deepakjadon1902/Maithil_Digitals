import { Link } from "react-router-dom";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.href ? <Link className="hover:text-orange" to={item.href}>{item.label}</Link> : <span className="text-white">{item.label}</span>}
          {index < items.length - 1 ? <span className="mx-2">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
