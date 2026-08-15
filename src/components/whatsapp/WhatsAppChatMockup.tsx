"use client";

import { motion } from "framer-motion";
import { Phone, Video, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export type ChatLine = { from: "bot" | "user"; text: string };

type Props = {
  headerName: string;
  headerStatus: string;
  today: string;
  chat: ChatLine[];
  className?: string;
};

/** Read receipt — WhatsApp's double blue tick on delivered/read messages. */
function ReadTicks() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4 flex-none" aria-hidden>
      <path
        fill="#53bdeb"
        d="M17.4 1.3a.6.6 0 0 0-.85-.06l-6.6 5.9-.4-.36 6.6-5.9a.6.6 0 0 0-.8-.9l-7 6.26a.6.6 0 0 0 0 .9l1.3 1.16a.6.6 0 0 0 .8 0l7.06-6.3a.6.6 0 0 0 .1-.86Z"
      />
      <path
        fill="#53bdeb"
        d="M12.4 1.3a.6.6 0 0 0-.85-.06l-6.9 6.17-2.5-2.24a.6.6 0 1 0-.8.9l2.9 2.6a.6.6 0 0 0 .8 0l7.3-6.52a.6.6 0 0 0 .05-.85Z"
      />
    </svg>
  );
}

/**
 * The money shot — a phone showing the real WhatsApp ordering bot flow,
 * built entirely in markup/CSS so it stays crisp and localizable (every
 * line comes from i18n via the `chat` prop). Bubbles reveal in a light
 * upward stagger on view; reduced-motion users get them all at once.
 */
export function WhatsAppChatMockup({
  headerName,
  headerStatus,
  today,
  chat,
  className,
}: Props) {

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  };
  const bubble = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.32, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-[20rem]", className)}>
      {/* Ambient green halo — the WhatsApp accent, never a fill. */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-whatsapp/20 blur-3xl"
      />

      {/* Device */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-obsidian-700 bg-obsidian shadow-luxe ring-1 ring-black/5">
        {/* Dynamic-island notch */}
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-[2.2rem] bg-[#e6ddd4]">
          {/* Chat header — WhatsApp green, white content (accessible) */}
          <div className="flex items-center gap-2.5 bg-whatsapp-cta px-3 pb-2.5 pt-8 text-white">
            <ChevronLeft size={20} className="flex-none opacity-90" aria-hidden />
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-base font-bold text-brand-red">
              b
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-semibold">{headerName}</div>
              <div className="text-[11px] text-white/80">{headerStatus}</div>
            </div>
            <Video size={18} className="flex-none opacity-90" aria-hidden />
            <Phone size={17} className="flex-none opacity-90" aria-hidden />
          </div>

          {/* Chat body */}
          <div className="relative flex-1 overflow-hidden">
            {/* Subtle WhatsApp doodle texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]"
            />
            {/* Fade the top of the thread so it reads as scrolled history */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#e6ddd4] to-transparent"
            />

            <motion.div
              className="flex h-full flex-col justify-end gap-1.5 overflow-hidden px-3 pb-3 pt-4"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-12%" }}
            >
              <motion.div variants={bubble} className="mx-auto my-1">
                <span className="rounded-md bg-white/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-500 shadow-soft">
                  {today}
                </span>
              </motion.div>

              {chat.map((line, i) => {
                const isUser = line.from === "user";
                return (
                  <motion.div
                    key={i}
                    variants={bubble}
                    className={cn(
                      "flex w-full",
                      isUser ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "relative max-w-[82%] whitespace-pre-line rounded-xl px-2.5 py-1.5 text-[12.5px] leading-snug shadow-soft",
                        isUser
                          ? "rounded-tr-sm bg-[#d9fdd3] text-ink-900"
                          : "rounded-tl-sm bg-white text-ink-900",
                      )}
                    >
                      {line.text}
                      <span
                        className={cn(
                          "mt-0.5 flex items-center justify-end gap-1 text-[9px] text-ink-400",
                        )}
                      >
                        9:4{i}
                        {isUser && <ReadTicks />}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Composer bar */}
          <div className="flex items-center gap-2 bg-[#e6ddd4] px-3 pb-4 pt-1.5">
            <div className="flex h-9 flex-1 items-center rounded-full bg-white px-3.5 text-[12px] text-ink-400 shadow-soft">
              Message
            </div>
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-whatsapp-cta text-white shadow-soft">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
