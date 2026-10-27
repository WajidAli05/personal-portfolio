"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

// Muted looping preview. Loads only near the viewport, plays only while visible,
// stays on its poster with reduced motion (the visitor can still press play).
export function ProjectVideo({ src, poster, w, h, alt }: { src: string; poster: string; w: number; h: number; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false); // user-chosen pause
  const userPaused = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    const v = vid.current!, el = box.current!;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) { userPaused.current = true; setPaused(true); }
    const near = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !v.src) { v.src = src; v.load(); }
    }, { rootMargin: "600px 0px" });
    const seen = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    near.observe(el);
    seen.observe(el);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("playing", onPlay);
    v.addEventListener("pause", onPause);
    return () => { near.disconnect(); seen.disconnect(); v.removeEventListener("playing", onPlay); v.removeEventListener("pause", onPause); };
  }, [src]);

  const toggle = () => {
    const v = vid.current!;
    if (!v.src) { v.src = src; v.load(); }
    if (v.paused) { userPaused.current = false; setPaused(false); v.play().catch(() => {}); }
    else { userPaused.current = true; setPaused(true); v.pause(); }
  };

  return (
    <div ref={box} className={`view${playing ? " playing" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} width={w} height={h} alt={alt} loading="lazy" decoding="async" />
      <video ref={vid} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
      <button type="button" className="vid-toggle" onClick={toggle} aria-label={paused || !playing ? "Play preview" : "Pause preview"}>
        <Icon name={paused || !playing ? "play" : "pause"} />
      </button>
    </div>
  );
}
