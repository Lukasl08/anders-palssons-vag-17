# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint
```

There is no test suite configured in this project.

## What this is

A single-page marketing/booking site ("Knivslipning" — professional knife sharpening
service) built as a reusable template: Next.js 15 (App Router) + TypeScript +
Tailwind CSS + Framer Motion + Lucide icons, with shadcn-style UI primitives.
Everything renders on one route (`app/page.tsx`), composed from section components
stacked in order.

## Architecture: content/config vs. presentation

This codebase is deliberately split so that rebranding to a different company never
requires touching component code:

- **`lib/site.config.ts`** — all business identity: name, contact info, address/geo
  coordinates, social links, opening hours, trust stats. Search for `FYLL_I` to find
  every placeholder that needs a real value.
- **`lib/content.ts`** — all page copy as typed data arrays: `services`,
  `processSteps`, benefits, testimonials, FAQ entries, gallery image lists. Sections
  map over these arrays rather than hardcoding content in JSX.
- **`lib/nav.ts`** — navbar link list.
- **`lib/jsonld.ts`** — builds `LocalBusiness`, `FAQPage`, and reviews structured
  data from `siteConfig`/`content`, injected as inline `<script type="application/ld+json">`
  tags in `app/layout.tsx`.
- **`app/layout.tsx`** — SEO metadata, Open Graph/Twitter cards, and font loading
  (Jost for body via `--font-jost`, Bodoni Moda for display/headings via
  `--font-bodoni`), all derived from `siteConfig`.

When asked to "change the company info" or copy, edit `site.config.ts`/`content.ts`,
not the components.

## Page composition

`app/page.tsx` renders a fixed stack of section components in this order: Loading
screen → liquid background → scroll progress → navbar → Hero → Marquee → About →
MobileService → Services → Process → Benefits → Testimonials → Gallery →
BookingForm → Faq → Contact → Footer → back-to-top. Each section lives in
`components/sections/` as its own component and is self-contained (pulls its own
data from `lib/content.ts`/`lib/site.config.ts`).

`components/ui/` holds generic primitives (`Button`, `Input`, `Select`, `Reveal`,
`SectionHeading`, etc.) built with `class-variance-authority` for variants and the
`cn()` helper (`lib/utils.ts`, clsx + tailwind-merge) for class composition — the
shadcn/ui convention. `components/fx/` holds decorative/animated background effects
(liquid background, embers, animated counter) kept separate from layout components.

## Theming

Dark mode is the default and is *not* the OS preference — it's an explicit
light/dark toggle (`components/theme-provider.tsx`) storing the choice in
`localStorage` and toggling a `light` class on `<html>`. Tailwind's `darkMode: "class"`
is configured accordingly. Color tokens (`background`, `foreground`, `muted`, `card`,
`border`) are HSL CSS variables consumed via `tailwind.config.ts`, plus fixed brand
palettes (`gold`, `steel`, `ember`) and several gradient/shadow/keyframe utilities for
the "liquid glass" / molten-metal visual language used throughout (see
`tailwind.config.ts` `extend` block: `morph`, `sheen-pan`, `flicker`, etc.).

## Animation conventions

Scroll-triggered entrance animations go through `components/ui/reveal.tsx`
(`<Reveal>` wrapping `framer-motion`, fade+slide-up, `once: true`, respects
`prefers-reduced-motion` implicitly via Framer Motion's viewport handling). Use its
`delayIndex` prop to stagger items in a list rather than hand-rolling transition
delays.

## Booking form

`components/sections/booking-form.tsx` currently only *simulates* submission (no
backend call). To wire it up for real, add an API route (e.g.
`app/api/booking/route.ts`) and call it from `handleSubmit`.

## Images

Placeholder images are generated SVGs in `public/images/` (including
`public/images/gallery/`), produced by `scripts/generate-placeholders.mjs` — rerun
that script to regenerate them. `next.config.mjs` sets `dangerouslyAllowSVG: true`
specifically to allow these placeholder SVGs through `next/image`; once real photos
(`.jpg`/`.webp`) replace them, that flag should be removed. Image paths referenced
from data live in `lib/content.ts` (`heroImage`, `aboutImage`, `galleryImages`).

## Path alias

`@/*` maps to the project root (see `tsconfig.json`), e.g. `@/lib/utils`,
`@/components/ui/button`.
