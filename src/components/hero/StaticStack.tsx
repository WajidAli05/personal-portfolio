import { layers } from "@/lib/content";

// Isometric drawing of the same six-layer stack, for phones, reduced motion and no-WebGL.
export function StaticStack() {
  const cx = 230, w = 150, d = 74, gap = 52, top = 40;
  const slab = (y: number) =>
    `M ${cx} ${y - d / 2} L ${cx + w} ${y} L ${cx} ${y + d / 2} L ${cx - w} ${y} Z`;
  return (
    <svg className="stack-svg" viewBox="0 0 620 430" role="img" aria-label="A system drawn as six stacked layers: interface, API, roles and permissions, encrypted records, audit chain and backups.">
      {[-1, 1].map((s) => (
        <line key={s} className="tick" x1={cx + s * w} y1={top + d / 2} x2={cx + s * w} y2={top + d / 2 + gap * 5} strokeDasharray="3 4" />
      ))}
      {layers.map((name, i) => {
        const idx = 5 - i; // draw bottom layer first so upper slabs overlap it
        return (
          <g key={name}>
            <path d={`M ${cx - w} ${top + d / 2 + idx * gap} L ${cx - w} ${top + d / 2 + idx * gap + 7} L ${cx} ${top + d + idx * gap + 7} L ${cx + w} ${top + d / 2 + idx * gap + 7} L ${cx + w} ${top + d / 2 + idx * gap}`} className="lyr" style={{ fill: "#dde1e6" }} />
            <path d={slab(top + d / 2 + idx * gap)} className={`lyr${layers[idx] === "Roles & permissions" ? " on" : ""}`} />
            <line className="tick" x1={cx + w + 14} y1={top + d / 2 + idx * gap} x2={cx + w + 34} y2={top + d / 2 + idx * gap} />
            <text className="lbl" x={cx + w + 40} y={top + d / 2 + idx * gap + 4}>{String(idx + 1).padStart(2, "0")} {layers[idx]}</text>
          </g>
        );
      })}
      {/* motifs on the top slab (interface) */}
      <g transform={`translate(0 ${top + d / 2})`}>
        <path className="mot" d={`M ${cx - 90} -2 L ${cx - 30} -32 M ${cx - 60} 13 L ${cx} -17 M ${cx - 30} 28 L ${cx + 30} -2`} />
        <path className="acc" d={`M ${cx + 10} 18 L ${cx + 40} 6 L ${cx + 60} 14 L ${cx + 95} -4`} />
      </g>
      {/* dimension line */}
      <g>
        <line className="tick" x1={cx - w - 26} y1={top + d / 2} x2={cx - w - 26} y2={top + d / 2 + gap * 5} />
        <line className="tick" x1={cx - w - 32} y1={top + d / 2} x2={cx - w - 20} y2={top + d / 2} />
        <line className="tick" x1={cx - w - 32} y1={top + d / 2 + gap * 5} x2={cx - w - 20} y2={top + d / 2 + gap * 5} />
        <text className="lbl" x={cx - w - 34} y={top + d / 2 + gap * 2.5} transform={`rotate(-90 ${cx - w - 34} ${top + d / 2 + gap * 2.5})`} textAnchor="middle">6 LAYERS</text>
      </g>
    </svg>
  );
}
