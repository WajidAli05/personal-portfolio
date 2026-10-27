import { research } from "@/lib/content";
import { Icon } from "@/components/icons";
import { Quiz } from "./Quiz";
import { SecHead } from "@/components/SecHead";

export function Research() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <div className="container">
        <SecHead n="02" label="research" id="research-title" title="Published research"
          lede="Natural language processing applied to software engineering: teaching models to read the comments developers leave in code." />

        <article className="card paper" data-reveal>
          <div style={{ ["--i" as string]: 0 }}>
            <span className="pub-tag"><Icon name="badge" />IEEE/ACM · NLBSE 2025</span>
            <h3 className="display grad-text">CodeCom<wbr />Classify</h3>
            <p className="subtitle">{research.subtitle}</p>
            <div className="venue">
              <b>{research.venue}</b>
              <span>{research.session}</span>
              <span>DOI {research.doi}</span>
            </div>
            <p className="authors">
              {research.authors.map((a, i) => (
                <span key={a}>{a === "Wajid Ali" ? <span className="me">{a}</span> : a}{i < research.authors.length - 1 ? ", " : ""}</span>
              ))}
            </p>
          </div>
          <div style={{ ["--i" as string]: 1 }}>
            <p className="abstract">{research.body}</p>
            <div className="pstats">
              {research.stats.map((s) => (
                <div key={s.label}><div className="v grad-text" data-num={parseInt(s.value)} data-suffix={s.value.replace(/^[0-9]+/, "")}>{s.value}</div><div className="l">{s.label}</div></div>
              ))}
            </div>
            <div className="plinks">
              {research.links.map((l) => (
                <a key={l.href} className="btn btn-ghost btn-sm" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<Icon name="out" /></a>
              ))}
            </div>
          </div>
        </article>

        <Quiz />
      </div>
    </section>
  );
}
