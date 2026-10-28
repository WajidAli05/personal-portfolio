"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

const BURST = Array.from({ length: 12 }, (_, k) => k);
const BIG = Array.from({ length: 22 }, (_, k) => k);

// The project journey, played as a loop: a line runs from stage to stage, each stage lights up
// with a small confetti burst when it's reached, the last one gets a bigger burst, then it restarts.
// Runs only while on screen; with reduced motion every stage is simply shown as done.
export function StepFlow({ steps }: { steps: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const last = steps.length - 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible) return;
    const wait = active === -1 ? 500 : active === last ? 3000 : 1150;
    const t = setTimeout(() => setActive((a) => (a >= last ? -1 : a + 1)), wait);
    return () => clearTimeout(t);
  }, [active, visible, still, last]);

  const shown = still ? last : active;
  const fill = shown < 0 ? 0 : shown / last;

  return (
    <div className="flow" ref={box} aria-label={`How a project runs: ${steps.join(", ")}`} role="img">
      <span className="flow-track" aria-hidden="true"><i style={{ transform: `scaleX(${fill})` }} /></span>
      <ol aria-hidden="true">
        {steps.map((s, i) => {
          const done = i <= shown, now = i === shown && !still;
          return (
            <li key={s} className={`${done ? "done" : ""}${now ? " now" : ""}`}>
              <span className="node">
                {done ? <Icon name="check" /> : <span>{String(i + 1).padStart(2, "0")}</span>}
                {now ? (
                  <span className={`burst${i === last ? " big" : ""}`} key={`b-${active}`}>
                    {(i === last ? BIG : BURST).map((b) => <i key={b} style={{ ["--b" as string]: b, ["--n" as string]: i === last ? 22 : 12 }} />)}
                  </span>
                ) : null}
              </span>
              <span className="name">{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
