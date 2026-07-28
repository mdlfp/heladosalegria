import { getConfig } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Contact() {
  const config = await getConfig();
  const whatsappHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    config.whatsappMessage
  )}`;

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
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="whatsFull" size="lg" className="w-full">
              Ordenar por WhatsApp
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}