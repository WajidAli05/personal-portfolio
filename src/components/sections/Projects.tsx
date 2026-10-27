"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { apps, sites, type App } from "@/lib/content";
import { Icon, Tech } from "@/components/icons";
import { ProjectVideo } from "./ProjectVideo";
import { Screens, Walkthrough } from "./Modal";

type Filter = "all" | "apps" | "sites";

function AppCard({ a, flip }: { a: App; flip: boolean }) {
  const m = a.media;
  return (
    <article className={`card app${flip ? " flip" : ""}`} id={a.id} aria-labelledby={`${a.id}-t`}>
      <div className="app-media">
        {m.kind === "video" && (
          <div className="browser app-clip" data-cursor={m.kind === "video" ? "Live" : undefined}>
            <div className="bar" aria-hidden="true"><i /><i /><i /><span>{a.name}</span></div>
            <ProjectVideo src={m.src} poster={m.poster} w={m.w} h={m.h} alt={m.alt} />
          </div>
        )}
        {m.kind === "pair" && (
          <div className="pair app-clip">
            <figure><img src={m.a.src} alt={m.a.alt} loading="lazy" decoding="async" /><figcaption>Delivery hiring</figcaption></figure>
            <figure><img src={m.b.src} alt={m.b.alt} loading="lazy" decoding="async" /><figcaption>Construction hiring</figcaption></figure>
          </div>
        )}
        {a.screens && <Screens items={a.screens} title={`${a.name} screens`} />}
      </div>

      <div className="app-body">
        <div className="app-top">
          <span className="app-index" aria-hidden="true">{a.index}</span>
          <span className="app-kicker">{a.kicker}</span>
        </div>
        <h3 id={`${a.id}-t`} className="display" data-split-local>{a.name}</h3>
        <p className="sum">{a.summary}</p>
        <p className="role-line"><b>role</b>{a.role}</p>
        <div className="hl">
          {a.highlights.map((h) => (
            <div key={h.title}><Icon name={h.icon} /><b>{h.title}</b><p>{h.body}</p></div>
          ))}
        </div>
        <ul className="chips" aria-label="Built with">
          {a.stack.map((s) => <li className="chip" key={s}>{s}</li>)}
        </ul>
        {(a.walkthrough || a.note) && (
          <div className="app-foot">
            {a.walkthrough && <Walkthrough src={a.walkthrough.src} poster={a.walkthrough.poster} meta={a.walkthrough.meta} title={`${a.name} walkthrough`} />}
            {a.note && <span className="note">{a.note}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [f, setF] = useState<Filter>("all");
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".app-clip", root.current).forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(12% 8% 12% 8% round 18px)", scale: 0.96 }, { clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 40%", scrub: 0.6 } });
      });
      gsap.utils.toArray<HTMLElement>(".app .hl > div", root.current).forEach((el, i) => {
        gsap.from(el, { y: 24, opacity: 0, duration: 0.7, delay: (i % 2) * 0.08, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    });
    // pinned horizontal gallery for the websites (desktop)
    mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      const pin = root.current?.querySelector<HTMLElement>(".hpin");
      const track = pin?.querySelector<HTMLElement>(".sites");
      if (!pin || !track) return;
      pin.classList.add("h-on");
      const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth);
      const tw = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, start: "top top+=84", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
      const bar = pin.querySelector<HTMLElement>(".hbar i");
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: pin, start: "top top+=84", end: () => "+=" + dist(), scrub: true } });
      return () => { pin.classList.remove("h-on"); tw.scrollTrigger?.kill(); };
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, { scope: root, dependencies: [f], revertOnUpdate: true });
  const tabs: { k: Filter; label: string; n: number }[] = [
    { k: "all", label: "All", n: apps.length + sites.items.length },
    { k: "apps", label: "Web apps", n: apps.length },
    { k: "sites", label: "Websites", n: sites.items.length },
  ];
  return (
    <section className="section" id="projects" aria-labelledby="projects-title" ref={root}>
      <div className="container">
        <div className="sec-head" data-reveal>
          <span className="eyebrow" style={{ ["--i" as string]: 0 }}>01 · projects</span>
          <h2 id="projects-title" className="display" data-split>Things I&apos;ve built</h2>
          <p style={{ ["--i" as string]: 2 }}>Business systems with real users, real money and real records behind them, plus marketing sites built to turn visitors into customers.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Filter projects">
          {tabs.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={f === t.k} onClick={() => setF(t.k)}>
              {t.label}<span>{t.n}</span>
            </button>
          ))}
        </div>

        {f !== "sites" && (
          <div className="group" key={`apps-${f}`}>
            <div className="sub-head"><h3 className="display">Web apps and systems</h3><span>{apps.length} projects</span></div>
            {apps.map((a, i) => <AppCard a={a} key={a.id} flip={i % 2 === 1} />)}
          </div>
        )}

        {f !== "apps" && (
          <div className="group" key={`sites-${f}`}>
           <div className="hpin">
            <div className="sub-head"><h3 className="display">{sites.title}</h3><span>{sites.lede}</span></div>
            <div className="hbar" aria-hidden="true"><i /></div>
            <div className="sites">
              {sites.items.map((s) => (
                <article className="card site" key={s.href}>
                  <a className="browser" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.kind}, ${s.place}: open the live site`} data-cursor="Visit">
                    <div className="bar" aria-hidden="true"><i /><i /><i /><span>{s.href.replace("https://", "")}</span></div>
                    <div className="view"><img src={s.img} alt={s.alt} width={1440} height={900} loading="lazy" decoding="async" /></div>
                  </a>
                  <div className="site-body">
                    <div className="site-top">
                      <span className="place">{s.place}</span>
                      {"badge" in s && s.badge ? <span className="badge-tag">{s.badge}</span> : null}
                    </div>
                    <h4>{s.kind}</h4>
                    <p>{s.body}</p>
                    <div className="site-top">
                      <ul className="chips" aria-label="Built with">{s.stack.map((x) => <li className="chip" key={x}><Tech name={x.replace(/ 16$/, "")} />{x}</li>)}</ul>
                      <a className="link-out" href={s.href} target="_blank" rel="noopener noreferrer">Live site<Icon name="out" /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
           </div>
          </div>
        )}
      </div>
    </section>
  );
}
