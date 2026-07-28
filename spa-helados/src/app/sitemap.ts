import { MetadataRoute } from "next";
import { getConfig } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getConfig();
  const siteUrl = config.siteUrl ?? "https://heladosalegria.com.mx";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}