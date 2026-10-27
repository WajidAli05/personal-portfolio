# Wajid Ali · Portfolio

Next.js 16 (static export) · Tailwind CSS 4 · Three.js. The design decisions are in `docs/design-package.md`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the finished site to /out
npm start        # serves /out locally
```

## Where things live

| What | File |
|---|---|
| Every word on the page | `src/lib/content.ts` |
| Colors, type, layout, motion | `src/app/globals.css` |
| Hero 3D stack (scroll-driven) | `src/components/hero/stackScene.ts`, `Hero.tsx` |
| Case-study video scrubbing | `src/components/work/ScrubFrame.tsx` |
| Comment quiz (research section) | `src/components/sections/Quiz.tsx` |
| Images, videos, share image | `public/img`, `public/media`, `public/og.png` |
| Raw recordings and screenshots (never shipped) | `media-src/` (git-ignored) |

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the live address, run `npm run build`, and upload the contents of `/out` to any static host.

The old Vite portfolio is preserved on the `vite-portfolio` branch.
