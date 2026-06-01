"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { featuredReel, site } from "@/lib/site";

/**
 * Featured vertical reel — autoplays muted + looped (browser-policy safe),
 * with a sound toggle so visitors can switch audio on.
 */
export default function FeaturedReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Play only while in view (saves bandwidth + CPU); resume audio state on return.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    // a user gesture unmuted it → make sure it is actually playing
    if (!next) void v.play().catch(() => {});
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft shadow-2xl">
      <video
        ref={videoRef}
        src={featuredReel.src}
        poster={featuredReel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Reel von ${site.name}`}
        className="h-full w-full object-cover"
      />

      {/* top label */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-bone">
          Reel
        </span>
      </div>

      {/* sound toggle */}
      <button
        onClick={toggleSound}
        data-cursor
        aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 text-bone backdrop-blur-sm transition-colors hover:bg-accent"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* subtle bottom gradient for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, rgba(11,11,13,0.6), transparent)" }}
      />
    </div>
  );
}
