import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { siteConfig } from "@/lib/site-config";

type Props = {
  children: ReactNode;
  /** Defaults to the WhatsApp-green CTA; pass another to fit a dark/brand band. */
  variant?: "whatsapp" | "primary" | "outline" | "obsidian" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  iconSize?: number;
};

/**
 * The one and only "Order on WhatsApp" button. Always points at the shared
 * `siteConfig.whatsappOrder.link` deep link — never hardcode the number.
 * Renders as an external anchor (opens the WhatsApp app on mobile, WhatsApp
 * Web / a QR on desktop), so it's safe in server components.
 */
export function WhatsAppButton({
  children,
  variant = "whatsapp",
  size = "lg",
  className,
  iconSize = 20,
}: Props) {
  return (
    <ButtonLink
      href={siteConfig.whatsappOrder.link}
      external
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsAppIcon size={iconSize} aria-hidden />
      {children}
    </ButtonLink>
  );
}
