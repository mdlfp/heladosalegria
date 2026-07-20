import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
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

import { Fredoka, Kalam, Nunito } from "next/font/google";
import { JsonLd } from "@/components/jsonld";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const kalam = Kalam({ subsets: ["latin"], weight: ["700"], variable: "--font-kalam" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });


export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: "La Mazorquita | Elotes Preparados en Ensenada",
    template: "%s | La Mazorquita",
  },
  description:
    "Los mejores elotes preparados en Ensenada. Elote entero, en vaso, esquites, tostielotes, dorilocos y más. Martes a Domingo de 5pm a 10pm.",
  keywords: [
    "elotes Ensenada",
    "elotes preparados Ensenada",
    "esquites Ensenada",
    "tostilocos Ensenada",
    "comida callejera Ensenada",
    "La Mazorquita",
  ],
  authors: [{ name: "La Mazorquita" }],
  openGraph: {
    title: "La Mazorquita | Elotes Preparados en Ensenada",
    description:
      "Los mejores elotes preparados en Ensenada, hechos al momento con el toque que más te gusta.",
    url: BUSINESS.siteUrl,
    siteName: "La Mazorquita",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elotes preparados La Mazorquita",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Mazorquita | Elotes Preparados en Ensenada",
    description: "Los mejores elotes preparados en Ensenada.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BUSINESS.siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${fredoka.variable} ${kalam.variable} ${nunito.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
