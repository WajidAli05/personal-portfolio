"use client";

import { useEffect } from "react";
import { nav } from "@/lib/content";
import { ScrollTrigger } from "@/lib/gsap";
import { useUI } from "@/lib/store";

// Follows the reader through the page: sets the active section in the store and writes
// each section's reading progress (0 to 1) onto its menu links as --p.
export function SectionTracker() {
  const setActive = useUI((s) => s.setActive);

  useEffect(() => {
    const triggers = nav.map((n) => {
      const id = n.href.slice(1);
      const el = document.getElementById(id);
      if (!el) return null;
      const links = () => document.querySelectorAll<HTMLElement>(`[data-sec="${id}"]`);
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => { if (self.isActive) setActive(id); },
        onUpdate: (self) => links().forEach((a) => a.style.setProperty("--p", self.progress.toFixed(3))),
        onLeave: () => links().forEach((a) => a.style.setProperty("--p", "1")),
        onLeaveBack: () => links().forEach((a) => a.style.setProperty("--p", "0")),
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { triggers.forEach((t) => t?.kill()); window.removeEventListener("load", refresh); };
  }, [setActive]);

  return null;
}
