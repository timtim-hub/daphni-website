"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Datenschutz() {
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
              className="flex items-center gap-2 text-sm text-[#6b5b54] hover:text-[#90645A]"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3d2e2a]">
              <span className="text-[#90645A]">Datenschutz</span>
            </h1>
            <p className="text-[#6b5b54] mb-12">Informationen zum Datenschutz</p>

            <div className="space-y-8">
              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-[#90645A]" />
                  <h2 className="text-xl font-semibold text-[#3d2e2a]">Datenschutz auf einen Blick</h2>
                </div>
                <p className="text-[#6b5b54] leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                  Daten passiert, wenn Sie diese Website besuchen.
                </p>
              </section>

              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <h2 className="text-xl font-semibold mb-6 text-[#3d2e2a]">Verantwortlicher</h2>
                <div className="space-y-3 text-[#6b5b54]">
                  <p className="font-semibold text-[#3d2e2a]">Daphni Georoglidis</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#90645A] mt-0.5" />
                    <div>
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
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="w-6 h-6 text-[#90645A]" />
                  <h2 className="text-xl font-semibold text-[#3d2e2a]">Cookies & Instagram</h2>
                </div>
                <p className="text-[#6b5b54] leading-relaxed mb-4">
                  Diese Website verwendet Cookies und bindet Instagram-Inhalte ein. 
                  Für die Anzeige von Instagram-Posts ist Ihre Zustimmung erforderlich.
                </p>
                <p className="text-[#6b5b54] leading-relaxed">
                  Wenn Sie die Instagram-Inhalte aktivieren, baut Ihr Browser eine direkte Verbindung 
                  zu den Servern von Instagram auf. Dabei werden verschiedene Daten übertragen.
                </p>
              </section>

              <section className="bg-white rounded-2xl p-8 border-2 border-[#DCAE96]">
                <h2 className="text-xl font-semibold mb-6 text-[#3d2e2a]">Ihre Rechte</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Recht auf Auskunft",
                    "Recht auf Berichtigung",
                    "Recht auf Löschung",
                    "Recht auf Einschränkung",
                    "Recht auf Datenübertragbarkeit",
                    "Widerspruchsrecht",
                  ].map((right) => (
                    <div key={right} className="flex items-center gap-3 p-3 rounded-lg bg-[#fff0db] border border-[#DCAE96]">
                      <div className="w-2 h-2 rounded-full bg-[#90645A]" />
                      <span className="text-sm text-[#6b5b54]">{right}</span>
                    </div>
                  ))}
                </div>
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
            <Link href="/impressum" className="hover:text-[#90645A]">Impressum</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
