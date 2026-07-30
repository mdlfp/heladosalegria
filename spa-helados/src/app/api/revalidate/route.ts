import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Mapea el nombre del content-type que manda Strapi (campo "model" en
// el payload del webhook) a los tags de cache que usamos en lib/strapi.tsx
const MODEL_TAG_MAP: Record<string, string[]> = {
  product: ["products"],
  category: ["categories"],
  hero: ["hero"],
  config: ["config"],
  seo: ["seo"],
};

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Secret inválido" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const model: string | undefined = body?.model;

  if (!model) {
    return NextResponse.json(
      { message: "El payload no incluye 'model'" },
      { status: 400 }
    );
  }

  const tags = MODEL_TAG_MAP[model];

  if (!tags) {
    // No es un error -- simplemente no tenemos ese content-type mapeado.
    return NextResponse.json({
      revalidated: false,
      message: `No hay tag mapeado para el modelo "${model}"`,
    });
  }

  // { expire: 0 } expira el tag de inmediato -- es lo recomendado por
  // Next.js específicamente para webhooks de sistemas externos como
  // este (a diferencia de "max", que solo marca como "stale" y espera
  // a la siguiente visita para revalidar en segundo plano).
  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

  return NextResponse.json({ revalidated: true, tags, model });
}