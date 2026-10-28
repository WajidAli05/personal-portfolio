import { experience, hero, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { ParticlePortrait } from "@/components/webgl/ParticlePortrait";

// Section 1: a short introduction beside the particle portrait, a few numbers, and the
// three kinds of work I take on.
export function About() {
  const s = sections.about;
  return (
    <section className="sec" id="about" aria-labelledby="about-title">
      <div className="about">
        <figure className="portrait" data-reveal>
          <ParticlePortrait src="/img/wajid.webp" alt="Wajid Ali, arms crossed, in a navy track jacket" />
          <figcaption>Move your cursor over the portrait</figcaption>
        </figure>
        <div className="about-text" data-reveal>
          <p className="eyebrow"><span>{s.n}</span>{s.label}</p>
          <h2 id="about-title">{s.title}</h2>
          <p>{hero.lede}</p>
          <p>{experience.bio}</p>
          <dl className="facts">
            {experience.facts.map((f) => (
              <div key={f.label}><dt><Icon name={f.icon} />{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </div>
      </div>

      <dl className="stats" data-reveal>
        {hero.stats.map((st) => (
          <div key={st.label}>
            <dt>{st.label}</dt>
            <dd data-num={st.count || undefined} data-suffix={st.suffix}>{st.value}</dd>
          </div>
        ))}
      </dl>

      <div className="do" data-reveal>
        <h3 className="sub">{hero.doTitle}</h3>
        <ul>
          {hero.doItems.map((d) => (
            <li key={d.title}>
              <span className="do-ico"><Icon name={d.icon} /></span>
              <div><h4>{d.title}</h4><p>{d.body}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
