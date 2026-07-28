// validations/product.ts
import { z } from "zod";
import { categorySchema } from "./category";

// ---- Variant (tamaño u otra opción con su propio precio) ----

export const variantSchema = z.object({
  id: z.number(),
  label: z.string().min(1, "La etiqueta de la variante es requerida"),
  price: z.number().positive("El precio debe ser mayor a 0"),
});

export type Variant = z.infer<typeof variantSchema>;

// Para el formulario de variantes dentro del form de producto
// (sin id, ya que Strapi lo asigna al guardar el componente)
export const variantFormSchema = variantSchema.omit({ id: true });

export type VariantFormValues = z.infer<typeof variantFormSchema>;

// ---- Image ----
// Strapi v5 regresa varios tamaños en "formats"; normalmente solo
// necesitas la url principal + alternativeText en el frontend.

export const imageSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type ProductImage = z.infer<typeof imageSchema>;

// ---- Product (shape que consumes desde la API, Strapi v5 plano) ----
// Nota: basePrice puede venir null cuando el producto se vende
// únicamente por variantes (ej. tamaños con precio propio).

export const productSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  slug: z.string(),
  name: z.string().min(1, "El nombre del producto es requerido"),
  description: z.string().optional(),
  available: z.boolean(),
  basePrice: z.number().positive().nullable(),
  image: imageSchema.optional(),
  category: categorySchema.optional(),
  variants: z.array(variantSchema).default([]),
});

export type Product = z.infer<typeof productSchema>;

// ---- Product form (lo que llenas en un formulario de crear/editar) ----
// category va como id (lo que envías a Strapi), no como objeto completo,
// y variants no llevan id porque aún no existen en la base de datos.
// Se valida con refine que haya basePrice O al menos una variante.

export const productFormSchema = z
  .object({
    name: z.string().min(1, "El nombre del producto es requerido"),
    description: z.string().optional(),
    available: z.boolean().default(true),
    basePrice: z.number().positive("El precio debe ser mayor a 0").nullable().optional(),
    categoryId: z.number({ error: "Selecciona una categoría" }),
    variants: z.array(variantFormSchema).optional(),
  })
  .refine(
    (data) => data.basePrice != null || (data.variants && data.variants.length > 0),
    {
      message: "Define un precio base o al menos una variante con precio",
      path: ["basePrice"],
    }
  );

export type ProductFormValues = z.infer<typeof productFormSchema>;