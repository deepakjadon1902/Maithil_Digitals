import { team } from "../data/fallback";
import type { TeamMember } from "../types/content";
import { requestJson } from "./api";

export const getTeam = () => requestJson<TeamMember[]>("/team", team);
