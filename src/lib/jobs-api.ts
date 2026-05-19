import { api } from "./api-client";

/**
 * Live jobs feed from the Laravel backend.
 *
 * Replaces the static lib/jobs.ts that Phase 3 shipped. The shape we
 * present to the frontend is intentionally close to what that file
 * defined, so page components migrated with minimal churn.
 *
 * Falls back to an empty list when the API is unreachable rather than
 * crashing — preview / dev / brief backend outages render an empty
 * /careers page instead of a 500.
 */

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR"
  | "INTERN";

export type WorkArrangement = "On-site" | "Hybrid" | "Remote";

export type JobListItem = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  team: { slug: string | null; name: string | null; icon: string | null };
  city: string;
  state: string;
  work_arrangement: WorkArrangement;
  employment_type: EmploymentType;
  featured: boolean;
  date_posted: string | null;
  valid_through: string | null;
  salary: { min: number | null; max: number | null; currency: string } | null;
  apply_email: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export type JobDetail = JobListItem & {
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  nice_to_haves: string[];
  perks: string[];
};

export type JobTeam = {
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
};

type JobsListResponse = {
  data: JobListItem[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  teams: JobTeam[];
};

export type FetchJobsResult = {
  jobs: JobListItem[];
  teams: JobTeam[];
};

export async function fetchJobs(opts?: {
  team?: string;
  city?: string;
  workArrangement?: WorkArrangement;
  featured?: boolean;
  perPage?: number;
}): Promise<FetchJobsResult> {
  const params = new URLSearchParams();
  if (opts?.team) params.set("team", opts.team);
  if (opts?.city) params.set("city", opts.city);
  if (opts?.workArrangement) params.set("work_arrangement", opts.workArrangement);
  if (opts?.featured) params.set("featured", "1");
  params.set("per_page", String(opts?.perPage ?? 50));

  const res = await api<JobsListResponse>(`/api/v1/jobs?${params.toString()}`, {
    next: { revalidate: 900, tags: ["jobs"] }, // 15 min
  });

  if (!res.ok) {
    if ("skipped" in res) console.info(`[jobs-api] ${res.reason}`);
    else console.warn(`[jobs-api] /jobs failed: ${res.status} ${res.message}`);
    return { jobs: [], teams: [] };
  }

  return { jobs: res.data.data ?? [], teams: res.data.teams ?? [] };
}

export async function fetchJob(slug: string): Promise<JobDetail | null> {
  const res = await api<JobDetail>(`/api/v1/jobs/${encodeURIComponent(slug)}`, {
    next: { revalidate: 900, tags: ["jobs", `job:${slug}`] },
  });

  if (!res.ok) {
    if ("skipped" in res) {
      console.info(`[jobs-api] ${res.reason}`);
    } else if (res.status !== 404) {
      console.warn(`[jobs-api] /jobs/${slug} failed: ${res.status} ${res.message}`);
    }
    return null;
  }

  return res.data;
}

/** Sorted, latest first — used by the careers index. */
export function jobsByRecency(list: JobListItem[]): JobListItem[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (b.date_posted ?? "").localeCompare(a.date_posted ?? "");
  });
}

/** Group jobs by team for the index page rendering. */
export function groupJobsByTeam(
  jobs: JobListItem[],
): Array<[string, JobListItem[]]> {
  const grouped = jobs.reduce((acc, j) => {
    const teamName = j.team.name ?? "Other";
    const list = acc.get(teamName) ?? [];
    list.push(j);
    acc.set(teamName, list);
    return acc;
  }, new Map<string, JobListItem[]>());
  return [...grouped.entries()];
}
