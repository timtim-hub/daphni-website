"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useConsent } from "../ConsentManager";
import { instagramPosts, site } from "@/lib/site";

export default function InstagramFeed() {
  const { consent, grant, deny, reset } = useConsent();

  if (consent === "granted") {
    return (
      <div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="surface aspect-[4/5] overflow-hidden"
            >
              <iframe
                src={post.embedUrl}
                className="h-full w-full"
                loading="lazy"
                title={`Instagram-Beitrag ${i + 1} von ${site.instagramHandle}`}
                scrolling="no"
                allowTransparency
              />
            </motion.div>
          ))}
        </div>
        <button
          onClick={reset}
          className="mt-6 text-xs uppercase tracking-widest text-smoke accent-link"
        >
          Einwilligung widerrufen
        </button>
      </div>
    );
  }

  // denied or unknown → privacy-first placeholder with explicit opt-in
  return (
    <div className="surface flex flex-col items-center gap-6 px-6 py-16 text-center">
      <Instagram className="h-10 w-10 text-accent" strokeWidth={1.5} />
      <div className="max-w-md">
        <h3 className="font-display text-2xl text-bone">Instagram-Vorschau</h3>
        <p className="mt-3 text-sm text-bone/65">
          Aus Datenschutzgründen werden Instagram-Inhalte erst nach deiner
          Einwilligung geladen. Dabei wird eine Verbindung zu den Servern von Meta
          aufgebaut.{" "}
          <a href="/datenschutz" className="accent-link text-accent">
            Mehr dazu
          </a>
          .
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={grant}
          data-cursor
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bone transition-transform hover:scale-[1.03]"
        >
          Instagram laden
        </button>
        {consent !== "denied" && (
          <button
            onClick={deny}
            className="rounded-full border border-bone/20 px-6 py-3 text-sm text-bone/70 hover:border-bone/40"
          >
            Ablehnen
          </button>
        )}
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-bone/20 px-6 py-3 text-sm text-bone/70 hover:border-accent hover:text-accent"
        >
          Direkt auf Instagram
        </a>
      </div>
    </div>
  );
}
