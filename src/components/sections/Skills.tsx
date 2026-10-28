import { sections, skills } from "@/lib/content";
import { Icon, Tech } from "@/components/icons";
import { SecHead } from "@/components/SecHead";

// One row per group: the group name on the left, the tools on the right.
export function Skills() {
  return (
    <section className="sec" id="skills" aria-labelledby="skills-title">
      <SecHead s={sections.skills} id="skills-title" />
      <div className="rows" data-reveal>
        {skills.groups.map((g) => (
          <div className="row" key={g.name}>
            <h3 className="row-key">{g.name}</h3>
            <ul className="chips">
              {g.items.map((s) => <li className="chip" key={s}><Tech name={s} />{s}</li>)}
            </ul>
          </div>
        ))}
        <div className="row">
          <h3 className="row-key">{skills.practicesTitle}</h3>
          <ul className="chips">
            {skills.practices.map((p) => <li className="chip chip-soft" key={p}><Icon name="check" />{p}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
