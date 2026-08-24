import type { TeamMember } from "../types/content";
import { Image } from "./Image";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-premium border border-ink/10 bg-white transition hover:-translate-y-1 hover:border-orange hover:shadow-xl hover:shadow-ink/10">
      <Image media={member.photo} className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-black leading-tight text-ink">{member.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/60">{member.role}</p>
      </div>
    </article>
  );
}
