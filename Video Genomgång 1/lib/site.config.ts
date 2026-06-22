/**
 * =============================================================================
 *  CENTRAL FÖRETAGSKONFIGURATION
 * =============================================================================
 *  Allt som är företagsspecifikt bor här. Byt ut platshållarna nedan så
 *  uppdateras hela sajten (texter, SEO, structured data, footer, kontakt).
 *
 *  👉 Sök efter "FYLL_I" för att hitta alla värden som måste anpassas.
 * =============================================================================
 */

export const siteConfig = {
  // ---- Varumärke -----------------------------------------------------------
  name: "[FÖRETAGSNAMN]", // FYLL_I – t.ex. "EggKraft Knivslipning"
  legalName: "[FÖRETAGSNAMN] AB", // FYLL_I
  tagline: "Professionell knivslipning",
  shortDescription:
    "Få rakbladsvassa knivar med snabb service och professionellt resultat – för restauranger, skolor, storkök, catering och privatpersoner.",

  // ---- Domän & URL ---------------------------------------------------------
  url: "https://www.example.se", // FYLL_I – din riktiga domän
  ogImage: "/images/og-image.svg",

  // ---- Plats / SEO-ort -----------------------------------------------------
  city: "Malmö", // FYLL_I
  region: "Skåne",
  country: "SE",

  // ---- Kontaktuppgifter ----------------------------------------------------
  contact: {
    phone: "+46 40 123 45 67", // FYLL_I
    phoneHref: "tel:+4640123456", // FYLL_I
    email: "info@example.se", // FYLL_I
    emailHref: "mailto:info@example.se", // FYLL_I
    address: "Verkstadsgatan 1", // FYLL_I
    zip: "211 00", // FYLL_I
    addressCity: "Malmö", // FYLL_I
    // Latitud/longitud används för structured data + Google Maps-inbäddning
    lat: 55.6050,
    lng: 13.0038,
    // Öppettider för structured data + kontaktsektion
    openingHours: [
      { days: "Måndag–Fredag", time: "08:00–17:00" },
      { days: "Lördag", time: "10:00–14:00" },
      { days: "Söndag", time: "Stängt" },
    ],
  },

  // ---- Sociala medier ------------------------------------------------------
  social: {
    facebook: "https://facebook.com/", // FYLL_I
    instagram: "https://instagram.com/", // FYLL_I
    linkedin: "https://linkedin.com/", // FYLL_I
  },

  // ---- Förtroendesiffror (visas i hero/om-oss) -----------------------------
  stats: {
    yearsExperience: "15+",
    knivesSharpened: "120 000+",
    happyClients: "850+",
    rating: "4,9",
  },
} as const;

export type SiteConfig = typeof siteConfig;
