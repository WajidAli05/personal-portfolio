// One heading pattern for every section: a rule whose accent bar draws in, a large outlined
// section number, a small label that scrambles in, a title whose words rise, and a one-line lede.
export function SecHead({ s, id }: { s: { n: string; label: string; title: string; lede?: string }; id: string }) {
  return (
    <div className="sec-head" data-reveal>
      <span className="sec-rule" aria-hidden="true"><i /></span>
      <span className="sec-num" aria-hidden="true">{s.n}</span>
      <p className="eyebrow"><span>{s.n}</span><span data-scramble>{s.label}</span></p>
      <h2 id={id} data-split>{s.title}</h2>
      {s.lede ? <p className="lede">{s.lede}</p> : null}
    </div>
  );
}
