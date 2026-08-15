# MLwebdesign

Portfolio / agency landing page for MLwebdesign. React + TypeScript + Vite + Tailwind v4, with a
rotating 3D wordmark hero built on Three.js.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `src/components/` — page sections (Header, Hero, Work, About, Process, Contact) plus `Reveal`
  (scroll-in animation) and `BackgroundVideo` (fixed ASCII-art layer with cursor parallax).
- `src/hooks/useHero3D.ts` + `src/hooks/hero3dImpl.ts` — the 3D wordmark. Three.js is dynamically
  imported so it doesn't bloat the main bundle.
- `src/data/projects.ts` — project grid, skills, and process-step copy. Currently placeholder
  content — swap in real project names, years, and descriptions.
- `public/fonts/optimer_regular.typeface.json` — self-hosted Three.js typeface used by the hero.

## Notes

- Selected-work cards are placeholders (no real screenshots yet) — replace the striped fill with
  real project imagery when available.
