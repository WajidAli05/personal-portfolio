import { contact, contactSection, faq, footer } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const B = brand;
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="sec-head" data-reveal>
          <span className="eyebrow" style={{ ["--i" as string]: 0 }}>05 · contact</span>
        </div>
        <div className="contact-wrap">
          <div className="card cta" data-reveal>
            <h2 id="contact-title" className="display" style={{ ["--i" as string]: 0 }}>Tell me what you&apos;re <span className="grad-text">building.</span></h2>
            <p style={{ ["--i" as string]: 1 }}>{contactSection.body}</p>
            <div className="mail-row" style={{ ["--i" as string]: 2 }}>
              <a className="btn btn-primary mail-big" href={contact.mailto}><Icon name="mail" />{contactSection.primary}</a>
              <CopyEmail email={contact.email} label={contactSection.copy} done={contactSection.copied} />
            </div>
            <div className="alt" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-ghost btn-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><B.whatsapp />{contactSection.whatsapp}<span className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{contact.whatsappDisplay}</span></a>
              <a className="btn btn-ghost btn-up" href={contact.upwork} target="_blank" rel="noopener noreferrer"><B.upwork />{contactSection.upwork}</a>
            </div>
          </div>

          <div className="card faq" data-reveal>
            <h3 style={{ ["--i" as string]: 0 }}>{faq.title}</h3>
            <div style={{ ["--i" as string]: 1 }}>
              {faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<Icon name="plus" /></summary>
                  <p className="a">{f.a}</p>
                </details>
              ))}
            </div>
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
    </footer>
  );
}
