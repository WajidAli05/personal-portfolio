import { Fragment } from "react";
import { rng } from "@/lib/motion";

type Mode = "words" | "chars";

/**
 * Splits a line into word (.w) and character (.c) spans with seeded per-span
 * custom properties, plus a screen-reader copy. Deterministic, so server and
 * client render the same markup.
 */
export function Split({
  text,
  mode = "words",
  seed = 1,
  spread = 0.55,
  order = "random",
  jitterX = 0,
  emphasis = [],
  mask = false,
}: {
  text: string;
  mode?: Mode;
  seed?: number;
  spread?: number;
  order?: "random" | "reading";
  jitterX?: number;
  emphasis?: string[];
  mask?: boolean;
}) {
  const r = rng(seed);
  const words = text.split(" ");
  const totalChars = text.replace(/ /g, "").length;
  let ci = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split">
        {words.map((word, wi) => {
          const wth =
            order === "reading"
              ? (wi / Math.max(1, words.length - 1)) * spread
              : r() * spread;
          const isEm = emphasis.includes(word.replace(/[.,]/g, ""));
          const inner =
            mode === "chars"
              ? word.split("").map((ch, k) => {
                  const idx = ci++;
                  const th =
                    order === "reading"
                      ? (idx / Math.max(1, totalChars - 1)) * spread + r() * 0.04
                      : r() * spread;
                  const jx = (r() < 0.5 ? -1 : 1) * (jitterX * (0.4 + r() * 0.6));
                  return (
                    <span
                      key={k}
                      className="c"
                      style={{ ["--th" as string]: th.toFixed(3), ["--jx" as string]: `${jx.toFixed(1)}px` }}
                    >
                      {ch}
                    </span>
                  );
                })
              : word;
          const w = (
            <span
              className={`w${isEm ? " em" : ""}`}
              style={mode === "words" ? { ["--th" as string]: wth.toFixed(3) } : undefined}
            >
              {inner}
            </span>
          );
          return (
            <Fragment key={wi}>
              {mask ? <span className="mask">{w}</span> : w}
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </>
  );
}
