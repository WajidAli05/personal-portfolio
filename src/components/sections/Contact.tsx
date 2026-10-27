import { cities, contact, contactSection, faq, footer } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { Globe } from "@/components/webgl/Globe";
import { CopyEmail } from "./CopyEmail";
import { SecHead } from "@/components/SecHead";

export function Contact() {
  const B = brand;
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SecHead n="05" label="contact" id="contact-title" title={<>Tell me what you&apos;re <span className="grad-text">building.</span></>} lede={contactSection.body} />
        <div className="card cta">
          <div className="cta-copy" data-reveal>
            <p className="cta-kicker mono" style={{ ["--i" as string]: 0 }}><i aria-hidden="true" />Islamabad · PKT (UTC+5) · clients in 4 countries</p>
            <h3 className="display cta-title" style={{ ["--i" as string]: 1 }}>Start a conversation</h3>
            <div className="mail-row" style={{ ["--i" as string]: 2 }}>
              <a className="btn btn-primary mail-big" href={contact.mailto} data-magnetic><Icon name="mail" />{contactSection.primary}</a>
              <CopyEmail email={contact.email} label={contactSection.copy} done={contactSection.copied} />
            </div>
            <div className="alt" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-ghost btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><B.whatsapp />{contactSection.whatsapp}<span className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{contact.whatsappDisplay}</span></a>
              <a className="btn btn-ghost btn-up" href={contact.upwork} target="_blank" rel="noopener noreferrer"><B.upwork />{contactSection.upwork}</a>
            </div>
          </div>
          <div className="cta-globe">
            <Globe cities={cities} />
            <ul className="legend">
              {cities.map((c) => (
                <li key={c.name} className={c.home ? "home" : undefined}><i aria-hidden="true" />{c.name}{c.home ? <small>home base</small> : null}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card faq" data-reveal>
          <h3 style={{ ["--i" as string]: 0 }}>{faq.title}</h3>
          <div className="faq-grid" style={{ ["--i" as string]: 1 }}>
            {faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Icon name="plus" /></summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const B = brand;
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-big display" aria-hidden="true">Wajid Ali</div>
        <div className="foot-row">
          <div>
            <div>{footer.line} © {new Date().getFullYear()}</div>
            <div className="small">{footer.note}</div>
          </div>
          <div className="socials">
            <a className="icon-btn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><B.github /></a>
            <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><B.linkedin /></a>
            <a className="icon-btn" href={contact.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork"><B.upwork /></a>
            <a className="icon-btn" href={contact.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><B.scholar /></a>
            <a className="icon-btn" href="#top" aria-label="Back to top"><Icon name="arrow" className="up" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
