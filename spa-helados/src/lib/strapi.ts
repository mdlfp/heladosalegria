// lib/strapi.tsx
// Cliente helper para consumir la API de Strapi (v5 — respuesta plana)

import { productSchema, type Product } from "@/validations/product";
import { categorySchema, type Category } from "@/validations/category";
import { heroSchema, type Hero } from "@/validations/hero";
import { configSchema, type Config } from "@/validations/config";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ---- Función genérica de fetch ----

async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, any> = {}
): Promise<T> {
  const queryString = new URLSearchParams(urlParamsObject as any).toString();
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store", // ajusta según tu estrategia de cache
  });

  if (!res.ok) {
    throw new Error(`Error al consumir Strapi (${res.status}): ${path}`);
  }

  const json = await res.json();
  return json.data;
}

// ---- Normalización de imagen ----
// Strapi v5 regresa la imagen plana (sin "data.attributes"), aquí solo
// convertimos la url relativa en absoluta.

function normalizeImage(image: any) {
  if (!image) return undefined;
  return {
    url: `${STRAPI_URL}${image.url}`,
    alternativeText: image.alternativeText ?? undefined,
    width: image.width,
    height: image.height,
  };
}

// ---- Funciones específicas ----

export async function getProducts(): Promise<Product[]> {
  const data = await fetchAPI<any[]>("/products", { populate: "*" });
  return data.map((item) =>
    productSchema.parse({
      ...item,
      image: normalizeImage(item.image),
    })
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchAPI<any[]>("/products", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  if (!data || data.length === 0) return null;

  return productSchema.parse({
    ...data[0],
    image: normalizeImage(data[0].image),
  });
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchAPI<any[]>("/categories", { populate: "*" });
  return data.map((item) => categorySchema.parse(item));
}

export async function getHero(): Promise<Hero> {
  const data = await fetchAPI<any>("/hero", { populate: "*" });
  return heroSchema.parse({
    ...data,
    image: normalizeImage(data.image),
  });
}

export async function getConfig(): Promise<Config> {
  const data = await fetchAPI<any>("/config", { populate: "*" });
  return configSchema.parse({
    ...data,
    // Descarta entradas de horario incompletas (ej. un renglón que se
    // agregó en Strapi pero aún no se le asignó día u horas) para que
    // un registro a medias no rompa todo el sitio.
    openingHours: (data.openingHours ?? []).filter(
      (oh: any) => oh?.dayOfWeek && oh?.opens && oh?.closes
    ),
  });
}