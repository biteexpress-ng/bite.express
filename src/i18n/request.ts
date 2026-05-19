import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./locales";

/**
 * next-intl request configuration (no-routing mode).
 * Locale is fixed to defaultLocale for now; when we add URL-prefixed
 * locales, switch to reading from the route segment.
 */
export default getRequestConfig(async () => {
  const locale = defaultLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
