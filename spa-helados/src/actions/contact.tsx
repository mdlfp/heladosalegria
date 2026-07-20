"use server";

import { ContactSchema, FormState } from "@/validations/contact";

export async function submitContact(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
    console.log("Hello from submitContact")

  const raw = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Revisa los campos marcados",
      data: raw,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // TODO: conectar con tu service (guardar en Supabase, enviar email, etc.)
  // await contactService.create(result.data);

  return {
    success: true,
    message: `¡Gracias ${result.data.name}! Te contactaremos pronto.`,
  };
}