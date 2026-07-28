// validations/hero.ts
import { z } from "zod";
import { imageSchema } from "./product";

export const heroSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  subtitle: z.string().min(1, "El subtítulo es requerido"),
  image: imageSchema,
  ctaText: z.string().min(1, "El texto del botón es requerido"),
  ctaLink: z.string().min(1, "El link del botón es requerido"),
});

export type Hero = z.infer<typeof heroSchema>;