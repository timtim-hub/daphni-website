import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Daphni Georoglidis — Informationen nach DSGVO zu Hosting, Server-Logs und Instagram-Einbettung.",
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
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
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] mb-8">
            Datenschutz
          </h1>
          <p className="text-smoke mb-16 max-w-xl">
            Der Schutz deiner Daten ist uns wichtig. Diese Website ist bewusst
            datensparsam gebaut: keine Tracker, keine Analyse-Cookies, keine
            Werbenetzwerke. Alle Medien (Bilder &amp; Videos) werden lokal von diesem
            Server ausgeliefert — beim Seitenaufruf werden keine Daten an Dritte
            übertragen.
          </p>

          <div className="space-y-12 text-[1.05rem] leading-relaxed text-bone/85">
            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                1. Verantwortlicher
              </h2>
              <p className="text-bone">Daphni Georoglidis</p>
              <p>c/o Moltkestraße 79</p>
              <p>50674 Köln</p>
              <p className="mt-2">
                E-Mail:{" "}
                <a href="mailto:Daphnigeoroglidis@gmail.com" className="accent-link text-accent">
                  Daphnigeoroglidis@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                2. Hosting (Netlify)
              </h2>
              <p>
                Diese Website wird bei Netlify (Netlify, Inc., 512 2nd Street, Suite
                200, San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Seite
                verarbeitet Netlify technisch notwendige Daten (sog. Server-Logfiles)
                wie IP-Adresse, Datum und Uhrzeit des Zugriffs, übertragene Datenmenge,
                Referrer-URL und User-Agent. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                DSGVO (berechtigtes Interesse an einem sicheren, stabilen Betrieb). Mit
                Netlify besteht ein Auftragsverarbeitungsvertrag; die Übermittlung in
                die USA ist über die Standardvertragsklauseln abgesichert.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                3. Schriftarten (lokal gehostet)
              </h2>
              <p>
                Die verwendeten Schriftarten werden lokal von diesem Server
                ausgeliefert. Es findet <strong>keine</strong> Verbindung zu Google
                Fonts oder anderen externen Anbietern statt. Es werden hierfür keine
                personenbezogenen Daten an Dritte übertragen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                4. Videos &amp; Reels (lokal gehostet)
              </h2>
              <p>
                Die auf dieser Website gezeigten Videos/Reels von{" "}
                <strong>@daphni.comedy</strong> werden <strong>lokal von diesem Server
                ausgeliefert</strong> (keine Instagram-Einbettung per iframe). Beim
                Aufruf der Seite wird daher <strong>keine</strong> Verbindung zu
                Instagram oder Meta aufgebaut und es werden keine personenbezogenen Daten
                an Dritte übertragen. Rechtsgrundlage für die Darstellung der Inhalte ist
                unser berechtigtes Interesse an einer ansprechenden Außendarstellung
                (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p className="mt-3">
                Erst wenn du aktiv auf einen Instagram-Link oder ein Reel klickst, wirst
                du zu Instagram weitergeleitet; dann gelten die{" "}
                <a
                  href="https://privacycenter.instagram.com/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-link text-accent"
                >
                  Datenschutzbestimmungen von Instagram
                </a>{" "}
                (Meta Platforms Ireland Ltd., 4 Grand Canal Square, Dublin 2, Irland).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                5. Keine Cookies, kein Tracking
              </h2>
              <p>
                Diese Website setzt <strong>keine Cookies</strong>, nutzt keine
                Analyse- oder Tracking-Dienste und bindet keine Werbenetzwerke ein. Es
                werden keine Profile über dich gebildet.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                6. Externe Links
              </h2>
              <p>
                Verweise auf externe Profile (z. B. Instagram) sind als Links umgesetzt.
                Erst durch aktives Anklicken gelangst du zum jeweiligen Anbieter, dessen
                Datenschutzbestimmungen dann gelten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">7. Deine Rechte</h2>
              <p className="mb-4">Dir stehen nach der DSGVO folgende Rechte zu:</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Auskunft (Art. 15)",
                  "Berichtigung (Art. 16)",
                  "Löschung (Art. 17)",
                  "Einschränkung (Art. 18)",
                  "Datenübertragbarkeit (Art. 20)",
                  "Widerspruch (Art. 21)",
                  "Widerruf der Einwilligung (Art. 7 Abs. 3)",
                  "Beschwerde bei einer Aufsichtsbehörde (Art. 77)",
                ].map((r) => (
                  <li
                    key={r}
                    className="surface px-4 py-3 text-sm flex items-center gap-3"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4 text-bone">
                8. Beschwerderecht
              </h2>
              <p>
                Zuständige Aufsichtsbehörde ist die Landesbeauftragte für Datenschutz und
                Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Postfach 20 04 44,
                40102 Düsseldorf.
              </p>
            </section>

            <p className="text-smoke text-sm pt-4">Stand: Juni 2026</p>
          </div>

          <div className="mt-20 border-t border-bone/10 pt-8 flex gap-8 text-sm text-smoke">
            <Link href="/" className="accent-link">Startseite</Link>
            <Link href="/impressum" className="accent-link">Impressum</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
