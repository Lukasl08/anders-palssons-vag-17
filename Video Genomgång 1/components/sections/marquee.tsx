"use client";

import { Flame } from "lucide-react";

const items = [
  "Rakbladsvasst resultat",
  "Mobil service – vi kommer till dig",
  "Samma höga kvalitet varje gång",
  "Hämtning & leverans",
  "Restauranger · Skolor · Storkök",
  "Snabb omloppstid",
  "Hantverk sedan första gnistan",
  "Catering & privatpersoner",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-ember-700/20 via-background to-ember-700/20 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-display text-lg font-medium text-foreground/80">
              {item}
            </span>
            <Flame className="size-4 shrink-0 text-ember-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
