"use client";

import { useRef } from "react";
import { contact, hero } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { ParticlePortrait } from "@/components/webgl/ParticlePortrait";
import { gsap, SplitText, useGSAP, reduced } from "@/lib/gsap";
import { useUI } from "@/lib/store";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const introDone = useUI((s) => s.introDone);
  const B = brand;

  useGSAP(() => {
    if (!introDone) return;
    const q = gsap.utils.selector(root);
    if (reduced()) { gsap.set(q("[data-intro]"), { opacity: 1 }); return; }
    const h1 = q(".hero-name")[0] as HTMLElement;
    const split = SplitText.create(h1, { type: "chars", charsClass: "ch" });
    // one continuous gradient across the split letters
    h1.classList.remove("grad-text");
    const paint = () => { const w = h1.offsetWidth, hh = h1.offsetHeight; (split.chars as HTMLElement[]).forEach((c) => { c.style.backgroundSize = w + "px " + hh + "px"; c.style.backgroundPosition = -c.offsetLeft + "px " + -c.offsetTop + "px"; }); };
    paint();
    window.addEventListener("resize", paint);
    gsap.set(q("[data-intro]"), { opacity: 1, animation: "none" });
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(split.chars, { yPercent: 120, rotate: 6, opacity: 0, duration: 1.1, stagger: 0.045 }, 0)
      .from(q(".intro-fade"), { y: 26, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.25)
      .from(q(".hero-visual"), { scale: 0.92, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.1)
      .from(q(".stats > div"), { y: 30, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.6);

    // count-ups
    q("[data-count]").forEach((el: Element) => {
      const end = Number(el.getAttribute("data-count"));
      const suf = el.getAttribute("data-suffix") ?? "";
      if (!end) { gsap.to(el, { duration: 1.4, delay: 0.9, scrambleText: { text: el.textContent ?? "", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", speed: 0.5 } }); return; }
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.8, delay: 0.8, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + suf; } });
    });

    // rotating "I build ..." line
    const words = hero.builds;
    const cycle = gsap.timeline({ repeat: -1, delay: 2.2 });
    words.forEach((_, k) => {
      cycle.to(typed.current, { duration: 1.1, scrambleText: { text: words[(k + 1) % words.length], chars: "lowerCase", speed: 0.6, revealDelay: 0.2 } }, `+=2.2`);
    });
    return () => { window.removeEventListener("resize", paint); split.revert(); h1.classList.add("grad-text"); cycle.kill(); };
  }, { scope: root, dependencies: [introDone] });

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-name">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="status intro-fade" data-intro><i aria-hidden="true" />{hero.status}</span>
            <h1 id="hero-name" className="display hero-name grad-text" data-intro>{hero.name}</h1>
            <p className="role intro-fade" data-intro>
              {hero.role}.<br />
              <span className="build">I build <span className="typed" ref={typed}>{hero.builds[0]}</span><span className="caret" aria-hidden="true" /></span>
            </p>
            <p className="hero-lede intro-fade" data-intro>{hero.lede}</p>
            <div className="hero-meta intro-fade" data-intro>
              <span><Icon name="pin" />{hero.location}</span>
              <span><Icon name="globe" />{hero.reach}</span>
            </div>
            <div className="hero-actions intro-fade" data-intro>
              <a className="btn btn-primary" href={contact.mailto} data-magnetic><Icon name="mail" />{hero.cta}</a>
              <a className="btn btn-ghost" href="#projects" data-magnetic>{hero.secondary}<Icon name="arrow" className="go" /></a>
              <div className="socials">
                <a className="icon-btn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-magnetic><B.github /></a>
                <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-magnetic><B.linkedin /></a>
                <a className="icon-btn" href={contact.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork" data-magnetic><B.upwork /></a>
                <a className="icon-btn" href={contact.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" data-magnetic><B.scholar /></a>
              </div>
            </div>
          </div>

          <div className="hero-visual" data-intro>
            <div className="hv-glow" aria-hidden="true" />
            <div className="hv-ring" aria-hidden="true" />
            <ParticlePortrait src="/img/wajid.webp" alt="Wajid Ali, arms crossed, in a navy track jacket" />
            <div className="hv-chip hv-chip-a"><Icon name="badge" /><span><b>IEEE published</b><small>NLBSE &apos;25 · ICSE</small></span></div>
            <div className="hv-chip hv-chip-b mono" aria-hidden="true"><Icon name="pointer" />move your cursor</div>
          </div>
        </div>

        <div className="card stats" data-intro>
          {hero.stats.map((s) => (
            <div key={s.label}>
              <div className="v grad-text" data-count={s.count} data-suffix={s.suffix}>{s.value}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="do">
          <div className="sub-head"><h2 className="display" data-split>{hero.doTitle}</h2></div>
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
      <a className="scroll-cue" href="#projects" aria-label="Scroll to projects"><span className="mono">scroll</span><i aria-hidden="true" /></a>
    </section>
  );
}
