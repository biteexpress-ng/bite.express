import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

/**
 * Shared shell for legal/policy pages. Provides the long-form prose
 * styling tuned for readable legal copy.
 *
 * NOTE: All copy on legal pages is BiteExpress's working draft and
 * must be reviewed by counsel before public launch.
 */
export function LegalPage({ eyebrow = "Legal", title, lastUpdated, children }: Props) {
  return (
    <>
      <Section background="soft" padding="md">
        <Container size="narrow">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-ink-600">
            Last updated: <time>{lastUpdated}</time>
          </p>
        </Container>
      </Section>

      <Section background="white" padding="lg">
        <Container size="narrow">
          <article className="legal-prose">{children}</article>
        </Container>
      </Section>
    </>
  );
}
