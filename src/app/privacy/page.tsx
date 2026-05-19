import { LegalPage } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

/**
 * DRAFT — pending legal review. Final text must be approved by counsel
 * before public launch. Last revised: 2026-05-19.
 */

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How BiteExpress collects, uses and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-privacy"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalPage title="Privacy Policy" lastUpdated="19 May 2026">
        <p>
          This Privacy Policy explains how {siteConfig.legalName} (
          <strong>"BiteExpress"</strong>, <strong>"we"</strong>,{" "}
          <strong>"our"</strong>, <strong>"us"</strong>) collects, uses, shares
          and protects your personal information when you use bite.express, the
          BiteExpress mobile apps, and any related services (together, the{" "}
          <strong>"Services"</strong>).
        </p>
        <p>
          We are committed to handling your information transparently and in
          line with the Nigeria Data Protection Act 2023 (NDPA) and other
          applicable laws.
        </p>

        <h2>1. Information we collect</h2>
        <p>We collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Account information</strong> — name, phone number, email,
            password (hashed), profile photo.
          </li>
          <li>
            <strong>Delivery information</strong> — addresses, geolocation, map
            pins, delivery instructions.
          </li>
          <li>
            <strong>Order information</strong> — items ordered, vendors, totals,
            ratings and feedback.
          </li>
          <li>
            <strong>Payment information</strong> — tokenised card references,
            transaction history. We never store your full card number.
          </li>
          <li>
            <strong>Device and usage data</strong> — device model, OS, IP
            address, in-app interactions, crash reports.
          </li>
          <li>
            <strong>Communications</strong> — chat messages with riders/
            vendors, customer support tickets and call recordings.
          </li>
        </ul>

        <h2>2. How we use your information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and deliver your orders.</li>
          <li>
            Calculate fees, apply promotions, and pay vendors and riders.
          </li>
          <li>Provide customer support and resolve disputes.</li>
          <li>Detect, investigate and prevent fraud or abuse.</li>
          <li>
            Improve the Services, including through analytics, A/B testing and
            machine-learning features (e.g. recommendations).
          </li>
          <li>
            Send transactional and operational notifications (you can disable
            marketing notifications in settings).
          </li>
        </ul>

        <h2>3. Sharing your information</h2>
        <p>
          We share information only as needed to operate the Services and only
          with the categories of recipients listed below:
        </p>
        <ul>
          <li>
            <strong>Vendors and riders</strong> assigned to your order —
            limited to what they need to prepare or deliver it.
          </li>
          <li>
            <strong>Payment processors</strong> licensed in Nigeria — to settle
            transactions.
          </li>
          <li>
            <strong>Infrastructure providers</strong> (cloud hosting, email,
            analytics) bound by data protection contracts.
          </li>
          <li>
            <strong>Law enforcement and regulators</strong> when required by
            law or to protect users.
          </li>
        </ul>
        <p>We do not sell your personal information to anyone.</p>

        <h2>4. Your rights</h2>
        <p>Under the NDPA, you have the right to:</p>
        <ul>
          <li>Access the information we hold about you.</li>
          <li>Correct inaccurate or outdated information.</li>
          <li>
            Request deletion of your account and data (subject to legal
            retention requirements).
          </li>
          <li>Withdraw consent to marketing communications at any time.</li>
          <li>Object to certain types of processing.</li>
        </ul>
        <p>
          To exercise any of these rights, contact{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>

        <h2>5. Data retention</h2>
        <p>
          We retain order and account records for as long as your account is
          active and for up to seven years after closure, to meet tax,
          accounting and dispute-resolution requirements. We may keep
          de-identified analytics indefinitely.
        </p>

        <h2>6. Security</h2>
        <p>
          We protect your data with encryption in transit (HTTPS), encryption
          at rest on production servers, access controls and routine security
          reviews. No system is 100% secure, but we work hard to keep yours
          safe.
        </p>

        <h2>7. Cookies and similar technologies</h2>
        <p>
          We use cookies and similar technologies to keep you signed in,
          remember preferences and measure how the Services are used. See our{" "}
          <a href="/cookies">Cookie Policy</a> for details.
        </p>

        <h2>8. Children</h2>
        <p>
          BiteExpress is not directed at children under 16. We do not knowingly
          collect personal information from children. If you believe we have,
          contact us and we will delete it.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If changes are
          material, we'll notify you in-app or by email before they take
          effect. The "Last updated" date at the top of this page reflects the
          current version.
        </p>

        <h2>10. Contact us</h2>
        <p>
          For privacy questions or requests:{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </LegalPage>
    </>
  );
}
