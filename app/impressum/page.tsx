import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Daphni Georoglidis.",
  robots: { index: true, follow: true },
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="container-px py-8">
        <Link href="/" className="eyebrow accent-link">
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="container-px pb-32 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">Rechtliches</p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] mb-16">
            Impressum
          </h1>

          <div className="space-y-12 text-[1.05rem] leading-relaxed text-bone/85">
            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                Angaben gemäß § 5 DDG (ehem. TMG)
              </h2>
              <p className="text-bone">Daphni Georoglidis</p>
              <p>c/o Moltkestraße 79</p>
              <p>50674 Köln</p>
              <p className="mt-2 text-smoke">Deutschland</p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:Daphnigeoroglidis@gmail.com"
                  className="accent-link text-accent"
                >
                  Daphnigeoroglidis@gmail.com
                </a>
              </p>
              <p className="mt-1">
                Instagram:{" "}
                <a
                  href="https://instagram.com/daphni.comedy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-link text-accent"
                >
                  @daphni.comedy
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>Daphni Georoglidis</p>
              <p>c/o Moltkestraße 79, 50674 Köln</p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-link text-accent"
                >
                  ec.europa.eu/consumers/odr
                </a>
                . Wir sind nicht verpflichtet und nicht bereit, an einem
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter (u. a.
                Instagram), auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
                Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
                solche gekennzeichnet.
              </p>
            </section>
          </div>

          <div className="mt-20 border-t border-bone/10 pt-8 flex gap-8 text-sm text-smoke">
            <Link href="/" className="accent-link">Startseite</Link>
            <Link href="/datenschutz" className="accent-link">Datenschutz</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
