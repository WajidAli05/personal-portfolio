/* eslint-disable @next/next/no-img-element */
import { apps, sections, sites, type App } from "@/lib/content";
import { Icon, Tech } from "@/components/icons";
import { SecHead } from "@/components/SecHead";
import { ProjectVideo } from "./ProjectVideo";
import { Screens, Walkthrough } from "./Modal";

function AppCard({ a }: { a: App }) {
  const m = a.media;
  return (
    <article className="proj" id={a.id} aria-labelledby={`${a.id}-t`} data-reveal>
      <div className="proj-media">
        {m.kind === "video" && (
          <div className="frame">
            <div className="frame-bar" aria-hidden="true"><i /><i /><i /><span>{a.name}</span></div>
            <ProjectVideo src={m.src} poster={m.poster} w={m.w} h={m.h} alt={m.alt} />
          </div>
        )}
        {m.kind === "pair" && (
          <div className="pair">
            <figure><img src={m.a.src} alt={m.a.alt} loading="lazy" decoding="async" /><figcaption>Delivery hiring</figcaption></figure>
            <figure><img src={m.b.src} alt={m.b.alt} loading="lazy" decoding="async" /><figcaption>Construction hiring</figcaption></figure>
          </div>
        )}
        {a.screens && <Screens items={a.screens} title={`${a.name} screens`} />}
      </div>

      <div className="proj-body">
        <p className="kicker"><span>{a.index}</span>{a.kicker}</p>
        <h3 id={`${a.id}-t`}>{a.name}</h3>
        <p className="sum">{a.summary}</p>
        <p className="role"><b>My role</b>{a.role}</p>
        <ul className="feat" aria-label="Highlights">
          {a.highlights.map((h) => (
            <li key={h.title}><Icon name={h.icon} /><div><b>{h.title}</b><p>{h.body}</p></div></li>
          ))}
        </ul>
        <ul className="chips" aria-label="Built with">
          {a.stack.map((s) => <li className="chip" key={s}>{s}</li>)}
        </ul>
        {(a.walkthrough || a.note) && (
          <div className="proj-foot">
            {a.walkthrough && <Walkthrough src={a.walkthrough.src} poster={a.walkthrough.poster} meta={a.walkthrough.meta} title={`${a.name} walkthrough`} />}
            {a.note && <span className="note">{a.note}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="sec" id="projects" aria-labelledby="projects-title">
      <SecHead s={sections.projects} id="projects-title" />

      <h3 className="sub">Web apps and systems</h3>
      <div className="proj-list">
        {apps.map((a) => <AppCard a={a} key={a.id} />)}
      </div>

      <h3 className="sub sub-gap">{sites.title}</h3>
      <p className="sub-lede">{sites.lede}</p>
      <div className="sites">
        {sites.items.map((s) => (
          <article className="site" key={s.href} data-reveal>
            <a className="site-shot" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.kind}, ${s.place}: open the live site`}>
              <img src={s.img} alt={s.alt} width={1440} height={900} loading="lazy" decoding="async" />
            </a>
            <div className="site-body">
              <p className="kicker">{s.place}{"badge" in s && s.badge ? <span className="badge">{s.badge}</span> : null}</p>
              <h4>{s.kind}</h4>
              <p>{s.body}</p>
              <div className="site-foot">
                <ul className="chips" aria-label="Built with">{s.stack.map((x) => <li className="chip" key={x}><Tech name={x.replace(/ 16$/, "")} />{x}</li>)}</ul>
                <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">Visit site<Icon name="out" /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
