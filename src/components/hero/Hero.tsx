"use client";

import { useEffect, useRef } from "react";
import { heroBands, heroSettle, layers, contact } from "@/lib/content";
import { clamp, damp, pinProgress, smoothstep, watchGates } from "@/lib/motion";
import { Split } from "@/components/Split";
import { StaticStack } from "./StaticStack";
import { Arrow } from "@/components/icons";
import type { StackScene as StackSceneT } from "./stackScene";

// Starting points, validated by the flick test.
const BANDS: [number, number][] = [
  [0.0, 0.19],
  [0.23, 0.41],
  [0.45, 0.63],
  [0.67, 0.83],
  [0.87, 1.0],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const hudText = useRef<HTMLSpanElement>(null);
  const hudNum = useRef<HTMLElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = root.current!;
    const bandEls = Array.from(hero.querySelectorAll<HTMLElement>(".band"));
    const cache = bandEls.map(() => ({ op: -1, k: -1, live: false }));
    let scene: StackSceneT | null = null;
    let sceneTried = false;
    let target = 0, shown = 0, rafId: number | null = null, last = 0;
    let onScreen = true, on = false;
    let loadK = 0;
    const loadStart = performance.now();
    let lastHud = "", lastHudAt = 0, lastCue = -1, lastBar = -1;

    const updateBands = (p: number, now: number) => {
      BANDS.forEach(([a, b], i) => {
        const f = Math.min(0.02, (b - a) / 3);
        const inn = i === 0 ? 1 : smoothstep(p, a, a + f);
        const out = i === BANDS.length - 1 ? 1 : 1 - smoothstep(p, b - f, b);
        const op = Math.round(inn * out * 1000) / 1000;
        const ramp = Number(bandEls[i].dataset.ramp) || Math.min(0.025, (b - a) * 0.35);
        let k = clamp((p - a) / ramp, 0, 1);
        if (i === 0) k = Math.max(k, loadK);
        const c = cache[i];
        if (Math.abs(op - c.op) > 0.004) { bandEls[i].style.opacity = String(op); c.op = op; }
        if (Math.abs(k - c.k) > 0.008 || (k === 1 && c.k !== 1)) { bandEls[i].style.setProperty("--k", k.toFixed(3)); c.k = k; }
        const live = op > 0.5;
        if (live !== c.live) { bandEls[i].classList.toggle("live", live); c.live = live; }
      });
      // HUD at ~10Hz, only on change
      if (now - lastHudAt > 100) {
        const p2 = clamp(p, 0, 1);
        const idx = p2 > 0.86 ? -1 : Math.round(Math.min(5, Math.max(0, (p2 - 0.06) / 0.76 * 5)));
        const text = idx < 0 ? "All six layers, assembled" : layers[idx];
        const num = idx < 0 ? "06/06" : `${String(idx + 1).padStart(2, "0")}/06`;
        if (text + num !== lastHud) {
          if (hudText.current) hudText.current.textContent = text;
          if (hudNum.current) hudNum.current.textContent = num;
          lastHud = text + num;
        }
        lastHudAt = now;
      }
      const bar = Math.round(p * 200) / 200;
      if (bar !== lastBar) { hud.current?.style.setProperty("--p", String(bar)); lastBar = bar; }
      const cueOp = p > 0.03 ? 0 : 1;
      if (cueOp !== lastCue && cue.current) { cue.current.style.opacity = String(cueOp); lastCue = cueOp; }
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * damp(0.14, dt);
      loadK = Math.min(1, (now - loadStart) / 1100);
      loadK = 1 - Math.pow(1 - loadK, 3);
      const settled = Math.abs(target - shown) < 0.0004 && loadK >= 1;
      if (settled) shown = target;
      scene?.render(shown);
      updateBands(shown, now);
      if (settled || !onScreen || !on) { rafId = null; last = 0; }
      else rafId = requestAnimationFrame(tick);
    };
    const kick = () => { if (rafId === null && onScreen && on) rafId = requestAnimationFrame(tick); };
    const onScroll = () => { target = pinProgress(hero); kick(); };

    const size = () => {
      if (!scene || !canvas.current) return;
      const r = canvas.current.getBoundingClientRect();
      scene.resize(Math.max(1, r.width), Math.max(1, r.height));
      scene.render(shown);
    };

    const initScene = async () => {
      if (sceneTried) return;
      sceneTried = true;
      try {
        const test = document.createElement("canvas");
        const ok = !!(test.getContext("webgl2") || test.getContext("webgl"));
        if (!ok) throw new Error("no webgl");
        const { StackScene } = await import("./stackScene");
        scene = new StackScene(canvas.current!);
        size();
        hero.classList.add("ready");
      } catch {
        hero.classList.add("no-gl");
        disable();
      }
    };

    const enable = () => {
      if (on) return;
      on = true;
      cache.forEach((c) => { c.op = -1; c.k = -1; });
      initScene();
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      kick();
    };
    const disable = () => {
      if (!on) return;
      on = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const stopGates = watchGates((isStatic) => (isStatic || hero.classList.contains("no-gl") ? disable() : enable()));
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) onScroll(); }, { rootMargin: "100px" });
    io.observe(hero);
    const ro = new ResizeObserver(() => { size(); onScroll(); });
    ro.observe(hero);

    return () => {
      stopGates();
      io.disconnect();
      ro.disconnect();
      disable();
      scene?.dispose();
    };
  }, []);

  const [b1, b2, b3, b4] = heroBands;

  return (
    <section ref={root} className="hero" id="top" aria-label="Introduction">
      <div className="hero-stage">
        <canvas ref={canvas} className="hero-canvas" aria-hidden="true" tabIndex={-1} />
        <div className="hero-scrim" aria-hidden="true" />

        <div className="band b-rise">
          <span className="tag">{b1.tag}</span>
          <h1 className="display"><Split text={b1.title} seed={11} spread={0.5} order="reading" mask /></h1>
          <p className="sub">{b1.sub}</p>
          <div className="row sub">
            <a className="btn btn-primary" href={contact.mailto}>{heroSettle.cta}<Arrow /></a>
            <a className="btn btn-ghost" href="#work">{heroSettle.secondary}</a>
          </div>
        </div>

        <div className="band b-snap" data-ramp="0.034">
          <span className="tag">{b2.tag}</span>
          <h2 className="display"><Split text={b2.title} mode="chars" seed={23} spread={0.55} jitterX={70} /></h2>
          <p className="sub">{b2.sub}</p>
        </div>

        <div className="band b-punch">
          <span className="tag">{b3.tag}</span>
          <h2 className="display"><Split text={b3.title} seed={37} spread={0.45} order="reading" emphasis={["Locked"]} /></h2>
          <p className="sub">{b3.sub}</p>
        </div>

        <div className="band b-type" data-ramp="0.04">
          <span className="tag">{b4.tag}</span>
          <h2 className="display"><Split text={b4.title} mode="chars" seed={41} spread={0.62} order="reading" /><span className="caret" aria-hidden="true" /></h2>
          <p className="sub">{b4.sub}</p>
        </div>

        <div className="band b-settle" data-ramp="0.06">
          <span className="tag">{heroSettle.tag}</span>
          <p className="display name" style={{ marginTop: 0, color: "var(--ink)", fontSize: undefined }}><Split text={heroSettle.name} seed={5} spread={0.3} order="reading" /></p>
          <p className="role s1">{heroSettle.role}</p>
          <div className="row s2">
            <a className="btn btn-primary" href={contact.mailto}>{heroSettle.cta}<Arrow /></a>
            <a className="btn btn-ghost" href="#work">{heroSettle.secondary}</a>
          </div>
        </div>

        <div className="cue" ref={cue} aria-hidden="true"><i />Scroll to go deeper</div>
        <div className="hud" ref={hud} aria-hidden="true">
          <span>LAYER <b ref={hudNum}>01/06</b></span>
          <span ref={hudText}>{layers[0]}</span>
          <span className="bar"><i /></span>
        </div>
      </div>

      <div className="hero-static">
        <div>
          <span className="tag">{b1.tag}</span>
          <h1 className="display">{b1.title}</h1>
          <p>{b1.sub}</p>
          <div className="row">
            <a className="btn btn-primary" href={contact.mailto}>{heroSettle.cta}<Arrow /></a>
            <a className="btn btn-ghost" href="#work">{heroSettle.secondary}</a>
          </div>
        </div>
        <figure>
          <StaticStack />
        </figure>
      </div>
    </section>
  );
}
