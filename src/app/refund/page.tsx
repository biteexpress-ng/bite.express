import { LegalPage } from "@/components/legal/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

/**
 * DRAFT — pending legal review. Last revised: 2026-05-19.
 */

export const metadata = buildMetadata({
  title: "Refund Policy",
  description: "How refunds work on BiteExpress — clearly and fairly.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-refund"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refund" },
        ])}
      />
      <LegalPage title="Refund Policy" lastUpdated="19 May 2026">
        <p>
          We want every BiteExpress order to land exactly as expected. When
          things go wrong, this Refund Policy explains what you can expect from
          us and how to get help fast.
        </p>

        <h2>1. When we issue refunds</h2>
        <p>You&apos;re eligible for a refund (full or partial) when:</p>
        <ul>
          <li>The order was cancelled before the vendor began preparing it.</li>
          <li>
            An item is missing or substituted without your prior agreement.
          </li>
          <li>The order arrives damaged, spoiled or unsafe to consume.</li>
          <li>The delivery never arrives, or is unacceptably late.</li>
          <li>
            You were charged in error — for example, double-billed for the
            same order.
          </li>
        </ul>

        <h2>2. How to request a refund</h2>
        <ol>
          <li>
            Open the BiteExpress app and tap <strong>Help → Report an issue</strong>{" "}
            on the order in question.
          </li>
          <li>
            Tell us what went wrong and, if relevant, share a photo. The more
            specific you are, the faster we resolve it.
          </li>
          <li>
            Our support team typically responds within a few minutes during
            business hours.
          </li>
        </ol>
        <p>
          You can also email{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>

        <h2>3. How refunds are paid</h2>
        <p>
          We refund to whichever payment method you used, or, at your option,
          as <strong>BitePoints</strong> credit that you can apply to your next
          order. BitePoints credits typically appear instantly; refunds to a
          card or bank account usually arrive within 3–5 business days
          depending on your bank.
        </p>

        <h2>4. Cancellation fees</h2>
        <p>
          Cancellation is free before the vendor accepts your order. Once
          preparation has started, partial fees may apply — typically the cost
          of any food the vendor has already cooked or perishable items they&apos;ve
          opened. We try to be fair to both you and the vendor.
        </p>

        <h2>5. Riders, weather and unforeseen events</h2>
        <p>
          If a delivery fails because of factors outside everyone&apos;s control
          (severe weather, road closures, unsafe areas), we&apos;ll refund or
          re-attempt as appropriate. We don&apos;t penalise you for issues you
          couldn&apos;t avoid.
        </p>

        <h2>6. Abuse of the refund process</h2>
        <p>
          We track refund claims to protect the platform and our partner
          vendors. Accounts that consistently submit refund claims found to be
          inaccurate may be reviewed, restricted or closed.
        </p>

        <h2>7. Questions</h2>
        <p>
          We&apos;re real humans, and we want every refund issue resolved cleanly.
          Email{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          if you need help.
        </p>
      </LegalPage>
    </>
  );
}
