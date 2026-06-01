import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daphni Georoglidis",
    short_name: "Daphni",
    description:
      "Stand-up-Comedienne & Schauspielerin aus Köln — deutschlandweit auf Tour.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#0b0b0d",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
