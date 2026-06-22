# Knivslipning – premiumhemsida

Modern, högkonverterande one-page-sajt för ett företag som erbjuder
professionell knivslipning till restauranger, skolor, storkök, catering och
privatpersoner.

Byggd med **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Lucide Icons** och shadcn-stil-komponenter.

## Kom igång

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produktionsbygge
npm run start    # kör produktionsbygget
```

## Anpassa till ditt företag

Allt företagsspecifikt är samlat på ett ställe – sök efter `FYLL_I`:

| Vad | Var |
|-----|-----|
| Företagsnamn, kontakt, ort, sociala medier, öppettider, statistik | [`lib/site.config.ts`](lib/site.config.ts) |
| Tjänster, process, fördelar, recensioner, FAQ, galleritexter | [`lib/content.ts`](lib/content.ts) |
| Navigationslänkar | [`lib/nav.ts`](lib/nav.ts) |
| SEO / metadata / Open Graph | [`app/layout.tsx`](app/layout.tsx) |
| Structured data (LocalBusiness, FAQ, recensioner) | [`lib/jsonld.ts`](lib/jsonld.ts) |
| Färger, typografi, animationer | [`tailwind.config.ts`](tailwind.config.ts) + [`app/globals.css`](app/globals.css) |

### Byt bilder

Platshållarbilderna ligger i `public/images/` (genererade SVG:er). Lägg dina egna
foton där och uppdatera sökvägarna i `lib/content.ts` (`heroImage`, `aboutImage`,
`galleryImages`). Använd gärna `.webp`/`.jpg` – då optimeras de automatiskt och
flaggan `dangerouslyAllowSVG` i `next.config.mjs` kan tas bort.

Regenerera platshållare vid behov: `node scripts/generate-placeholders.mjs`

### Koppla in bokningsformuläret

Formuläret i [`components/sections/booking-form.tsx`](components/sections/booking-form.tsx)
simulerar inskickning. Skapa t.ex. `app/api/booking/route.ts` och anropa den i
`handleSubmit` för att skicka e-post / spara bokningen.

## Funktioner

- Sticky navbar med scroll-spy-känsla, scroll progress-bar, back-to-top, intro-loader
- Dark mode (standard) + ljust läge, sparas i `localStorage`
- Hero med parallax, glassmorphism-kort och förtroendepunkter
- Tjänstekort, animerad 4-stegs-process, fördelar, testimonial-slider
- Interaktivt galleri med före/efter-jämförelse, lightbox och zoom
- Komplett bokningsformulär med validering och bekräftelse
- FAQ-accordion, kontakt med Google Maps, fyllig footer
- SEO: metadata, Open Graph, JSON-LD structured data, `sitemap.xml`, `robots.txt`
- Fullt responsiv (mobil / surfplatta / desktop) och `prefers-reduced-motion`-vänlig
