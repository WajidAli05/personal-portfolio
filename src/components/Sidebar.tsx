"use client";

import { useEffect, useRef, useState } from "react";
import { contact, hero, nav } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { gsap, SplitText, useGSAP, reduced } from "@/lib/gsap";
import { useUI } from "@/lib/store";

// The fixed left column on wide screens (the page intro on phones): who I am, a section
// menu that shows where the reader is, and the ways to get in touch.
export function Sidebar() {
  const root = useRef<HTMLElement>(null);
  const active = useUI((s) => s.active);
  const [clock, setClock] = useState("");
  const B = brand;

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  useGSAP(() => {
    if (reduced()) return;
    const name = SplitText.create(".side-name", { type: "chars", mask: "chars" });
    gsap.from(name.chars, { yPercent: 110, duration: 0.9, stagger: 0.035, ease: "power4.out", delay: 0.05 });
    gsap.fromTo("[data-in]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, animation: "none", duration: 0.9, stagger: 0.07, ease: "power3.out", delay: 0.35 });
    return () => name.revert();
  }, { scope: root });

  return (
    <header className="side" ref={root}>
      <div className="side-in">
        <div className="side-top">
          <h1 className="side-name">{hero.name}</h1>
          <p className="side-role" data-in>{hero.title}</p>
          <p className="side-tag" data-in>{hero.tagline}</p>
          <p className="status" data-in><i aria-hidden="true" />{hero.status}</p>
        </div>

        <nav className="side-nav" aria-label="Sections" data-in>
          <ol>
            {nav.map((n, i) => {
              const id = n.href.slice(1);
              const on = active === id;
              return (
                <li key={n.href}>
                  <a href={n.href} data-sec={id} className={on ? "on" : undefined} aria-current={on ? "true" : undefined}>
                    <span className="sn-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sn-label">{n.label}</span>
                    <span className="sn-bar" aria-hidden="true"><i /></span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="side-foot">
          <div className="side-cta" data-in>
            <a className="btn btn-primary" href={contact.mailto}><Icon name="mail" />{hero.cta}</a>
            <a className="btn btn-quiet" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><B.whatsapp />WhatsApp</a>
          </div>
          <div className="side-meta" data-in>
            <div className="socials">
              <a className="icon-btn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><B.github /></a>
              <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><B.linkedin /></a>
              <a className="icon-btn" href={contact.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork"><B.upwork /></a>
              <a className="icon-btn" href={contact.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><B.scholar /></a>
            </div>
            <p className="clock" title="Local time in Islamabad"><Icon name="pin" />Islamabad <span>{clock}</span></p>
          </div>
        </div>
      </div>
    </header>
  );
}
