# Wajid Ali · Portfolio

Next.js 16 (static export) · Tailwind CSS 4 · Paper Shaders (animated background) · react-icons. The design decisions are in `docs/design-package.md`.

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
| Animated background (NeuroNoise shader) | `src/components/Background.tsx` |
| Sections, in page order | `src/components/sections/` (Hero, Projects, Research, Skills, Experience, Contact) |
| Tech logos and UI icons | `src/components/icons.tsx` |
| Images, videos, share image | `public/img`, `public/media`, `public/og.png` |
| Raw recordings and screenshots (never shipped) | `media-src/` (git-ignored) |

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the live address, run `npm run build`, and upload the contents of `/out` to any static host.

The old Vite portfolio is preserved on the `vite-portfolio` branch.
