// lib/whatsapp.ts

// Si el link es de wa.me, le agrega (o completa) el parámetro ?text=
// con el mensaje predeterminado de Config. Si no es un link de
// WhatsApp, lo deja intacto (por si en Strapi lo cambian a otra cosa).
export function withWhatsAppMessage(link: string, message: string): string {
  if (!link.includes("wa.me")) return link;
  const separator = link.includes("?") ? "&" : "?";
  return `${link}${separator}text=${encodeURIComponent(message)}`;
}