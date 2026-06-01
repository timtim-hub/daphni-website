"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-bone/10 pt-20">
      {/* Giant wordmark */}
      <div className="container-px">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "30%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,15vw,13rem)] font-semibold leading-[0.8] tracking-tight text-bone"
          >
            Daphni<span className="text-accent">.</span>
          </motion.p>
        </div>

        <div className="mt-16 flex flex-col gap-10 border-t border-bone/10 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="text-sm text-bone/70">
              Stand-up-Comedienne &amp; Schauspielerin aus {site.city}. Deutschlandweit
              auf Tour.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-accent accent-link"
            >
              {site.instagramHandle}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm text-bone/70">
            <a href="#about" className="accent-link w-fit">Über</a>
            <a href="#acting" className="accent-link w-fit">Schauspiel</a>
            <a href="#contact" className="accent-link w-fit">Kontakt</a>
          </nav>

          <nav aria-label="Rechtliches" className="flex flex-col gap-3 text-sm text-bone/70">
            <Link href="/impressum" className="accent-link w-fit">Impressum</Link>
            <Link href="/datenschutz" className="accent-link w-fit">Datenschutz</Link>
            <span className="text-smoke">© {year} {site.name}</span>
          </nav>
        </div>

        {/* Crafted-by signature — high-end, understated, accent micro-detail */}
        <div className="border-t border-bone/10 py-8">
          <div className="group flex flex-col items-center gap-1 text-center">
            <span className="text-[0.62rem] uppercase tracking-[0.45em] text-smoke transition-colors group-hover:text-bone/70">
              Crafted by
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
              <span className="relative">
                Tim&nbsp;Honnef
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.4em] text-smoke">
              High-End Web<span className="text-accent">·</span>App
              <span className="text-accent">·</span>Brand Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
