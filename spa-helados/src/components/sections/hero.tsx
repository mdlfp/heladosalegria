import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getHero, getConfig } from "@/lib/strapi";
import { withWhatsAppMessage } from "@/lib/whatsapp";

export async function Hero() {
  const [hero, config] = await Promise.all([getHero(), getConfig()]);
  const whatsappHref = withWhatsAppMessage(hero.ctaLink, config.whatsappMessage);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-20 md:px-6"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-1">
        {/* Columna de imagen */}
        <div className="relative  mx-auto aspect-square w-full max-w-2xl order-0 md:order-0">
          <div className="absolute inset-0 rounded-full bg-(--primary)/20 blur-3xl" />
          <Image
            src={hero.image.url}
            alt={hero.image.alternativeText || hero.title}
            fill
            unoptimized
            sizes="100vw"
            className="relative object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Columna de texto */}

        <div className="flex flex-col gap-6 text-center md:text-left order-0 md:order-0">
          <span className="mx-auto inline-block w-fit rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white md:mx-auto">
            Helados y mas.
          </span>

          <h1 className="text-4xl text-center font-extrabold leading-tight text-foreground md:text-7xl">
            {hero.title}
          </h1>

          <p className="text-lg text-center text-muted-foreground md:text-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-col text-center justify-center gap-4 sm:flex-row ">
            <Link href={"#menu"}>
              <Button variant="primary" size="lg">
                Ver Sabores
              </Button>
            </Link>
            <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsFull" size="lg">
                {hero.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}