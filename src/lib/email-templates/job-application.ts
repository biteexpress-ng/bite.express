import { esc } from "@/lib/mailgun";
import { siteConfig } from "@/lib/site-config";
import type { JobApplicationValues } from "@/lib/forms/job-application";

export function jobApplicationEmail(
  v: JobApplicationValues,
  cv: { name: string; size: number },
  jobTitle: string,
): { subject: string; text: string; html: string } {
  const cvSizeKb = Math.round(cv.size / 1024);

  const rows: Array<[string, string]> = [
    ["Role", jobTitle],
    ["Name", v.fullName],
    ["Email", v.email],
    ["Phone", v.phone],
    ["LinkedIn", v.linkedInUrl || ""],
    ["Portfolio", v.portfolioUrl || ""],
    ["CV", `${cv.name} (${cvSizeKb} KB), attached`],
  ];

  const subject = `Application, ${jobTitle}, ${v.fullName}`;

  const text = [
    subject,
    `via ${siteConfig.url}/careers/${v.jobSlug}`,
    "",
    ...rows.map(([k, val]) => `${k}: ${val || ","}`),
    ...(v.coverNote ? ["", "----", "Cover note:", v.coverNote] : []),
  ].join("\n");

  const rowsHtml = rows
    .map(
      ([k, val]) => `
        <tr>
          <td style="padding:8px 16px;background:#fafafa;border:1px solid #e5e7eb;font-weight:600;color:#111;width:30%">${esc(k)}</td>
          <td style="padding:8px 16px;border:1px solid #e5e7eb;color:#2a2a2a">${esc(val) || ","}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px">
      <h1 style="font-size:22px;line-height:1.2;margin:0 0 8px">${esc(subject)}</h1>
      <p style="color:#6b7280;margin:0 0 24px">
        via <a href="${esc(siteConfig.url)}/careers/${esc(v.jobSlug)}" style="color:#de1600">${esc(siteConfig.url)}/careers/${esc(v.jobSlug)}</a>
      </p>
      <table style="border-collapse:collapse;width:100%">${rowsHtml}</table>
      ${v.coverNote ? `<div style="margin-top:24px"><h3 style="font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0 0 8px">Cover note</h3><div style="padding:16px;background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${esc(v.coverNote)}</div></div>` : ""}
    </div>`;

  return { subject, text, html };
}
