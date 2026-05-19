import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { JobApplicationForm } from "@/components/forms/job-application-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/jsonld";
import { getJob, jobs, type Job } from "@/lib/jobs";
import { absoluteUrl } from "@/lib/seo";

type RouteProps = { params: Promise<{ slug: string }> };

/** Pre-render every job slug at build time. */
export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.title} — Careers at BiteExpress`,
    description: job.summary,
    path: `/careers/${job.slug}`,
    keywords: [
      job.title,
      `${job.title} ${job.city}`,
      `${job.team} jobs Nigeria`,
      "BiteExpress careers",
      "delivery startup jobs",
    ],
  });
}

function employmentLabel(j: Job) {
  return j.employmentType
    .toLowerCase()
    .replace("_", " ")
    .replace(/^./, (s) => s.toUpperCase());
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function JobDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const applyUrl = absoluteUrl(`/careers/${job.slug}#apply`);

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-job"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ])}
      />
      <JsonLd
        id="ld-jobposting"
        data={jobPostingSchema({
          title: job.title,
          description: `<p>${job.description}</p><h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
          datePosted: job.datePosted,
          validThrough: job.validThrough,
          employmentType: job.employmentType,
          city: job.city,
          state: job.state,
          applyUrl,
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-red"
          >
            <ArrowLeft size={14} />
            All open roles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-600">
            <Eyebrow>{job.team}</Eyebrow>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
              {employmentLabel(job)}
            </span>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
              {job.workArrangement}
            </span>
          </div>

          <h1 className="mt-5 font-serif text-[2.25rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.25rem] md:text-[4rem]">
            {job.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-600">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-brand-red" />
              {job.city}, {job.state}
            </span>
            <span className="inline-flex items-center gap-2">
              <Briefcase size={14} className="text-brand-red" />
              {job.team}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} className="text-brand-red" />
              Posted {formatDate(job.datePosted)}
            </span>
          </div>

          <div className="mt-8">
            <ButtonLink href="#apply" variant="primary" size="lg">
              Apply now
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* DESCRIPTION */}
      <Section background="white" padding="md">
        <Container size="narrow">
          <article className="legal-prose">
            <p className="text-lg">{job.description}</p>

            <h2>What you'll do</h2>
            <ul>
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h2>What we're looking for</h2>
            <ul>
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            {job.niceToHaves && job.niceToHaves.length > 0 && (
              <>
                <h2>Nice to have</h2>
                <ul>
                  {job.niceToHaves.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            <h2>What you'll get</h2>
            <ul>
              {job.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-brand-red" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </Section>

      {/* APPLY */}
      <Section background="soft" padding="lg" id="apply">
        <Container size="narrow">
          <Eyebrow>Apply</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl md:text-5xl">
            Apply for {job.title}
          </h2>
          <p className="mt-4 text-base text-ink-600">
            Send us your details and CV — our team reads every application and
            replies within 2 weeks either way.
          </p>

          <div className="mt-10 rounded-3xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8">
            <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        </Container>
      </Section>
    </>
  );
}
