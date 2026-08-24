import type { Stat } from "../types/content";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="tilt-card rounded-premium border border-white/10 bg-white/[0.04] p-6">
      <strong className="font-display text-4xl font-black text-white">{stat.value}</strong>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-muted">{stat.label}</p>
    </div>
  );
}
