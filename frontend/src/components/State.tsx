export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return <div className="rounded-premium border border-white/10 p-6 text-sm text-muted">{label}...</div>;
}

export function EmptyState({ label = "No content available yet." }: { label?: string }) {
  return <div className="rounded-premium border border-white/10 p-6 text-sm text-muted">{label}</div>;
}

export function ErrorState({ label = "This content is temporarily unavailable." }: { label?: string }) {
  return <div className="rounded-premium border border-orange/30 bg-orange/10 p-6 text-sm text-white">{label}</div>;
}
