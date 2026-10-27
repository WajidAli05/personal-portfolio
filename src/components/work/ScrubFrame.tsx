"use client";

import { useEffect, useRef } from "react";
import type { Chapter } from "@/lib/content";
import { damp, pinProgress, watchGates } from "@/lib/motion";

/**
 * A pinned stage that scrubs a screen recording with scroll.
 * Engineering per the scrub standard: Blob fetch (hosts without Range support),
 * gated seeks, a dt-normalized lerp loop that rests, delta-gated DOM writes.
 */
export function ScrubFrame({
  chapters,
  src,
  poster,
  width,
  height,
  label,
}: {
  chapters: Chapter[];
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const pin = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pinEl = pin.current!, frameEl = frame.current!, v = video.current!;
    const chEls = Array.from(pinEl.querySelectorAll<HTMLElement>(".chapter"));
    let on = false, onScreen = false, loading = false, ready = false;
    let target = 0, shown = 0, rafId: number | null = null, last = 0;
    let active = -2, lastMeter = -1, lastClock = "", lastClockAt = 0;
    let seekBusy = false, pending: number | null = null;

    const requestSeek = (t: number) => {
      if (!ready || !v.duration) return;
      if (seekBusy) { pending = t; return; }
      seekBusy = true;
      v.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pending !== null) { const t = pending; pending = null; requestSeek(t); }
    };
    const onError = () => { seekBusy = false; pending = null; frameEl.classList.remove("video-ready"); };
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("error", onError);

    const load = async () => {
      if (loading) return;
      loading = true;
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 25000);
        const res = await fetch(src, { signal: ctrl.signal });
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        clearTimeout(t);
        v.src = URL.createObjectURL(blob);
        v.load();
        v.addEventListener("loadeddata", () => {
          ready = true;
          frameEl.classList.add("video-ready");
          requestSeek(shown * v.duration);
        }, { once: true });
      } catch {
        // The poster carries the section; the page stays complete without the video.
        loading = false;
      }
    };

    const apply = (p: number, now: number) => {
      let idx = 0;
      chapters.forEach((c, i) => { if (p >= c.at) idx = i; });
      if (idx !== active) {
        chEls.forEach((el, i) => el.classList.toggle("on", i === idx));
        active = idx;
      }
      const m = Math.round(p * 300) / 300;
      if (m !== lastMeter) { frameEl.style.setProperty("--p", String(m)); lastMeter = m; }
      if (now - lastClockAt > 100 && v.duration) {
        const s = Math.floor(p * v.duration);
        const txt = `00:${String(s).padStart(2, "0")} / 00:${String(Math.floor(v.duration)).padStart(2, "0")}`;
        if (txt !== lastClock && clock.current) { clock.current.textContent = txt; lastClock = txt; }
        lastClockAt = now;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * damp(0.16, dt);
      const done = Math.abs(target - shown) < 0.0005;
      if (done) shown = target;
      if (ready) requestSeek(shown * v.duration * 0.999);
      apply(shown, now);
      if (done || !onScreen || !on) { rafId = null; last = 0; }
      else rafId = requestAnimationFrame(tick);
    };
    const kick = () => { if (rafId === null && on && onScreen) rafId = requestAnimationFrame(tick); };
    const onScroll = () => { target = pinProgress(pinEl); kick(); };

    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting && on) load(); }, { rootMargin: "1200px 0px" });
    const vis = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) onScroll(); }, { rootMargin: "60px" });
    near.observe(pinEl);
    vis.observe(pinEl);

    const enable = () => {
      if (on) return;
      on = true;
      active = -2;
      window.addEventListener("scroll", onScroll, { passive: true });
      const r = pinEl.getBoundingClientRect();
      if (r.top < window.innerHeight + 1200 && r.bottom > -1200) load();
      onScroll();
    };
    const disable = () => {
      if (!on) return;
      on = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      chEls.forEach((el) => el.classList.remove("on"));
      active = -2;
    };
    const stop = watchGates((isStatic) => (isStatic ? disable() : enable()));

    return () => {
      stop();
      disable();
      near.disconnect();
      vis.disconnect();
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("error", onError);
      if (v.src.startsWith("blob:")) URL.revokeObjectURL(v.src);
    };
  }, [chapters, src]);

  return (
    <div className="case-pin" ref={pin}>
      <div className="case-stage">
        <ol className="chapters">
          {chapters.map((c) => (
            <li className="chapter" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
        <div className="frame" ref={frame}>
          <div className="screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} width={width} height={height} alt={label} loading="lazy" decoding="async" />
            <video ref={video} muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
          </div>
          <div className="meter" aria-hidden="true"><i /></div>
          <div className="cap" aria-hidden="true">
            <span>REC · scroll to scrub</span>
            <span ref={clock}>00:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
