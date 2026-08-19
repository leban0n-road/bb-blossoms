# BB Blossoms — bbblossoms.com

Production-ready marketing/e-commerce site for BB Blossoms, a plant nursery, built with **Next.js (App Router) + TypeScript + Tailwind CSS**. The site is a content-driven, SEO/AEO/GEO-first build: nearly everything a non-developer would want to change (plants, locations, guides, brand colors, NAP) lives in plain JSON/config files, not scattered across components.

## Stack

- **Framework:** Next.js (App Router, React Server Components by default)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- **Content:** JSON content collections in `src/content/`, typed via `src/lib/types.ts`
- **Fonts:** self-hosted via `next/font/google` (Fraunces for headings, Inter for body)
- **Forms:** serverless API routes (`src/app/api/*`) — wire `RESEND_API_KEY` (or swap in Formspree) to send real email
- **SEO:** per-page metadata generator (`src/lib/seo.ts`) + JSON-LD schema generators (`src/lib/schema.ts`)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — must complete with zero errors
npm run start    # serve the production build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in what you have. Every integration is optional and disabled until its variable is set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification meta tag |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel |
| `RESEND_API_KEY` | Enables real email delivery for the Quote/Contact forms |
| `QUOTE_NOTIFY_EMAIL` | Inbox that receives new quote requests |
| `CONTACT_NOTIFY_EMAIL` | Inbox that receives new contact form messages |

## How to Add Content (no code changes required)

### Add a new plant

Edit `src/content/plants.json` and add an object matching the `Plant` interface in `src/lib/types.ts`. Required fields: `name`, `slug` (kebab-case, becomes the URL), `category` (must match one of the 9 category slugs in `src/content/categories.json`), pricing, growing specs, `description`, `plantingTips`, `fastFacts` (bullet list — this is what AI answer engines tend to quote), and `faqs` (write the question exactly as a customer would ask it; lead the answer with a direct 40–60 word answer). The plant automatically gets a product page at `/shop/[category]/[slug]/`, appears in its category grid, and is picked up by the sitemap on the next build.

To feature an existing plant on a second category page (e.g. a Flowering Shrub that's also a "Georgia Favorite") without creating a duplicate product page, add the second category's slug to that plant's `featuredIn` array — do **not** duplicate the product.

### Add a new "Shop by Need" collection

Edit `src/content/needs.json`. Each entry needs a unique `slug`, an intro, FAQs, and a `plantSlugs` array referencing existing plant slugs. This creates `/shop-by-need/[slug]/` automatically.

### Add a new location/service-area page

Edit `src/content/locations.json`. Each entry becomes `/locations/[slug]/` with its own LocalBusiness schema, embedded map, and popular-plants list. Write a **unique** intro for every city — do not copy/paste between cities, as duplicate location content actively hurts local SEO.

### Add a new guide/blog article

Edit `src/content/guides.json`. `bodyHtml` is a plain HTML fragment (only `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<li>`, `<strong>`, `<em>`, and `<table>` tags are styled/expected) rendered on `/guides/[slug]/`. Lead with a direct-answer paragraph (AEO format) before elaborating. Set `relatedCategorySlug` or `relatedNeedSlug` to control which shop link the article's closing CTA points to.

### Rebrand / retarget to a different city or state

Everything brand-specific — name, phone, address, hours, service-area defaults, USDA zone, social links, guarantee copy, footer legal text — lives in **`src/config/site.ts`**. Change it there once; every page, schema block, and piece of copy that reads from `siteConfig` updates automatically. Colors and fonts are defined as CSS custom properties in `src/app/globals.css` under `@theme`.

## Architecture Notes

- **Content layer:** `src/lib/content.ts` is the only place that reads the JSON files in `src/content/`. Pages/components should import from there, never from the JSON files directly.
- **SEO:** `buildMetadata()` in `src/lib/seo.ts` generates a consistent `<title>`/description/canonical/OG/Twitter block — every page should use it. `src/lib/schema.ts` exports one function per JSON-LD type (Organization, Product, FAQPage, BreadcrumbList, Article, etc.); render with `<JsonLd data={...} />`.
- **Images:** all images are placeholders under `/public/images/placeholder-*` per the build brief. Replace with real photography before launch — filenames are referenced by content JSON (`image` / `images` fields) and won't need code changes if you keep the same filenames, or update the JSON if you rename files.
- **Redirects:** add 301s to `redirects.json` at the project root as `{ "source": "...", "destination": "...", "permanent": true }` — picked up automatically by `next.config.ts`.
- **Cart:** the "Add to Cart" flow is a lightweight local cart counter (`src/lib/cart.ts`, `localStorage`-backed) intended to demonstrate the upsell/quantity UX from the build brief. Wire in a real commerce backend (Shopify, Stripe, etc.) before accepting real payments — there is currently no checkout/payment processing.
- **Reviews:** `src/content/reviews.json` contains realistic **placeholder** reviews (`// TODO: replace with real reviews`, also called out on `/reviews/`). Replace with verified customer reviews before launch — do not present these as real in production.

## Pre-Launch Checklist

- [ ] Replace all `/public/images/placeholder-*` files with real photography
- [ ] Replace placeholder reviews in `src/content/reviews.json` with verified customer reviews
- [ ] Fill in real NAP, hours, guarantee terms, and license/insurance details in `src/config/site.ts`
- [ ] Set analytics/tracking env vars
- [ ] Set `RESEND_API_KEY` (or swap in your email provider of choice) so Quote/Contact forms deliver
- [ ] Point a real payment/commerce backend at the Add to Cart flow if selling online
- [ ] Run `npm run build` and confirm zero errors
- [ ] Validate JSON-LD with Google's Rich Results Test on a sample of each page type (home, category, PDP, location, guide)
- [ ] Run Lighthouse (mobile) and confirm Performance/Accessibility/Best Practices ≥ 95, SEO = 100
