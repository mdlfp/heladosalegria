import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getConfig } from "@/lib/strapi";

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

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const siteUrl = config.siteUrl ?? "https://heladosalegria.com.mx";
  const title = `${config.bussinesName} | Helados Artesanales en Ensenada`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${config.bussinesName}`,
    },
    description:
      "Los mejores helados artesanales de fruta natural en Ensenada. Mango, coco, oreo, ciruela, fresa, café y más, con el topping que más te guste.",
    keywords: [
      "helados Ensenada",
      "helados artesanales Ensenada",
      "helados de fruta natural",
      "paletas Ensenada",
      config.bussinesName,
    ],
    authors: [{ name: config.bussinesName }],
    openGraph: {
      title,
      description:
        "Los mejores helados artesanales de fruta natural en Ensenada, hechos con ingredientes 100% naturales.",
      url: siteUrl,
      siteName: config.bussinesName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Helados artesanales ${config.bussinesName}`,
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Los mejores helados artesanales de fruta natural en Ensenada.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

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