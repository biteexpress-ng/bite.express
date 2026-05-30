import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/brand/social-icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

const social = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
] as const;

const customerLinks = [
  { label: "Browse Food", href: "https://app.bite.express/home?module=food" },
  { label: "Grocery", href: "https://app.bite.express/home?module=grocery" },
  { label: "Pharmacy", href: "https://app.bite.express/home?module=pharmacy" },
  { label: "Track Order", href: "https://app.bite.express/orders" },
  { label: "Help Centre", href: "/help" },
] as const;

const partnerLinks = [
  { label: "Partner with us", href: "/vendors" },
  { label: "Vendor Portal", href: "https://app.bite.express/vendors" },
  { label: "Rider Portal", href: "/riders" },
  { label: "Business Solutions", href: "/vendors" },
] as const;

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Newsroom", href: "/press" },
  { label: "Contact Us", href: "/contact" },
] as const;

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex h-full flex-col">
      <h4 className="font-sans text-[14px] font-semibold text-white">
        {heading}
      </h4>
      <ul className="mt-5 flex flex-col gap-2.5">
        {items.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <li key={item.label}>
              {isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#8e8e93] transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-[13px] text-[#8e8e93] transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 384 512"
      className="h-[20px] w-[16px] flex-none fill-current text-white"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-78.2-18.6-38.2.6-73.4 22.2-93 56.4-40.1 69.8-10.2 173 29.1 229.2 19.2 27.5 41.8 58 71.3 56.9 29.2-1.1 40.3-18.9 75.5-18.9s45.3 18.9 75.5 17.8c30.2-1.1 50-27.5 69.1-55.1 22.3-32.1 31.3-63.1 31.7-64.8-.9-.4-61.9-23.7-62.4-94.1zM252.1 74.9c19.1-23.1 31.9-55.2 28.4-86.9-27.3 1.1-60.6 18.2-80.1 41-16.7 19.3-31.3 51.8-27.4 82.9 30.3 2.4 61.2-14 79.1-37z" />
    </svg>
  );
}

function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 512 512" className="h-[20px] w-[20px] flex-none">
      <path
        fill="#00E5FF"
        d="M40.3,12.2c-5.7,5.9-9.1,14.6-9.1,25.3v449c0,10.7,3.4,19.4,9.1,25.3l2.2,2.2L265,286.5V259v-27.5L42.5,10L40.3,12.2z"
      />
      <path
        fill="#FFEB3B"
        d="M339.2,360.7l-74.2-74.2V259v-27.5l74.2-74.2l2.2,1.3l87.9,50c25.1,14.2,25.1,37.6,0,51.9l-87.9,50L339.2,360.7z"
      />
      <path
        fill="#FF1744"
        d="M267.2,259l-226.9,227c7.4,2.5,16,1.4,25.1-3.7l273.7-155.8L267.2,259z"
      />
      <path
        fill="#00E676"
        d="M267.2,259L339.2,331.2l1.3,0.7L65.4,176.1c-9.1-5.1-17.7-6.2-25.1-3.7L267.2,259z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#050505] text-white">
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1.8fr]">
          {/* Logo & Info column */}
          <div className="flex h-full flex-col items-start">
            <Logo variant="dark" className="h-[28px] w-auto" />
            <div className="mt-6 flex flex-col text-[13px] leading-relaxed text-[#8e8e93]">
              <p>Everything you crave.</p>
              <p>Delivered fast.</p>
            </div>
            <div className="mt-auto flex items-center gap-3 pt-8">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-full border border-white/20 text-[#8e8e93] transition-all duration-200 hover:border-white/40 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <FooterColumn heading="For Customers" items={customerLinks} />
          <FooterColumn heading="For Partners" items={partnerLinks} />
          <FooterColumn heading="Company" items={companyLinks} />
          <FooterColumn heading="Legal" items={legalLinks} />

          {/* Download Column */}
          <div className="flex h-full flex-col">
            <h4 className="font-sans text-[14px] font-semibold text-white">
              Download the app
            </h4>
            <div className="mt-5 flex flex-row items-center gap-3">
              <a
                href={siteConfig.appStore.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-[8px] border border-white/20 bg-black px-[14px] py-[8px] transition-all duration-200 hover:border-white/40 hover:bg-white/5"
                aria-label="Download on the App Store"
              >
                <AppleLogo />
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-sans font-medium uppercase leading-[1.1] tracking-[0.05em] text-white/70">
                    Download on the
                  </span>
                  <span className="mt-0.5 text-[13px] font-sans font-semibold leading-[1.1] text-white">
                    App Store
                  </span>
                </div>
              </a>

              <a
                href={siteConfig.appStore.android}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-[8px] border border-white/20 bg-black px-[14px] py-[8px] transition-all duration-200 hover:border-white/40 hover:bg-white/5"
                aria-label="Get it on Google Play"
              >
                <GooglePlayLogo />
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-sans font-medium uppercase leading-[1.1] tracking-[0.05em] text-white/70">
                    GET IT ON
                  </span>
                  <span className="mt-0.5 text-[13px] font-sans font-semibold leading-[1.1] text-white">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
            <p className="mt-auto pt-8 text-[11.5px] text-[#666666]">
              © 2024 BiteExpress. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
