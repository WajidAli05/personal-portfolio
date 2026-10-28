/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { apps, sections, sites, type App } from "@/lib/content";
import { Icon, Tech, tech } from "@/components/icons";
import { SecHead } from "@/components/SecHead";
import { AppMedia } from "./AppMedia";

export const techName = (s: string) => s.replace(/ \d+$/, "");

// Short card: what it is in one line, three facts, the stack as logos. The whole card opens
// the project's own page with the full story.
function AppCard({ a, flip }: { a: App; flip: boolean }) {
  const logos = a.stack.map(techName).filter((n) => tech[n]).slice(0, 6);
  return (
    <article className={`proj${flip ? " flip" : ""}`} id={a.id} aria-labelledby={`${a.id}-t`} data-reveal>
      <AppMedia a={a} />
      <div className="proj-body">
        <p className="kicker"><span>{a.index}</span>{a.kicker}</p>
        <h3 id={`${a.id}-t`}><Link className="stretch" href={`/projects/${a.id}/`}>{a.name}</Link></h3>
        <p className="sum">{a.short}</p>
        <ul className="tags" aria-label="Highlights">
          {a.tags.map((t) => <li key={t.text}><Icon name={t.icon} />{t.text}</li>)}
        </ul>
        <div className="proj-foot">
          <span className="logos" aria-label={`Built with ${a.stack.join(", ")}`}>
            {logos.map((n) => <span key={n} title={n}><Tech name={n} /></span>)}
          </span>
          <span className="link" aria-hidden="true">Case study<Icon name="arrow" /></span>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="sec" id="projects" aria-labelledby="projects-title">
      <SecHead s={sections.projects} id="projects-title" />

      <h3 className="sub" data-split>Web apps and systems</h3>
      <div className="proj-list">
        {apps.map((a, i) => <AppCard a={a} key={a.id} flip={i % 2 === 1} />)}
      </div>

      <h3 className="sub sub-gap" data-split>{sites.title}</h3>
      <p className="sub-lede">{sites.lede}</p>
      <div className="sites">
        {sites.items.map((s) => (
          <article className="site" key={s.href} data-reveal>
            <a className="site-shot" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.kind}, ${s.place}: open the live site`}>
              <img src={s.img} alt={s.alt} width={1440} height={900} loading="lazy" decoding="async" />
              <span className="live" aria-hidden="true"><i />Live</span>
              <span className="feature" aria-hidden="true"><Icon name="sparkles" />{s.feature}</span>
            </a>
            <div className="site-body">
              <p className="kicker">{s.place}{"badge" in s && s.badge ? <span className="badge">{s.badge}</span> : null}</p>
              <h4>{s.kind}</h4>
              <p>{s.body}</p>
              <div className="site-foot">
                {s.stack.some((x) => tech[techName(x)]) ? (
                  <span className="logos" aria-label={`Built with ${s.stack.join(", ")}`}>
                    {s.stack.map(techName).filter((n) => tech[n]).map((n) => <span key={n} title={n}><Tech name={n} /></span>)}
                  </span>
                ) : <span className="note">{s.stack.join(" · ")}</span>}
                <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">Visit site<Icon name="out" /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
