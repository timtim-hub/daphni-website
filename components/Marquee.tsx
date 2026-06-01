"use client";

import { motion } from "framer-motion";

/** Infinite horizontal marquee. Pauses for reduced-motion via CSS fallback. */
export default function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-10 pr-10"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(2rem,7vw,6rem)] font-semibold"
          >
            <span className={i % 2 ? "text-outline" : "text-bone"}>{item}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
