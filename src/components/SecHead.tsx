// One heading pattern for every section: a small numbered label, a plain title, a one-line lede.
export function SecHead({ s, id }: { s: { n: string; label: string; title: string; lede?: string }; id: string }) {
  return (
    <div className="sec-head" data-reveal>
      <p className="eyebrow"><span>{s.n}</span>{s.label}</p>
      <h2 id={id}>{s.title}</h2>
      {s.lede ? <p className="lede">{s.lede}</p> : null}
    </div>
  );
}
