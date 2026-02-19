"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between border border-[#DCAE96]/20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-xl font-bold">
              <span className="text-[#90645A]">Daphni</span>
              <span className="text-[#6b5b54] font-light"> Georoglidis</span>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center gap-2 text-sm text-[#6b5b54] hover:text-[#90645A] transition-colors"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a]">
              <span className="text-[#90645A]">Datenschutz</span>
            </h1>
            <p className="text-[#6b5b54] mb-12">
              Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten
            </p>

            <div className="space-y-10">
              {/* Datenschutz auf einen Blick */}
              <section className="bg-white rounded-2xl p-8 border border-[#DCAE96]/20">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-[#90645A]" />
                  <h2 className="text-xl font-semibold text-[#1a1a1a]">
                    Datenschutz auf einen Blick
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#6b5b54]">
                  <h3 className="text-lg font-medium text-[#1a1a1a] mt-6 mb-3">Allgemeine Hinweise</h3>
                  <p className="leading-relaxed">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                    Daten passiert, wenn Sie diese Website besuchen.
                  </p>
                </div>
              </section>

              {/* Verantwortlicher */}
              <section>
                <h2 className="text-xl font-semibold mb-6 text-[#1a1a1a]">
                  Verantwortlicher für die Datenverarbeitung
                </h2>
                
                <div className="bg-white rounded-2xl p-6 space-y-3 text-[#6b5b54] border border-[#DCAE96]/20">
                  <p className="font-medium text-[#1a1a1a]">Daphni Georoglidis</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#90645A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Musterstraße 123</p>
                      <p>50667 Köln</p>
                      <p>Deutschland</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#90645A] flex-shrink-0" />
                    <a 
                      href="mailto:kontakt@daphni-georoglidis.de" 
                      className="hover:text-[#90645A] transition-colors"
                    >
                      kontakt@daphni-georoglidis.de
                    </a>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section className="border-t border-[#DCAE96]/30 pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="w-6 h-6 text-[#90645A]" />
                  <h2 className="text-xl font-semibold text-[#1a1a1a]">
                    Cookies und Instagram-Einbettung
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#6b5b54]">
                  <p className="leading-relaxed">
                    Diese Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Browser 
                    automatisch erstellt und die auf Ihrem Endgerät gespeichert werden.
                  </p>
                  
                  <h3 className="text-lg font-medium text-[#1a1a1a] mt-6 mb-3">Instagram-Integration</h3>
                  <p className="leading-relaxed">
                    Auf dieser Website sind Inhalte von Instagram eingebettet. Dies ermöglicht uns, 
                    Instagram-Inhalte direkt auf unserer Website anzuzeigen. Damit diese Inhalte geladen 
                    werden können, ist Ihre ausdrückliche Einwilligung erforderlich.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Wenn Sie die Instagram-Inhalte aktivieren, baut Ihr Browser eine direkte Verbindung 
                    zu den Servern von Instagram auf. Dabei werden verschiedene Daten an Instagram übertragen:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                    <li>Ihre IP-Adresse</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Die von Ihnen besuchte Seite auf unserer Website</li>
                    <li>Informationen über Ihren Browser und Gerätetyp</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Diese Daten werden von Instagram (Meta Platforms Ireland Limited) verarbeitet. 
                    Weitere Informationen finden Sie in der Datenschutzerklärung von Instagram.
                  </p>
                </div>
              </section>

              {/* Ihre Rechte */}
              <section className="bg-white rounded-2xl p-8 border border-[#DCAE96]/20">
                <h2 className="text-xl font-semibold mb-6 text-[#1a1a1a]">
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
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#F5F5DC]">
                      <div className="w-2 h-2 rounded-full bg-[#90645A] flex-shrink-0" />
                      <span className="text-sm text-[#6b5b54]">{right}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Aktualisierung */}
              <section className="border-t border-[#DCAE96]/30 pt-10">
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Aktualisierung der Datenschutzerklärung
                </h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                  rechtlichen Anforderungen entspricht.
                </p>
                <p className="text-[#6b5b54] mt-4">
                  Stand: Februar 2026
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DCAE96]/30 py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6b5b54]">
          <p>© {new Date().getFullYear()} Daphni Georoglidis</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#90645A] transition-colors">Startseite</Link>
            <Link href="/impressum" className="hover:text-[#90645A] transition-colors">Impressum</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
