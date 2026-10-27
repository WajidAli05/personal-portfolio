"use client";

import { useEffect, useRef } from "react";

// Page-wide motion: entrance reveals, self-drawing dimension lines, the code gutter,
// and pausing loops when off-screen or when the tab is hidden.
export function SiteEffects() {
  const ln = useRef<HTMLSpanElement>(null);
  const cur = useRef<HTMLSpanElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // reveals: add .in once, then retire stagger delays so hovers never lag
    const rev = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        rev.unobserve(el);
        window.setTimeout(() => el.classList.add("settled"), 1600);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    document.querySelectorAll("[data-reveal], [data-dim]").forEach((el) => rev.observe(el));

    // pause CSS loops in sections that are off-screen
    const anim = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.target as HTMLElement).classList.toggle("anim-off", !e.isIntersecting));
    });
    document.querySelectorAll("section").forEach((el) => anim.observe(el));

    const vis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", vis);

    // code gutter: line counter + current section's comment tag, ~10Hz, only on change
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    let lastLn = "", lastTag = "", lastP = -1, lastAt = 0, raf = 0;
    const update = () => {
      raf = 0;
      const now = performance.now();
      if (now - lastAt < 100) { raf = requestAnimationFrame(update); return; }
      lastAt = now;
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const lnText = `L ${String(Math.floor(y / 26) + 1).padStart(4, "0")}`;
      if (lnText !== lastLn && ln.current) { ln.current.textContent = lnText; lastLn = lnText; }
      const mid = window.innerHeight * 0.45;
      let tag = "// summary";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) tag = s.dataset.section || tag;
      }
      if (tag !== lastTag && cur.current) { cur.current.textContent = tag; lastTag = tag; }
      const p = Math.round((y / max) * 400) / 400;
      if (p !== lastP && rail.current) { rail.current.style.setProperty("--p", String(p)); lastP = p; }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      rev.disconnect();
      anim.disconnect();
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="env" aria-hidden="true" />
      <div className="gutter" aria-hidden="true">
        <span className="cur" ref={cur}>{"// summary"}</span>
        <span className="rail" ref={rail}><i /></span>
        <span className="ln" ref={ln}>L 0001</span>
      </div>
    </>
  );
}
