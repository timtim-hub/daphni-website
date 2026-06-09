"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Short, muted, looping background clip for a Work card.
 * Plays only while in view (saves bandwidth/CPU); shows the poster otherwise
 * and as a full fallback when the user prefers reduced motion.
 */
export default function WorkMedia({
  src,
  poster,
  position,
  alt,
}: {
  src: string;
  poster: string;
  position: string;
  alt: string;
}) {
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
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={reduce ? undefined : src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
      style={{ objectPosition: position }}
    />
  );
}
