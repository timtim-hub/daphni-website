import { Reveal, RevealText } from "../Reveal";
import Marquee from "../Marquee";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="eyebrow">(01) — Über mich</p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <h2
              id="about-heading"
              className="font-display text-display leading-[0.95]"
            >
              <RevealText text="Stand-up-Comedienne &" />
              <br />
              <RevealText
                text="Schauspielerin aus Köln."
                delay={0.1}
                className="text-outline"
              />
            </h2>

            <div className="mt-12 grid gap-8 text-lead text-bone/80 md:grid-cols-2">
              <Reveal delay={0.1}>
                <p>
                  Ich bewege mich zwischen zwei Welten — mal gnadenlos direkt auf der
                  Comedy-Bühne, mal in verschiedenen Rollen auf Theater- und Filmsets.
                  Mein Humor ist dunkel, scharf und unbequem: Ich gehe genau dorthin,
                  wo es weh tut, und verwandle es in befreiendes Lachen.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Zuhause bin ich in <span className="text-bone">Köln</span> — auf der
                  Bühne stehe ich u.&nbsp;a. in{" "}
                  <span className="text-bone">Düsseldorf</span>,{" "}
                  <span className="text-bone">Berlin</span> und{" "}
                  <span className="text-accent">deutschlandweit</span>. Wo ich als
                  Nächstes auftrete, steht immer tagesaktuell auf Instagram.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <ul className="mt-12 flex flex-wrap gap-3">
                {["Stand-up Comedy", "Dark Humor", "Schauspiel", "Köln", "Tour"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-bone/15 px-5 py-2 text-sm text-bone/70"
                    >
                      {tag}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-24 border-y border-bone/10 py-6">
        <Marquee
          items={[
            "Comedienne",
            "Köln",
            "Düsseldorf",
            "Berlin",
            "Deutschlandweit",
            "Dark Humor",
          ]}
        />
      </div>
    </section>
  );
}
