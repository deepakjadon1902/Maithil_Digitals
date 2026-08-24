import type { TeamMember } from "../types/content";
import { Image } from "./Image";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="overflow-hidden rounded-premium border border-ink/10 bg-white">
      <Image media={member.photo} className="aspect-[4/3] w-full object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-black text-ink">{member.name}</h3>
        <p className="mt-2 text-sm text-ink/60">{member.role}</p>
      </div>
    </article>
  );
}
