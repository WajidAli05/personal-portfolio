/* eslint-disable @next/next/no-img-element */
import { commerce, dentalOS, proof, sites } from "@/lib/content";
import { ScrubFrame } from "@/components/work/ScrubFrame";
import { Walkthrough } from "@/components/work/Walkthrough";
import { ArrowUpRight } from "@/components/icons";
import { Dim } from "@/components/Dim";

export function Proof() {
  return (
    <section className="proof" aria-label="In numbers" data-section="// summary">
      <div className="wrap">
        <div className="proof-grid" data-reveal>
          {proof.map((p, i) => (
            <div key={p.label} style={{ ["--i" as string]: i }}>
              <div className="v">{p.value}</div>
              <div className="l">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseHead({ c }: { c: typeof dentalOS | typeof commerce }) {
  return (
    <div className="case-head" data-reveal>
      <div className="case-index" aria-hidden="true" style={{ ["--i" as string]: 0 }}>{c.index}</div>
      <span className="tag" style={{ ["--i" as string]: 1 }}>{c.tag} · {c.kicker}</span>
      <h3 className="display case-title" style={{ ["--i" as string]: 2 }}>{c.name}</h3>
      <div style={{ ["--i" as string]: 3 }}>
        <p className="lede">{c.lede}</p>
        <div className="case-meta" style={{ marginTop: 16 }}>
          <span><b>role</b>{c.role}</span>
        </div>
      </div>
    </div>
  );
}

function Notes({ notes }: { notes: { tag: string; title: string; body: string }[] }) {
  return (
    <div className="notes" data-reveal>
      {notes.map((n, i) => (
        <div className="note" key={n.title} style={{ ["--i" as string]: i % 4 }}>
          <span className="tag">{n.tag}</span>
          <h4>{n.title}</h4>
          <p>{n.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title" data-section="// summary">
      <div className="wrap">
        <Dim label="Selected work" />
        <div className="sec-head" data-reveal style={{ marginTop: 40 }}>
          <span className="tag" style={{ ["--i" as string]: 0 }}>// summary</span>
          <h2 id="work-title" className="display h2" style={{ ["--i" as string]: 1 }}>Systems people run their business on.</h2>
          <p className="lede" style={{ ["--i" as string]: 2 }}>Two builds with real users, real money and real records behind them. Scroll each recording to see it working.</p>
        </div>

        {/* Case 01 */}
        <article aria-labelledby="dos" data-section="// rationale">
          <span id="dos" className="sr-only">Case study: {dentalOS.name}</span>
          <CaseHead c={dentalOS} />
          <ScrubFrame
            chapters={dentalOS.chapters}
            src="/media/dentalos-scrub.mp4"
            poster="/media/dentalos-poster.webp"
            width={1280}
            height={568}
            label="Dental OS owner dashboard with patients, lab cases and revenue"
          />
          <Notes notes={dentalOS.notes} />
          <div className="screens">
            <h3><span className="tag">// expand</span>{dentalOS.screensTitle}</h3>
            <div className="screen-row" tabIndex={0} aria-label="Dental OS billing screens, scroll sideways">
              {dentalOS.screens.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.alt} width={1280} height={572} loading="lazy" decoding="async" />
                  <figcaption>{s.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="case-foot">
            <div className="chips" aria-label="Built with">{dentalOS.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            <Walkthrough
              src="/media/dentalos-walkthrough.mp4"
              poster="/media/dentalos-walkthrough-poster.jpg"
              label={dentalOS.walkthrough}
              meta={dentalOS.walkthroughMeta}
              title="Dental OS walkthrough"
            />
          </div>
          <p className="data-note" style={{ marginTop: 14 }}>{dentalOS.dataNote}</p>
        </article>

        <div style={{ height: "clamp(96px, 14vw, 180px)" }} />

        {/* Case 02 */}
        <article aria-labelledby="com" data-section="// expand">
          <span id="com" className="sr-only">Case study: {commerce.name}</span>
          <CaseHead c={commerce} />
          <ScrubFrame
            chapters={commerce.chapters}
            src="/media/bluerays-scrub.mp4"
            poster="/media/bluerays-poster.webp"
            width={1260}
            height={464}
            label="Store admin dashboard with sales, orders, sessions and device traffic"
          />
          <Notes notes={commerce.notes} />
          <div className="case-foot">
            <div className="chips" aria-label="Built with">{commerce.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            <span className="data-note">{commerce.dataNote}</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Sites() {
  return (
    <section className="section" id="sites" aria-labelledby="sites-title" data-section="// pointer" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Dim label="Marketing sites" />
        <div className="sec-head" data-reveal style={{ marginTop: 40 }}>
          <span className="tag" style={{ ["--i" as string]: 0 }}>{sites.tag}</span>
          <h2 id="sites-title" className="display h2" style={{ ["--i" as string]: 1 }}>{sites.title}</h2>
          <p className="lede" style={{ ["--i" as string]: 2 }}>{sites.lede}</p>
        </div>
        <div className="sites-grid">
          {sites.items.map((s, i) => (
            <article className="site" key={s.href} data-reveal>
              <a className="fig" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.kind}, ${s.place}: open the live site`} style={{ ["--i" as string]: 0 }}>
                <img src={s.img} alt={s.alt} width={1440} height={900} loading="lazy" decoding="async" />
                <span className="lab">FIG. {String(i + 1).padStart(2, "0")}</span>
              </a>
              <div style={{ ["--i" as string]: 1 }}>
                <div className="place">{s.place}</div>
                <h3 style={{ marginTop: 6 }}>{s.kind}</h3>
              </div>
              <p style={{ ["--i" as string]: 2 }}>{s.body}</p>
              <div className="bottom" style={{ ["--i" as string]: 3 }}>
                <span className="stk">{s.stack}</span>
                <a className="link-arrow" href={s.href} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
