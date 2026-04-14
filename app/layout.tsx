import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eneon-es.com"),
  title: {
    default: "Eneon ES — Battery Energy Storage Systems",
    template: "%s — Eneon ES",
  },
  description:
    "Eneon ES designs, builds, and operates battery energy storage systems for microgrids, utilities, and commercial projects across North America.",
  applicationName: "Eneon ES",
  authors: [{ name: "Eneon ES Inc." }],
  generator: "Next.js",
  keywords: [
    "battery energy storage",
    "BESS",
    "microgrid",
    "energy storage system",
    "Calgary",
    "Canada",
    "utility-scale storage",
    "commercial storage",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.eneon-es.com",
    siteName: "Eneon ES",
    title: "Eneon ES — Battery Energy Storage Systems",
    description:
      "Battery energy storage systems engineered for microgrids, utilities, and commercial projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eneon ES — Battery Energy Storage Systems",
    description:
      "Battery energy storage systems engineered for microgrids, utilities, and commercial projects.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E2F5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface-base)] text-[var(--color-navy-500)]">
        {children}
      </body>
    </html>
  );
}
