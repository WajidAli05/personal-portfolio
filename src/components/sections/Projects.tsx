"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { apps, sites, type App } from "@/lib/content";
import { Icon, Tech } from "@/components/icons";
import { Holo } from "@/components/fx/Holo";
import { SecHead } from "@/components/SecHead";
import { ProjectVideo } from "./ProjectVideo";
import { Screens, Walkthrough } from "./Modal";

type Filter = "all" | "apps" | "sites";

/** Holographic boot-up: scan line sweeps down revealing the media with a glitch flicker. */
function holoIn(el: HTMLElement) {
  const media = el.querySelector<HTMLElement>(".holo-media");
  const scan = el.querySelector<HTMLElement>(".holo-scan");
  const grid = el.querySelector<HTMLElement>(".holo-grid");
  const corners = el.querySelectorAll<HTMLElement>(".holo-corners i");
  const tag = el.querySelector<HTMLElement>(".holo-tag");
  if (!media || !scan) return gsap.timeline();
  const h = () => el.offsetHeight;
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
  tl.set(scan, { opacity: 1, y: 0 })
    .to(corners, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: "back.out(2)" }, 0)
    .to(grid, { opacity: 0.9, duration: 0.25 }, 0)
    .to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 }, 0.15)
    .to(scan, { y: () => h(), duration: 1.15 }, 0.15)
    // glitch flicker while the signal locks
    .to(media, { keyframes: { opacity: [0.35, 1, 0.55, 1], x: [-6, 4, -2, 0], skewX: [3, -2, 1, 0] }, duration: 0.5, ease: "none" }, 0.2)
    .to(scan, { opacity: 0, duration: 0.3 }, 1.25)
    .to(grid, { opacity: 0, duration: 0.6 }, 1.0);
  if (tag) tl.to(tag, { opacity: 1, duration: 0.01, repeat: 3, yoyo: true, ease: "steps(1)" }, 0.9).set(tag, { opacity: 1 });
  return tl;
}

function AppCard({ a, flip }: { a: App; flip: boolean }) {
  const m = a.media;
  return (
    <article className={`card app${flip ? " flip" : ""}`} id={a.id} aria-labelledby={`${a.id}-t`}>
      <div className="app-media">
        {m.kind === "video" && (
          <Holo label={`REC · ${a.index}`}>
            <div className="browser" data-cursor="Live">
              <div className="bar" aria-hidden="true"><i /><i /><i /><span>{a.name}</span></div>
              <ProjectVideo src={m.src} poster={m.poster} w={m.w} h={m.h} alt={m.alt} />
            </div>
          </Holo>
        )}
        {m.kind === "pair" && (
          <Holo label={`IMG · ${a.index}`}>
            <div className="pair">
              <figure><img src={m.a.src} alt={m.a.alt} loading="lazy" decoding="async" /><figcaption>Delivery hiring</figcaption></figure>
              <figure><img src={m.b.src} alt={m.b.alt} loading="lazy" decoding="async" /><figcaption>Construction hiring</figcaption></figure>
            </div>
          </Holo>
        )}
        {a.screens && <Screens items={a.screens} title={`${a.name} screens`} />}
      </div>

      <div className="app-body">
        <div className="app-top">
          <span className="app-index" aria-hidden="true">{a.index}</span>
          <span className="app-kicker">{a.kicker}</span>
        </div>
        <h3 id={`${a.id}-t`} className="display">{a.name}</h3>
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
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1000px)" }, (ctx) => {
      const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
      if (!motion) return;
      const scope = root.current!;

      // prime every holo frame (hidden until its scan runs)
      gsap.utils.toArray<HTMLElement>(".holo", scope).forEach((el) => {
        gsap.set(el.querySelector(".holo-media"), { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(el.querySelectorAll(".holo-corners i"), { opacity: 0, scale: 1.6 });
        gsap.set(el.querySelector(".holo-tag"), { opacity: 0 });
      });

      // web app cards: boot up as they scroll in
      gsap.utils.toArray<HTMLElement>(".app .holo", scope).forEach((el) => {
        const tl = holoIn(el);
        ScrollTrigger.create({ trigger: el, start: "top 82%", once: true, onEnter: () => tl.play() });
      });
      gsap.utils.toArray<HTMLElement>(".app .hl > div", scope).forEach((el, i) => {
        gsap.from(el, { y: 24, opacity: 0, duration: 0.7, delay: (i % 2) * 0.08, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      // websites: pinned horizontal track on wide screens, each frame boots as it slides in
      const pin = scope.querySelector<HTMLElement>(".hpin");
      const track = pin?.querySelector<HTMLElement>(".sites");
      const siteHolos = gsap.utils.toArray<HTMLElement>(".site .holo", scope);
      if (wide && pin && track) {
        pin.classList.add("h-on");
        const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth);
        const tw = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, start: "top top+=96", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
        const bar = pin.querySelector<HTMLElement>(".hbar i");
        if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: pin, start: "top top+=96", end: () => "+=" + dist(), scrub: true } });
        siteHolos.forEach((el, i) => {
          const tl = holoIn(el);
          if (i < 2) ScrollTrigger.create({ trigger: pin, start: "top 70%", once: true, onEnter: () => tl.delay(i * 0.2).play() });
          else ScrollTrigger.create({ trigger: el, containerAnimation: tw, start: "left 92%", once: true, onEnter: () => tl.play() });
        });
        return () => { pin.classList.remove("h-on"); };
      }
      siteHolos.forEach((el) => {
        const tl = holoIn(el);
        ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => tl.play() });
      });
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
        <SecHead n="01" label="projects" id="projects-title" title={<>Things I&apos;ve built</>}
          lede="Business systems with real users, real money and real records behind them, plus marketing sites built to turn visitors into customers." />

        <div className="tabs" role="tablist" aria-label="Filter projects">
          {tabs.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={f === t.k} onClick={() => setF(t.k)}>
              {t.label}<span>{t.n}</span>
            </button>
          ))}
        </div>

        {f !== "sites" && (
          <div className="group" key={`apps-${f}`}>
            <div className="sub-head"><h3 className="display">Web apps and systems</h3><span className="mono">{apps.length} projects</span></div>
            {apps.map((a, i) => <AppCard a={a} key={a.id} flip={i % 2 === 1} />)}
          </div>
        )}

        {f !== "apps" && (
          <div className="group" key={`sites-${f}`}>
            <div className="hpin">
              <div className="sub-head"><h3 className="display">{sites.title}</h3><span className="mono">{sites.lede}</span></div>
              <div className="hbar" aria-hidden="true"><i /></div>
              <div className="sites">
                {sites.items.map((s, i) => (
                  <article className="card site" key={s.href}>
                    <Holo label={`SITE · 0${i + 1}`}>
                      <a className="browser" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.kind}, ${s.place}: open the live site`} data-cursor="Visit">
                        <div className="bar" aria-hidden="true"><i /><i /><i /><span>{s.href.replace("https://", "")}</span></div>
                        <div className="view"><img src={s.img} alt={s.alt} width={1440} height={900} loading="lazy" decoding="async" /></div>
                      </a>
                    </Holo>
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
