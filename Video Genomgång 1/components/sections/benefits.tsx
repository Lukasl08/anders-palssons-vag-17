"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/fx/animated-counter";
import { benefits, steakImage } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

export function Benefits() {
  return (
    <section id="fordelar" className="relative py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Fördelar"
            title={
              <>
                Varför vassa knivar är en{" "}
                <span className="text-gold-gradient">investering</span>
              </>
            }
            description="Professionell slipning handlar om mer än skärpa – det påverkar ekonomi, säkerhet och arbetsmiljö i hela din verksamhet."
          />

          <Reveal className="ember-aura mt-8 overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={steakImage}
                alt="Rakbladsvass egg som skär utan motstånd"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 font-display text-lg text-foreground/90">
                Sharper is better.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-5 grid grid-cols-3 gap-4">
            {[
              { value: siteConfig.stats.knivesSharpened, label: "slipade knivar" },
              { value: siteConfig.stats.rating, label: "snittbetyg" },
              { value: siteConfig.stats.happyClients, label: "nöjda kunder" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-5 text-center"
              >
                <div className="font-display text-2xl font-bold text-flame-gradient">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <Reveal
              key={benefit.title}
              delayIndex={i}
              className="glass glass-hover group flex gap-4 p-5"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <benefit.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
