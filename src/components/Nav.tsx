"use client";

import { useEffect, useRef, useState } from "react";
import { contact, nav } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { ThemeToggle } from "@/components/fx/ThemeToggle";

// Floating glass capsule: monogram, links with a sliding indicator, a live
// Islamabad clock, theme switch and the email button. Hides on scroll down,
// returns on scroll up; a progress line runs along its base.
export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [clock, setClock] = useState("");
  const shell = useRef<HTMLDivElement>(null);
  const links = useRef<HTMLElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const prog = useRef<HTMLElement>(null);
  const B = brand;

  // scroll: hide/show + progress
  useEffect(() => {
    let lastY = window.scrollY, raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        prog.current?.style.setProperty("--p", String(Math.min(1, y / max)));
        shell.current?.classList.toggle("is-scrolled", y > 24);
        if (Math.abs(y - lastY) > 6) { setHidden(y > lastY && y > 320); lastY = y; }
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", esc); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // active section
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    nav.forEach((n) => { const el = document.querySelector(n.href); if (el) io.observe(el); });
    const top = document.querySelector("#top");
    const ioTop = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(""); }, { rootMargin: "-10% 0px -80% 0px" });
    if (top) ioTop.observe(top);
    return () => { io.disconnect(); ioTop.disconnect(); };
  }, []);

  // live Islamabad clock
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  // sliding indicator follows hover, rests on the active link
  const place = (el: HTMLElement | null) => {
    const i = ind.current, wrap = links.current;
    if (!i || !wrap) return;
    if (!el) { i.style.opacity = "0"; return; }
    const a = el.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    i.style.opacity = "1";
    i.style.setProperty("--x", `${a.left - w.left}px`);
    i.style.setProperty("--w", `${a.width}px`);
  };
  const toActive = () => place(links.current?.querySelector<HTMLElement>("a.active") ?? null);
  useEffect(() => { toActive(); }, [active]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-locked", open);
  }, [open]);

  return (
    <>
      <header className={`nav${hidden && !open ? " is-hidden" : ""}`}>
        <div className="nav-shell" ref={shell}>
          <a className="nav-mark" href="#top" aria-label="Back to top" onClick={() => setOpen(false)}>
            <span aria-hidden="true">WA</span>
          </a>
          <nav className="nav-links" aria-label="Main" ref={links} onMouseLeave={toActive}>
            <span className="nav-ind" ref={ind} aria-hidden="true" />
            {nav.map((n, i) => (
              <a key={n.href} href={n.href} className={active === n.href ? "active" : undefined} onMouseEnter={(e) => place(e.currentTarget)} onFocus={(e) => place(e.currentTarget)}>
                <small aria-hidden="true">{String(i + 1).padStart(2, "0")}</small>{n.label}
              </a>
            ))}
          </nav>
          <div className="nav-tools">
            <span className="nav-clock mono" title="Local time in Islamabad"><i aria-hidden="true" />ISB {clock}</span>
            <ThemeToggle />
            <a className="btn btn-primary btn-sm nav-cta" href={contact.mailto}><Icon name="mail" />Email me</a>
            <button type="button" className="menu-btn" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
              <span className={open ? "x" : undefined} aria-hidden="true"><i /><i /></span>
            </button>
          </div>
          <i className="nav-progress" ref={prog} aria-hidden="true" />
        </div>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ ["--i" as string]: i }}>
              <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
            </a>
          ))}
        </nav>
        <div className="menu-foot" style={{ ["--i" as string]: nav.length }}>
          <a className="btn btn-primary" href={contact.mailto} onClick={() => setOpen(false)}><Icon name="mail" />Email me</a>
          <div className="socials">
            <a className="icon-btn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><B.github /></a>
            <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><B.linkedin /></a>
            <a className="icon-btn" href={contact.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork"><B.upwork /></a>
            <a className="icon-btn" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><B.whatsapp /></a>
          </div>
        </div>
      </div>
    </>
  );
}
