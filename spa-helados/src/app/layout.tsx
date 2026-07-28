import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getConfig, getSeo } from "@/lib/strapi";

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
  const [config, seo] = await Promise.all([getConfig(), getSeo()]);
  const siteUrl = config.siteUrl ?? "https://heladosalegria.com.mx";

  const title = seo.siteTitle;
  const description = seo.metaDescription;
  const ogTitle = seo.ogTitle ?? title;
  const ogDescription = seo.ogDescription ?? description;
  const ogImageUrl = seo.ogImage?.url ?? "/og-image.jpg";
  const ogImageAlt = seo.ogImageAlt ?? `${config.bussinesName}`;
  const keywords = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim())
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: seo.titleTemplate ?? `%s | ${config.bussinesName}`,
    },
    description,
    keywords,
    authors: [{ name: config.bussinesName }],
    icons: seo.favicon ? { icon: seo.favicon.url } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: siteUrl,
      siteName: config.bussinesName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
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