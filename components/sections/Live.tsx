import { Reveal, RevealText } from "../Reveal";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import Magnetic from "../Magnetic";
import FeaturedReel from "../reels/FeaturedReel";
import ReelWall from "../reels/ReelWall";

export default function Live() {
  return (
    <section
      id="live"
      aria-labelledby="live-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-px">
        <div className="surface relative overflow-hidden p-8 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,46,18,0.18), transparent 70%)" }}
          />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">(04) — Live &amp; Termine</p>
              <h2
                id="live-heading"
                className="mt-6 font-display text-display leading-[0.9]"
              >
                <RevealText text="Termine" />
                <br />
                <RevealText text="immer auf" delay={0.08} className="text-outline italic" />
                <br />
                <RevealText text="Instagram." delay={0.16} className="text-accent" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-lead text-bone/75">
                  Kein veraltetes Tour-Archiv — alle aktuellen Auftritte, Tickets und
                  Spontan-Gigs gibt es tagesaktuell auf meinem Instagram. Folge mir,
                  damit du keine Show verpasst.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Magnetic className="mt-10 inline-block">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-bone"
                  >
                    {site.instagramHandle} folgen
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <FeaturedReel />
            </Reveal>
          </div>

          {/* Native reel wall — self-hosted, no Instagram iframe */}
          <div className="relative mt-14 border-t border-bone/10 pt-10">
            <div className="mb-6 flex items-end justify-between">
              <h3 className="font-display text-2xl text-bone md:text-3xl">
                Mehr <span className="italic text-accent">Reels</span>
              </h3>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="accent-link text-sm text-bone/70"
              >
                Alle auf Instagram
              </a>
            </div>
            <ReelWall />
          </div>
        </div>
      </div>
    </section>
  );
}
