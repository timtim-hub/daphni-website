import { Reveal } from "../Reveal";
import { Mic, Drama, Flame } from "lucide-react";
import WorkMedia from "../work/WorkMedia";

const pillars = [
  {
    icon: Mic,
    no: "01",
    title: "Stand-up Comedy",
    body: "Live auf der Bühne — pointiert, direkt, ohne Sicherheitsnetz. Comedy, die nicht nur unterhält, sondern trifft.",
    span: "md:col-span-3 md:row-span-2",
    video: "/media/work/standup.mp4",
    poster: "/media/work/standup.jpg",
    position: "center 26%",
  },
  {
    icon: Flame,
    no: "02",
    title: "Dark Humor",
    body: "Das Unbequeme als Pointe. Themen, über die man eigentlich nicht lacht — bis es befreit.",
    span: "md:col-span-2",
    video: "/media/work/dark.mp4",
    poster: "/media/work/dark.jpg",
    position: "center 28%",
  },
  {
    icon: Drama,
    no: "03",
    title: "Schauspiel",
    body: "Film, Theater und Hörspiel. Von Pulp Fiction bis Comedy-Film — Rollen mit Kante.",
    span: "md:col-span-2",
    video: "/media/work/acting.mp4",
    poster: "/media/work/acting.jpg",
    position: "center 16%",
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
              <article className="group surface relative flex h-full min-h-[260px] flex-col justify-between gap-10 overflow-hidden p-8 transition-colors duration-500 hover:border-accent/50">
                {/* background clip (short, muted, looping) */}
                <WorkMedia
                  src={p.video}
                  poster={p.poster}
                  position={p.position}
                  alt={`Daphni Georoglidis — ${p.title}`}
                />
                {/* legibility overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--ink) 8%, color-mix(in oklab, var(--ink) 78%, transparent) 42%, color-mix(in oklab, var(--ink) 35%, transparent) 100%)",
                  }}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 backdrop-blur-sm">
                    <p.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm text-bone/70">{p.no}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-3xl text-bone md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/70 md:text-base">
                    {p.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
