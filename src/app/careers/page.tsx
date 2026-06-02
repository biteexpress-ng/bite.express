import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Briefcase,
  HandHeart,
  Heart,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import {
  fetchJobs,
  groupJobsByTeam,
  jobsByRecency,
  type JobListItem,
} from "@/lib/jobs-api";

export const revalidate = 900;

export const metadata = buildMetadata({
  title: "Careers at BiteExpress — open roles across Nigeria",
  description:
    "Join BiteExpress and help build the future of delivery in Nigeria. Engineering, operations, growth and customer support roles in our cities and remote.",
  path: "/careers",
  keywords: [
    "BiteExpress careers",
    "BiteExpress jobs",
    "tech jobs Nigeria",
    "operations jobs Nigeria",
    "Flutter engineer Nigeria",
    "city manager job Lagos",
  ],
});

function employmentLabel(j: JobListItem) {
  return j.employment_type
    .toLowerCase()
    .replace("_", " ")
    .replace(/^./, (s) => s.toUpperCase());
}

function workArrangementBadge(j: JobListItem) {
  return `${j.work_arrangement} · ${j.city}`;
}

function JobCard({ job }: { job: JobListItem }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group relative flex items-center justify-between gap-6 rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:border-brand-red hover:shadow-soft sm:p-6"
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-600">
          {job.team.name && (
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
              {job.team.name}
            </span>
          )}
          <span>{employmentLabel(job)}</span>
          {job.featured && (
            <span className="rounded-full bg-brand-red/10 px-2.5 py-1 text-brand-red">
              ★ Featured
            </span>
          )}
        </div>
        <h3 className="mt-3 font-serif text-xl leading-tight text-ink-900 sm:text-2xl">
          {job.title}
        </h3>
        {job.summary && (
          <p className="mt-2 max-w-2xl text-sm text-ink-600">{job.summary}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} className="text-brand-red" />
            {workArrangementBadge(job)}
          </span>
          {job.team.name && (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={12} className="text-brand-red" />
              {job.team.name}
            </span>
          )}
        </div>
      </div>
      <ArrowUpRight
        size={20}
        className="hidden flex-none text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red sm:block"
      />
    </Link>
  );
}

export default async function CareersPage() {
  const t = await getTranslations("careers");
  const { jobs } = await fetchJobs({ perPage: 100 });
  const sorted = jobsByRecency(jobs);
  const groups = groupJobsByTeam(sorted);

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-careers"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="What we look for"
            title="Five things every BiteExpresser shares."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <FeatureCard
              icon={Target}
              title="Bias to outcomes"
              description="We measure ourselves by what changes for customers, vendors and riders — not by what we did."
            />
            <FeatureCard
              icon={Sparkles}
              title="High craft"
              description="The order should be hot. The app should be quick. Quality is non-negotiable."
            />
            <FeatureCard
              icon={HandHeart}
              title="Fair to all three sides"
              description="Customers, vendors, riders. Decisions are checked against whether everyone wins."
            />
            <FeatureCard
              icon={Heart}
              title="Local at the core"
              description="We hire from the cities we serve. Lived context isn't a nice-to-have, it's the strategy."
            />
            <FeatureCard
              icon={Briefcase}
              title="Own the work"
              description="No throwing things over fences. You see something broken, you pick it up."
            />
          </div>
        </Container>
      </Section>

      {/* OPEN ROLES */}
      <Section background="soft" padding="lg" id="openings">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title={`${sorted.length} open role${sorted.length === 1 ? "" : "s"} across the team.`}
          />

          {groups.length === 0 ? (
            <p className="mt-12 max-w-2xl text-base text-ink-600">
              {t("noOpenings")}
            </p>
          ) : (
            <div className="mt-12 space-y-12">
              {groups.map(([team, list]) => (
                <div key={team}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                    {team}
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {list.map((job) => (
                      <JobCard key={job.slug} job={job} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
