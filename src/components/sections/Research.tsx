import { research } from "@/lib/content";
import { Quiz } from "./Quiz";
import { Dim } from "@/components/Dim";
import { ArrowUpRight } from "@/components/icons";

export function Research() {
  return (
    <section className="section research" id="research" aria-labelledby="research-title" data-section="// summary" data-dark>
      <div className="wrap">
        <Dim label="Research" />
        <div className="paper" style={{ marginTop: 48 }}>
          <div data-reveal>
            <span className="tag" style={{ ["--i" as string]: 0 }}>{research.tag} · {research.kicker}</span>
            <h2 id="research-title" className="display paper-title" style={{ ["--i" as string]: 1, marginTop: 18 }}>CodeCom<wbr />Classify</h2>
            <p className="paper-sub" style={{ ["--i" as string]: 2 }}>{research.subtitle}</p>
            <div className="venue" style={{ ["--i" as string]: 3 }}>
              <b>{research.venue}</b>
              <span>{research.session}</span>
              <span>DOI {research.doi}</span>
            </div>
            <p className="authors" style={{ ["--i" as string]: 4 }}>
              {research.authors.map((a, i) => (
                <span key={a}>
                  {a === "Wajid Ali" ? <span className="me">{a}</span> : a}
                  {i < research.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div data-reveal>
            <p className="paper-body" style={{ ["--i" as string]: 0 }}>{research.body}</p>
            <div className="paper-stats" style={{ ["--i" as string]: 1 }}>
              {research.stats.map((s) => (
                <div key={s.label}>
                  <div className="v">{s.value}</div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="paper-links" style={{ ["--i" as string]: 2 }}>
              {research.links.map((l) => (
                <a key={l.href} className="btn btn-ghost btn-sm" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<ArrowUpRight /></a>
              ))}
            </div>
          </div>
        </div>
        <Quiz />
      </div>
    </section>
  );
}
