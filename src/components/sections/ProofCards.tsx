"use client";

import { useRef } from "react";
import { hero } from "@/lib/content";
import { Icon } from "@/components/icons";
import { gsap, useGSAP } from "@/lib/gsap";

// Two proof cards in their own colours. Each holds a small CSS 3D scene (a floating stack of
// code sheets, a spinning badge) and tilts toward the cursor on devices with a mouse.
const CODE = [[70, 40], [52, 30, 14], [80], [36, 44], [60, 22]];

export function ProofCards() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!fine) return;
    const cards = gsap.utils.toArray<HTMLElement>(".pc", root.current);
    const offs = cards.map((card) => {
      gsap.set(card, { transformPerspective: 900 });
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        ry((nx - 0.5) * 14);
        rx(-(ny - 0.5) * 12);
        card.style.setProperty("--gx", `${nx * 100}%`);
        card.style.setProperty("--gy", `${ny * 100}%`);
      };
      const leave = () => { rx(0); ry(0); };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); };
    });
    return () => offs.forEach((f) => f());
  }, { scope: root });

  const [code, badge] = hero.proof;
  return (
    <div className="proof" ref={root} data-reveal>
      <article className="pc pc-code">
        <div className="pc-scene" aria-hidden="true">
          <div className="sheets">
            {[0, 1, 2, 3].map((i) => (
              <div className="csheet" key={i} style={{ ["--z" as string]: i }}>
                {CODE.map((row, r) => (
                  <p key={r}>{row.map((w, k) => <i key={k} style={{ width: `${w}%` }} />)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pc-copy">
          <p className="pc-v" data-num={code.count} data-suffix={code.suffix}>{code.value}</p>
          <p className="pc-l">{code.label}</p>
          <p className="pc-s">{code.sub}</p>
        </div>
        <span className="pc-glare" aria-hidden="true" />
      </article>

      <article className="pc pc-badge">
        <div className="pc-scene" aria-hidden="true">
          <div className="coin">
            <div className="face front"><Icon name="badge" /><b>NLBSE</b><small>2025</small></div>
            <div className="face back"><b>IEEE</b><small>ACM</small></div>
          </div>
          <span className="coin-shadow" />
        </div>
        <div className="pc-copy">
          <p className="pc-v">{badge.value}</p>
          <p className="pc-l">{badge.label}</p>
          <p className="pc-s">{badge.sub}</p>
        </div>
        <span className="pc-glare" aria-hidden="true" />
      </article>
    </div>
  );
}
