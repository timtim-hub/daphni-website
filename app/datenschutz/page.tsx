"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Datenschutz() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Datenschutz</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten
            </p>

            <div className="space-y-10">
              {/* Datenschutz auf einen Blick */}
              <section className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-white/90">
                    Datenschutz auf einen Blick
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-medium text-white/80 mt-6 mb-3">Allgemeine Hinweise</h3>
                  <p className="leading-relaxed">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                    Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, 
                    mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>
              </section>

              {/* Verantwortlicher */}
              <section>
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  Verantwortlicher für die Datenverarbeitung
                </h2>
                
                <div className="glass rounded-2xl p-6 space-y-3 text-muted-foreground">
                  <p className="font-medium text-white">Daphni Georoglidis</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
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

              {/* Datenerfassung */}
              <section>
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  Datenerfassung auf dieser Website
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white/80 mb-3">
                      Wie erfassen wir Ihre Daten?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                      Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
                      durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten 
                      (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white/80 mb-3">
                      Wofür nutzen wir Ihre Daten?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website 
                      zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white/80 mb-3">
                      Welche Rechte haben Sie bezüglich Ihrer Daten?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                      Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem 
                      ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                      Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                      jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten 
                      Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section className="border-t border-white/5 pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-white/90">
                    Cookies und Instagram-Einbettung
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Diese Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Browser 
                    automatisch erstellt und die auf Ihrem Endgerät gespeichert werden.
                  </p>
                  
                  <h3 className="text-lg font-medium text-white/80 mt-6 mb-3">Instagram-Integration</h3>
                  <p className="leading-relaxed">
                    Auf dieser Website sind Inhalte von Instagram eingebettet. Dies ermöglicht uns, 
                    Instagram-Inhalte direkt auf unserer Website anzuzeigen. Damit diese Inhalte geladen 
                    werden können, ist Ihre ausdrückliche Einwilligung erforderlich.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Wenn Sie die Instagram-Inhalte aktivieren, baut Ihr Browser eine direkte Verbindung 
                    zu den Servern von Instagram auf. Dabei werden verschiedene Daten an Instagram übertragen, 
                    unter anderem:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                    <li>Ihre IP-Adresse</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Die von Ihnen besuchte Seite auf unserer Website</li>
                    <li>Informationen über Ihren Browser und Gerätetyp</li>
                    <li>Frühere Besuche auf Websites mit Instagram-Inhalten</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Diese Daten werden von Instagram (Meta Platforms Ireland Limited, 4 Grand Canal Square, 
                    Grand Canal Harbour, Dublin 2, Irland) verarbeitet und können in die USA übertragen werden. 
                    Weitere Informationen finden Sie in der Datenschutzerklärung von Instagram: 
                    <a 
                      href="https://privacycenter.instagram.com/policy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                    >
                      https://privacycenter.instagram.com/policy
                    </a>
                  </p>
                  <p className="leading-relaxed mt-4">
                    Die Rechtsgrundlage für die Verarbeitung ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. 
                    Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Cookies in Ihren Browsereinstellungen 
                    löschen oder den Cookie-Banner erneut aufrufen.
                  </p>
                </div>
              </section>

              {/* Hosting */}
              <section>
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  Hosting
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, 
                  die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. 
                  Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                  Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website 
                  generiert werden, handeln.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen 
                  und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen 
                  und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter 
                  (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </section>

              {/* Ihre Rechte */}
              <section className="glass rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  Ihre Rechte als betroffene Person
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Recht auf Auskunft (Art. 15 DSGVO)",
                    "Recht auf Berichtigung (Art. 16 DSGVO)",
                    "Recht auf Löschung (Art. 17 DSGVO)",
                    "Recht auf Einschränkung (Art. 18 DSGVO)",
                    "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
                    "Widerspruchsrecht (Art. 21 DSGVO)",
                  ].map((right, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{right}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-muted-foreground mt-6 leading-relaxed">
                  Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt 
                  oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, 
                  können Sie sich bei der Aufsichtsbehörde beschweren. In Deutschland ist dies die 
                  zuständige Landesdatenschutzbehörde.
                </p>
              </section>

              {/* SSL/TLS */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  SSL- bzw. TLS-Verschlüsselung
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                  Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber 
                  senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie 
                  daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und 
                  an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </section>

              {/* Aktualisierung */}
              <section className="border-t border-white/5 pt-10">
                <h2 className="text-xl font-semibold mb-4 text-white/90">
                  Aktualisierung der Datenschutzerklärung
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                  rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der 
                  Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue 
                  Datenschutzerklärung.
                </p>
                <p className="text-muted-foreground mt-4">
                  Stand: Februar 2026
                </p>
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
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
