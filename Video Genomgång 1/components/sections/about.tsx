"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Crosshair, Gem, Headset } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site.config";
import { aboutImage } from "@/lib/content";

const pillars = [
  {
    icon: Award,
    title: "Erfarenhet",
    text: "Många år bakom slipstenen för Sveriges mest krävande kök.",
  },
  {
    icon: Crosshair,
    title: "Noggrannhet",
    text: "Rätt vinkel, rätt egg – varje kniv hanteras individuellt.",
  },
  {
    icon: Gem,
    title: "Kvalitet",
    text: "Konsekvent, dokumenterat resultat du kan lita på varje gång.",
  },
  {
    icon: Headset,
    title: "Kundservice",
    text: "Personlig kontakt, snabba svar och service som anpassas efter dig.",
  },
];

export function About() {
  return (
    <section id="om-oss" className="relative py-24 sm:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        {/* Bild */}
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
            <Image
              src={aboutImage}
              alt="Vår verkstad för professionell knivslipning"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
          </div>

          {/* Erfarenhetsbadge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass absolute -right-4 -top-4 flex flex-col items-center rounded-2xl px-6 py-4 text-center shadow-card sm:-right-6"
          >
            <span className="font-display text-3xl font-bold text-gold-gradient">
              {siteConfig.stats.yearsExperience}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              års erfarenhet
            </span>
          </motion.div>
        </Reveal>

        {/* Text */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Om oss"
            title={
              <>
                Hantverk som ger dina knivar{" "}
                <span className="text-gold-gradient">nytt liv</span>
              </>
            }
            description={`${siteConfig.name} är specialister på professionell knivslipning för restauranger, skolor, storkök, catering och privatpersoner. Vi kombinerar traditionellt hantverk med modern precisionsteknik – och behandlar varje egg som om den vore vår egen.`}
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delayIndex={i}
                className="glass group rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <pillar.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
