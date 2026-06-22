"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="tjanster" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl hairline" />
      <div className="container">
        <SectionHeading
          eyebrow="Våra tjänster"
          title={
            <>
              Skräddarsydd slipning för{" "}
              <span className="text-gold-gradient">varje verksamhet</span>
            </>
          }
          description="Oavsett om du driver ett restaurangkök eller bara vill ha vassa knivar hemma – vi har en lösning som passar."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delayIndex={i}
              as="article"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-glow"
            >
              {/* Hover-glöd */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative grid size-14 place-items-center rounded-2xl bg-gold/10 text-gold ring-1 ring-inset ring-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-gradient group-hover:text-black">
                <service.icon className="size-7" />
              </div>

              <h3 className="relative mt-6 font-display text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <a
                href="#boka"
                className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-100"
              >
                Läs mer
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}

          {/* CTA-kort */}
          <Reveal
            delayIndex={services.length}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gold-gradient p-7 text-black shadow-glow"
          >
            <div>
              <h3 className="font-display text-xl font-semibold">
                Osäker på vad du behöver?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                Vi hjälper dig att hitta rätt upplägg och ger dig en kostnadsfri
                offert anpassad efter din verksamhet.
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 hover:underline"
            >
              Kontakta oss
              <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
