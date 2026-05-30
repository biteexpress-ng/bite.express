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
  title: "Terms of Service",
  description: "The terms that govern your use of BiteExpress.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-terms"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <LegalPage title="Terms of Service" lastUpdated="19 May 2026">
        <p>
          These Terms of Service (<strong>&ldquo;Terms&rdquo;</strong>) govern your use of
          bite.express, the BiteExpress mobile apps, and any related services
          (together, the <strong>&ldquo;Services&rdquo;</strong>) provided by{" "}
          {siteConfig.legalName} (<strong>&ldquo;BiteExpress&rdquo;</strong>,{" "}
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;our&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>).
          By using the Services, you agree to these Terms.
        </p>

        <h2>1. The role we play</h2>
        <p>
          BiteExpress is a marketplace that connects customers with independent
          vendors (restaurants, stores, pharmacies, etc.) and independent
          riders. We do not prepare the food you order, sell the goods listed
          by vendors, or directly employ the riders who deliver to you.
        </p>

        <h2>2. Your account</h2>
        <ul>
          <li>You must be at least 16 years old to create an account.</li>
          <li>
            Provide accurate information and keep your login credentials
            secure.
          </li>
          <li>
            You are responsible for activity that happens under your account.
          </li>
        </ul>

        <h2>3. Orders and payments</h2>
        <ul>
          <li>
            All orders are subject to vendor acceptance and rider availability.
          </li>
          <li>
            Prices, fees and estimated delivery times are shown before you
            confirm. Once you confirm, you are committing to pay.
          </li>
          <li>
            We accept card, bank transfer and cash on delivery. Payments are
            processed by licensed third-party providers.
          </li>
        </ul>

        <h2>4. Cancellations and refunds</h2>
        <p>
          Our cancellation and refund handling is set out in detail in our{" "}
          <a href="/refund">Refund Policy</a>. In summary:
        </p>
        <ul>
          <li>Free cancellation before a vendor accepts your order.</li>
          <li>
            Partial cancellation fees may apply once preparation has started.
          </li>
          <li>
            Refunds are issued to your original payment method or as BitePoints
            wallet credit.
          </li>
        </ul>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services to break any law.</li>
          <li>Place fraudulent or speculative orders.</li>
          <li>Abuse, threaten or harass vendors, riders or staff.</li>
          <li>
            Attempt to disrupt the Services, circumvent security measures, or
            scrape data without permission.
          </li>
        </ul>
        <p>
          We may suspend or terminate accounts that violate these rules and
          report serious violations to authorities.
        </p>

        <h2>6. Vendor and rider obligations</h2>
        <p>
          Vendors and riders agree to additional terms specific to their roles
          on the platform, including quality standards, payout terms, and
          conduct expectations. These are made available during onboarding.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          The BiteExpress name, logo, software and content are owned by{" "}
          {siteConfig.legalName} and protected under intellectual-property
          laws. You may not copy, modify, or use them without our written
          permission, except as needed to use the Services for their intended
          purpose.
        </p>

        <h2>8. Disclaimers</h2>
        <p>
          The Services are provided &ldquo;as is&rdquo; without warranties of any kind,
          express or implied, to the maximum extent permitted by law. We do
          not warrant that the Services will be uninterrupted, error-free, or
          meet every requirement.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, our total liability to you
          for any claim arising from your use of the Services will not exceed
          the total amount you paid us in the three months preceding the
          claim. We are not liable for indirect, incidental, consequential or
          punitive damages.
        </p>

        <h2>10. Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of
          Nigeria. Disputes will be resolved in the courts of Nigeria, unless
          we mutually agree to alternative dispute resolution.
        </p>

        <h2>11. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. If changes are material
          we&apos;ll notify you in-app or by email before they take effect. Your
          continued use of the Services after a change means you accept the
          revised Terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms?{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalPage>
    </>
  );
}
