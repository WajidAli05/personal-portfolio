"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reduced } from "@/lib/gsap";

// Oversized outlined statement that drifts sideways; scroll speed pushes it and skews it.
export function Band({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reduced()) return;
    const track = root.current!.querySelector(".band-track")!;
    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });
    let dir = 1;
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top bottom", end: "bottom top",
      onUpdate: (s) => {
        const v = s.getVelocity();
        if (s.direction !== dir) { dir = s.direction; gsap.to(loop, { timeScale: dir, duration: 0.6 }); }
        gsap.to(loop, { timeScale: dir * (1 + Math.min(6, Math.abs(v) / 400)), duration: 0.2, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: dir, duration: 1.2 }); } });
        skewTo(Math.max(-8, Math.min(8, v / -260)));
      },
      onLeave: () => skewTo(0), onLeaveBack: () => skewTo(0),
    });
    return () => { st.kill(); loop.kill(); };
  }, { scope: root });

  const line = [...words, ...words];
  return (
    <div className="band" ref={root} aria-hidden="true">
      <div className="band-track">
        {line.map((w, i) => (
          <span key={i} className={i % 2 ? "o" : "f"}>{w}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
