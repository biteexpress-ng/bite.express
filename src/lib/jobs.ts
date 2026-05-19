/**
 * Curated jobs registry. Single source of truth for /careers and the
 * dynamic sitemap. To open a new role: add an entry and merge — the
 * page renders + the sitemap entry + the JobPosting JSON-LD all wire
 * up automatically.
 *
 * Dates use ISO format (YYYY-MM-DD). `validThrough` should be ~60 days
 * after `datePosted` per Google for Jobs guidance (roles expire).
 */

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR"
  | "INTERN";

export type WorkArrangement = "On-site" | "Hybrid" | "Remote";

export type Job = {
  slug: string;
  title: string;
  team:
    | "Engineering"
    | "Operations"
    | "Growth"
    | "Customer Support"
    | "People";
  city: string;
  state: string;
  workArrangement: WorkArrangement;
  employmentType: EmploymentType;
  /** Short one-liner used on the careers index card. */
  summary: string;
  /** Free-flowing paragraph(s) opening the role description. */
  description: string;
  /** Bullet list. */
  responsibilities: string[];
  /** Bullet list. */
  requirements: string[];
  /** Bullet list. Optional. */
  niceToHaves?: string[];
  /** Bullet list. */
  perks: string[];
  datePosted: string;
  validThrough: string;
};

export const jobs: readonly Job[] = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    city: "Lagos",
    state: "Lagos",
    workArrangement: "Hybrid",
    employmentType: "FULL_TIME",
    summary:
      "Lead end-to-end features across the BiteExpress customer experience, from Laravel APIs to the Next.js storefront.",
    description:
      "We're hiring a senior full-stack engineer to lead high-leverage product work across the BiteExpress stack. You'll own features end-to-end — from schema design and Laravel APIs through to the React/Next.js customer experience — partnering with product, ops and design to ship things customers feel.",
    responsibilities: [
      "Design and ship customer-facing features end-to-end, owning quality across the stack.",
      "Maintain and extend the Laravel API powering our customer, vendor, rider and admin surfaces.",
      "Improve our Next.js marketing and customer applications for performance, accessibility and SEO.",
      "Mentor mid-level engineers through code review, pairing, and design discussions.",
      "Help shape engineering practice — testing, deployment, observability and on-call response.",
    ],
    requirements: [
      "5+ years of professional software engineering.",
      "Deep experience with PHP/Laravel (or comparable backend framework) and modern React/Next.js.",
      "Strong TypeScript fundamentals.",
      "Comfort owning relational schema design (MySQL/PostgreSQL).",
      "A track record of shipping production features used by real customers.",
    ],
    niceToHaves: [
      "Experience working on marketplace / two-sided platforms.",
      "Familiarity with Flutter (we have customer and rider mobile apps).",
      "Background in performance, SEO or developer tooling.",
    ],
    perks: [
      "Competitive base salary benchmarked to senior IC bands in Nigeria.",
      "Annual equity grants for full-time staff.",
      "Health insurance for you and your family.",
      "Hybrid working from our Lagos office, or fully remote for the right candidate.",
      "Generous learning budget and conference allowance.",
    ],
    datePosted: "2026-05-10",
    validThrough: "2026-07-10",
  },
  {
    slug: "mobile-engineer-flutter",
    title: "Mobile Engineer — Flutter",
    team: "Engineering",
    city: "Kaduna",
    state: "Kaduna",
    workArrangement: "Remote",
    employmentType: "FULL_TIME",
    summary:
      "Build the customer and rider apps that millions of Nigerians will use to move food across the country.",
    description:
      "You'll own significant chunks of our Flutter mobile apps — the customer app and the rider app — collaborating with backend engineers, designers and ops to deliver experiences that work flawlessly across cities and networks.",
    responsibilities: [
      "Build customer-facing and rider-facing features in Flutter from spec to ship.",
      "Profile and improve app performance on the mid-range Android devices most of our users carry.",
      "Maintain offline resilience, live map tracking, real-time chat, and payments flows.",
      "Collaborate closely with the backend team on API contracts.",
      "Own quality — write tests, fix the bugs you find, and reduce crash rate.",
    ],
    requirements: [
      "3+ years building production mobile apps (Flutter strongly preferred).",
      "Dart fluency and a track record of complex, real-world Flutter features.",
      "Comfortable with native iOS or Android troubleshooting when needed.",
      "Strong attention to the realities of mid-tier devices and unreliable networks.",
    ],
    niceToHaves: [
      "Experience with Drift / SQLite for offline-first data.",
      "Background in delivery, ride-hailing or another on-demand vertical.",
    ],
    perks: [
      "Fully remote — work from anywhere in Nigeria.",
      "Competitive base salary + equity for full-time staff.",
      "Health insurance for you and your family.",
      "Annual learning budget; conference travel sponsored.",
      "Quarterly team gatherings in Lagos or Kaduna.",
    ],
    datePosted: "2026-05-12",
    validThrough: "2026-07-12",
  },
  {
    slug: "devops-sre",
    title: "DevOps / Site Reliability Engineer",
    team: "Engineering",
    city: "Remote",
    state: "Nigeria",
    workArrangement: "Remote",
    employmentType: "FULL_TIME",
    summary:
      "Own the infrastructure that keeps tens of thousands of orders flowing across our 10+ cities every week.",
    description:
      "We're looking for a hands-on SRE / DevOps engineer to own our production infrastructure end-to-end — uptime, deploy pipelines, monitoring, incident response and the boring-but-critical work that makes the platform feel solid.",
    responsibilities: [
      "Maintain and improve our cloud infrastructure (VPS-based with Cloudflare in front).",
      "Own CI/CD, deploy pipelines and release safety nets.",
      "Build observability — metrics, logging, tracing, alerting — that helps the team find issues quickly.",
      "Lead post-incident reviews and ship the changes that prevent recurrences.",
      "Partner with security on hardening — most recently after our April 2026 incident, where ops discipline made all the difference.",
    ],
    requirements: [
      "4+ years in DevOps, SRE, infrastructure or platform engineering roles.",
      "Strong Linux administration on Ubuntu/Debian servers.",
      "Experience with Nginx, MySQL/PostgreSQL, Redis, queue workers (Laravel queue or similar).",
      "Fluency with Cloudflare, DNS, CI/CD pipelines (GitHub Actions).",
      "A calm, methodical approach to incidents.",
    ],
    niceToHaves: [
      "Experience with Laravel-specific deployment patterns.",
      "Background hardening systems after a security incident.",
    ],
    perks: [
      "Fully remote.",
      "Competitive base + equity for full-time staff.",
      "On-call compensation in addition to base.",
      "Health insurance and learning budget.",
    ],
    datePosted: "2026-05-15",
    validThrough: "2026-07-15",
  },
  {
    slug: "city-manager-kaduna",
    title: "City Manager — Kaduna",
    team: "Operations",
    city: "Kaduna",
    state: "Kaduna",
    workArrangement: "On-site",
    employmentType: "FULL_TIME",
    summary:
      "Run BiteExpress on the ground in Kaduna — vendor partnerships, rider supply, customer experience, the lot.",
    description:
      "As City Manager you're the BiteExpress GM for Kaduna — accountable for the supply (vendors and riders), demand (customers and orders), and operational health of the city. You'll lead a small local team and report into our central operations function.",
    responsibilities: [
      "Own the Kaduna P&L: orders, vendor and rider growth, retention, customer experience.",
      "Build and manage a local team of vendor managers, rider managers and operations coordinators.",
      "Set and hit weekly operational targets across acquisition, activation and retention.",
      "Represent BiteExpress in the Kaduna business community.",
      "Surface insights from the ground to the central product, marketing and finance teams.",
    ],
    requirements: [
      "5+ years operating businesses or operations functions at scale.",
      "Lived in or deep familiarity with Kaduna.",
      "Track record of leading small teams to hit aggressive targets.",
      "Comfort with operational metrics and weekly reporting.",
    ],
    perks: [
      "Competitive base + monthly performance bonus tied to city KPIs.",
      "Equity for full-time staff.",
      "Health insurance.",
      "Office in Kaduna; expectation of being in-market.",
    ],
    datePosted: "2026-05-07",
    validThrough: "2026-07-07",
  },
  {
    slug: "city-manager-lagos",
    title: "City Manager — Lagos",
    team: "Operations",
    city: "Lagos",
    state: "Lagos",
    workArrangement: "On-site",
    employmentType: "FULL_TIME",
    summary:
      "Lead BiteExpress's launch and growth across Lagos — our largest, most competitive market.",
    description:
      "You'll lead BiteExpress's Lagos expansion: the largest, most competitive and most strategically important market in our footprint. This is a senior operations role for someone who's done this before in another high-stakes on-demand vertical.",
    responsibilities: [
      "Lead the Lagos launch playbook end-to-end: supply, demand, ops.",
      "Recruit and lead a Lagos team across vendor partnerships, rider ops and customer experience.",
      "Own the Lagos P&L from day one.",
      "Be the BiteExpress face in the Lagos business and food community.",
    ],
    requirements: [
      "8+ years in operations, ideally in on-demand delivery, ride-hailing or e-commerce.",
      "Deep Lagos market knowledge — vendors, neighbourhoods, rider supply pools.",
      "Experience launching or scaling a city / market from zero.",
      "Strong financial and operational metric fluency.",
    ],
    perks: [
      "Senior competitive base + significant performance-linked bonus.",
      "Meaningful equity stake for the right person.",
      "Office in Lagos.",
      "Health insurance and full benefits.",
    ],
    datePosted: "2026-05-15",
    validThrough: "2026-07-15",
  },
  {
    slug: "rider-operations-coordinator",
    title: "Rider Operations Coordinator",
    team: "Operations",
    city: "Lagos",
    state: "Lagos",
    workArrangement: "Hybrid",
    employmentType: "FULL_TIME",
    summary:
      "Look after the riders who are the entire BiteExpress brand on the road — verification, support, retention.",
    description:
      "Riders are the heart of BiteExpress. This role is about looking after them: verifying new applicants, supporting active riders, running incentive programmes that actually work, and being a real human they can reach when things go sideways.",
    responsibilities: [
      "Onboard and verify new rider applicants.",
      "Run weekly rider check-ins, listening posts and community gatherings.",
      "Manage day-to-day rider support escalations.",
      "Design and run incentive programmes; report on their effectiveness.",
    ],
    requirements: [
      "2+ years in operations, customer service or community management.",
      "Strong empathy and people skills — riders are independent professionals, not employees.",
      "Comfortable with operational metrics and Excel / Google Sheets.",
    ],
    perks: [
      "Competitive base + activity bonuses.",
      "Health insurance.",
      "Hybrid working between home and the Lagos office.",
    ],
    datePosted: "2026-05-12",
    validThrough: "2026-07-12",
  },
  {
    slug: "performance-marketing-manager",
    title: "Performance Marketing Manager",
    team: "Growth",
    city: "Lagos",
    state: "Lagos",
    workArrangement: "Hybrid",
    employmentType: "FULL_TIME",
    summary:
      "Own paid acquisition across Meta, Google and TikTok for the BiteExpress consumer brand.",
    description:
      "You'll own paid acquisition across Meta, Google, TikTok and any other channel that works — designing campaigns, building creative briefs, watching the CAC, and ruthlessly killing what doesn't perform.",
    responsibilities: [
      "Plan and execute paid campaigns across Meta, Google Ads, TikTok, and emerging channels.",
      "Manage budget allocation against CAC, payback and LTV targets.",
      "Brief and partner with the creative team on ad assets.",
      "Set up and own analytics — GA4, Meta Pixel, attribution.",
      "Report weekly to leadership on growth metrics.",
    ],
    requirements: [
      "4+ years running paid acquisition for consumer apps or e-commerce.",
      "Proven track record of scaling spend while keeping unit economics healthy.",
      "Hands-on with Meta Ads Manager, Google Ads, GA4.",
      "Comfort with SQL or BI dashboards (we use Looker Studio).",
    ],
    perks: [
      "Competitive base + bonus tied to growth KPIs.",
      "Equity for full-time staff.",
      "Hybrid working; Lagos office.",
      "Health insurance and learning budget.",
    ],
    datePosted: "2026-05-08",
    validThrough: "2026-07-08",
  },
  {
    slug: "customer-support-agent",
    title: "Customer Support Agent",
    team: "Customer Support",
    city: "Multiple cities",
    state: "Nigeria",
    workArrangement: "Remote",
    employmentType: "FULL_TIME",
    summary:
      "Be the real human at the other end of in-app support — resolve issues fast, fairly, and warmly.",
    description:
      "Our customer support team is the BiteExpress voice every time something goes sideways. This is a role for someone who genuinely likes solving problems for people and can stay warm and decisive under pressure.",
    responsibilities: [
      "Handle inbound customer issues across in-app chat, email and phone.",
      "Resolve order issues — refunds, rider escalations, vendor mistakes — fast and fairly.",
      "Document patterns so we can fix the root causes, not just the symptoms.",
      "Work shift rotations covering BiteExpress operating hours.",
    ],
    requirements: [
      "1+ years in customer support or a customer-facing role.",
      "Fluent written English and one major Nigerian language.",
      "Calm, empathetic, decisive when issues escalate.",
      "Comfortable working remotely with strong self-management.",
    ],
    perks: [
      "Competitive base + shift differentials.",
      "Fully remote — work from anywhere in Nigeria.",
      "Health insurance for full-time staff.",
      "Real career progression into team lead and ops roles.",
    ],
    datePosted: "2026-05-01",
    validThrough: "2026-07-01",
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

/** Sorted, latest first — used by the careers index. */
export function jobsByRecency(): Job[] {
  return [...jobs].sort((a, b) => b.datePosted.localeCompare(a.datePosted));
}
