/**
 * Genererar forge/eld-tematiska platshållar-SVG:er i /public/images.
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

const rnd = (seed) => {
  // deterministisk pseudo-random så bilderna ser likadana ut vid varje körning
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Gnistor/embers utspridda i scenen
function sparks(count, seed, color) {
  const r = rnd(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = r() * 1200;
    const y = 250 + r() * 600;
    const rad = 1 + r() * 3.5;
    const op = 0.3 + r() * 0.6;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(
      1
    )}" fill="${color}" opacity="${op.toFixed(2)}"/>`;
  }
  return out;
}

const knife = (x, y, scale, hot, dull = false) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    ${
      hot
        ? `<path d="M-120 30 L90 -28 Q120 -34 120 -10 Q120 12 92 18 L-110 50 Z"
            fill="none" stroke="url(#hotedge)" stroke-width="10" opacity="0.85"
            filter="url(#soft)"/>`
        : ""
    }
    <path d="M-120 30 L90 -28 Q120 -34 120 -10 Q120 12 92 18 L-110 50 Z"
      fill="url(#steel)" stroke="${hot ? "#ffb066" : dull ? "#8a8f96" : "#E7B765"}"
      stroke-width="${dull ? 1 : 2}" />
    <path d="M-120 30 L90 -28 Q120 -34 120 -10"
      fill="none" stroke="${hot ? "#fff3e0" : dull ? "#7c7c7c" : "#ffffff"}"
      stroke-width="${dull ? 4 : 1.6}" opacity="${dull ? 0.5 : 0.95}" />
    <rect x="-180" y="20" width="70" height="26" rx="10" fill="#241712" />
    <rect x="-180" y="20" width="70" height="13" rx="10" fill="#3a2a1a" />
  </g>`;

function scene({ title, subtitle, dull = false, hot = false, seed = 7 }) {
  const accent = dull ? "#9aa0a6" : "#FF8A2B";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#140a05"/>
      <stop offset="0.55" stop-color="#0c0805"/>
      <stop offset="1" stop-color="#080709"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef1f5"/>
      <stop offset="0.5" stop-color="#aab4c0"/>
      <stop offset="1" stop-color="#79838f"/>
    </linearGradient>
    <linearGradient id="hotedge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff3d6"/>
      <stop offset="0.5" stop-color="#ff8a2b"/>
      <stop offset="1" stop-color="#f2480c"/>
    </linearGradient>
    <radialGradient id="forge" cx="0.5" cy="1" r="0.75">
      <stop offset="0" stop-color="#ff6a1a" stop-opacity="${dull ? 0.12 : 0.5}"/>
      <stop offset="0.4" stop-color="#f2480c" stop-opacity="${dull ? 0.06 : 0.22}"/>
      <stop offset="1" stop-color="#f2480c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="topglow" cx="0.5" cy="0.1" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#forge)"/>
  <rect width="1200" height="900" fill="url(#topglow)"/>
  ${sparks(dull ? 10 : 38, seed, "#ff9a3c")}
  ${sparks(dull ? 4 : 14, seed + 13, "#ffd9a8")}
  ${knife(600, 460, 2.1, hot, dull)}
  <text x="600" y="770" text-anchor="middle" font-family="Georgia, serif"
    font-size="56" fill="#f6ead6" opacity="0.94">${title}</text>
  <text x="600" y="824" text-anchor="middle" font-family="Arial, sans-serif"
    font-size="26" fill="#ffb98a" opacity="0.85">${subtitle}</text>
</svg>`;
}

// Smedja/eld-bakgrund utan kniv (för dekorativa sektioner)
function forgeScene({ title, subtitle, seed = 21 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="#1a0d06"/>
      <stop offset="0.6" stop-color="#0d0805"/>
      <stop offset="1" stop-color="#070608"/>
    </linearGradient>
    <radialGradient id="fire" cx="0.5" cy="0.92" r="0.7">
      <stop offset="0" stop-color="#ffd9a8" stop-opacity="0.9"/>
      <stop offset="0.25" stop-color="#ff8a2b" stop-opacity="0.7"/>
      <stop offset="0.6" stop-color="#f2480c" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#f2480c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg2)"/>
  <ellipse cx="600" cy="900" rx="520" ry="360" fill="url(#fire)"/>
  ${sparks(70, seed, "#ff9a3c")}
  ${sparks(28, seed + 9, "#ffe2bd")}
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, serif"
    font-size="60" fill="#f6ead6" opacity="0.95">${title}</text>
  <text x="600" y="486" text-anchor="middle" font-family="Arial, sans-serif"
    font-size="26" fill="#ffb98a" opacity="0.85">${subtitle}</text>
</svg>`;
}

const files = {
  "hero-knivslipning.svg": scene({
    title: "Glödhett hantverk",
    subtitle: "Rakbladsvass egg – platshållarbild",
    hot: true,
    seed: 3,
  }),
  "om-oss-verkstad.svg": forgeScene({
    title: "Vår verkstad",
    subtitle: "Hantverk & precision – platshållarbild",
    seed: 8,
  }),
  "mobil-service.svg": forgeScene({
    title: "Mobil knivslipning",
    subtitle: "Vi kommer till dig – platshållarbild",
    seed: 31,
  }),
  "slipning-action.svg": scene({
    title: "Gnistor flyger",
    subtitle: "Slipning i verkstaden – platshållarbild",
    hot: true,
    seed: 17,
  }),
  "steak.svg": scene({
    title: "Skär som en dröm",
    subtitle: "Testad egg – platshållarbild",
    seed: 24,
  }),
  "og-image.svg": forgeScene({
    title: "Professionell knivslipning",
    subtitle: "Snabb service · Eldigt resultat",
    seed: 5,
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
    dull: true,
    seed: 40 + slug.length,
  });
  files[`gallery/${slug}-efter.svg`] = scene({
    title: name,
    subtitle: "Efter slipning",
    hot: true,
    seed: 70 + slug.length,
  });
}

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(root, name), content.trim());
  console.log("✓", name);
}
console.log("Klart – forge/eld-platshållare skapade i public/images/");
