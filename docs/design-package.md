# Design package: Wajid Ali portfolio

## Revision 3 (owner feedback: seasoned-developer polish)
- Intro: counter and name preloader (skipped on repeat visits in a session and with reduced motion).
- Hero: split-letter name rise, scrambling "I build ..." line, WebGL particle portrait (about 20k points sampled from the cutout) that assembles after the intro, parts around the cursor and dissolves on scroll; count-up stats.
- Lenis smooth scrolling synced to GSAP ScrollTrigger; masked line reveals on section titles; media clip-path wipes; websites gallery pins and scrolls sideways on desktop; timeline line draws with scroll.
- Oversized outlined text bands that speed up and skew with scroll velocity.
- Contact: WebGL dotted-land globe with arcs from Islamabad to Miami, Melbourne and Doha; drag to spin.
- Custom cursor with labels over media and magnetic buttons (fine pointers only).
- Zustand holds shared UI state (intro finished, cursor label) and is listed under skills.
- Reduced motion: no intro, no smooth scroll, no pinning, static WebGL frames, all content visible.

## Revision 2 (owner feedback)
The owner asked for a direct hero with his details and services, then projects, research and skills, with information grouped into clear sections, more visuals and a modern tech background. Changes:
- Page order: Hero (name, role, services, stats) → Projects (web apps, websites, with filter tabs) → Research (paper + quiz) → Skills (logo marquee + grouped cards) → Experience and education → Contact with FAQ.
- Dark theme: navy canvas #060812, indigo #5B63F5 to cyan #4FDCFF accents, glass cards with a cursor spotlight.
- Background: Paper Shaders NeuroNoise (@paper-design/shaders-react), fixed, capped resolution, frozen under reduced motion, plus a masked dot grid.
- The scroll-pinned 3D stack hero and scroll-scrubbed case studies were removed; project recordings now play muted while in view, with a pause button.
- Added the Qatar recruitment web app (two brands, one codebase).

The sections below describe revision 1 and are kept for history.


Written before the build, consumed by it. Every viewer-facing line lives verbatim in `src/lib/content.ts`; this file records the decisions behind them. The Higgsfield step of the 10k-websites skill is overridden by the owner: the hero is a code-built Three.js scene, and the case studies scrub the owner's real screen recordings.

## 1. Brand premise
**Commented code.** Good code explains itself through its comments, and Wajid's work does the same: his systems ship with security notes, backup runbooks and schema rules, and his published research classifies code comments. The whole site reads like well-documented source. Margin notes in cobalt (`// summary`, `// rationale`, `// usage` ...) label every section, using the real comment categories from his NLBSE '25 paper. One call to action everywhere: **Email me**.

## 2. Palette (drafting sheet: paper, graphite, blue pencil)
```css
:root{
  --canvas:#E9ECEF;        /* cool drafting paper, never pure white */
  --panel:#F3F5F7;         /* raised sheets */
  --ink:#11161C;           /* graphite */
  --ink-2:#4A5561;         /* secondary text, 6.4:1 on canvas */
  --line:#C6CDD4;          /* hairlines (decorative) */
  --line-strong:#7D8792;   /* interactive borders, 3.1:1 */
  --accent:#2D3BF0;        /* cobalt blue pencil: CTA, focus, margin notes */
  --accent-hover:#1F2BC9;
  --accent-muted:rgba(45,59,240,.14);
  --deep:#12171E;          /* research section sheet */
}
```
Avoided defaults: no cream/serif/terracotta, no near-black with acid green or amber. Cobalt appears only on the CTA, focus rings, margin notes and the active hero layer.

## 3. Type trio
- Display: **Archivo**, variable width axis, 112 to 125 width at 700 to 800 weight (drafting title-block feel).
- Body: **Instrument Sans** 400 / 500 / 600.
- Mono labels: **IBM Plex Mono** 400 / 500.

## 4. Hero band map (stack descent, 560vh pinned, scroll range 460vh)
| Band | Range | Scene moment | Copy | Entrance |
|---|---|---|---|---|
| 1 | 0.00 to 0.19 | Camera above the stack, top layer (Interface) lit | "I build software you can trust with real data." | Masked word rise, one-time load ramp |
| 2 | 0.23 to 0.41 | Layers slide apart, camera descends past Interface and API | "Every layer has a job." | Grid snap-align: characters slide sideways into place, like layers sliding out |
| 3 | 0.45 to 0.63 | Roles and Encrypted records layers lit | "Locked at every layer." | Word punch with overshoot, the lock clicking shut |
| 4 | 0.67 to 0.83 | Audit chain and Backups layers lit | "Written down, so nothing is lost." | Typed in reading order (ordered character reveal), echoing writing docs |
| 5 | 0.87 to 1.00 | Stack closes up and rests, whole system in frame | "Wajid Ali" + roles + CTA | Word-by-word rise into staged settle |

Action lane: the stack sits right of center; copy lives in the left column over a soft paper scrim. Plateaus are starting points for the flick test.

## 5. Static hero (phones, reduced motion, no WebGL)
Band 1 headline + subline + both CTAs, over a hand-drawn SVG of the same six-layer stack at rest.

## 6. Below the fold
Proof numbers → Case 01 Dental OS (scrubbed recording, engineering notes, screens, full walkthrough on request) → Case 02 e-commerce platform + admin (scrubbed recording, engineering notes) → Marketing sites (four live sites, screenshots) → Research: CodeComClassify + **the interactive moment** (classify real comments from the NLBSE Java test split) → Services → About + experience → FAQ (answers written to the owner's brief) → Contact → Footer.

Contact handling on a static site: no form. The main button opens the visitor's own email app addressed to wajidalise@gmail.com; WhatsApp and Upwork sit beside it. Nothing can silently fail.

Client businesses are never named in copy (owner decision). Live links are shown for the four marketing sites only; JFH is labeled as agency work. The NLBSE entry links to the conference page and states no ranking. No GitHub links on projects. No CV download.

## 7. Vector layer
- Fixed environment: a faint drafting grid that drifts over 90 seconds, plus paper grain.
- Code gutter (desktop): a fixed left rail with a mono line counter and the current section's comment tag.
- Section dividers: dimension lines (arrow-ended hairlines with a measurement label) that draw themselves on entry.
- Static hero stack: inline SVG isometric drawing.
All of it honors reduced motion: final states shown, drifts stopped.

## 8. Engineering list
Scroll-driven rAF loop with dt-normalized lerp that rests when converged and pauses off-screen; render the WebGL scene only on change; band pacing with smoothstep ramps and `--k` assembly; delta-gated DOM writes; HUD text throttled to 10Hz; the five static-hero gates identical in CSS and JS, live via change listeners; complete without WebGL. Case-study videos: fetched as Blobs (Range-safe), gated seeks, `-g 8` keyframes, poster first, load only when the section is near; phones get posters plus a click-to-play walkthrough. Quality floor from `scrub-pipeline.md`.

## 9. Copy gate
Every viewer-facing line ships verbatim from `src/lib/content.ts`. Before anyone sees the page: zero em dashes, zero stock words (leverage, seamless, empower, unlock, robust, actionable, data-driven, solutions), and a sweep for AI tells. Deliberate devices stay: the margin comment labels and the staccato hero lines.
