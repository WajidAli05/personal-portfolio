"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Quiet, page-wide motion:
// [data-reveal]  fades up a little the first time it enters (CSS transition, works without GSAP)
// [data-num]     numbers count up once (GSAP), skipped with reduced motion
export function Motion() {
  useEffect(() => {
    const rev = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        rev.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    document.querySelectorAll("[data-reveal]").forEach((el) => rev.observe(el));

    const vis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", vis);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      document.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
        const end = Number(el.dataset.num), suf = el.dataset.suffix ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: end, duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = Math.round(o.v) + suf; },
        });
      });
    });

    return () => { rev.disconnect(); mm.revert(); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return null;
}
