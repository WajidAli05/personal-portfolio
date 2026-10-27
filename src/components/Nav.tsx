"use client";

import { useEffect, useState } from "react";
import { contact, nav } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", esc); };
  }, []);

  return (
    <div className={open ? "menu-open" : undefined}>
      <header className={`nav${scrolled || open ? " scrolled" : ""}`}>
        <div className="wrap">
          <a className="brand" href="#top" aria-label="Wajid Ali, back to top" onClick={() => setOpen(false)}>
            <span className="slash" aria-hidden="true">{"//"}</span>Wajid Ali
          </a>
          <nav className="nav-links" aria-label="Main">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <a className="btn btn-primary btn-sm nav-cta" href={contact.mailto}>Email me</a>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <span />
          </button>
        </div>
      </header>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" inert={!open}>
        {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a className="btn btn-primary" href={contact.mailto} onClick={() => setOpen(false)}>Email me</a>
      </nav>
    </div>
  );
}
