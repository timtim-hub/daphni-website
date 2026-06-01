"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { site } from "@/lib/site";
import Magnetic from "./Magnetic";

const HeroCanvas = dynamic(() => import("./hero/HeroCanvas"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

function useEnable3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setEnabled(!reduce && wide && webgl);
  }, []);
  return enabled;
}

export default function Hero() {
  const enable3D = useEnable3D();
  const letters = site.firstName.toUpperCase().split("");

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="Intro"
    >
      {/* radial accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, rgba(255,46,18,0.16), transparent 70%)",
        }}
      />

      {/* 3D / fallback portrait layer */}
      <div className="absolute inset-0 z-0">
        {enable3D ? (
          <HeroCanvas />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[62vmin] w-[62vmin] max-w-[520px] max-h-[520px]">
              <Image
                src="/daphni_portrait.png"
                alt={`${site.name}, ${site.roles[0]}`}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 520px"
                className="object-contain"
                style={{ filter: "contrast(1.05) saturate(0.95)" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Eyebrow top */}
      <div className="container-px absolute left-0 right-0 top-28 z-20 flex items-center justify-between">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        >
          {site.roles[0]}
        </motion.p>
        <motion.p
          className="eyebrow hidden sm:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        >
          Köln · Düsseldorf · Berlin · deutschlandweit
        </motion.p>
      </div>

      {/* Giant kinetic name */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-[16vh] sm:items-center sm:pb-0">
        <div className="container-px w-full">
          <h1 className="font-display text-bone leading-[0.82]">
            <span className="sr-only">
              {site.name} — {site.roles[0]} und {site.roles[1]}
            </span>
            <span aria-hidden className="block">
              <span className="flex justify-start overflow-hidden text-hero font-semibold">
                {letters.map((l, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "115%", rotate: 6 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 1, ease: EASE }}
                  >
                    {l}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="mt-1 block font-display text-outline text-[clamp(1.6rem,7vw,5.5rem)] italic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: EASE }}
              >
                {site.lastName}
              </motion.span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom bar: tagline + CTA */}
      <div className="container-px absolute bottom-8 left-0 right-0 z-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-sm text-lead text-bone/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          >
            <span className="font-display italic text-accent">
              {site.tagline.join(" ")}
            </span>{" "}
            Dark Humor, der genau dorthin geht, wo es weh tut.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
          >
            <Magnetic>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="group inline-flex items-center gap-3 rounded-full border border-bone/25 bg-bone/[0.03] px-7 py-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-bone"
              >
                Termine auf Instagram
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
