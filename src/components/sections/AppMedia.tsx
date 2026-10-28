/* eslint-disable @next/next/no-img-element */
import type { App } from "@/lib/content";
import { Icon } from "@/components/icons";
import { ProjectVideo } from "./ProjectVideo";

// The project's recording (or image pair) in a browser frame, with small status toasts that
// take turns popping up over it, so the card shows the app doing its job.
export function AppMedia({ a, toasts = true }: { a: App; toasts?: boolean }) {
  const m = a.media;
  return (
    <div className="am">
      <span className="am-glow" aria-hidden="true" />
      {m.kind === "video" && (
        <div className="frame">
          <div className="frame-bar" aria-hidden="true"><i /><i /><i /><span>{a.name}</span></div>
          <ProjectVideo src={m.src} poster={m.poster} w={m.w} h={m.h} alt={m.alt} />
        </div>
      )}
      {m.kind === "pair" && (
        <div className="pair">
          <figure><img src={m.a.src} alt={m.a.alt} loading="lazy" decoding="async" /><figcaption>Delivery hiring</figcaption></figure>
          <figure><img src={m.b.src} alt={m.b.alt} loading="lazy" decoding="async" /><figcaption>Construction hiring</figcaption></figure>
        </div>
      )}
      {toasts && (
        <ul className="toasts" aria-hidden="true">
          {a.floaters.map((f, i) => (
            <li key={f.text} className={`toast t${i}`}><span><Icon name={f.icon} /></span>{f.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
