import { experience, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { SecHead } from "@/components/SecHead";

// Dates on the left, what happened on the right. Reads top to bottom like a CV.
export function Experience() {
  const t = experience.talk;
  return (
    <section className="sec" id="experience" aria-labelledby="exp-title">
      <SecHead s={sections.experience} id="exp-title" />
      <ol className="rows" data-reveal>
        {experience.timeline.map((e) => (
          <li className="row" key={e.what}>
            <p className="row-key">{e.when}</p>
            <div className="xp">
              <h3>{e.what}</h3>
              <p className="where">{e.where}</p>
              <p>{e.body}</p>
            </div>
          </li>
        ))}
        <li className="row">
          <p className="row-key">Talk</p>
          <a className="talk" href={t.href} target="_blank" rel="noopener noreferrer">
            <span className="yt" aria-hidden="true"><Icon name="play" /></span>
            <span><small>{t.label}</small><b>{t.title}</b><span className="d">{t.body}</span></span>
            <Icon name="out" className="talk-out" />
          </a>
        </li>
      </ol>
    </section>
  );
}
