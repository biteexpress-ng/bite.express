/**
 * Locale registry. To add a new language:
 *   1. Add its tag here.
 *   2. Create messages/<tag>.json (start by copying en.json).
 *   3. (Eventually) move to URL-prefixed routing under app/[locale]/.
 */

export const locales = ["en"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];
