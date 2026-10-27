import type { ReactNode } from "react";

// Holographic media frame: a scan line boots the media in (see holoIn in Projects),
// HUD corners lock on, and on hover it tilts in 3D with a moving glare and scanlines.
export function Holo({ children, label, className = "" }: { children: ReactNode; label?: string; className?: string }) {
  return (
    <div className={`holo ${className}`} data-tilt>
      <div className="holo-media">{children}</div>
      <span className="holo-grid" aria-hidden="true" />
      <span className="holo-lines" aria-hidden="true" />
      <span className="holo-glare" aria-hidden="true" />
      <span className="holo-scan" aria-hidden="true" />
      <span className="holo-corners" aria-hidden="true"><i /><i /><i /><i /></span>
      {label ? <span className="holo-tag mono" aria-hidden="true">{label}</span> : null}
    </div>
  );
}
