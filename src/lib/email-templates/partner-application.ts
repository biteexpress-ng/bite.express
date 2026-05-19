import { esc } from "@/lib/mailgun";
import { siteConfig } from "@/lib/site-config";
import type {
  AgentFormValues,
  RiderFormValues,
  VendorFormValues,
} from "@/lib/forms/schemas";
import { cities } from "@/lib/cities";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

type EmailBody = { subject: string; text: string; html: string };

function shellHtml(title: string, rows: Array<[string, string]>, body?: string) {
  const tableRows = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:8px 16px;background:#fafafa;border:1px solid #e5e7eb;font-weight:600;color:#111;width:30%;vertical-align:top">${esc(k)}</td>
          <td style="padding:8px 16px;border:1px solid #e5e7eb;color:#2a2a2a;vertical-align:top">${esc(v) || "—"}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px">
      <h1 style="font-size:22px;line-height:1.2;margin:0 0 16px">${esc(title)}</h1>
      <p style="color:#6b7280;margin:0 0 24px">via ${esc(siteConfig.url)}</p>
      <table style="border-collapse:collapse;width:100%">${tableRows}</table>
      ${body ? `<div style="margin-top:24px;padding:16px;background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${esc(body)}</div>` : ""}
    </div>`;
}

function shellText(title: string, rows: Array<[string, string]>, body?: string) {
  const lines = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");
  return `${title}\nvia ${siteConfig.url}\n\n${lines}${body ? `\n\n----\n${body}` : ""}`;
}

export function vendorApplicationEmail(v: VendorFormValues): EmailBody {
  const rows: Array<[string, string]> = [
    ["Business name", v.businessName],
    ["Contact name", v.contactName],
    ["Email", v.email],
    ["Phone", v.phone],
    ["City", cityName(v.city)],
    ["Vendor type", v.vendorType],
    ["Locations", v.numberOfLocations],
  ];
  const subject = `New vendor application — ${v.businessName} (${cityName(v.city)})`;
  return {
    subject,
    text: shellText(subject, rows, v.message || undefined),
    html: shellHtml(subject, rows, v.message || undefined),
  };
}

export function riderApplicationEmail(v: RiderFormValues): EmailBody {
  const rows: Array<[string, string]> = [
    ["Full name", v.fullName],
    ["Email", v.email],
    ["Phone", v.phone],
    ["City", cityName(v.city)],
    ["Vehicle", v.vehicleType],
    ["Availability", v.availability],
  ];
  const subject = `New rider application — ${v.fullName} (${cityName(v.city)})`;
  return {
    subject,
    text: shellText(subject, rows),
    html: shellHtml(subject, rows),
  };
}

export function agentApplicationEmail(v: AgentFormValues): EmailBody {
  const rows: Array<[string, string]> = [
    ["Full name", v.fullName],
    ["Email", v.email],
    ["Phone", v.phone],
    ["City / area", cityName(v.city)],
  ];
  const subject = `New agent application — ${v.fullName} (${cityName(v.city)})`;
  return {
    subject,
    text: shellText(subject, rows, v.network),
    html: shellHtml(subject, rows, v.network),
  };
}
