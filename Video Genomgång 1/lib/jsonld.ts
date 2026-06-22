import { siteConfig } from "./site.config";
import { faqItems, services, testimonials } from "./content";

/** LocalBusiness + tjänster för rik sökresultatvisning. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      postalCode: siteConfig.contact.zip,
      addressLocality: siteConfig.contact.addressCity,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.lat,
      longitude: siteConfig.contact.lng,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating.replace(",", "."),
      reviewCount: 124,
      bestRating: "5",
    },
    openingHoursSpecification: siteConfig.contact.openingHours
      .filter((o) => o.time !== "Stängt")
      .map((o) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: o.days,
        opens: o.time.split("–")[0],
        closes: o.time.split("–")[1],
      })),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `Knivslipning – ${s.title}`,
        description: s.description,
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Professionell knivslipning i ${siteConfig.city}`,
    provider: { "@id": `${siteConfig.url}/#business` },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: "5",
      },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };
}
