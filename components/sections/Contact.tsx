import { Reveal } from "../Reveal";
import { site } from "@/lib/site";
import Magnetic from "../Magnetic";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-px text-center">
        <Reveal>
          <p className="eyebrow">(05) — Booking &amp; Anfragen</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="contact-heading"
            className="mx-auto mt-8 max-w-5xl font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.9]"
          >
            Lass uns was
            <br />
            <span className="italic text-accent">Böses</span> machen.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lead text-bone/75">
            Anfragen für Shows, Bookings oder Film- &amp; Theaterprojekte? Schreib mir
            eine Nachricht auf Instagram oder per Mail.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 font-semibold text-bone transition-transform hover:scale-[1.03]"
              >
                Anfrage via Instagram
              </a>
            </Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-bone/20 px-9 py-4 text-bone/80 transition-colors hover:border-bone/50 hover:text-bone"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
