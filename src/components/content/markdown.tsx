import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";

type Props = {
  content: string;
  /** Extra classes applied to the prose wrapper. */
  className?: string;
};

/**
 * Server-rendered Markdown content with GitHub-flavored extensions
 * (tables, strikethrough, autolinks, task lists).
 *
 * react-markdown intentionally does NOT pass raw HTML through by
 * default — so admin-authored content is XSS-safe even if a writer
 * embeds <script> tags. We don't enable rehype-raw on purpose.
 *
 * Styling reuses the .legal-prose tokens defined in globals.css so
 * long-form content across legal pages, jobs and blog all look
 * consistent with the brand fonts and spacing.
 */
export function Markdown({ content, className }: Props) {
  return (
    <div className={cn("legal-prose", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
