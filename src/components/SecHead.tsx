import type { ReactNode } from "react";

// One header style for every section: HUD index label, split-reveal title, lede.
export function SecHead({ n, label, title, lede, id }: { n: string; label: string; title: ReactNode; lede?: ReactNode; id: string }) {
  return (
    <div className="sec-head" data-reveal>
      <span className="eyebrow" style={{ ["--i" as string]: 0 }}>
        <b>[{n}]</b><span>{label}</span><i aria-hidden="true" />
      </span>
      <h2 id={id} className="display" data-split>{title}</h2>
      {lede ? <p style={{ ["--i" as string]: 2 }}>{lede}</p> : null}
    </div>
  );
}
