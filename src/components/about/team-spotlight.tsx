"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { Portrait, SocialRow } from "@/components/about/team-portrait";
import type { TeamMember } from "@/lib/team-api";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/* --------------------------------------------------------------------------
 * Viewport query, SSR-safe. The server snapshot is always false, so the first
 * paint is the static roster: every name, role and link is in the HTML before
 * any JavaScript decides how to present it.
 * ------------------------------------------------------------------------ */

function subscribeToWide(onChange: () => void) {
  const mql = window.matchMedia("(min-width: 1024px)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useIsWide(): boolean {
  return useSyncExternalStore(
    subscribeToWide,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

/**
 * How much scroll each member gets, in vh. Longer rosters get shorter segments
 * so a twenty-person team does not turn the page into a mile of scrolling.
 */
function segmentVh(count: number): number {
  return Math.min(62, Math.max(28, Math.round(420 / Math.max(count, 1))));
}

/* --------------------------------------------------------------------------
 * Entry point
 * ------------------------------------------------------------------------ */

export function TeamSpotlight({ members }: { members: TeamMember[] }) {
  const isWide = useIsWide();
  const reduce = useReducedMotion();

  if (members.length === 0) return null;
  if (!isWide) return <RosterCarousel members={members} />;
  if (reduce) return <RosterGrid members={members} />;
  return <PinnedSpotlight members={members} />;
}

/* --------------------------------------------------------------------------
 * Desktop: the pinned spotlight
 * ------------------------------------------------------------------------ */

function PinnedSpotlight({ members }: { members: TeamMember[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listViewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [listShift, setListShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // One render per member, not one per frame: the index only changes when
  // scroll crosses a segment boundary.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(
      members.length - 1,
      Math.max(0, Math.floor(p * members.length)),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  // Keep the active name centred in its viewport as the roster advances.
  useLayoutEffect(() => {
    const item = itemRefs.current[active];
    const viewport = listViewportRef.current;
    if (!item || !viewport) return;
    setListShift(
      -(item.offsetTop + item.offsetHeight / 2 - viewport.offsetHeight / 2),
    );
  }, [active, members.length]);

  useEffect(() => {
    const onResize = () => {
      const item = itemRefs.current[active];
      const viewport = listViewportRef.current;
      if (!item || !viewport) return;
      setListShift(
        -(item.offsetTop + item.offsetHeight / 2 - viewport.offsetHeight / 2),
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const jumpTo = useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      const target =
        sectionTop + ((index + 0.5) / members.length) * scrollable;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [members.length],
  );

  const current = members[active];
  const segment = segmentVh(members.length);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100dvh + ${members.length * segment}vh)` }}
    >
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden py-16">
        <Container className="w-full">
          <div className="grid grid-cols-12 items-center gap-x-12">
            {/* PORTRAIT DECK + CAPTION */}
            <div className="col-span-5">
              <div className="relative w-full max-w-[26rem]">
                {/* The frame reserves the space; portraits stack inside it. */}
                <div className="relative aspect-[4/5] w-full">
                  {members.map((member, i) => {
                    const offset = i - active;
                    const spent = offset < 0;
                    const deep = offset > 2;
                    return (
                      <motion.div
                        key={member.id}
                        className="absolute inset-0"
                        style={{
                          zIndex: 30 - Math.abs(offset),
                          pointerEvents: "none",
                        }}
                        initial={false}
                        animate={{
                          opacity: spent || deep ? 0 : [1, 0.42, 0.18][offset],
                          x: spent ? 0 : [0, 26, 46][offset] ?? 58,
                          y: spent ? -44 : [0, 18, 32][offset] ?? 42,
                          rotate: spent ? -2 : [0, 2.2, 4.2][offset] ?? 5.4,
                          scale: spent ? 1.04 : [1, 0.93, 0.87][offset] ?? 0.84,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 22,
                          mass: 0.9,
                        }}
                      >
                        <Portrait member={member} sizes="(min-width: 1024px) 26rem, 100vw" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Caption crossfades with the deck. */}
                {/* Keyed on the member so a change remounts and replays the
                    entrance. No AnimatePresence: an exit animation would queue
                    behind fast scrolling and lag the deck. */}
                <div className="relative mt-8 min-h-[9.5rem]">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    {current.group && (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-400">
                        {current.group}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-lg text-white",
                        current.group && "mt-2",
                      )}
                    >
                      {current.role}
                    </p>
                    {current.bio && (
                      <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/55">
                        {current.bio}
                      </p>
                    )}
                    <SocialRow member={current} className="mt-5" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* NAME INDEX */}
            <div className="col-span-7 flex gap-8">
              {/* Progress rail. scaleY is bound to the motion value directly,
                  so it never triggers a React render. */}
              <div className="relative w-px shrink-0 self-stretch bg-white/12">
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-full origin-top bg-brand-red"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>

              <div
                ref={listViewportRef}
                className="relative h-[72vh] flex-1 overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_16%,#000_84%,transparent)]"
              >
                <motion.ul
                  ref={listRef}
                  className="relative"
                  animate={{ y: listShift }}
                  transition={{ type: "spring", stiffness: 130, damping: 24 }}
                >
                  {members.map((member, i) => {
                    const isActive = i === active;
                    return (
                      <li
                        key={member.id}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        className="py-3"
                      >
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          aria-current={isActive ? "true" : undefined}
                          className="group flex w-full items-center gap-5 text-left"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "h-px shrink-0 bg-brand-red transition-all duration-500 ease-[var(--ease-out-expo)]",
                              isActive ? "w-20 opacity-100" : "w-0 opacity-0",
                            )}
                          />
                          {/* Inactive names stay above 3:1 against the obsidian
                              ground. They are buttons, not decoration. */}
                          <span
                            className={cn(
                              "font-serif text-[2.5rem] leading-[1.08] tracking-tight transition-colors duration-300 xl:text-[3.25rem]",
                              isActive
                                ? "text-white"
                                : "text-white/45 group-hover:text-white/80",
                            )}
                          >
                            {member.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Narrow viewports: scroll-snap carousel
 * ------------------------------------------------------------------------ */

function RosterCarousel({ members }: { members: TeamMember[] }) {
  return (
    <div className="pb-24">
      <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {members.map((member) => (
          <li
            key={member.id}
            className="w-[74vw] max-w-[20rem] shrink-0 snap-start sm:w-[46vw]"
          >
            <MemberCard member={member} sizes="74vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Reduced motion: plain grid
 * ------------------------------------------------------------------------ */

function RosterGrid({ members }: { members: TeamMember[] }) {
  return (
    <Container className="pb-24">
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard member={member} sizes="(min-width: 1024px) 22rem, 45vw" />
          </li>
        ))}
      </ul>
    </Container>
  );
}

function MemberCard({
  member,
  sizes,
}: {
  member: TeamMember;
  sizes: string;
}) {
  return (
    <article>
      <Portrait member={member} sizes={sizes} />
      {member.group && (
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-400">
          {member.group}
        </p>
      )}
      <h3
        className={cn(
          "font-serif text-2xl leading-tight tracking-tight text-white",
          member.group ? "mt-2" : "mt-5",
        )}
      >
        {member.name}
      </h3>
      <p className="mt-1 text-white/70">{member.role}</p>
      {member.bio && (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/50">
          {member.bio}
        </p>
      )}
      <SocialRow member={member} className="mt-5" />
    </article>
  );
}
