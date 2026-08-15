"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes every motion component respect the user's
 * prefers-reduced-motion setting: transform and layout animations are applied
 * instantly instead of animating, while opacity still fades.
 *
 * This has to live in the animation layer rather than in component render
 * logic. framer-motion's `useReducedMotion()` returns null on the server and
 * the real value on the first client render, so branching on it while
 * rendering produces markup that differs between the server and hydration.
 * Every page here is statically prerendered, meaning the server emits one
 * fixed variant of the HTML and cannot know the visitor's preference, so no
 * render-time branch on it can ever hydrate cleanly. MotionConfig changes no
 * render output at all: it is read inside VisualElement when an animation
 * starts.
 *
 * Reading the preference inside an effect or an event handler is still fine,
 * since neither affects the rendered HTML.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
