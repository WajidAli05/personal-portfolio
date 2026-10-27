/* eslint-disable @next/next/no-img-element */
import { about, contact, contactSection, faq, footer, services } from "@/lib/content";
import { Dim } from "@/components/Dim";
import { Arrow, ArrowUpRight, Play } from "@/components/icons";
import { CopyEmail } from "./CopyEmail";

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="svc-title" data-section="// usage">
      <div className="wrap">
        <Dim label="Services" />
        <div className="sec-head" data-reveal style={{ marginTop: 40 }}>
          <span className="tag" style={{ ["--i" as string]: 0 }}>{services.tag}</span>
          <h2 id="svc-title" className="display h2" style={{ ["--i" as string]: 1 }}>{services.title}</h2>
        </div>
        <div className="svc">
          {services.items.map((s) => (
            <div className="svc-row" key={s.n} data-reveal>
              <div className="n" aria-hidden="true" style={{ ["--i" as string]: 0 }}>{s.n}</div>
              <h3 className="display" style={{ ["--i" as string]: 1 }}>{s.title}</h3>
              <div style={{ ["--i" as string]: 2 }}>
                <p>{s.body}</p>
                <p className="fits">{"// "}{s.fits}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title" data-section="// ownership">
      <div className="wrap">
        <Dim label="About" />
        <div className="about" style={{ marginTop: 48 }}>
          <figure className="portrait" data-reveal>
            <div className="plate" style={{ ["--i" as string]: 0 }}>
              <img src="/img/wajid.webp" alt="Wajid Ali, arms crossed, in a navy track jacket" width={874} height={1142} loading="lazy" decoding="async" />
            </div>
            <span className="dimv" aria-hidden="true"><span>FIG. A · THE ENGINEER</span></span>
            <figcaption style={{ ["--i" as string]: 1 }}><span>Wajid Ali</span><span>Islamabad</span></figcaption>
          </figure>

          <div>
            <div className="sec-head" data-reveal style={{ marginBottom: 28 }}>
              <span className="tag" style={{ ["--i" as string]: 0 }}>{about.tag}</span>
              <h2 id="about-title" className="display h2" style={{ ["--i" as string]: 1 }}>{about.title}</h2>
            </div>
            <div className="about-copy" data-reveal>
              {about.body.map((p, i) => <p key={i} style={{ ["--i" as string]: i }}>{p}</p>)}
            </div>
            <dl className="facts" data-reveal>
              {about.facts.map((f, i) => (
                <div key={f.label} style={{ ["--i" as string]: i }}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>

            <div className="timeline" data-reveal>
              {about.timeline.map((t, i) => (
                <div className="tl" key={t.what} style={{ ["--i" as string]: i }}>
                  <div className="when">{t.when}</div>
                  <div>
                    <h4>{t.what}</h4>
                    <div className="where">{t.where}</div>
                    <p>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a className="talk" href={about.talk.href} target="_blank" rel="noopener noreferrer">
              <span className="play" aria-hidden="true"><Play /></span>
              <span>
                <small>{about.talk.label}</small>
                <b>{about.talk.title}</b>
                <span className="d">{about.talk.body}</span>
              </span>
            </a>

            <div className="skills" data-reveal>
              <h3 style={{ ["--i" as string]: 0 }}>{about.skillsTitle}</h3>
              <dl style={{ display: "grid", gap: 14 }}>
                {about.skills.map((s, i) => (
                  <div className="skill-row" key={s.group} style={{ ["--i" as string]: i + 1 }}>
                    <dt>{s.group}</dt>
                    <dd className="chips">{s.items.map((x) => <span className="chip" key={x}>{x}</span>)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title" data-section="// rationale" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Dim label="Questions" />
        <div className="sec-head" data-reveal style={{ marginTop: 40 }}>
          <span className="tag" style={{ ["--i" as string]: 0 }}>{faq.tag}</span>
          <h2 id="faq-title" className="display h2" style={{ ["--i" as string]: 1 }}>{faq.title}</h2>
        </div>
        <div className="faq">
          {faq.items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
              <p className="a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title" data-section="// ownership">
      <div className="wrap">
        <Dim label="Contact" />
        <div data-reveal style={{ marginTop: 48 }}>
          <span className="tag" style={{ ["--i" as string]: 0 }}>{contactSection.tag}</span>
          <h2 id="contact-title" className="display contact-title" style={{ ["--i" as string]: 1, marginTop: 18 }}>{contactSection.title}</h2>
          <p className="contact-body" style={{ ["--i" as string]: 2 }}>{contactSection.body}</p>
          <div className="mailbox" style={{ ["--i" as string]: 3 }}>
            <a className="btn btn-primary mail-big pulse-ring" href={contact.mailto}>{contactSection.primary}<Arrow /></a>
            <CopyEmail email={contact.email} label={contactSection.copy} done={contactSection.copied} />
          </div>
          <div className="alt" style={{ ["--i" as string]: 4 }}>
            <a className="btn btn-ghost" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">{contactSection.whatsapp} <span className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{contact.whatsappDisplay}</span></a>
            <a className="btn btn-ghost" href={contact.upwork} target="_blank" rel="noopener noreferrer">{contactSection.upwork}<ArrowUpRight /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <div>{footer.line}</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>{footer.note}</div>
        </div>
        <nav className="links" aria-label="Elsewhere">
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={contact.upwork} target="_blank" rel="noopener noreferrer">Upwork</a>
          <a href={contact.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
