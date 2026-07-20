import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "Solo números"),
  message: z
    .string()
    .min(5, "Cuéntanos un poco más")
    .max(500, "Máximo 500 caracteres"),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export interface FormState {
  success?: boolean;
  message?: string;
  data?: {
    name: string,
    phone: string,
    message: string,
  }
  errors?: Partial<Record<keyof ContactInput, string[]>>;
}