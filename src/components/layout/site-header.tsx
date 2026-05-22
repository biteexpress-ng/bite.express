"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

/**
 * Sticky header that:
 *   - Sits transparently over the dark hero on `/` until the user
 *     scrolls past 8px, then flips to the opaque white treatment.
 *   - Stays in the opaque white treatment on every other route.
 *   - Shows a cart icon button that opens the customer app
 *     (currently `/coming-soon` until app v0 ships).
 *
 * Lazy hydration is fine — the initial server render assumes the
 * default white treatment, which is what every non-home page wants
 * anyway, and the home-page swap happens in the same tick on mount
 * so the visual flash is imperceptible.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        overDark
          ? "border-b border-transparent bg-transparent"
          : "border-b border-ink-200/60 bg-white/90 backdrop-blur shadow-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo variant={overDark ? "dark" : "light"} priority />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                overDark
                  ? "text-white/85 hover:text-white"
                  : "text-ink-700 hover:text-brand-red",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right cluster — Cart + Order now */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={siteConfig.shopHref}
            aria-label="Cart"
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              overDark
                ? "border-white/20 text-white/90 hover:bg-white/10 hover:text-white"
                : "border-ink-200 text-ink-900 hover:bg-ink-50 hover:text-brand-red",
            )}
          >
            <ShoppingBag size={17} strokeWidth={1.8} />
          </Link>
          <ButtonLink href={siteConfig.shopHref} variant="primary" size="sm">
            Order now
          </ButtonLink>
        </div>

        {/* Mobile right cluster — Cart + hamburger */}
        <div className="-mr-2 flex items-center gap-1 md:hidden">
          <Link
            href={siteConfig.shopHref}
            aria-label="Cart"
            onClick={() => setOpen(false)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              overDark
                ? "text-white hover:bg-white/10"
                : "text-ink-900 hover:bg-ink-100",
            )}
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
          </Link>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              overDark
                ? "text-white hover:bg-white/10"
                : "text-ink-900 hover:bg-ink-100",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {primaryNav.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-50"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <ButtonLink
              href={siteConfig.shopHref}
              variant="primary"
              size="md"
              className="mt-2 w-full"
            >
              Order now
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
