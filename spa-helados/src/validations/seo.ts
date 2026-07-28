import { z } from "zod";
import { imageSchema } from "./product";
 
export const seoSchema = z.object({
  siteTitle: z.string().min(1),
  titleTemplate: z.string().nullish(),
  metaDescription: z.string().min(1),
  favicon: imageSchema.nullish(),
  ogImage: imageSchema.nullish(),
  ogImageAlt: z.string().nullish(),
  ogTitle: z.string().nullish(),
  ogDescription: z.string().nullish(),
  keywords: z.string().nullish(),
});
 
export type Seo = z.infer<typeof seoSchema>;
 
