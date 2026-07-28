// components/navbar.tsx
// Server Component: obtiene los datos del negocio desde Strapi y se
// los pasa al Navbar (Client Component) que maneja el scroll y el
// menú móvil.

import { getConfig } from "@/lib/strapi";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const config = await getConfig();
  const whatsappHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    config.whatsappMessage
  )}`;

  return (
    <NavbarClient
      businessName={config.bussinesName}
      whatsappHref={whatsappHref}
    />
  );
}