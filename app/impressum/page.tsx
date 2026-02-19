"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="glass rounded-full px-6 py-3 flex items-center justify-between"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-xl font-bold">
              <span className="text-gradient">Daphni</span>
              <span className="text-white/80 font-light"> Georoglidis</span>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-12">
              <span className="text-gradient">Impressum</span>
            </h1>

            <div className="space-y-10">
              {/* Angaben gemäß § 5 TMG */}
              <section className="glass rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  Angaben gemäß § 5 TMG
                </h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Daphni Georoglidis</p>
                      <p>Musterstraße 123</p>
                      <p>50667 Köln</p>
                      <p>Deutschland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a 
                      href="mailto:kontakt@daphni-georoglidis.de" 
                      className="hover:text-primary transition-colors"
                    >
                      kontakt@daphni-georoglidis.de
                    </a>
                  </div>
                </div>
              </section>

              {/* Vertreten durch */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Vertreten durch
                </h2>
                <p className="text-muted-foreground">
                  Daphni Georoglidis
                </p>
              </section>

              {/* Steuernummer */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Steuerliche Angaben
                </h2>
                <div className="text-muted-foreground space-y-2">
                  <p>USt-IdNr.: DE123456789</p>
                  <p>Steuernummer: 123/456/78901</p>
                  <p>Finanzamt Köln</p>
                </div>
              </section>

              {/* Berufshaftpflichtversicherung */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Berufshaftpflichtversicherung
                </h2>
                <div className="text-muted-foreground space-y-2">
                  <p className="font-medium text-white">Muster Versicherung AG</p>
                  <p>Versicherungsallee 1</p>
                  <p>10115 Berlin</p>
                  <p className="mt-4">
                    Geltungsraum: Deutschland
                  </p>
                </div>
              </section>

              {/* Streitschlichtung */}
              <section className="border-t border-white/5 pt-10">
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Streitschlichtung
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Haftung für Inhalte */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Haftung für Inhalte
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                  erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                  Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              {/* Haftung für Links */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Haftung für Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                  Verlinkung nicht erkennbar.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                  Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
                  Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Urheberrecht
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                  Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                  nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
                  Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
                  gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, 
                  bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen 
                  werden wir derartige Inhalte umgehend entfernen.
                </p>
              </section>

              {/* Quellenangaben */}
              <section className="border-t border-white/5 pt-10">
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Quellenangaben für verwendete Bilder und Grafiken
                </h2>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Portrait: © Daphni Georoglidis</li>
                  <li>Instagram-Inhalte: © Daphni Georoglidis / Instagram</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Daphni Georoglidis</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
