import { Reveal } from "../Reveal";
import { acting, training } from "@/lib/site";

export default function Acting() {
  return (
    <section
      id="acting"
      aria-labelledby="acting-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-px">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="acting-heading"
            className="font-display text-h2 leading-[0.95]"
          >
            Film &amp; <span className="italic text-accent">Theater</span>
          </h2>
          <p className="eyebrow">(03) — Schauspiel-Vita</p>
        </div>

        {/* Credits list — editorial table */}
        <ul className="border-t border-bone/15">
          {acting.map((c, i) => (
            <Reveal key={`${c.title}-${i}`} delay={i * 0.05}>
              <li className="group grid grid-cols-12 items-baseline gap-2 border-b border-bone/15 py-6 transition-colors hover:bg-bone/[0.02] md:py-8">
                <span className="col-span-3 font-display text-2xl text-smoke md:col-span-2 md:text-3xl">
                  {c.year}
                </span>
                <span className="col-span-9 font-display text-2xl text-bone transition-colors group-hover:text-accent md:col-span-5 md:text-4xl">
                  {c.title}
                </span>
                <span className="col-span-6 col-start-4 text-sm text-bone/60 md:col-span-3 md:col-start-auto md:text-base">
                  Rolle: <span className="text-bone/90">{c.role}</span>
                </span>
                <span className="col-span-6 text-right text-xs uppercase tracking-widest text-smoke md:col-span-2">
                  {c.type}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Training */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {training.map((t) => (
              <div key={t.title} className="surface flex items-baseline justify-between p-6">
                <div>
                  <p className="font-display text-xl text-bone">{t.title}</p>
                  <p className="text-sm text-bone/60">mit {t.instructor}</p>
                </div>
                <span className="font-display text-lg text-accent">{t.year}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
