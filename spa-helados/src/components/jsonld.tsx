import { BUSINESS } from "@/lib/constants";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "La Mazorquita",
    image: `${BUSINESS.siteUrl}/logo-nobg-lamazorquita.png`,
    "@id": BUSINESS.siteUrl,
    url: BUSINESS.siteUrl,
    telephone: "+526461234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Delante 2061, Hidalgo",
      addressLocality: "Ensenada",
      addressRegion: "BC",
      postalCode: "22880",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.853723,
      longitude: -116.5868604,
    },
    servesCuisine: "Mexicana",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "17:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "34",
    },
    sameAs: [
      BUSINESS.facebook,
      BUSINESS.instagram,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}