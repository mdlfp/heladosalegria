// lib/flavor.ts
// Deriva un "flavorKey" a partir del nombre del producto para mapear
// estilos (gradientes) e imágenes locales de respaldo por sabor.
// No depende de un slug en Strapi -- busca coincidencias de palabras
// clave conocidas dentro del nombre.

const KNOWN_FLAVORS = ["mango", "coco", "oreo", "ciruela", "fresa", "cafe"] as const;

export type FlavorKey = (typeof KNOWN_FLAVORS)[number] | "default";

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos (café -> cafe)
}

export function getFlavorKey(name: string): FlavorKey {
  const normalized = normalize(name);
  return KNOWN_FLAVORS.find((flavor) => normalized.includes(flavor)) ?? "default";
}