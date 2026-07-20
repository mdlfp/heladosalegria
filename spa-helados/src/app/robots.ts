import { MetadataRoute } from "next";

const SITE_URL = "https://la-mazorquita.vercel.app"; // cambia cuando tengas el dominio final

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}