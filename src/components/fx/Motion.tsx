"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

// Page-wide GSAP choreography:
// [data-split]   headline lines rise out of a mask when they enter
// [data-clip]    media wipes open (clip-path) as it scrolls in
// [data-parallax] gentle vertical drift (value = strength)
// .timeline      the progress line draws with scroll
// .card          cursor spotlight (CSS vars), reveals for [data-reveal]
export function Motion() {
  useEffect(() => {
    // CSS-driven reveals (work with or without GSAP)
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
    const mo = new MutationObserver(watch);
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });

    // spotlight
    let raf = 0, card: HTMLElement | null = null, lx = 0, ly = 0;
    const move = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (!c) return;
      card = c; lx = e.clientX; ly = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${lx - r.left}px`);
        card.style.setProperty("--my", `${ly - r.top}px`);
      });
    };
    if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("pointermove", move, { passive: true });
    const vis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", vis);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const s = SplitText.create(el, {
          type: "lines,words", mask: "lines", linesClass: "sl", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 105, duration: 1.05, stagger: 0.09, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        });
        splits.push(s);
      });

      document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(14% 10% 14% 10% round 18px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 14px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = Number(el.dataset.parallax) || 40;
        gsap.fromTo(el, { y: k }, { y: -k, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      document.querySelectorAll<HTMLElement>(".timeline").forEach((tl) => {
        const line = tl.querySelector(".tl-line i");
        if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: true } });
        tl.querySelectorAll(".tl").forEach((item) => {
          gsap.from(item, { x: 40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: item, start: "top 85%", once: true } });
        });
      });

      // number pop for research stats
      document.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
        const end = Number(el.dataset.num), suf = el.dataset.suffix ?? "";
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + suf; } });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => { splits.forEach((s) => s.revert()); window.removeEventListener("load", refresh); };
    });

    return () => {
      rev.disconnect(); mo.disconnect(); mm.revert();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", vis);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
