/* eslint-disable @next/next/no-img-element */
import { experience, hero } from "@/lib/content";
import { Icon } from "@/components/icons";

export function Experience() {
  const t = experience.talk;
  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <div className="container">
        <div className="sec-head" data-reveal>
          <span className="eyebrow" style={{ ["--i" as string]: 0 }}>04 · experience</span>
          <h2 id="exp-title" className="display" data-split>{experience.title}</h2>
        </div>

        <div className="exp">
          <aside className="card me-card" data-reveal>
            <div className="me-top" style={{ ["--i" as string]: 0 }}>
              <span className="avatar"><img src="/img/wajid.webp" alt="" loading="lazy" decoding="async" /></span>
              <span><b>{hero.name}</b><span>{hero.role}</span></span>
            </div>
            <p style={{ ["--i" as string]: 1 }}>{experience.bio}</p>
            <dl className="facts" style={{ ["--i" as string]: 2 }}>
              {experience.facts.map((f) => (
                <div key={f.label}><Icon name={f.icon} /><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
            <a className="talk" href={t.href} target="_blank" rel="noopener noreferrer" style={{ ["--i" as string]: 3 }}>
              <span className="yt" aria-hidden="true"><Icon name="play" /></span>
              <span><small>{t.label}</small><b>{t.title}</b><span className="d">{t.body}</span></span>
            </a>
          </aside>

          <div className="timeline">
            <span className="tl-line" aria-hidden="true"><i /></span>
            <ol className="tl-list">
            {experience.timeline.map((e) => (
              <li className="card tl" key={e.what}>
                <span className="dot" aria-hidden="true"><Icon name={e.icon} /></span>
                <div className="when">{e.when}</div>
                <h4>{e.what}</h4>
                <div className="where">{e.where}</div>
                <p>{e.body}</p>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
