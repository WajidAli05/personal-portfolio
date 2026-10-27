"use client";

import { useEffect, useState } from "react";
import { NeuroNoise } from "@paper-design/shaders-react";

// Site-wide animated background: Paper Shaders' NeuroNoise (a slow web of glowing
// filaments), tinted to the palette and rendered at a capped resolution.
// Reduced motion freezes it; hidden tabs pause it (requestAnimationFrame stops).
export function Background() {
  const [still, setStill] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setStill(mq.matches);
    on();
    mq.addEventListener("change", on);
    setMounted(true);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="shader" style={{ opacity: mounted ? 0.9 : 0 }}>
          {mounted && (
            <NeuroNoise
              colorFront="#9fe8ff"
              colorMid="#4b54e8"
              colorBack="#060812"
              brightness={0.06}
              contrast={0.32}
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
    </>
  );
}
