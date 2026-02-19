"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#fff0db]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white rounded-full px-6 py-3 flex items-center justify-between border-2 border-[#DCAE96]"
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
              Zurück
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
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#3d2e2a]">
              <span className="text-[#90645A]">Impressum</span>
            </h1>

            <div className="space-y-8">
              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <h2 className="text-xl font-semibold mb-6 text-[#3d2e2a]">Angaben gemäß § 5 TMG</h2>
                <div className="space-y-4 text-[#6b5b54]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#90645A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#3d2e2a]">Daphni Georoglidis</p>
                      <p>Musterstraße 123</p>
                      <p>50667 Köln</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#90645A]" />
                    <a href="mailto:kontakt@daphni-georoglidis.de" className="hover:text-[#90645A]">
                      kontakt@daphni-georoglidis.de
                    </a>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <h2 className="text-xl font-semibold mb-4 text-[#3d2e2a]">Streitschlichtung</h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#90645A] hover:underline ml-1">
                    https://ec.europa.eu/consumers/odr
                  </a>.
                </p>
              </section>

              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <h2 className="text-xl font-semibold mb-4 text-[#3d2e2a]">Haftung für Inhalte</h2>
                <p className="text-[#6b5b54] leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#DCAE96] py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6b5b54]">
          <p>© {new Date().getFullYear()} Daphni Georoglidis</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#90645A]">Startseite</Link>
            <Link href="/datenschutz" className="hover:text-[#90645A]">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
