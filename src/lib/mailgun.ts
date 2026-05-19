/**
 * Tiny fetch-based Mailgun client. No SDK — keeps the dependency tree
 * lean and the bundle small.
 *
 * Env vars (all read at runtime, never at build time):
 *   MAILGUN_API_KEY        Private API key from your Mailgun dashboard.
 *   MAILGUN_DOMAIN         Sending domain (e.g. office.bite.express).
 *   MAILGUN_FROM_EMAIL     Default From address, must live on MAILGUN_DOMAIN.
 *                          Defaults to "BiteExpress <notifications@${MAILGUN_DOMAIN}>".
 *   MAILGUN_BASE_URL       "https://api.mailgun.net" (US, default) or
 *                          "https://api.eu.mailgun.net" (EU).
 *
 * When env vars are missing we return { ok: false, skipped: true }
 * so calling actions degrade gracefully in dev/preview without
 * crashing or hiding failures from the user.
 */

export type Attachment = {
  filename: string;
  content: Buffer | Uint8Array | ArrayBuffer;
  contentType: string;
};

export type MailgunPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  /** Override the From address for this message only. */
  from?: string;
  attachments?: Attachment[];
};

export type MailgunResult =
  | { ok: true; id?: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped?: false; status: number; message: string };

function isConfigured(): boolean {
  return Boolean(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN);
}

export async function sendMail(payload: MailgunPayload): Promise<MailgunResult> {
  if (!isConfigured()) {
    return {
      ok: false,
      skipped: true,
      reason:
        "MAILGUN_API_KEY or MAILGUN_DOMAIN not set — email skipped in this environment.",
    };
  }

  const apiKey = process.env.MAILGUN_API_KEY!;
  const domain = process.env.MAILGUN_DOMAIN!;
  const baseUrl = (
    process.env.MAILGUN_BASE_URL ?? "https://api.mailgun.net"
  ).replace(/\/$/, "");
  const from =
    payload.from ??
    process.env.MAILGUN_FROM_EMAIL ??
    `BiteExpress <notifications@${domain}>`;

  const form = new FormData();
  form.append("from", from);
  for (const to of Array.isArray(payload.to) ? payload.to : [payload.to]) {
    form.append("to", to);
  }
  form.append("subject", payload.subject);
  form.append("text", payload.text);
  if (payload.html) form.append("html", payload.html);
  if (payload.replyTo) form.append("h:Reply-To", payload.replyTo);

  for (const att of payload.attachments ?? []) {
    const blob = new Blob([att.content as BlobPart], { type: att.contentType });
    form.append("attachment", blob, att.filename);
  }

  const res = await fetch(`${baseUrl}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
    },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return {
      ok: false,
      status: res.status,
      message: text || res.statusText,
    };
  }

  const data = (await res.json().catch(() => ({}))) as { id?: string };
  return { ok: true, id: data.id };
}

/** Convenience escape helper for HTML email bodies. */
export function esc(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
