import { research, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { SecHead } from "@/components/SecHead";
import { Quiz } from "./Quiz";

// Each headline number gets its own coloured card with a small picture of what it means.
function StatVisual({ i }: { i: number }) {
  if (i === 0) return <span className="rs-grid" aria-hidden="true">{Array.from({ length: 19 }, (_, k) => <i key={k} style={{ ["--k" as string]: k }} />)}</span>;
  if (i === 1) return <span className="rs-langs" aria-hidden="true">{["Java", "Python", "Pharo"].map((l, k) => <i key={l} style={{ ["--k" as string]: k }}>{l}</i>)}</span>;
  return (
    <svg className="rs-ring" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="26" pathLength={100} />
      <circle className="fill" cx="32" cy="32" r="26" pathLength={100} />
    </svg>
  );
}

export function Research() {
  return (
    <section className="sec" id="research" aria-labelledby="research-title">
      <SecHead s={sections.research} id="research-title" />

      <article className="paper" data-reveal>
        <p className="pub-tag"><Icon name="badge" />IEEE/ACM · NLBSE 2025</p>
        <h3>CodeComClassify</h3>
        <p className="subtitle">{research.subtitle}</p>
        <p className="abstract">{research.body}</p>
        <dl className="rstats">
          {research.stats.map((s, i) => (
            <div key={s.label} className={`rs rs-${i}`}>
              <StatVisual i={i} />
              <dt>{s.label}</dt>
              <dd data-num={parseInt(s.value)} data-suffix={s.value.replace(/^[0-9]+/, "")}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="venue">
          <p><b>{research.venue}</b></p>
          <p>{research.session} · DOI {research.doi}</p>
          <p className="authors">
            {research.authors.map((a, i) => (
              <span key={a}>{a === "Wajid Ali" ? <span className="me">{a}</span> : a}{i < research.authors.length - 1 ? ", " : ""}</span>
            ))}
          </p>
        </div>
        <div className="plinks">
          {research.links.map((l) => (
            <a key={l.href} className="btn btn-quiet btn-sm" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<Icon name="out" /></a>
          ))}
        </div>
      </article>

      <Quiz />
    </section>
  );
}
