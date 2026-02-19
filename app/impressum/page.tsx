"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Impressum() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#1a1a1a]">
              <span className="text-[#90645A]">Impressum</span>
            </h1>

            <div className="space-y-10">
              {/* Angaben gemäß § 5 TMG */}
              <section className="bg-white rounded-2xl p-8 border border-[#DCAE96]/20">
                <h2 className="text-xl font-semibold mb-6 text-[#1a1a1a]">
                  Angaben gemäß § 5 TMG
                </h2>
                
                <div className="space-y-4 text-[#6b5b54]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#90645A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">Daphni Georoglidis</p>
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

              {/* Vertreten durch */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Vertreten durch
                </h2>
                <p className="text-[#6b5b54]">
                  Daphni Georoglidis
                </p>
              </section>

              {/* Steuernummer */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Steuerliche Angaben
                </h2>
                <div className="text-[#6b5b54] space-y-2">
                  <p>USt-IdNr.: DE123456789</p>
                  <p>Steuernummer: 123/456/78901</p>
                  <p>Finanzamt Köln</p>
                </div>
              </section>

              {/* Berufshaftpflichtversicherung */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Berufshaftpflichtversicherung
                </h2>
                <div className="text-[#6b5b54] space-y-2">
                  <p className="font-medium text-[#1a1a1a]">Muster Versicherung AG</p>
                  <p>Versicherungsallee 1</p>
                  <p>10115 Berlin</p>
                  <p className="mt-4">
                    Geltungsraum: Deutschland
                  </p>
                </div>
              </section>

              {/* Streitschlichtung */}
              <section className="border-t border-[#DCAE96]/30 pt-10">
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Streitschlichtung
                </h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#90645A] hover:underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>.
                </p>
                <p className="text-[#6b5b54] mt-4 leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Haftung für Inhalte */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Haftung für Inhalte
                </h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </p>
              </section>

              {/* Haftung für Links */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Haftung für Links
                </h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-[#1a1a1a]">
                  Urheberrecht
                </h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht.
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
            <Link href="/datenschutz" className="hover:text-[#90645A] transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
