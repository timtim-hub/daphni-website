import { Reveal } from "../Reveal";
import { Mic, Drama, Flame } from "lucide-react";

const pillars = [
  {
    icon: Mic,
    no: "01",
    title: "Stand-up Comedy",
    body: "Live auf der Bühne — pointiert, direkt, ohne Sicherheitsnetz. Comedy, die nicht nur unterhält, sondern trifft.",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    icon: Flame,
    no: "02",
    title: "Dark Humor",
    body: "Das Unbequeme als Pointe. Themen, über die man eigentlich nicht lacht — bis es befreit.",
    span: "md:col-span-2",
  },
  {
    icon: Drama,
    no: "03",
    title: "Schauspiel",
    body: "Film, Theater und Hörspiel. Von Pulp Fiction bis Comedy-Film — Rollen mit Kante.",
    span: "md:col-span-2",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-px">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="work-heading"
            className="font-display text-h2 leading-[0.95]"
          >
            Was ich <span className="italic text-accent">mache</span>
          </h2>
          <p className="eyebrow">(02) — Disziplinen</p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.span}>
              <article className="group surface flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-500 hover:border-accent/50">
                <div className="flex items-start justify-between">
                  <p.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                  <span className="font-display text-sm text-smoke">{p.no}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl text-bone md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-bone/65">{p.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
