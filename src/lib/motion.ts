// Shared motion helpers. The five gate strings must match globals.css character for character.
export const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

/** Keeps the MediaQueryLists referenced and calls `cb(isStatic)` now and on every change. */
export function watchGates(cb: (isStatic: boolean) => void) {
  const mqls = GATES.map((q) => window.matchMedia(q));
  const run = () => cb(mqls.some((m) => m.matches));
  mqls.forEach((m) => m.addEventListener("change", run));
  run();
  return () => mqls.forEach((m) => m.removeEventListener("change", run));
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const smoothstep = (p: number, e0: number, e1: number) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent smoothing factor, normalized to 60fps. */
export const damp = (k: number, dtMs: number) => 1 - Math.pow(1 - k, dtMs / 16.667);

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/** Progress (0..1) of a tall element scrolled through the viewport while pinned. */
export function pinProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const range = r.height - window.innerHeight;
  return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
}
