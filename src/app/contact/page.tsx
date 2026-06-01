import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contact BiteExpress — get in touch with our team",
  description:
    "Reach BiteExpress for general enquiries, support, partnerships, press or careers. We typically reply within 1 business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-contact"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <Section background="soft" padding="md">
        <Container size="narrow">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
            Get in touch.
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            For order issues, the fastest route is in-app support — we&apos;ll find
            your order and resolve it within minutes. For everything else, the
            form below or any of the channels on the right.
          </p>
        </Container>
      </Section>

      <Section background="white" padding="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* FORM */}
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8">
              <SectionHeading
                title="Send us a message"
                subtitle="We reply within 1 business day, usually sooner during business hours."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* CHANNELS */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-ink-200 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                  Email
                </h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 flex items-start gap-3 text-base font-semibold text-ink-900 hover:text-brand-red"
                >
                  <Mail size={20} className="mt-0.5 flex-none text-brand-red" />
                  {siteConfig.email}
                </a>
                <p className="mt-3 text-sm text-ink-600">
                  General enquiries, partnerships, press.
                </p>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                  Customer support
                </h3>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="mt-2 flex items-start gap-3 text-base font-semibold text-ink-900 hover:text-brand-red"
                >
                  <Mail size={20} className="mt-0.5 flex-none text-brand-red" />
                  {siteConfig.supportEmail}
                </a>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="mt-2 flex items-start gap-3 text-base font-semibold text-ink-900 hover:text-brand-red"
                >
                  <Phone size={20} className="mt-0.5 flex-none text-brand-red" />
                  {siteConfig.phone}
                </a>
                <p className="mt-3 text-sm text-ink-600">
                  For order, payment, or account issues.
                </p>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                  Headquarters
                </h3>
                <div className="mt-2 flex items-start gap-3 text-base text-ink-900">
                  <MapPin size={20} className="mt-0.5 flex-none text-brand-red" />
                  <span>
                    {siteConfig.address.streetAddress},{" "}
                    {siteConfig.address.addressLocality},{" "}
                    {siteConfig.address.addressRegion}, Nigeria
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
