"use client";

import { useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

// Quiet, page-wide motion:
// [data-reveal]  fades up a little the first time it enters (CSS transition, works without GSAP)
// [data-num]     numbers count up once (GSAP), skipped with reduced motion
// [data-rows]    skills rows slide in one by one, chips pop in after
// [data-split]   heading words rise in; [data-scramble] labels decode into place
// [data-timeline] experience line draws with scroll, icons pop in
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
    const splits: SplitText[] = [];
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

      // [data-split]: heading words rise out of a mask, one after another
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        splits.push(SplitText.create(el, {
          type: "words", mask: "words", autoSplit: true,
          onSplit: (self) => gsap.from(self.words, {
            yPercent: 115, rotate: 4, duration: 0.9, stagger: 0.07, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }),
        }));
      });

      // [data-scramble]: small labels decode into place
      document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
        const text = el.textContent ?? "";
        gsap.to(el, {
          duration: 1.1, ease: "none",
          scrambleText: { text, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01", revealDelay: 0.25, speed: 0.6 },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // [data-rows]: each row slides in on its own, then its chips pop in one after another
      document.querySelectorAll<HTMLElement>("[data-rows] > .row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        tl.from(row, { x: -28, opacity: 0, duration: 0.7, ease: "power3.out" })
          .from(row.querySelectorAll(".chip"), { y: 12, scale: 0.85, opacity: 0, duration: 0.45, stagger: 0.035, ease: "back.out(2)" }, 0.15);
      });

      // [data-timeline]: the line draws with scroll, each icon pops in, then its text slides in
      document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((list) => {
        gsap.fromTo(list, { "--draw": 0 }, { "--draw": 1, ease: "none", scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 65%", scrub: 0.6 } });
        list.querySelectorAll<HTMLElement>(".xrow").forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 86%", once: true } });
          tl.from(row.querySelector(".xico"), { scale: 0.3, rotate: -30, opacity: 0, duration: 0.75, ease: "back.out(2.4)" })
            .from(row.querySelectorAll(".row-key, .xp > *"), { x: 24, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.12);
        });
      });
    });

    return () => { rev.disconnect(); mm.revert(); splits.forEach((s) => s.revert()); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return null;
}
