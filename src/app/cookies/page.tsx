import { LegalPage } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

/**
 * DRAFT — pending legal review. Last revised: 2026-05-19.
 */

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "How and why BiteExpress uses cookies and similar technologies, and how to control them.",
  path: "/cookies",
});

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-cookies"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
        ])}
      />
      <LegalPage title="Cookie Policy" lastUpdated="19 May 2026">
        <p>
          This Cookie Policy explains how {siteConfig.legalName} uses cookies
          and similar technologies on bite.express and across the BiteExpress
          Services. It supplements our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>1. What is a cookie?</h2>
        <p>
          A cookie is a small text file a website stores in your browser so it
          can recognise you on subsequent visits, for example, to keep you
          signed in, remember your language, or measure which features are
          actually being used.
        </p>

        <h2>2. The cookies we use</h2>

        <h3>Strictly necessary</h3>
        <p>
          Required for core functionality such as authentication, secure
          checkout, and remembering your selected delivery module. The Services
          will not function correctly without these, and they cannot be turned
          off.
        </p>

        <h3>Preferences</h3>
        <p>
          Remember choices like your address, language and module. These make
          BiteExpress easier to use but aren&apos;t essential.
        </p>

        <h3>Analytics</h3>
        <p>
          Help us understand how the Services are used in aggregate, so we can
          improve them. We use providers such as Google Analytics 4 and Vercel
          Analytics. These cookies do not identify you personally.
        </p>

        <h3>Marketing</h3>
        <p>
          Help us measure the effectiveness of our advertising and avoid
          showing you the same ads repeatedly. We may use providers such as
          Meta (Facebook/Instagram) and Google Ads.
        </p>

        <h2>3. Managing cookies</h2>
        <p>
          You can control cookies in your browser settings, block them
          entirely, accept only first-party cookies, or delete existing
          cookies. Note that blocking strictly-necessary cookies will break
          parts of the Services.
        </p>

        <h2>4. Third-party cookies</h2>
        <p>
          Some pages embed third-party content (for example, Google Maps,
          YouTube videos, payment provider widgets) which may set their own
          cookies. Those cookies are governed by the third party&apos;s own
          policies.
        </p>

        <h2>5. Changes to this policy</h2>
        <p>
          We may update this Cookie Policy as the cookies we use change. The
          &ldquo;Last updated&rdquo; date at the top reflects the current version.
        </p>

        <h2>6. Contact</h2>
        <p>
          Questions about cookies?{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </LegalPage>
    </>
  );
}
