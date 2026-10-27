/* eslint-disable @next/next/no-img-element */
import { contact, hero } from "@/lib/content";
import { Icon, Tech, brand } from "@/components/icons";

const orbit = ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Three.js"];

export function Hero() {
  const B = brand;
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="container">
        <div className="hero-grid">
          <div data-reveal>
            <span className="status" style={{ ["--i" as string]: 0 }}><i aria-hidden="true" />{hero.status}</span>
            <p className="hello" style={{ ["--i" as string]: 1 }}>{hero.hello}</p>
            <h1 id="hero-name" className="display grad-text" style={{ ["--i" as string]: 2 }}>{hero.name}</h1>
            <p className="role" style={{ ["--i" as string]: 3 }}>{hero.role}</p>
            <p className="hero-lede" style={{ ["--i" as string]: 4 }}>{hero.lede}</p>
            <div className="hero-meta" style={{ ["--i" as string]: 5 }}>
              <span><Icon name="pin" />{hero.location}</span>
              <span><Icon name="globe" />{hero.reach}</span>
            </div>
            <div className="hero-actions" style={{ ["--i" as string]: 6 }}>
              <a className="btn btn-primary" href={contact.mailto}><Icon name="mail" />{hero.cta}</a>
              <a className="btn btn-ghost" href="#projects">{hero.secondary}<Icon name="arrow" className="go" /></a>
              <div className="socials">
                <a className="icon-btn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><B.github /></a>
                <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><B.linkedin /></a>
                <a className="icon-btn" href={contact.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork"><B.upwork /></a>
                <a className="icon-btn" href={contact.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><B.scholar /></a>
              </div>
            </div>
          </div>

          <div className="orb" data-reveal>
            <div style={{ ["--i" as string]: 1, position: "absolute", inset: 0 }}>
              <div className="glow" aria-hidden="true" />
              <div className="ring" aria-hidden="true" />
              <div className="ring r2" aria-hidden="true" />
              <div className="disc">
                <img src="/img/wajid.webp" alt="Wajid Ali, arms crossed, in a navy track jacket" width={874} height={1142} fetchPriority="high" />
              </div>
              <div className="orbit" aria-hidden="true">
                {orbit.map((t, i) => (
                  <span className="sat" key={t} style={{ ["--a" as string]: `${i * 60 - 90}deg` }} title={t}><Tech name={t} /></span>
                ))}
              </div>
              <div className="badge">
                <Icon name="badge" />
                <span><b>IEEE published</b><small>NLBSE &apos;25 · ICSE</small></span>
              </div>
            </div>
          </div>
        </div>

        <div className="card stats" data-reveal>
          {hero.stats.map((s, i) => (
            <div key={s.label} style={{ ["--i" as string]: i }}>
              <div className="v grad-text">{s.value}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="do">
          <div className="sub-head"><h3 className="display">{hero.doTitle}</h3></div>
          <div className="do-grid" data-reveal>
            {hero.doItems.map((d, i) => (
              <article className="card do-card" key={d.title} style={{ ["--i" as string]: i }}>
                <span className="ico"><Icon name={d.icon} /></span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
