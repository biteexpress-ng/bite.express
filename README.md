# BiteExpress Web

The public marketing site for [bite.express](https://bite.express) — built to drive
discovery, conversions, and SEO at the level of UberEats, DoorDash, Wolt and
Deliveroo. The customer order-flow lives separately on
[app.bite.express](https://app.bite.express).

## Stack

| Layer          | Choice                                      |
| -------------- | ------------------------------------------- |
| Framework      | Next.js 16 (App Router) + React 19          |
| Language       | TypeScript                                  |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` config) |
| Typography     | DM Serif Display + DM Sans (via next/font)  |
| i18n           | next-intl (English, multi-locale ready)     |
| Forms          | React Hook Form + Zod                       |
| Animation      | Framer Motion                               |
| Icons          | lucide-react                                |
| Hosting        | Vercel                                      |
| Domain (apex)  | bite.express (Cloudflare DNS, DNS-only)     |

## Local development

```bash
npm install
cp .env.example .env.local   # populate values as needed
npm run dev                  # http://localhost:3000
```

## Brand

Logo, color palette and favicon live in [`branding_materials/`](./branding_materials/).
CSS brand tokens are defined in [`src/app/globals.css`](./src/app/globals.css) under
the `@theme { ... }` block. When updating brand colors, edit **both** the palette
file and the `@theme` block, in that order.

## Structure

```
src/
  app/                    Routes (App Router)
  components/
    brand/                Logo and brand-specific marks
    layout/               Site-wide layout (header, footer)
    ui/                   Generic primitives (Button, Container, ...)
  i18n/                   Locale registry + next-intl request config
  lib/                    Pure helpers (fonts, site config, cn util)
messages/
  en.json                 Source of truth for English copy
public/
  brand/                  Public-served brand assets
branding_materials/       Brand kit (logo, palette, favicons)
```

## Routing principles

- All marketing pages are statically generated (ISR) for SEO + speed.
- The order/checkout flow is **not** in this repo — those routes live on
  `app.bite.express`. The home page captures a delivery address, sets cookies on
  `.bite.express`, and hands users off to the customer app.

## Phase status

- **Phase 0 — Foundation** ✅ Brand tokens, fonts, base layout, i18n skeleton
- **Phase 1 — SEO infrastructure** ⏳ Metadata, sitemap, robots, structured data, OG images
- **Phase 2 — Marketing pages** ⏳ Home, vendors, riders, agents, about, legal
- **Phase 3 — Careers** ⏳ Jobs board + applications (with `JobPosting` schema)
- **Phase 4 — Programmatic SEO** ⏳ Cities, cuisines, neighbourhood pages
- **Phase 5 — Content** ⏳ Blog + newsroom
