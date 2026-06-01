import type { MetadataRoute } from "next";

const SITE_URL = "https://daphni-website.netlify.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-01");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/impressum/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/datenschutz/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
