import { getConfig, getHero } from "@/lib/strapi";

// Convierte "12:00:00.000" -> "12:00" (formato 24h que espera schema.org)
function toShortTime(time: string): string {
  return time.slice(0, 5);
}

export async function JsonLd() {
  const [config, hero] = await Promise.all([getConfig(), getHero()]);
  const siteUrl = config.siteUrl ?? "https://heladosalegria.com.mx";

  // Agrupa los días que comparten el mismo horario en una sola entrada
  const grouped = new Map<string, string[]>();
  for (const oh of config.openingHours) {
    const key = `${oh.opens}|${oh.closes}`;
    const days = grouped.get(key) ?? [];
    days.push(oh.dayOfWeek);
    grouped.set(key, days);
  }
  const openingHoursSpecification = Array.from(grouped.entries()).map(
    ([key, dayOfWeek]) => {
      const [opens, closes] = key.split("|");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: toShortTime(opens),
        closes: toShortTime(closes),
      };
    }
  );

  const sameAs = [config.facebook, config.instagram].filter(
    (url): url is string => Boolean(url)
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: config.bussinesName,
    image: hero.image.url,
    "@id": siteUrl,
    url: siteUrl,
    telephone: `+52${config.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.streetAddress ?? undefined,
      addressLocality: config.addressLocality ?? undefined,
      addressRegion: config.addressRegion ?? undefined,
      postalCode: config.postalCode ?? undefined,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.lat,
      longitude: config.lng,
    },
    priceRange: config.priceRange ?? undefined,
    openingHoursSpecification,
    ...(config.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(config.rating),
        reviewCount: String(config.ratingCount ?? 0),
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}