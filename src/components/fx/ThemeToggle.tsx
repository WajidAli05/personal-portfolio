"use client";

import { useEffect } from "react";
import { flushSync } from "react-dom";
import { useUI, type Theme } from "@/lib/store";

// Dark/light switch. The new theme sweeps out in a circle from the button
// (View Transitions API); instant where unsupported or with reduced motion.
export function ThemeToggle() {
  const theme = useUI((s) => s.theme);
  const setTheme = useUI((s) => s.setTheme);

  useEffect(() => {
    const t = (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(t);
    // follow the system only while the visitor hasn't chosen
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSys = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("wa-theme"); } catch {}
      if (saved) return;
      const next: Theme = mq.matches ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener("change", onSys);
    return () => mq.removeEventListener("change", onSys);
  }, [setTheme]);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      const d = document.documentElement;
      d.classList.add("theme-switching");
      d.dataset.theme = next;
      flushSync(() => setTheme(next));
      try { localStorage.setItem("wa-theme", next); } catch {}
      requestAnimationFrame(() => requestAnimationFrame(() => d.classList.remove("theme-switching")));
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2, y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
  };

  const dark = theme === "dark";
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className={dark ? "is-dark" : "is-light"}>
        <mask id="moon-cut"><rect width="24" height="24" fill="#fff" /><circle className="cut" cx="24" cy="2" r="8" fill="#000" /></mask>
        <circle className="core" cx="12" cy="12" r="5.2" mask="url(#moon-cut)" />
        <g className="rays">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="1.8" x2="12" y2="4.2" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
