"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { benefits } from "@/lib/content";
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

          <Reveal className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: siteConfig.stats.knivesSharpened, label: "slipade knivar" },
              { value: siteConfig.stats.rating, label: "snittbetyg" },
              { value: siteConfig.stats.happyClients, label: "nöjda kunder" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-5 text-center"
              >
                <div className="font-display text-2xl font-bold text-gold-gradient">
                  {s.value}
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
              className="group flex gap-4 rounded-2xl border border-white/10 bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-card/80"
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
