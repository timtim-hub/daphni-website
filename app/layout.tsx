import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://daphni-website.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Daphni Georoglidis — Stand-up Comedienne & Schauspielerin",
    template: "%s · Daphni Georoglidis",
  },
  description:
    "Daphni Georoglidis ist Stand-up-Comedienne und Schauspielerin aus Köln — Dark Humor, gnadenlos direkt. Auftritte u. a. in Köln, Düsseldorf, Berlin und deutschlandweit. Aktuelle Termine immer auf Instagram.",
  keywords: [
    "Comedienne",
    "Comedienne Köln",
    "Comedienne Düsseldorf",
    "Comedienne Berlin",
    "Stand-up Comedienne",
    "Daphni Georoglidis",
    "Comedian Köln",
    "Komikerin",
    "Schauspielerin Köln",
    "Dark Humor Comedy",
    "Stand-up Comedy Deutschland",
    "Comedienne buchen",
  ],
  authors: [{ name: "Daphni Georoglidis" }],
  creator: "Daphni Georoglidis",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Daphni Georoglidis",
    title: "Daphni Georoglidis — Stand-up Comedienne & Schauspielerin",
    description:
      "Jung. Düster. Gnadenlos. Stand-up-Comedienne & Schauspielerin aus Köln — deutschlandweit auf Tour. Termine immer auf Instagram.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daphni Georoglidis — Stand-up Comedienne & Schauspielerin",
    description:
      "Jung. Düster. Gnadenlos. Stand-up-Comedienne & Schauspielerin aus Köln — deutschlandweit auf Tour.",
    creator: "@daphnigg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Entertainment",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Daphni Georoglidis",
      jobTitle: ["Stand-up Comedienne", "Schauspielerin"],
      description:
        "Stand-up-Comedienne und Schauspielerin aus Köln mit Dark Humor. Tritt deutschlandweit auf, u. a. in Köln, Düsseldorf und Berlin.",
      url: SITE_URL,
      image: `${SITE_URL}/daphni_portrait.png`,
      sameAs: ["https://instagram.com/daphnigg"],
      knowsLanguage: ["de", "en"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Köln",
        addressCountry: "DE",
      },
      worksFor: { "@type": "Organization", name: "Freelance / Selbstständig" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Daphni Georoglidis",
      inLanguage: "de-DE",
      about: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${fraunces.variable} ${geist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
