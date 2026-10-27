"use client";

import { useState } from "react";
import { quiz } from "@/lib/content";
import { Icon } from "@/components/icons";

type Result = "ok" | "miss";

// The interactive moment: the visitor does the classifier's job by hand.
export function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const done = results.length === quiz.items.length && picked === null;
  const item = quiz.items[Math.min(i, quiz.items.length - 1)];
  const score = results.filter((r) => r === "ok").length;

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    setResults((r) => [...r, opt === item.label ? "ok" : "miss"]);
  };
  const next = () => { setPicked(null); setI((n) => n + 1); };
  const reset = () => { setI(0); setPicked(null); setResults([]); };

  return (
    <div className="card quiz" data-reveal>
      <div className="quiz-head" style={{ ["--i" as string]: 0 }}>
        <div>
          <h3 className="display"><Icon name="brain" />{quiz.title}</h3>
          <p>{quiz.lede}</p>
        </div>
        <div className="qcount" aria-live="polite">
          {done ? <>Score <b>{score}/{quiz.items.length}</b></> : <>Comment <b>{i + 1}</b> of {quiz.items.length}</>}
        </div>
      </div>

      <div style={{ ["--i" as string]: 1 }}>
        <div className="code">
          <div className="bar"><span className="dots-3" aria-hidden="true"><i /><i /><i /></span><span>{done ? "results.txt" : item.file}</span></div>
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
          <div className="opts" role="group" aria-label="Pick a category">
            {item.options.map((o) => {
              const cls = picked ? (o === item.label ? "right" : o === picked ? "wrong" : "dim") : "";
              return <button key={o} type="button" className={`opt ${cls}`} onClick={() => choose(o)} disabled={!!picked} aria-pressed={picked === o}>{o}</button>;
            })}
          </div>
        )}

        <div className="verdict" aria-live="polite">
          <span>
            {done ? <>You matched the human labels on <b>{score} of {quiz.items.length}</b>. Our model scored a weighted F1 of 81% across 19 categories.</>
              : picked ? <><b>{picked === item.label ? "Correct." : `It's ${item.label}.`}</b> {quiz.categories[item.label]}</>
              : <>Pick the category that fits best.</>}
          </span>
          {done ? <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>{quiz.again}</button>
            : picked ? <button type="button" className="btn btn-primary btn-sm" onClick={next}>{i + 1 === quiz.items.length ? "See your score" : "Next comment"}<Icon name="arrow" className="go" /></button>
            : null}
        </div>

        <div className="pips" aria-hidden="true">
          {quiz.items.map((_, k) => <i key={k} className={results[k] ?? (k === i && !done ? "cur" : "")} />)}
        </div>
        <p className="quiz-src">{quiz.source}</p>
      </div>
    </div>
  );
}
