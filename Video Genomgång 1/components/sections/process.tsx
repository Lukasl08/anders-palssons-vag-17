"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, PackageOpen, Sparkles, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/content";

const icons = [CalendarCheck, PackageOpen, Sparkles, Truck];

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Så går det till"
          title={
            <>
              Enkelt och smidigt –{" "}
              <span className="text-gold-gradient">i fyra steg</span>
            </>
          }
          description="Från bokning till rakbladsvass leverans. Vi sköter logistiken så att du kan fokusera på matlagningen."
        />

        <div ref={ref} className="relative mt-16">
          {/* Vertikal linje (mobil) / horisontell (desktop) */}
          <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 lg:left-0 lg:top-[39px] lg:h-px lg:w-full">
            <motion.div
              style={{
                scaleY: lineScale,
                scaleX: lineScale,
              }}
              className="h-full w-full origin-top bg-gold-gradient lg:origin-left"
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  key={step.number}
                  as="li"
                  delayIndex={i}
                  className="relative flex gap-5 lg:flex-col lg:gap-0"
                >
                  {/* Nod */}
                  <div className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-gold/30 bg-background shadow-glow">
                    <Icon className="size-6 text-gold" />
                    <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-gold-gradient text-[11px] font-bold text-black">
                      {i + 1}
                    </span>
                  </div>

                  <div className="lg:mt-6 lg:pr-4">
                    <span className="font-display text-sm font-semibold text-gold/60">
                      {step.number}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
