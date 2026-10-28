import { research, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { SecHead } from "@/components/SecHead";
import { Quiz } from "./Quiz";

export function Research() {
  return (
    <section className="sec" id="research" aria-labelledby="research-title">
      <SecHead s={sections.research} id="research-title" />

      <article className="paper" data-reveal>
        <p className="pub-tag"><Icon name="badge" />IEEE/ACM · NLBSE 2025</p>
        <h3>CodeComClassify</h3>
        <p className="subtitle">{research.subtitle}</p>
        <p className="abstract">{research.body}</p>
        <dl className="pstats">
          {research.stats.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd data-num={parseInt(s.value)} data-suffix={s.value.replace(/^[0-9]+/, "")}>{s.value}</dd></div>
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
