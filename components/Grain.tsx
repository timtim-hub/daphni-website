"use client";

/**
 * Fixed film-grain overlay using an inline SVG fractal-noise texture.
 * Pure CSS/SVG — no network request, GPU-cheap.
 */
export default function Grain() {
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  ).replace(/%23/g, "#");

  return (
    <div
      aria-hidden
      className="grain"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
