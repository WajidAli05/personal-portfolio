import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, contact } from "@/lib/content";
import { Icon, Tech } from "@/components/icons";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Motion } from "@/components/fx/Motion";
import { AppMedia } from "@/components/sections/AppMedia";
import { Screens, Walkthrough } from "@/components/sections/Modal";
import { Footer } from "@/components/sections/Contact";
import { techName } from "@/components/sections/Projects";

// One page per web app: the full story that the short card on the home page leaves out.
export const dynamicParams = false;
export function generateStaticParams() {
  return apps.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const a = apps.find((x) => x.id === id);
  if (!a) return {};
  return { title: `${a.name} · Wajid Ali`, description: a.short };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const i = apps.findIndex((x) => x.id === id);
  if (i < 0) notFound();
  const a = apps[i];
  const next = apps[(i + 1) % apps.length];

  return (
    <>
      <SmoothScroll />
      <Motion />
      <div className="cbar">
        <Link className="cbar-back" href="/#projects"><Icon name="back" />All work</Link>
        <Link className="mbar-mark" href="/" aria-label="Home">WA</Link>
        <a className="btn btn-primary btn-sm" href={contact.mailto}><Icon name="mail" />Email me</a>
      </div>

      <main id="main" tabIndex={-1} className="case">
        <header className="case-head" data-reveal>
          <p className="kicker"><span>{a.index}</span>{a.kicker}</p>
          <h1>{a.name}</h1>
          <p className="case-short">{a.short}</p>
          <ul className="tags">{a.tags.map((t) => <li key={t.text}><Icon name={t.icon} />{t.text}</li>)}</ul>
        </header>

        <div className="case-media" data-reveal>
          <AppMedia a={a} />
          {a.screens && <Screens items={a.screens} title={`${a.name} screens`} />}
          {(a.walkthrough || a.note) && (
            <div className="proj-foot">
              {a.walkthrough && <Walkthrough src={a.walkthrough.src} poster={a.walkthrough.poster} meta={a.walkthrough.meta} title={`${a.name} walkthrough`} />}
              {a.note && <span className="note">{a.note}</span>}
            </div>
          )}
        </div>

        <section className="case-sec" data-reveal aria-labelledby="c-over">
          <h2 id="c-over">Overview</h2>
          <div>
            <p>{a.summary}</p>
            <p className="role"><b>My role</b>{a.role}</p>
          </div>
        </section>

        <section className="case-sec" data-reveal aria-labelledby="c-feat">
          <h2 id="c-feat">What I built</h2>
          <ul className="feat">
            {a.highlights.map((h) => (
              <li key={h.title}><Icon name={h.icon} /><div><b>{h.title}</b><p>{h.body}</p></div></li>
            ))}
          </ul>
        </section>

        <section className="case-sec" data-reveal aria-labelledby="c-stack">
          <h2 id="c-stack">Built with</h2>
          <ul className="chips">{a.stack.map((s) => <li className="chip" key={s}><Tech name={techName(s)} />{s}</li>)}</ul>
        </section>

        <div className="case-end" data-reveal>
          <Link className="next" href={`/projects/${next.id}/`}>
            <small>Next project</small>
            <b>{next.name}</b>
            <span>{next.short}</span>
            <Icon name="arrow" />
          </Link>
          <div className="case-cta">
            <p>Need something like this?</p>
            <a className="btn btn-primary" href={contact.mailto}><Icon name="mail" />Email me</a>
          </div>
        </div>

        <Footer top="#main" />
      </main>
    </>
  );
}
