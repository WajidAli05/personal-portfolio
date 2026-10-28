"use client";

import { useEffect, useRef, useState } from "react";
import { quiz } from "@/lib/content";
import { Icon } from "@/components/icons";

type Result = "ok" | "miss";
const BURST = Array.from({ length: 14 }, (_, k) => k);

// A small game: the visitor does the classifier's job by hand. Keys 1 to 4 pick an answer,
// Enter moves on. Right answers burst confetti, wrong ones give the card a shake.
export function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const done = results.length === quiz.items.length && picked === null;
  const item = quiz.items[Math.min(i, quiz.items.length - 1)];
  const score = results.filter((r) => r === "ok").length;
  let streak = 0;
  for (let k = results.length - 1; k >= 0 && results[k] === "ok"; k--) streak++;
  const right = picked !== null && picked === item.label;

  const choose = (opt: string) => {
    if (picked || done) return;
    setPicked(opt);
    setResults((r) => [...r, opt === item.label ? "ok" : "miss"]);
  };
  const next = () => { setPicked(null); setI((n) => n + 1); };
  const reset = () => { setI(0); setPicked(null); setResults([]); };

  // keyboard play while the game is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; }, { threshold: 0.4 });
    if (box.current) io.observe(box.current);
    const key = (e: KeyboardEvent) => {
      if (!seen.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4 && !picked && !done) { e.preventDefault(); choose(item.options[n - 1]); }
      else if (e.key === "Enter" && picked) { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", key);
    return () => { io.disconnect(); window.removeEventListener("keydown", key); };
  });

  return (
    <div className="quiz" ref={box} data-reveal>
      <div className="quiz-head">
        <span className="game-pill"><Icon name="game" />Mini game</span>
        <div className="quiz-score" aria-live="polite">
          <span className="sc"><Icon name="trophy" /><b key={score}>{score}</b>/{quiz.items.length}</span>
          {streak >= 2 ? <span className="streak" key={streak}><Icon name="flame" />{streak} in a row</span> : null}
        </div>
      </div>
      <h3 className="quiz-title">{quiz.title}</h3>
      <p className="quiz-lede">{quiz.lede}</p>

      <div className="code">
        <div className="bar"><span className="dots-3" aria-hidden="true"><i /><i /><i /></span><span>{done ? "results.txt" : `${item.file} · ${i + 1} of ${quiz.items.length}`}</span></div>
        <pre>
          <span className="swap" key={done ? "done" : `${i}-${picked ?? ""}`}>
            {done ? (
              <><span className="ln">1</span><span className="cm">{"// "}{quiz.done}</span></>
            ) : (
              <>
                <span className="ln">1</span><span className="cm">{"// "}{item.text}</span>
                {picked && <>{"\n"}<span className="ln">2</span><span className="lbl">{"// label: "}{item.label}</span></>}
              </>
            )}
          </span>
        </pre>
      </div>

      {!done && (
        <div className={`opts${picked && !right ? " shake" : ""}`} role="group" aria-label="Pick a category">
          {item.options.map((o, k) => {
            const cls = picked ? (o === item.label ? "right" : o === picked ? "wrong" : "dim") : "";
            return (
              <button key={o} type="button" className={`opt ${cls}`} onClick={() => choose(o)} disabled={!!picked} aria-pressed={picked === o} style={{ ["--k" as string]: k }}>
                <kbd aria-hidden="true">{k + 1}</kbd>{o}
                {cls === "right" && right ? (
                  <span className="burst" aria-hidden="true">{BURST.map((b) => <i key={b} style={{ ["--b" as string]: b }} />)}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      <div className="verdict" aria-live="polite">
        <span>
          {done ? <>You matched the human labels on <b>{score} of {quiz.items.length}</b>. Our model scored a weighted F1 of 81% across 19 categories.</>
            : picked ? <><b className={right ? "yes" : "no"}>{right ? "Nice, that's right." : `Close. It's ${item.label}.`}</b> {quiz.categories[item.label]}</>
            : <span className="hint"><Icon name="pointer" />Tap an answer<span className="keys">, or press 1 to 4</span>.</span>}
        </span>
        {done ? <button type="button" className="btn btn-primary btn-sm" onClick={reset}><Icon name="again" />{quiz.again}</button>
          : picked ? <button type="button" className="btn btn-primary btn-sm" onClick={next}>{i + 1 === quiz.items.length ? "See your score" : "Next comment"}<Icon name="arrow" /></button>
          : null}
      </div>

      <div className="pips" aria-hidden="true">
        {quiz.items.map((_, k) => <i key={k} className={results[k] ?? (k === i && !done ? "cur" : "")} />)}
      </div>
      <p className="quiz-src">{quiz.source}</p>
    </div>
  );
}
