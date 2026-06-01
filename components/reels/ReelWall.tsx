"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram, Play } from "lucide-react";
import { reels, site, type Reel } from "@/lib/site";

function ReelTile({ reel, index }: { reel: Reel; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    if (m.matches) return;

    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.55 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      aria-label={`Reel ${index + 1} von ${site.name} auf Instagram öffnen`}
      className="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-bone/10 bg-ink-soft"
    >
      <video
        ref={ref}
        src={reduce ? undefined : reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* dark hover veil + instagram glyph */}
      <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30">
        <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-ink/55 text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Instagram className="h-5 w-5" />
        </span>
      </div>
      {reduce && (
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/55 text-bone backdrop-blur-sm">
          <Play className="h-4 w-4" />
        </span>
      )}
    </a>
  );
}

export default function ReelWall() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {reels.map((reel, i) => (
        <ReelTile key={reel.id} reel={reel} index={i} />
      ))}
    </div>
  );
}
