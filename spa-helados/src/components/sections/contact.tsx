"use client";

import { BUSINESS } from "@/lib/constants";
import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { FormState } from "@/validations/contact";
import Link from "next/link";


const initialState: FormState = { success: false, message: "" };

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Contacto
        </h2>
        <p className="mt-2 text-muted-foreground">
          Ordena atraves de Whatsapp, dejanos tus dudas o sugerencias y con gusto te atenderemos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
        {/* CTA directo a WhatsApp */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-(--radius) border border-border bg-card p-8 text-center shadow-[--shadow-elegant)]">
          <span className="text-4xl">💬</span>
          <h3 className="text-xl font-bold text-black">
            ¿Prefieres algo rápido?
          </h3>
          <p className="text-sm text-black">
            Escríbenos directo por WhatsApp y te atendemos al momento
          </p>
          <Link
            href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${BUSINESS.whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="whatsFull" size="lg" className="w-full">
              Ordenar por WhatsApp
            </Button>
          </Link>
        </div>

        {/* Formulario */}
        <form
          action={formAction}
          className="hidden flex-col gap-4 rounded-(--radius) border border-border bg-card p-8 shadow-[--shadow-elegant)]"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-card-foreground">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              defaultValue={state.data?.name}
              type="text"
              placeholder="Tu nombre"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-(--ring)/30"
            />
            {state.errors?.name && (
              <span className="text-xs text-destructive">
                {state.errors.name[0]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-card-foreground">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              defaultValue={state.data?.phone}
              type="tel"
              placeholder="6461234567"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-(--ring)/30"
            />
            {state.errors?.phone && (
              <span className="text-xs text-destructive">
                {state.errors.phone[0]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold text-card-foreground">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              defaultValue={state.data?.message}
              rows={4}
              placeholder="¿En qué te ayudamos?"
              className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-(--ring)/30"
            />
            {state.errors?.message && (
              <span className="text-xs text-destructive">
                {state.errors.message[0]}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isPending}
            className="mt-2 w-full"
          >
            Enviar mensaje
          </Button>

          {state.message && (
            <p
              className={`text-center text-sm font-medium ${state.success ? "text-success" : "text-destructive"
                }`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}