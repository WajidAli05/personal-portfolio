import { cities, contact, contactSection, faq, footer, sections } from "@/lib/content";
import { Icon, brand } from "@/components/icons";
import { Globe } from "@/components/webgl/Globe";
import { CopyEmail } from "./CopyEmail";
import { SecHead } from "@/components/SecHead";

export function Contact() {
  const B = brand;
  return (
    <section className="sec" id="contact" aria-labelledby="contact-title">
      <SecHead s={sections.contact} id="contact-title" />

      <div className="contact" data-reveal>
        <div className="contact-copy">
          <a className="mail-big" href={contact.mailto}>{contact.email}<Icon name="out" /></a>
          <div className="contact-actions">
            <a className="btn btn-primary" href={contact.mailto}><Icon name="mail" />{contactSection.primary}</a>
            <CopyEmail email={contact.email} label={contactSection.copy} done={contactSection.copied} />
          </div>
          <ul className="contact-alt">
            <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><B.whatsapp />WhatsApp<span>{contact.whatsappDisplay}</span></a></li>
            <li><a href={contact.upwork} target="_blank" rel="noopener noreferrer"><B.upwork />{contactSection.upwork}<span>Upwork profile</span></a></li>
            <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><B.linkedin />LinkedIn<span>Wajid Ali</span></a></li>
          </ul>
          <p className="tz"><Icon name="pin" />Islamabad, PKT (UTC+5). Clients in Pakistan, the US, Australia and Qatar.</p>
        </div>
        <div className="contact-globe">
          <Globe cities={cities} />
          <ul className="legend">
            {cities.map((c) => (
              <li key={c.name} className={c.home ? "home" : undefined}><i aria-hidden="true" />{c.name}{c.home ? <small>home</small> : null}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="faq" data-reveal>
        <h3 className="sub">{faq.title}</h3>
        {faq.items.map((f) => (
          <details key={f.q} name="faq">
            <summary><span>{f.q}</span><Icon name="plus" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>{footer.line} © {new Date().getFullYear()}</p>
      <p className="small">{footer.note}</p>
      <a className="link" href="#about">Back to top<Icon name="arrow" className="up" /></a>
    </footer>
  );
}
