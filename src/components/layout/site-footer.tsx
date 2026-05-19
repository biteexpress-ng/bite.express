import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/brand/social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/ui/container";
import { footerNav, siteConfig } from "@/lib/site-config";

const social = [
  { href: siteConfig.social.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
] as const;

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div>
      <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
        {heading}
      </h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) =>
          item.external ? (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-brand-black text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo variant="dark" className="h-10 md:h-12" />
            <p className="mt-5 max-w-xs text-sm text-white/70">
              Delivery, reimagined for every neighbourhood.
            </p>
            <NewsletterForm variant="dark" className="mt-8 max-w-sm" />
            <div className="mt-8 flex items-center gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-brand-red hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn heading="Company" items={footerNav.company} />
          <FooterColumn heading="Partner with us" items={footerNav.partners} />
          <FooterColumn heading="Support" items={footerNav.support} />
          <FooterColumn heading="Legal" items={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with care in Nigeria.
          </p>
        </div>
      </Container>
    </footer>
  );
}
