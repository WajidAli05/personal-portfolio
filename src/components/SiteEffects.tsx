"use client";

import { useEffect } from "react";

// Entrance reveals, the cursor spotlight on cards, and pausing CSS loops on hidden tabs.
export function SiteEffects() {
  useEffect(() => {
    const rev = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        rev.unobserve(el);
        window.setTimeout(() => el.classList.add("settled"), 1400);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    const watch = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => rev.observe(el));
    watch();
    // re-scan when project filters swap content in
    const mo = new MutationObserver(watch);
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });

    let raf = 0;
    let lastCard: HTMLElement | null = null, lx = 0, ly = 0;
    const move = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (!card) return;
      lastCard = card; lx = e.clientX; ly = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!lastCard) return;
        const r = lastCard.getBoundingClientRect();
        lastCard.style.setProperty("--mx", `${lx - r.left}px`);
        lastCard.style.setProperty("--my", `${ly - r.top}px`);
      });
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) window.addEventListener("pointermove", move, { passive: true });

    const vis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", vis);

    return () => {
      rev.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", vis);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
