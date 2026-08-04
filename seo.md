# SEO — Code-Level Checklist

Scope: only technical/markup rules. No content, keyword, or copywriting advice here.
Stack assumed: Next.js App Router. Swap syntax if a project differs.

---

## 1. Heading Hierarchy

- **Exactly one `<h1>` per page.** It should be the page's primary heading, rendered once, not per-component-instance.
- Never use `<h1>` for a logo/site name in the header on every page — that steals the h1 slot from the actual page content. Logo should be a plain `<a>` or `<span>`, not a heading.
- Headings must **nest in order**: h1 → h2 → h3. Never skip a level (h2 straight to h4) and never go back up then down arbitrarily.
- Headings are for document structure, not font size. If something needs to *look* like a heading but isn't structurally one, style a `<p>` or `<span>` — don't misuse `<h3>` for visual weight.
- Don't wrap non-heading content (nav labels, button text, card titles that aren't real subsections) in `<h2>`–`<h6>` just because it looks bold enough to matter.

```tsx
// ❌ Bad
<h1>MyApp</h1>          // logo
<h1>Welcome to Dashboard</h1>  // second h1 on same page

// ✅ Good
<Link href="/" aria-label="MyApp home"><Logo /></Link>
<h1>Dashboard</h1>
<h2>Recent Activity</h2>
<h3>Today</h3>
```

---

## 2. Document `<head>` / Metadata

Use Next.js `Metadata` API (App Router) — never hand-roll `<Head>` tags in App Router, and never duplicate metadata between `layout.tsx` and `page.tsx` for the same field.

```tsx
// app/(routes)/some-page/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | BrandName",
  description: "Under 160 characters.",
  alternates: { canonical: "https://example.com/some-page" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Page Title",
    description: "Under 160 characters.",
    url: "https://example.com/some-page",
    siteName: "BrandName",
    images: [{ url: "https://example.com/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Under 160 characters.",
  },
};
```

Mandatory fields per indexable page:
- `<title>` — unique per page, no duplicates across routes.
- `<meta name="description">` — unique per page.
- `<link rel="canonical">` — self-referencing unless intentionally pointing elsewhere (pagination, filters, duplicate content).
- `<meta name="robots">` explicitly set (`index,follow` for public pages; `noindex,follow` or `noindex,nofollow` for thank-you pages, admin, search-result pages, filtered/query-param variants).
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- `twitter:card` at minimum.

For dynamic routes, use `generateMetadata`:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await getItem(params.slug);
  return {
    title: `${item.title} | BrandName`,
    description: item.excerpt.slice(0, 155),
    alternates: { canonical: `https://example.com/items/${params.slug}` },
  };
}
```

---

## 3. `<html>` / `<body>` Root Attributes

```tsx
// app/layout.tsx
<html lang="en"> {/* or "ur" / "en-PK" — match actual page language */}
```

- `lang` attribute is mandatory and must match the actual content language (important for you specifically since some projects likely serve Urdu/English mixed content — set per-locale if using i18n routing).
- Viewport meta is handled automatically by Next.js but verify it's present: `width=device-width, initial-scale=1`.

---

## 4. Semantic HTML5 Structure

Use landmark elements, not endless `<div>`:

```tsx
<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

- Exactly one `<main>` per page.
- `<nav>` for nav blocks (header nav, footer nav, breadcrumbs) — each with a distinct `aria-label` if there are multiple.
- `<article>` for self-contained content (blog post, product card in a list).
- `<section>` for thematic grouping, generally paired with a heading.
- Avoid `<div>`/`<span>` soup where a semantic tag exists for the purpose.

---

## 5. Images

```tsx
import Image from "next/image";

<Image
  src="/product.jpg"
  alt="Descriptive alt text, not 'image123'"
  width={800}
  height={600}
  priority={isAboveFold}   // only true for LCP image
/>
```

- Always use `next/image`, never raw `<img>`, unless there's a specific reason (external SVG icon, etc.) — then still add `alt`.
- `alt` is **mandatory** on every content image. Decorative images: `alt=""` (empty, not omitted) so screen readers/crawlers skip it correctly.
- Never leave `alt` as filename, "image", or blank by omission.
- Set explicit `width`/`height` (or `fill` with a sized parent) to prevent CLS.
- `priority` only on the actual LCP image (usually hero/banner) — not on every image, or you defeat lazy-loading benefits.
- Lazy-load everything below the fold (default behavior of `next/image` — don't override with `loading="eager"` unless necessary).

---

## 6. Links

```tsx
import Link from "next/link";

<Link href="/pricing">Pricing</Link>          // internal — use Link, not <a>
<a href="https://external.com" rel="noopener noreferrer" target="_blank">External</a>
```

- Internal navigation: always `next/link`, never `<a href>` (breaks prefetching/SPA nav, not itself an SEO penalty but best practice).
- External links opening in new tab: `rel="noopener noreferrer"`.
- Untrusted/sponsored/affiliate links (relevant for GameistanPro/PaisaWin-style affiliate content): `rel="sponsored nofollow noopener noreferrer"`.
- Never use `<div onClick>` or `<span onClick>` for something that navigates — it's invisible to crawlers and breaks accessibility. Always a real `<a>`/`<Link>`.
- Anchor text should be the link itself — don't wrap "click here" with the real link elsewhere.

---

## 7. Structured Data (JSON-LD)

Inject via a `<script type="application/ld+json">` — Next.js pattern:

```tsx
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Product Name",
    description: "...",
    offers: { "@type": "Offer", price: "1000", priceCurrency: "PKR" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  );
}
```

Add relevant schema type per page:
- `Organization` / `WebSite` — root layout, once.
- `BreadcrumbList` — any page with breadcrumb nav.
- `Product` / `Offer` — product/pricing pages.
- `Article` / `BlogPosting` — blog/content pages.
- `FAQPage` — pages with visible Q&A content (must match visible content, don't fake it).
- `LocalBusiness` — if targeting local Pakistani search.

Never mark up content with structured data that isn't visibly present on the page — this is a Google spam violation, not just bad practice.

---

## 8. `robots.txt` and `sitemap.xml`

Generate both via Next.js file conventions, not static public files, so they stay dynamic:

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getAllSlugs();
  return [
    { url: "https://example.com", lastModified: new Date(), priority: 1 },
    ...items.map((i) => ({
      url: `https://example.com/items/${i.slug}`,
      lastModified: i.updatedAt,
      priority: 0.7,
    })),
  ];
}
```

- Every indexable route must appear in the sitemap.
- Admin/auth/internal routes must be disallowed in `robots.ts` **and** set `noindex` in their own metadata (belt and suspenders — robots.txt disallow alone doesn't guarantee de-indexing of already-indexed pages).

---

## 9. URL Structure

- Lowercase only, hyphens not underscores: `/best-earning-apps`, not `/Best_Earning_Apps`.
- No trailing slash inconsistency — pick one (Next.js default: no trailing slash) and enforce via `trailingSlash` config, don't let both versions resolve as 200 without a redirect.
- Avoid unnecessary query params for canonical content (`/products?id=5` → prefer `/products/5`).
- Filter/sort query params (`?sort=price&page=2`) should carry `noindex` or a canonical pointing to the base URL, not be treated as unique indexable pages.

---

## 10. Redirects & Status Codes

```ts
// next.config.js
module.exports = {
  async redirects() {
    return [
      { source: "/old-page", destination: "/new-page", permanent: true }, // 301
    ];
  },
};
```

- Permanent URL changes → `permanent: true` (301), never a client-side `router.push` pretending to be a redirect (that returns 200 and confuses crawlers).
- Temporary redirects → `permanent: false` (302) only when actually temporary.
- Broken/removed pages must return real `404` status (Next.js `not-found.tsx` handles this correctly) — never a "soft 404" (a not-found-looking page that returns 200).

---

## 11. Core Web Vitals (code-level levers)

- **LCP**: `priority` on hero image, avoid render-blocking large JS bundles above the fold, use `next/font` (not external `<link>` Google Fonts) with `display: 'swap'`.
- **CLS**: explicit dimensions on images/embeds/ads, reserve space for dynamically-loaded content (skeleton with fixed height, not height:auto that pops in).
- **INP/FID**: avoid heavy synchronous JS on main thread at load; code-split with `next/dynamic` for below-fold heavy components.

```tsx
import localFont from "next/font/local";
// or
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });
```

---

## 12. hreflang (multi-language / multi-region — relevant if targeting PK + international)

```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: "https://example.com/en/page",
    languages: {
      "en-PK": "https://example.com/en/page",
      "ur-PK": "https://example.com/ur/page",
    },
  },
};
```

- Every localized version must reference every other locale (including itself) via `hreflang`.
- Mismatched or one-directional hreflang (A points to B but B doesn't point back to A) is invalid and often ignored by Google.

---

## Pre-launch Code Checklist

- [ ] One `<h1>` per page, correct heading order
- [ ] Unique `title` + `description` per page, no duplicates site-wide
- [ ] Canonical tag on every page
- [ ] `robots` meta correct per page type (public vs admin/thank-you/filtered)
- [ ] `next/image` everywhere with real `alt` text
- [ ] `next/link` for all internal nav
- [ ] `lang` attribute correct
- [ ] `robots.ts` + `sitemap.ts` generated and accurate
- [ ] JSON-LD present and matches visible content
- [ ] 301s for moved URLs, real 404 for removed ones
- [ ] No duplicate/near-duplicate URLs indexable without canonical
- [ ] Lighthouse/PageSpeed Insights run on key templates (not just homepage)