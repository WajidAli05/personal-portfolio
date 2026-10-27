"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";
import { useUI } from "@/lib/store";

// A short intro: counter to 100, the name assembles, then the curtain lifts.
// Skipped with reduced motion and on repeat visits in the same session.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const setIntroDone = useUI((s) => s.setIntroDone);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("wa-intro") === "1"; } catch {}
    if (reduced() || seen) { setIntroDone(); setGone(true); return; }
    try { sessionStorage.setItem("wa-intro", "1"); } catch {}

    document.documentElement.classList.add("is-loading");
    const el = root.current!;
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => { document.documentElement.classList.remove("is-loading"); setGone(true); },
    });
    tl.to(counter, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0)
      .to(el.querySelector(".pl-bar i"), { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .from(el.querySelectorAll(".pl-name span"), { yPercent: 110, duration: 0.9, stagger: 0.04, ease: "power4.out" }, 0.15)
      .to(el.querySelectorAll(".pl-name span"), { yPercent: -110, duration: 0.6, stagger: 0.02, ease: "power3.in" }, 1.6)
      .add(() => setIntroDone(), 1.95)
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.95);
    return () => { tl.kill(); document.documentElement.classList.remove("is-loading"); };
  }, [setIntroDone]);

  if (gone) return null;
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-name display">{"Wajid Ali".split("").map((c, i) => <span key={i}>{c === " " ? " " : c}</span>)}</div>
      <div className="pl-foot">
        <span className="mono">full-stack engineer · researcher</span>
        <span className="pl-num mono" ref={num}>000</span>
      </div>
      <div className="pl-bar"><i /></div>
    </div>
  );
}
