"use client";

import { useEffect, useState } from "react";
import { NeuroNoise } from "@paper-design/shaders-react";
import { useUI } from "@/lib/store";

// Site-wide animated background: Paper Shaders' NeuroNoise (a slow web of glowing
// filaments) tinted per theme, rendered at a capped resolution.
// Reduced motion freezes it; hidden tabs pause it.
const palette = {
  dark: { front: "#9fe8ff", mid: "#4b54e8", back: "#05070f", brightness: 0.06, contrast: 0.32, opacity: 0.9 },
  light: { front: "#3b45d9", mid: "#9aa3ff", back: "#eef1f8", brightness: 0.0, contrast: 0.4, opacity: 0.55 },
};

export function Background() {
  const [still, setStill] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useUI((s) => s.theme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setStill(mq.matches);
    on();
    mq.addEventListener("change", on);
    setMounted(true);
    return () => mq.removeEventListener("change", on);
  }, []);

  const p = palette[theme];
  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="shader" style={{ opacity: mounted ? p.opacity : 0 }}>
          {mounted && (
            <NeuroNoise
              colorFront={p.front}
              colorMid={p.mid}
              colorBack={p.back}
              brightness={p.brightness}
              contrast={p.contrast}
              scale={1.15}
              speed={still ? 0 : 0.35}
              maxPixelCount={1600 * 1000}
              minPixelRatio={1}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>
      <div className="dots" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
    </>
  );
}
