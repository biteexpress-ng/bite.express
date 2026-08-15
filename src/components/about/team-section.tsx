import { Container } from "@/components/ui/container";
import { TeamSpotlight } from "@/components/about/team-spotlight";
import { JsonLd } from "@/components/seo/json-ld";
import { teamSchema } from "@/lib/jsonld";
import type { TeamMember } from "@/lib/team-api";

/**
 * The About-page roster.
 *
 * Deliberately not wrapped in <Section>: that component sets
 * `overflow-hidden`, and an ancestor with a clipped overflow disables the
 * scroll pinning this section depends on.
 *
 * No eyebrow either. The page already carries five, which is past what the
 * section rhythm absorbs.
 */
export function TeamSection({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="relative bg-obsidian text-white">
      <JsonLd id="ld-team-about" data={teamSchema(members)} />

      <Container className="pt-20 pb-14 sm:pt-28">
        <h2 className="max-w-3xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
          The people behind every order.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-white/60 sm:text-xl">
          The team running BiteExpress across the cities we serve.
        </p>
      </Container>

      {/* Renders once. The component picks its own layout from viewport width
          and motion preference, and each layout owns its horizontal padding. */}
      <TeamSpotlight members={members} />
    </section>
  );
}
