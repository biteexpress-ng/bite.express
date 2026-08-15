import Image from "next/image";
import { Globe } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/brand/social-icons";
import type { TeamMember } from "@/lib/team-api";
import { cn } from "@/lib/cn";

/** Two letters, from the first and last word of the name. */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * Portrait in a 4:5 frame. Falls back to a serif monogram when an admin has
 * not uploaded a photo yet, which is the common state for a fresh roster.
 */
export function Portrait({
  member,
  sizes,
  className,
  priority = false,
}: {
  member: TeamMember;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-obsidian-800",
        className,
      )}
    >
      {member.photo_url ? (
        <Image
          src={member.photo_url}
          alt={member.photo_alt || `${member.name}, ${member.role}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_90%_at_30%_0%,rgba(222,22,0,0.28),transparent_60%),linear-gradient(160deg,#141110,#050505)]"
        >
          <span className="font-serif text-5xl tracking-tight text-white/25 sm:text-6xl">
            {initials(member.name)}
          </span>
        </div>
      )}
      {/* Hairline edge so the frame reads as a print, not a cutout. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/12"
      />
    </div>
  );
}

const platforms = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "x", label: "X", Icon: XIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "website", label: "Website", Icon: Globe },
] as const;

export function SocialRow({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  const links = platforms.filter(({ key }) => member.socials[key]);
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={member.socials[key] as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/55 ring-1 ring-white/15 transition duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-px hover:bg-brand-red hover:text-white hover:ring-brand-red"
          >
            <Icon size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}
