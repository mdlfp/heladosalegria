// components/menu.tsx
// Server Component: obtiene los productos de Strapi y se los pasa
// al carrusel (Client Component) que maneja la interacción.

import { getProducts } from "@/lib/strapi";
import { MenuCarousel } from "../menu/menu-carousel";

export async function Menu() {
  const products = await getProducts();

  return (
    <section id="menu" className="px-4 py-16 md:px-6">
      <h2 className="text-gradient-white mb-10 text-center text-7xl">
        Nuestros Sabores
      </h2>

      <MenuCarousel items={products} />
    </section>
  );
}