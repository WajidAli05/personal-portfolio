"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useUI } from "@/lib/store";

// A trailing ring that grows over links and shows a label over media ([data-cursor]).
// Fine pointers only; magnetic pull on [data-magnetic] elements.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useUI((s) => s.cursor);
  const setCursor = useUI((s) => s.setCursor);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const r = ring.current!, d = dot.current!;
    gsap.set([r, d], { xPercent: -50, yPercent: -50, opacity: 0 });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "none" });
    let shown = false, hoverEl: Element | null = null, px = -1, py = -1;

    const probe = (t: Element | null) => {
      if (!t) return;
      const cur = t.closest?.("[data-cursor]");
      const act = t.closest?.("a, button, summary, [role=tab]");
      const next = cur ?? act;
      if (next !== hoverEl) {
        hoverEl = next;
        const lab = cur?.getAttribute("data-cursor") ?? "";
        setCursor(lab);
        r.classList.toggle("is-link", !!act && !lab);
        r.classList.toggle("is-label", !!lab);
      }
    };
    const move = (e: PointerEvent) => {
      if (!shown) { gsap.to([r, d], { opacity: 1, duration: 0.3 }); shown = true; }
      px = e.clientX; py = e.clientY;
      rx(px); ry(py); dx(px); dy(py);
      probe(e.target as Element);
    };
    // content scrolls under a still pointer: re-check what is beneath it
    let sraf = 0;
    const onScroll = () => { if (sraf || px < 0) return; sraf = requestAnimationFrame(() => { sraf = 0; probe(document.elementFromPoint(px, py)); }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const leave = () => { gsap.to([r, d], { opacity: 0, duration: 0.3 }); shown = false; };

    // magnetic buttons
    const mags = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const offs = mags.map((m) => {
      const mx = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const my = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const mm = (e: PointerEvent) => { const b = m.getBoundingClientRect(); mx((e.clientX - b.left - b.width / 2) * 0.28); my((e.clientY - b.top - b.height / 2) * 0.35); };
      const ml = () => { mx(0); my(0); };
      m.addEventListener("pointermove", mm); m.addEventListener("pointerleave", ml);
      return () => { m.removeEventListener("pointermove", mm); m.removeEventListener("pointerleave", ml); };
    });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", leave);
      offs.forEach((f) => f());
      document.documentElement.classList.remove("has-cursor");
    };
  }, [setCursor]);

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true"><span>{label}</span></div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
