"use client";

import { useRef } from "react";
import { Icon } from "@/components/icons";

/** Opens a full recording (with sound) only when the visitor asks. */
export function Walkthrough({ src, poster, meta, title }: { src: string; poster: string; meta: string; title: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const open = () => {
    const v = vid.current!;
    if (!v.src) v.src = src;
    dlg.current!.showModal();
    v.play().catch(() => {});
  };
  const close = () => { vid.current?.pause(); dlg.current?.close(); };
  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" onClick={open}>
        <Icon name="play" />Watch walkthrough <span className="mono" style={{ fontSize: 11.5, color: "var(--text-3)" }}>{meta}</span>
      </button>
      <dialog ref={dlg} className="modal" aria-label={title} onClick={(e) => { if (e.target === dlg.current) close(); }} onClose={() => vid.current?.pause()}>
        <div className="in">
          <div className="top"><span>{title}</span><button type="button" className="btn btn-ghost btn-sm" onClick={close}><Icon name="x" />Close</button></div>
          <video ref={vid} controls playsInline preload="none" poster={poster} />
        </div>
      </dialog>
    </>
  );
}

/** Screenshot thumbnails that open full size. */
export function Screens({ items, title }: { items: { src: string; alt: string }[]; title: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const cap = useRef<HTMLSpanElement>(null);
  const show = (s: { src: string; alt: string }) => {
    img.current!.src = s.src;
    img.current!.alt = s.alt;
    cap.current!.textContent = s.alt;
    dlg.current!.showModal();
  };
  return (
    <>
      <div className="thumbs">
        {items.map((s) => (
          <button type="button" key={s.src} onClick={() => show(s)} aria-label={`Open screenshot: ${s.alt}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <dialog ref={dlg} className="modal" aria-label={title} onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
        <div className="in">
          <div className="top"><span ref={cap} /><button type="button" className="btn btn-ghost btn-sm" onClick={() => dlg.current?.close()}><Icon name="x" />Close</button></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img} alt="" />
        </div>
      </dialog>
    </>
  );
}
