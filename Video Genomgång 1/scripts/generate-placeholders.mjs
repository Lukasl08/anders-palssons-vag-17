/**
 * Genererar enkla platshållar-SVG:er i /public/images.
 * Kör med:  node scripts/generate-placeholders.mjs
 * Byt sedan ut filerna mot egna foton (behåll filnamnen, eller uppdatera
 * sökvägarna i lib/content.ts).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public", "images");
mkdirSync(join(root, "gallery"), { recursive: true });

const knife = (x, y, scale, color, dull = false) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-120 30 L90 -28 Q120 -34 120 -10 Q120 12 92 18 L-110 50 Z"
      fill="url(#steel)" stroke="${color}" stroke-width="${dull ? 1 : 2}" />
    <path d="M-120 30 L90 -28 Q120 -34 120 -10"
      fill="none" stroke="${dull ? "#7c7c7c" : "#ffffff"}"
      stroke-width="${dull ? 4 : 1.5}" opacity="${dull ? 0.5 : 0.9}" />
    <rect x="-180" y="20" width="70" height="26" rx="10" fill="#2a1d12" />
    <rect x="-180" y="20" width="70" height="13" rx="10" fill="#3a2a1a" />
  </g>`;

function scene({ title, subtitle, hueA, hueB, dull }) {
  const accent = dull ? "#9aa0a6" : "#E7B765";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${hueA}"/>
      <stop offset="1" stop-color="${hueB}"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e9edf2"/>
      <stop offset="0.5" stop-color="#aab4c0"/>
      <stop offset="1" stop-color="#7d8794"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#glow)"/>
  ${knife(600, 470, 2.1, accent, dull)}
  <text x="600" y="760" text-anchor="middle" font-family="Georgia, serif"
    font-size="54" fill="#f4ead6" opacity="0.92">${title}</text>
  <text x="600" y="812" text-anchor="middle" font-family="Arial, sans-serif"
    font-size="26" fill="#c9b48f" opacity="0.8">${subtitle}</text>
</svg>`;
}

const files = {
  "hero-knivslipning.svg": scene({
    title: "Professionell knivslipning",
    subtitle: "Rakbladsvass egg – platshållarbild",
    hueA: "#10141b",
    hueB: "#1c1208",
    dull: false,
  }),
  "om-oss-verkstad.svg": scene({
    title: "Vår verkstad",
    subtitle: "Hantverk & precision – platshållarbild",
    hueA: "#141821",
    hueB: "#0e0b07",
    dull: false,
  }),
  "og-image.svg": scene({
    title: "Knivslipning",
    subtitle: "Snabb service · Professionellt resultat",
    hueA: "#0c0f14",
    hueB: "#201405",
    dull: false,
  }),
};

const knives = [
  ["chefkniv", "Kockkniv"],
  ["japansk", "Japansk kniv"],
  ["brodkniv", "Brödkniv"],
  ["santoku", "Santoku"],
];
for (const [slug, name] of knives) {
  files[`gallery/${slug}-fore.svg`] = scene({
    title: name,
    subtitle: "Före slipning",
    hueA: "#15171b",
    hueB: "#1a1c20",
    dull: true,
  });
  files[`gallery/${slug}-efter.svg`] = scene({
    title: name,
    subtitle: "Efter slipning",
    hueA: "#13161d",
    hueB: "#241606",
    dull: false,
  });
}

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(root, name), content.trim());
  console.log("✓", name);
}
console.log("Klart – platshållarbilder skapade i public/images/");
