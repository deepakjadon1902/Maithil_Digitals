import type { Stat } from "../types/content";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="tilt-card flex min-h-36 flex-col justify-between rounded-premium border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-orange">
      <strong className="font-display text-4xl font-black leading-none text-white">{stat.value}</strong>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-muted">{stat.label}</p>
    </div>
  );
}
