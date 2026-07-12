import { esc } from "@/lib/mailgun";
import { siteConfig } from "@/lib/site-config";
import { contactTopics, type ContactFormValues } from "@/lib/forms/contact";

function topicLabel(slug: string) {
  return contactTopics.find((t) => t.value === slug)?.label ?? slug;
}

export function contactMessageEmail(v: ContactFormValues): {
  subject: string;
  text: string;
  html: string;
} {
  const rows: Array<[string, string]> = [
    ["Name", v.fullName],
    ["Email", v.email],
    ["Topic", topicLabel(v.topic)],
  ];

  const subject = `New contact message, ${topicLabel(v.topic)}, ${v.fullName}`;

  const text = [
    subject,
    `via ${siteConfig.url}`,
    "",
    ...rows.map(([k, vv]) => `${k}: ${vv}`),
    "",
    "----",
    v.message,
  ].join("\n");

  const rowsHtml = rows
    .map(
      ([k, vv]) => `
        <tr>
          <td style="padding:8px 16px;background:#fafafa;border:1px solid #e5e7eb;font-weight:600;color:#111;width:30%">${esc(k)}</td>
          <td style="padding:8px 16px;border:1px solid #e5e7eb;color:#2a2a2a">${esc(vv)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px">
      <h1 style="font-size:22px;line-height:1.2;margin:0 0 16px">${esc(subject)}</h1>
      <p style="color:#6b7280;margin:0 0 24px">via ${esc(siteConfig.url)}</p>
      <table style="border-collapse:collapse;width:100%">${rowsHtml}</table>
      <div style="margin-top:24px;padding:16px;background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${esc(v.message)}</div>
    </div>`;

  return { subject, text, html };
}
