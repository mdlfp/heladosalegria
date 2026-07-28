// validations/config.ts
import { z } from "zod";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// Normaliza el valor que venga de Strapi (sin importar mayúsculas/minúsculas
// o espacios) para que haga match con el enum, en vez de tronar si no
// coincide exactamente carácter por carácter.
const dayOfWeekSchema = z.preprocess((val) => {
  if (typeof val !== "string") return val;
  const match = DAYS_OF_WEEK.find(
    (d) => d.toLowerCase() === val.trim().toLowerCase()
  );
  return match ?? val;
}, z.enum(DAYS_OF_WEEK));

export const openingHourSchema = z.object({
  id: z.number(),
  dayOfWeek: dayOfWeekSchema,
  opens: z.string(), // ej. "12:00:00.000"
  closes: z.string(),
});

export type OpeningHour = z.infer<typeof openingHourSchema>;

export const configSchema = z.object({
  bussinesName: z.string().min(1),
  whatsappNumber: z.string().min(1),
  whatsappMessage: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
  mapsUrl: z.string(),
  email: z.string().nullish(),
  facebook: z.string().nullish(),
  instagram: z.string().nullish(),
  siteUrl: z.string().nullish(),
  rating: z.number().nullish(),
  ratingCount: z.number().nullish(),
  streetAddress: z.string().nullish(),
  addressLocality: z.string().nullish(),
  addressRegion: z.string().nullish(),
  postalCode: z.string().nullish(),
  priceRange: z.string().nullish(),
  openingHours: z.array(openingHourSchema).default([]),
});

export type Config = z.infer<typeof configSchema>;