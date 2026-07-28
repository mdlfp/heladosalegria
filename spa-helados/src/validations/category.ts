// validations/category.ts
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre de la categoría es requerido"),
});

export type Category = z.infer<typeof categorySchema>;

// Schema para crear/editar una categoría desde un formulario
// (sin id, ya que lo asigna Strapi)
export const categoryFormSchema = categorySchema.omit({ id: true });

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
