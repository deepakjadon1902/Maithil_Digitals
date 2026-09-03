export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return <div className="rounded-premium border border-navy/10 bg-white p-6 text-sm font-semibold text-navy/60 shadow-sm">{label}...</div>;
}

export function EmptyState({ label = "No content available yet." }: { label?: string }) {
  return <div className="rounded-premium border border-navy/10 bg-white p-8 text-sm font-bold text-navy/60 shadow-sm">{label}</div>;
}

export function ErrorState({ label = "This content is temporarily unavailable." }: { label?: string }) {
  return <div className="rounded-premium border border-orange/30 bg-orange/10 p-6 text-sm font-bold text-navy">{label}</div>;
}
