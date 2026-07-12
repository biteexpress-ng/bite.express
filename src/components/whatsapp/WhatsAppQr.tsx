import { WhatsAppIcon } from "@/components/brand/social-icons";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  hint: string;
  className?: string;
};

/**
 * Desktop QR entry point. The QR SVG is pre-generated at
 * `public/brand/whatsapp/qr-order.svg` (see scripts note in the PR) and
 * encodes the exact `siteConfig.whatsappOrder.link`. Rendering the static
 * asset keeps the bundle free of any QR runtime dependency, and the white
 * card around it acts as the code's quiet zone for reliable scanning.
 */
export function WhatsAppQr({ label, hint, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-ink-200 bg-surface p-4 shadow-card",
        className,
      )}
    >
      <div className="flex-none rounded-xl bg-white p-2 ring-1 ring-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- static, crisp
            vector QR; next/image would force intrinsic-dimension handling for
            no benefit on an inline SVG. */}
        <img
          src="/brand/whatsapp/qr-order.svg"
          alt="QR code, scan to order food on WhatsApp with BiteExpress"
          width={104}
          height={104}
          className="block h-26 w-26"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-whatsapp-ink">
          <WhatsAppIcon size={16} aria-hidden />
          <span className="text-xs font-bold uppercase tracking-[0.14em]">
            {label}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-snug text-ink-600">{hint}</p>
      </div>
    </div>
  );
}
