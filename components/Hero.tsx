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

/** Premium duotone-treated portrait — always rendered; also the WebGL fallback. */
function PortraitImage() {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 38%, rgba(255,46,18,0.20), transparent 72%)",
        }}
      />
      <Image
        src="/daphni_portrait.png"
        alt={`${site.name}, ${site.roles[0]}`}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain object-bottom"
        style={{ filter: "grayscale(0.5) contrast(1.06) brightness(0.95) saturate(0.9)" }}
      />
      {/* accent duotone wash */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light opacity-50"
        style={{
          background: "linear-gradient(180deg, rgba(255,46,18,0.25), transparent 55%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const enable3D = useEnable3D();
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  const show3D = enable3D && !lost;

  const letters = site.firstName.toUpperCase().split("");

  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative grid min-h-[100svh] grid-cols-1 overflow-hidden lg:grid-cols-12"
    >
      {/* ---------------- Portrait column (right on desktop, top on mobile) ---------------- */}
      <div className="relative order-1 h-[52svh] min-h-[320px] lg:order-2 lg:col-span-5 lg:h-auto xl:col-span-6">
        <div className="absolute inset-0">
          <PortraitImage />
          {show3D && (
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: ready ? 1 : 0 }}
            >
              <HeroCanvas onReady={() => setReady(true)} onLost={() => setLost(true)} />
            </div>
          )}
        </div>
        {/* blend portrait into the page edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,13,0.55) 0%, transparent 22%, transparent 70%, rgba(11,11,13,0.95) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 lg:block"
          style={{ background: "linear-gradient(90deg, var(--ink), transparent)" }}
        />
      </div>

      {/* ---------------- Type column (left) ---------------- */}
      <div className="relative order-2 z-10 flex flex-col justify-center px-[clamp(1.25rem,5vw,5rem)] pb-16 pt-10 lg:order-1 lg:col-span-7 lg:py-32 xl:col-span-6">
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          <span className="h-px w-10 bg-accent" />
          <span className="eyebrow">{site.roles[0]}</span>
        </motion.div>

        <h1 className="font-display leading-[0.84] text-bone">
          <span className="sr-only">
            {site.name} — {site.roles[0]} und {site.roles[1]}
          </span>
          <span aria-hidden className="block overflow-hidden">
            <span className="flex text-[clamp(3.5rem,11vw,9.5rem)] font-semibold tracking-[-0.03em]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease: EASE }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          </span>
          <motion.span
            aria-hidden
            className="mt-1 block text-outline text-[clamp(1.5rem,5.5vw,4rem)] italic"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
          >
            {site.lastName}
          </motion.span>
        </h1>

        <motion.p
          className="mt-8 max-w-md text-lead text-bone/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
        >
          <span className="font-display italic text-accent">{site.tagline.join(" ")}</span>{" "}
          Dark Humor, der genau dorthin geht, wo es weh tut.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
        >
          <Magnetic>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium text-bone transition-transform hover:scale-[1.03]"
            >
              Termine auf Instagram
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </Magnetic>
          <a href="#about" data-cursor className="accent-link text-sm text-bone/70">
            Mehr erfahren
          </a>
        </motion.div>

        <motion.p
          className="mt-12 text-[0.7rem] uppercase tracking-[0.28em] text-smoke"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          Köln · Düsseldorf · Berlin · <span className="text-bone/70">deutschlandweit</span>
        </motion.p>
      </div>
    </section>
  );
}
