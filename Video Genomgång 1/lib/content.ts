/**
 * =============================================================================
 *  INNEHÅLL / DATA
 * =============================================================================
 *  Tjänster, process, fördelar, recensioner, FAQ och galleribilder.
 *  Allt är data-drivet – lägg till/ta bort objekt här så uppdateras sektionerna.
 *
 *  Bilder: byt ut sökvägarna i `galleryImages` och `aboutImage` mot egna foton
 *  i /public/images/. Variabelnamnen är medvetet tydliga.
 * =============================================================================
 */

import type { LucideIcon } from "lucide-react";
import {
  UtensilsCrossed,
  GraduationCap,
  ChefHat,
  Truck,
  Home,
  ShieldCheck,
  Clock4,
  HeartHandshake,
  Wallet,
  Sparkles,
} from "lucide-react";

/* --------------------------------- Tjänster ------------------------------- */
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "restauranger",
    icon: UtensilsCrossed,
    title: "Restauranger",
    description:
      "Vassa knivar är grunden i ett professionellt kök. Vi sliper allt från kockknivar till urbenare och håller din linje skärande dygnet runt.",
  },
  {
    id: "skolor",
    icon: GraduationCap,
    title: "Skolkök",
    description:
      "Säkra och effektiva knivar i skolköket. Vi anpassar slipning och hämtning efter era scheman med dokumenterad hygien.",
  },
  {
    id: "storkok",
    icon: ChefHat,
    title: "Storkök",
    description:
      "Höga volymer ställer höga krav. Vi sliper i större partier med snabb omloppstid så produktionen aldrig stannar.",
  },
  {
    id: "catering",
    icon: Truck,
    title: "Catering",
    description:
      "Flexibel service för rörliga verksamheter. Vi hämtar, sliper och levererar i tid till nästa event – varje gång.",
  },
  {
    id: "privatpersoner",
    icon: Home,
    title: "Privatpersoner",
    description:
      "Ge dina köksknivar nytt liv. Professionell slipning av kockknivar, japanska knivar, saxar och mer – som nya igen.",
  },
];

/* --------------------------------- Process -------------------------------- */
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Boka tid",
    description:
      "Fyll i formuläret eller ring oss. Du får snabb bekräftelse och en tid som passar din verksamhet.",
  },
  {
    number: "02",
    title: "Vi hämtar eller tar emot",
    description:
      "Lämna in på verkstaden eller låt oss hämta knivarna hos dig. Säker hantering och tydlig märkning hela vägen.",
  },
  {
    number: "03",
    title: "Professionell slipning",
    description:
      "Vi slipar för hand och med precisionsutrustning – rätt vinkel, rätt egg, kontrollerad och dokumenterad kvalitet.",
  },
  {
    number: "04",
    title: "Leverans eller upphämtning",
    description:
      "Rakbladsvassa knivar levereras tillbaka, skyddade och redo att användas direkt. Snabbt och smidigt.",
  },
];

/* --------------------------------- Fördelar ------------------------------- */
export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: Clock4,
    title: "Förlänger livslängden",
    description:
      "Korrekt slipning tar bort minimalt med stål och bevarar knivens balans – dina knivar håller i många år till.",
  },
  {
    icon: ShieldCheck,
    title: "Ökar säkerheten",
    description:
      "En vass kniv slinter mindre än en slö. Färre skär- och belastningsskador i köket.",
  },
  {
    icon: Sparkles,
    title: "Bättre arbetsmiljö",
    description:
      "Personalen jobbar snabbare och bekvämare när verktygen fungerar som de ska – mindre frustration, jämnare flöde.",
  },
  {
    icon: Wallet,
    title: "Sparar pengar",
    description:
      "Slipning är en bråkdel av kostnaden för nya knivar. Underhåll i stället för att byta ut.",
  },
  {
    icon: HeartHandshake,
    title: "Professionellt resultat",
    description:
      "Konsekvent, dokumenterad kvalitet varje gång – samma höga standard som Sveriges främsta kök förlitar sig på.",
  },
];

/* ------------------------------ Kundrecensioner --------------------------- */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Fantastiskt resultat. Våra köksknivar känns som nya och servicen är snabb varje gång. Vi har inte köpt nya knivar på två år.",
    name: "Maria Lindqvist",
    role: "Kökschef, Restaurang Salt & Citron",
    rating: 5,
  },
  {
    quote:
      "Hämtning och leverans gör det otroligt smidigt för vårt storkök. Knivarna kommer tillbaka rakbladsvassa och perfekt märkta.",
    name: "Johan Persson",
    role: "Produktionsledare, Storkök Syd",
    rating: 5,
  },
  {
    quote:
      "Som privatperson trodde jag inte att skillnaden skulle vara så stor. Mina japanska knivar skär som en dröm igen. Rekommenderas varmt.",
    name: "Sofia Ahmadi",
    role: "Privatkund",
    rating: 5,
  },
  {
    quote:
      "Pålitliga, noggranna och alltid i tid. För en cateringverksamhet som vår är det guld värt att kunna lita på att utrustningen funkar.",
    name: "Erik Nyström",
    role: "Ägare, Nyström Catering",
    rating: 5,
  },
];

/* ------------------------------------ FAQ --------------------------------- */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Hur lång tid tar slipningen?",
    answer:
      "De flesta knivar är klara inom 1–3 arbetsdagar. För större verksamheter erbjuder vi expressservice och fasta hämtningsscheman så att ni alltid har vassa knivar i rotation.",
  },
  {
    question: "Vad kostar det?",
    answer:
      "Priset beror på typ av kniv och antal. Vi har volymrabatter för restauranger, skolor och storkök. Skicka en bokningsförfrågan så får du en tydlig och kostnadsfri offert.",
  },
  {
    question: "Hämtar ni knivarna?",
    answer:
      "Ja. Vi erbjuder hämtning och leverans i området för företagskunder, och för privatpersoner finns både inlämning på verkstaden och upphämtning vid behov. Allt hanteras säkert och märkt.",
  },
  {
    question: "Kan privatpersoner boka?",
    answer:
      "Absolut. Vi sliper köksknivar, japanska knivar, saxar och fler verktyg för privatpersoner med samma professionella resultat som för restauranger.",
  },
  {
    question: "Vilka typer av knivar sliper ni?",
    answer:
      "Allt från kockknivar, urbenare och brödknivar till japanska enkelfas-knivar, saxar och specialverktyg. Är du osäker – fråga oss, vi hjälper dig.",
  },
  {
    question: "Hur ofta bör knivar slipas?",
    answer:
      "I professionella kök rekommenderas slipning var 4–8 vecka beroende på användning. Vi hjälper dig att lägga upp ett underhållsschema som passar din verksamhet.",
  },
];

/* --------------------------------- Galleri -------------------------------- */
/**
 * Före/efter-bilder. Byt ut `before` och `after` mot egna foton i
 * /public/images/. Behåll samma bildförhållande (4:3) för bästa resultat.
 */
export interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  alt: string;
}

export const galleryImages: GalleryItem[] = [
  {
    id: "chef-knife",
    title: "Kockkniv",
    before: "/images/gallery/chefkniv-fore.svg",
    after: "/images/gallery/chefkniv-efter.svg",
    alt: "Professionell slipning av kockkniv – före och efter",
  },
  {
    id: "japanese",
    title: "Japansk kniv",
    before: "/images/gallery/japansk-fore.svg",
    after: "/images/gallery/japansk-efter.svg",
    alt: "Slipning av japansk kniv – före och efter",
  },
  {
    id: "bread",
    title: "Brödkniv",
    before: "/images/gallery/brodkniv-fore.svg",
    after: "/images/gallery/brodkniv-efter.svg",
    alt: "Slipning av tandad brödkniv – före och efter",
  },
  {
    id: "santoku",
    title: "Santoku",
    before: "/images/gallery/santoku-fore.svg",
    after: "/images/gallery/santoku-efter.svg",
    alt: "Slipning av santoku-kniv – före och efter",
  },
];

/* ----------------------------- Bildvariabler ------------------------------ */
/** Byt ut dessa mot egna foton i /public/images/. */
export const heroImage = "/images/hero-knivslipning.svg";
export const aboutImage = "/images/om-oss-verkstad.svg";
export const mobileServiceImage = "/images/mobil-service.svg";
export const actionImage = "/images/slipning-action.svg";
export const steakImage = "/images/steak.svg";

/* --------------------------- Kundtyper (formulär) ------------------------- */
export const customerTypes = [
  "Restaurang",
  "Skolkök",
  "Storkök",
  "Catering",
  "Privatperson",
  "Övrigt",
] as const;
