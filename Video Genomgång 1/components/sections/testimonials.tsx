"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const paginate = React.useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [paginate, paused]);

  const current = testimonials[index];

  return (
    <section
      id="recensioner"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-50" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Kundrecensioner"
          title={
            <>
              Det säger våra{" "}
              <span className="text-gold-gradient">kunder</span>
            </>
          }
          description="Förtroende byggs av resultat. Här är vad restauranger, storkök och privatpersoner tycker."
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-10 shadow-card sm:px-12 sm:py-12">
            <Quote className="absolute right-8 top-8 size-16 text-gold/10" />

            <div className="relative min-h-[200px] sm:min-h-[180px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="size-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-xl leading-relaxed text-foreground sm:text-2xl">
                    “{current.quote}”
                  </blockquote>
                  <div className="mt-6">
                    <div className="font-semibold text-foreground">
                      {current.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {current.role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Kontroller */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Föregående recension"
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/80 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Gå till recension ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-7 bg-gold"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Nästa recension"
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/80 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
