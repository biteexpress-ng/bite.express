import { api } from "./api-client";

export type TeamSocials = {
  linkedin: string | null;
  x: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  group: string | null;
  bio: string | null;
  photo_url: string | null;
  photo_alt: string | null;
  socials: TeamSocials;
};

type TeamResponse = {
  data: TeamMember[];
  groups: string[];
};

export type FetchTeamResult = {
  members: TeamMember[];
  groups: string[];
};

const EMPTY: FetchTeamResult = { members: [], groups: [] };

/**
 * The About-page roster. Unpaginated by design: the endpoint returns every
 * active member and the page renders all of them in one section.
 *
 * Never throws. A backend outage hides the team section rather than breaking
 * the page around it.
 */
export async function fetchTeam(): Promise<FetchTeamResult> {
  const res = await api<TeamResponse>("/api/v1/team", {
    next: { revalidate: 300, tags: ["team"] },
  });

  if (!res.ok) {
    if ("skipped" in res) console.info(`[team-api] ${res.reason}`);
    else console.warn(`[team-api] /team failed: ${res.status} ${res.message}`);
    return EMPTY;
  }

  return {
    members: res.data.data ?? [],
    groups: res.data.groups ?? [],
  };
}
