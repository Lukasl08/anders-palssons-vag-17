"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";
import { heroImage } from "@/lib/content";

const trustPoints = [
  "Snabb service",
  "Professionellt resultat",
  "Nöjda kunder",
  "Hämtning och leverans",
];

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      {/* Bakgrundsljus / parallax-glow */}
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute inset-0 bg-radial-fade"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-steel-300/10 blur-[120px]"
        aria-hidden
      />

      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text */}
        <motion.div style={{ opacity }} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200"
          >
            <Sparkles className="size-3.5" />
            {siteConfig.tagline} i {siteConfig.city}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Professionell knivslipning för{" "}
            <span className="text-gold-gradient">restauranger, skolor</span> och
            privatpersoner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Få rakbladsvassa knivar med snabb service och professionellt
            resultat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <a href="#boka">Boka nu</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#kontakt">Kontakta oss</a>
            </Button>
          </motion.div>

          {/* Trust-punkter */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-lg"
          >
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm text-foreground/85"
              >
                <CheckCircle2 className="size-5 shrink-0 text-gold" />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Hero-bild */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            style={{ y: yImage }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-card"
          >
            <Image
              src={heroImage}
              alt="Professionell knivslipning – rakbladsvass egg"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Glasflytande betygskort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-card sm:-left-8"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span className="mt-1 text-sm font-semibold text-foreground">
                {siteConfig.stats.rating} av 5
              </span>
              <span className="text-xs text-muted-foreground">
                {siteConfig.stats.happyClients} nöjda kunder
              </span>
            </div>
          </motion.div>

          {/* Flytande statistik-pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="glass absolute -right-3 top-6 rounded-2xl px-4 py-3 shadow-card sm:-right-6"
          >
            <span className="block text-lg font-bold text-gold-gradient">
              {siteConfig.stats.knivesSharpened}
            </span>
            <span className="text-xs text-muted-foreground">slipade knivar</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
