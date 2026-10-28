/* eslint-disable @next/next/no-img-element */
import { experience, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { SecHead } from "@/components/SecHead";

// A timeline: each entry has a coloured icon on a line that draws as you scroll (see Motion),
// the date, then what happened. The current role carries a pulsing "Now" badge.
// The TED-Ed talk gets its own card below.
export function Experience() {
  const t = experience.talk;
  return (
    <section className="sec" id="experience" aria-labelledby="exp-title">
      <SecHead s={sections.experience} id="exp-title" />
      <ol className="xrows" data-timeline>
        {experience.timeline.map((e) => {
          const now = e.when.includes("now");
          return (
            <li className="xrow" key={e.what}>
              <span className={`xico xico-${e.icon}${now ? " live" : ""}`} aria-hidden="true"><Icon name={e.icon} /></span>
              <p className="row-key">{e.when}{now ? <span className="now-badge"><i />Now</span> : null}</p>
              <div className="xp">
                <h3>{e.what}</h3>
                <p className="where">{e.where}</p>
                <p>{e.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <a className="ted" href={t.href} target="_blank" rel="noopener noreferrer" data-reveal>
        <span className="ted-shot">
          <img src={t.thumb} alt="Wajid Ali speaking on stage at a TED-Ed Student Talks event" width={960} height={540} loading="lazy" decoding="async" />
          <span className="ted-play" aria-hidden="true"><Icon name="play" /></span>
        </span>
        <span className="ted-copy">
          <span className="ted-tag">{t.label}</span>
          <b>{t.title}</b>
          <span className="d">{t.body}</span>
          <span className="link">{t.cta}<Icon name="out" /></span>
        </span>
      </a>
    </section>
  );
}
