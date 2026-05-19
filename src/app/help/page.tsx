import { Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Help & support — BiteExpress",
  description:
    "Answers to common questions about ordering, payments, deliveries, BitePass, vendor and rider matters. Reach our support team if you need more help.",
  path: "/help",
});

type FaqGroup = { id: string; title: string; eyebrow: string; items: FaqItem[] };

const groups: FaqGroup[] = [
  {
    id: "ordering",
    eyebrow: "Ordering",
    title: "Placing an order",
    items: [
      {
        question: "How do I place my first order?",
        answer:
          "Open the app or visit bite.express, enter your delivery address, browse vendors near you, add items to your cart, and check out. You can pay by card, bank transfer or cash on delivery.",
      },
      {
        question: "Can I schedule a delivery for later?",
        answer:
          "Yes — at checkout you can pick a delivery time later today or tomorrow. We'll send you a reminder before your scheduled time so you can confirm or adjust.",
      },
      {
        question: "Can I cancel an order after placing it?",
        answer:
          "You can cancel for free up until the vendor accepts your order. After that, partial cancellation fees may apply depending on whether the order has been prepared.",
      },
      {
        question: "Why don't I see my favourite restaurant?",
        answer:
          "We're constantly onboarding new vendors. If a place you love isn't on BiteExpress yet, tap 'Suggest a vendor' in the app or tell us via support — we'll reach out to them.",
      },
    ],
  },
  {
    id: "payments",
    eyebrow: "Payments",
    title: "Payments and refunds",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "Card (Visa, Mastercard, Verve), bank transfer, and cash on delivery. Your card details are tokenised through our payment provider — we never see or store them.",
      },
      {
        question: "How do refunds work?",
        answer:
          "If something goes wrong, contact support in-app. We refund to your original payment method or credit your BitePoints wallet — your choice. Refunds usually land within 3–5 business days.",
      },
      {
        question: "What is BitePoints?",
        answer:
          "BitePoints is your in-app wallet credit, earned from promotions, refunds and loyalty rewards. Apply at checkout to discount your next order.",
      },
    ],
  },
  {
    id: "delivery",
    eyebrow: "Delivery",
    title: "Tracking and delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Most orders arrive in 25–45 minutes depending on your distance from the vendor and the time of day. You'll see a live ETA before you confirm and a live tracker on the map once your rider picks up.",
      },
      {
        question: "Can I chat with my rider?",
        answer:
          "Yes — once your rider is on the way, an in-app chat opens up. You can send them gate codes, directions, or call them directly if you need to.",
      },
      {
        question: "What if my rider can't find my address?",
        answer:
          "Open the in-app chat and share clearer directions or a landmark. You can also share your live location once the rider is close — it saves everyone time.",
      },
    ],
  },
  {
    id: "account",
    eyebrow: "Account & BitePass",
    title: "Your account",
    items: [
      {
        question: "How do I create a BiteExpress account?",
        answer:
          "Open the app, tap 'Sign up' and verify your phone number or email. You can also sign in with Google or Apple. Your saved addresses, payment methods and order history travel with you.",
      },
      {
        question: "What is BitePass?",
        answer:
          "BitePass is our membership programme — pay a small monthly fee and get free delivery on eligible orders, exclusive discounts and priority support. Try it free for your first month.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Go to Profile → Settings → Delete account in the app. Or email us at " +
          siteConfig.supportEmail +
          " — we'll delete your data within 30 days.",
      },
    ],
  },
  {
    id: "vendors",
    eyebrow: "Vendor questions",
    title: "For vendors",
    items: [
      {
        question: "How do I list my business on BiteExpress?",
        answer:
          "Visit /vendors and submit an application — we'll respond within 2 business days with onboarding next steps. Most vendors are live within 48 hours.",
      },
      {
        question: "When do vendors get paid?",
        answer:
          "Every Tuesday for the previous week's orders. Settlements go straight to your verified bank account; your vendor dashboard shows every order, refund and commission in real time.",
      },
    ],
  },
  {
    id: "riders",
    eyebrow: "Rider questions",
    title: "For riders",
    items: [
      {
        question: "How do I become a BiteExpress rider?",
        answer:
          "Visit /riders and apply — we verify your documents within 2 business days. Most riders are earning within a week of applying.",
      },
      {
        question: "How and when do riders get paid?",
        answer:
          "Weekly to your bank account, with an option to cash out from the in-app wallet (small fee for instant cashout).",
      },
    ],
  },
];

export default function HelpPage() {
  const allFaqs = groups.flatMap((g) => g.items);

  return (
    <>
      <JsonLd id="ld-faq-help" data={faqSchema(allFaqs)} />
      <JsonLd
        id="ld-breadcrumb-help"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Help", path: "/help" },
        ])}
      />

      {/* HERO */}
      <Section background="soft" padding="md">
        <Container size="narrow">
          <Eyebrow>Help centre</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
            How can we help?
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            Search topics below or reach our support team directly — we're real
            humans, available across the BiteExpress operating hours.
          </p>
        </Container>
      </Section>

      {/* SUPPORT CHANNELS */}
      <Section background="white" padding="sm">
        <Container size="narrow">
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="group flex items-start gap-3 rounded-2xl border border-ink-200 bg-white p-5 transition-shadow hover:shadow-soft"
            >
              <Mail size={20} className="mt-0.5 flex-none text-brand-red" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-600">
                  Email
                </div>
                <div className="font-semibold text-ink-900">
                  {siteConfig.supportEmail}
                </div>
              </div>
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="group flex items-start gap-3 rounded-2xl border border-ink-200 bg-white p-5 transition-shadow hover:shadow-soft"
            >
              <Phone size={20} className="mt-0.5 flex-none text-brand-red" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-600">
                  Phone
                </div>
                <div className="font-semibold text-ink-900">{siteConfig.phone}</div>
              </div>
            </a>
            <a
              href="/contact"
              className="group flex items-start gap-3 rounded-2xl border border-ink-200 bg-white p-5 transition-shadow hover:shadow-soft"
            >
              <MessageCircle size={20} className="mt-0.5 flex-none text-brand-red" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-600">
                  Message
                </div>
                <div className="font-semibold text-ink-900">
                  Send us a message
                </div>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* FAQ GROUPS */}
      {groups.map((g) => (
        <Section
          key={g.id}
          id={g.id}
          background={g.id === "ordering" ? "white" : "white"}
          padding="md"
        >
          <Container size="narrow">
            <SectionHeading eyebrow={g.eyebrow} title={g.title} />
            <FaqAccordion items={g.items} defaultOpen={-1} className="mt-8" />
          </Container>
        </Section>
      ))}

      {/* FALLBACK CTA */}
      <Section background="dark" padding="md">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Didn't find what you needed?
          </h2>
          <p className="mt-3 text-base text-white/70">
            Reach out and we'll get back to you — usually within a few hours.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Contact support
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
