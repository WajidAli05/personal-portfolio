"use client";

import { useEffect } from "react";
import { contact, nav } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { useUI } from "@/lib/store";

// Phones and tablets: a slim top bar that always says which section you are in,
// with a simple full-screen menu.
export function MobileBar() {
  const active = useUI((s) => s.active);
  const open = useUI((s) => s.menu);
  const setOpen = useUI((s) => s.setMenu);
  const B = brand;
  const idx = Math.max(0, nav.findIndex((n) => n.href === "#" + active));
  const current = nav[idx];

  useEffect(() => {
    document.documentElement.classList.toggle("menu-locked", open);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setOpen]);

  return (
    <>
      <div className="mbar">
        <a className="mbar-mark" href="#about" aria-label="Back to top" onClick={() => setOpen(false)}>WA</a>
        <p className="mbar-now" aria-live="polite"><span>{String(idx + 1).padStart(2, "0")}</span>{current.label}</p>
        <a className="btn btn-primary btn-sm" href={contact.mailto}><Icon name="mail" />Email</a>
        <button type="button" className="mbar-menu" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>

      <div id="menu" className={`sheet${open ? " is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="Sections, mobile">
          <ol>
            {nav.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} className={active === n.href.slice(1) ? "on" : undefined} onClick={() => setOpen(false)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>{n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="sheet-foot">
          <a className="btn btn-primary" href={contact.mailto} onClick={() => setOpen(false)}><Icon name="mail" />Email me</a>
          <a className="btn btn-quiet" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><B.whatsapp />WhatsApp</a>
        </div>
      </div>
    </>
  );
}
