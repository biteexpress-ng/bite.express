import { jsonLdScript } from "@/lib/jsonld";

type Props = {
  /** A single JSON-LD object or an array of them. */
  data: unknown;
  /** Stable id for React reconciliation when multiple JsonLd blocks live on a page. */
  id?: string;
};

/**
 * Inline JSON-LD tag with the Next-recommended XSS guard.
 * Server-component only — never use inside a "use client" tree.
 */
export function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
