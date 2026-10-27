import { skills } from "@/lib/content";
import { Icon, Tech, tech } from "@/components/icons";

const groupIcon: Record<string, string> = {
  "Frontend": "sites",
  "Backend": "backend",
  "Databases": "db",
  "AI and research": "brain",
  "Tools and hosting": "tools",
};

export function Skills() {
  const logos = skills.groups.flatMap((g) => g.items).filter((n) => tech[n] && !["REST APIs", "BERT models", "NLP", "Zustand"].includes(n));
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="sec-head" data-reveal>
          <span className="eyebrow" style={{ ["--i" as string]: 0 }}>03 · skills</span>
          <h2 id="skills-title" className="display" data-split>{skills.title}</h2>
          <p style={{ ["--i" as string]: 2 }}>{skills.lede}</p>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...logos, ...logos].map((n, i) => <span className="logo" key={i}><Tech name={n} />{n}</span>)}
        </div>
      </div>

      <div className="container">
        <div className="skill-grid" data-reveal>
          {skills.groups.map((g, gi) => (
            <article className="card skill-card" key={g.name} style={{ ["--i" as string]: gi }}>
              <h3><Icon name={groupIcon[g.name] ?? "code"} />{g.name}</h3>
              <ul>
                {g.items.map((s) => <li className="skill" key={s}><Tech name={s} />{s}</li>)}
              </ul>
            </article>
          ))}
          <article className="card skill-card" style={{ ["--i" as string]: skills.groups.length }}>
            <h3><Icon name="shield" />{skills.practicesTitle}</h3>
            <ul>
              {skills.practices.map((p) => <li className="skill" key={p}><Icon name="check" className="" />{p}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
