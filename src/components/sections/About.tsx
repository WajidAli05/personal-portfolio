import { experience, hero, sections } from "@/lib/content";
import { Icon } from "@/components/icons";
import { ParticlePortrait } from "@/components/webgl/ParticlePortrait";
import { ProofCards } from "./ProofCards";
import { StepFlow } from "./StepFlow";

// Section 1: a short introduction beside the particle portrait, two proof cards,
// and the kinds of work I take on.
export function About() {
  const s = sections.about;
  return (
    <section className="sec" id="about" aria-labelledby="about-title">
      <div className="about">
        <figure className="portrait" data-reveal>
          <ParticlePortrait src="/img/wajid.webp" alt="Wajid Ali, arms crossed, in a navy track jacket" />
          <figcaption>Move your cursor over the portrait</figcaption>
        </figure>
        <div className="about-text" data-reveal>
          <p className="eyebrow"><span>{s.n}</span><span data-scramble>{s.label}</span></p>
          <h2 id="about-title" data-split>{s.title}</h2>
          <p>{hero.lede}</p>
          <p>{experience.bio}</p>
        </div>
      </div>

      <ProofCards />

      <div className="do" data-reveal>
        <h3 className="sub" data-split>{hero.doTitle}</h3>
        <p className="sub-lede">{hero.doLede}</p>
        <ul>
          {hero.doItems.map((d, i) => (
            <li key={d.title}>
              <span className={`do-ico do-ico-${i}`}>
                <Icon name={d.icon} />
                {d.icon === "botmsg" ? <span className="wave" aria-hidden="true"><i /><i /><i /><i /></span> : null}
              </span>
              <div>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
                {"steps" in d && d.steps ? <StepFlow steps={d.steps} /> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
