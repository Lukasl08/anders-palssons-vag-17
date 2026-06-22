"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Embers } from "@/components/fx/embers";
import { mobileServiceImage } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

const points = [
  {
    icon: Truck,
    title: "Vi kommer till er",
    text: "Vår mobila service tar slipningen direkt till ert kök – inget behöver lämna verksamheten.",
  },
  {
    icon: Clock,
    title: "Samma dag, snabb omloppstid",
    text: "Mindre väntan och kortare ledtider så att produktionen aldrig står still.",
  },
  {
    icon: MapPin,
    title: `I hela ${siteConfig.city} med omnejd`,
    text: "Restauranger, skolor, storkök och catering – vi planerar rutter efter era scheman.",
  },
];

export function MobileService() {
  return (
    <section
      id="mobil-service"
      className="relative overflow-hidden bg-forge-gradient py-24 sm:py-32"
    >
      <Embers className="z-0 opacity-50" density={40} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-ember-fade opacity-70" />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-2">
        {/* Bild */}
        <Reveal className="relative">
          <div className="ember-aura relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
            <Image
              src={mobileServiceImage}
              alt="Mobil knivslipning – vi kommer till din verksamhet"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
          </div>

          {/* Flytande badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass absolute -bottom-5 right-5 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-card"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-flame-gradient text-black">
              <Sparkles className="size-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Sharper is better
              </div>
              <div className="text-xs text-muted-foreground">
                Inget krångel – bara skärpa
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Text */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Mobil service"
            title={
              <>
                Knivslipning som{" "}
                <span className="text-flame-gradient">kommer till dig</span>
              </>
            }
            description="Slipp transporten. Vår mobila tjänst slipar dina knivar på plats eller hämtar och levererar – snabbt, smidigt och med samma glödheta precision varje gång."
          />

          <div className="mt-8 space-y-4">
            {points.map((point, i) => (
              <Reveal
                key={point.title}
                delayIndex={i}
                className="glass glass-hover group flex gap-4 p-5"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ember-500/10 text-ember-300 transition-colors group-hover:bg-flame-gradient group-hover:text-black">
                  <point.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayIndex={3} className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-flame-gradient shadow-ember"
            >
              <a href="#boka">
                <Truck className="size-4" />
                Boka mobil service
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
