"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

const links = [
  { label: "Über", href: "#about" },
  { label: "Arbeit", href: "#work" },
  { label: "Schauspiel", href: "#acting" },
  { label: "Kontakt", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
        scrolled ? "bg-ink/70 backdrop-blur-md" : ""
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="container-px flex items-center justify-between py-5"
      >
        <a href="#top" data-cursor className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-bone">
            {site.firstName}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-150" />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} data-cursor className="accent-link text-sm text-bone/80 hover:text-bone">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="rounded-full border border-bone/20 px-4 py-2 text-xs uppercase tracking-widest text-bone/90 transition-colors hover:border-accent hover:text-accent"
            >
              {site.instagramHandle}
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
          aria-expanded={open}
          className="relative z-[81] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ink/95 backdrop-blur-md md:hidden"
          >
            <ul className="container-px flex flex-col gap-1 pb-8 pt-2">
              {[...links, { label: site.instagramHandle, href: site.instagram }].map(
                (l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("#") ? undefined : "_blank"}
                      rel={l.href.startsWith("#") ? undefined : "noopener noreferrer"}
                      onClick={() => setOpen(false)}
                      className="block border-b border-bone/10 py-4 font-display text-2xl text-bone"
                    >
                      {l.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
