"use server";

import { api } from "@/lib/api-client";
import { sendMail } from "@/lib/mailgun";
import {
  newsletterSchema,
  type NewsletterValues,
} from "@/lib/forms/newsletter";
import { siteConfig } from "@/lib/site-config";

export type NewsletterResult =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; message: string };

type BackendError = { errors?: Array<{ message?: string }> };

/**
 * Subscribe an email to the BiteExpress newsletter.
 *
 *  1. Validate with Zod.
 *  2. POST to /api/v1/newsletter/subscribe — backend persists the email
 *     (with a unique constraint, so duplicate signups are caught).
 *  3. Best-effort send the new subscriber a friendly confirmation via
 *     Mailgun. If Mailgun isn't configured we still return success —
 *     the backend has the email.
 *
 * If the backend itself is unreachable, we still attempt the
 * confirmation email so the lead isn't lost; ops can manually sync.
 */
export async function subscribeToNewsletter(
  values: NewsletterValues,
): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Enter a valid email and try again." };
  }
  const { email } = parsed.data;

  let alreadySubscribed = false;

  const apiRes = await api<{ message?: string }>(
    "/api/v1/newsletter/subscribe",
    {
      method: "POST",
      body: { email },
    },
  );

  if (!apiRes.ok && !("skipped" in apiRes)) {
    // 403 from this endpoint usually means the email is already subscribed
    // (unique constraint). Treat that as a soft success.
    if (apiRes.status === 403) {
      alreadySubscribed = true;
    } else {
      // Try to parse a useful error message
      let serverMessage = apiRes.message;
      try {
        const parsedErr = JSON.parse(apiRes.message) as BackendError;
        serverMessage = parsedErr?.errors?.[0]?.message ?? serverMessage;
      } catch {
        /* leave as-is */
      }
      console.warn("[newsletter] backend rejected signup:", apiRes);
      return {
        ok: false,
        message:
          serverMessage ||
          "Something went wrong on our side. Please try again in a moment.",
      };
    }
  }

  // Best-effort confirmation email — never blocks success.
  if (!alreadySubscribed) {
    await sendMail({
      to: email,
      from: process.env.MAILGUN_FROM_EMAIL,
      subject: "Welcome to BiteExpress 👋",
      text: [
        `Thanks for subscribing to BiteExpress.`,
        ``,
        `You'll hear from us when something good happens, new cities, new vendors, member-only offers, the occasional behind-the-scenes story.`,
        ``,
        `No spam. Unsubscribe any time.`,
        ``,
        `, The BiteExpress team`,
        `${siteConfig.url}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
          <h1 style="font-size:24px;margin:0 0 12px;color:#111">Thanks for subscribing 👋</h1>
          <p style="font-size:16px;line-height:1.6;color:#2a2a2a">
            We'll write when something genuinely good is worth telling you about, new cities, new vendors, member offers, the occasional behind-the-scenes story. No spam. Unsubscribe any time.
          </p>
          <p style="font-size:14px;color:#6b7280;margin-top:32px">
           , The BiteExpress team<br/>
            <a href="${siteConfig.url}" style="color:#de1600">${siteConfig.url}</a>
          </p>
        </div>`,
    });
  }

  return { ok: true, alreadySubscribed };
}
