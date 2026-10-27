"use client";

import { useRef } from "react";
import { Play } from "@/components/icons";

// Full recording with sound. Nothing downloads or plays until the visitor asks.
export function Walkthrough({ src, poster, label, meta, title }: { src: string; poster: string; label: string; meta: string; title: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  const open = () => {
    const d = dlg.current!, v = vid.current!;
    if (!v.src) v.src = src;
    d.showModal();
    v.play().catch(() => {});
  };
  const close = () => {
    vid.current?.pause();
    dlg.current?.close();
  };

  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={open}>
        <Play /> {label} <span className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{meta}</span>
      </button>
      <dialog
        ref={dlg}
        className="walk"
        aria-label={title}
        onClick={(e) => { if (e.target === dlg.current) close(); }}
        onClose={() => vid.current?.pause()}
      >
        <div className="in">
          <div className="bar">
            <span>{title}</span>
            <button type="button" className="x" onClick={close}>Close</button>
          </div>
          <video ref={vid} controls playsInline preload="none" poster={poster} />
        </div>
      </dialog>
    </>
  );
}
