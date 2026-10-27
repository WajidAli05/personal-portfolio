"use client";

import { useEffect, useState } from "react";
import { contact, nav } from "@/lib/content";
import { Icon } from "@/components/icons";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = false;
    const on = () => {
      const s = window.scrollY > 24;
      if (s !== last) { last = s; setScrolled(s); }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);

    // highlight the section in view
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    nav.forEach((n) => { const el = document.querySelector(n.href); if (el) io.observe(el); });

    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", esc); io.disconnect(); };
  }, []);

  return (
    <div className={open ? "menu-open" : undefined}>
      <header className={`nav${scrolled || open ? " scrolled" : ""}`}>
        <div className="container">
          <a className="brand" href="#top" aria-label="Wajid Ali, back to top" onClick={() => setOpen(false)}>
            <span className="mark" aria-hidden="true">WA</span>Wajid Ali
          </a>
          <nav className="nav-links" aria-label="Main">
            {nav.map((n) => <a key={n.href} href={n.href} className={active === n.href ? "active" : undefined}>{n.label}</a>)}
          </nav>
          <a className="btn btn-primary btn-sm nav-cta" href={contact.mailto}><Icon name="mail" />Email me</a>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </header>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" inert={!open}>
        {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a className="btn btn-primary" href={contact.mailto} onClick={() => setOpen(false)}><Icon name="mail" />Email me</a>
      </nav>
    </div>
  );
}
