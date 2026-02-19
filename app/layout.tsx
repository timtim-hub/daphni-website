import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daphni Georoglidis | Stand-up Comedienne & Schauspielerin",
  description: "Daphni Georoglidis - Stand-up Comedienne & Schauspielerin aus Köln. Dark Humor mit gnadenloser Direktheit. Jetzt Tickets für Live-Shows sichern!",
  keywords: ["Daphni Georoglidis", "Comedian", "Schauspielerin", "Stand-up Comedy", "Köln", "Dark Humor"],
  authors: [{ name: "Daphni Georoglidis" }],
  openGraph: {
    title: "Daphni Georoglidis | Stand-up Comedienne & Schauspielerin",
    description: "Jung, düster – und überraschend gnadenlos. Daphni Georoglidis geht in ihrer Comedy genau dorthin, wo es weh tut.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
