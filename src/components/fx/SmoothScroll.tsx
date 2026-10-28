"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
export function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: window.innerWidth < 1100 ? -64 : 0 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick, false, true); // prioritised: move the page before ScrollTrigger and the WebGL scenes read it
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis-on");
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);
  return null;
}
