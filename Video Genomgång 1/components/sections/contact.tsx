"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";

export function Contact() {
  const { contact } = siteConfig;
  const mapsQuery = encodeURIComponent(
    `${contact.address}, ${contact.zip} ${contact.addressCity}`
  );

  const cards = [
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      label: "E-post",
      value: contact.email,
      href: contact.emailHref,
    },
    {
      icon: MapPin,
      label: "Adress",
      value: `${contact.address}, ${contact.zip} ${contact.addressCity}`,
      href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    },
  ];

  return (
    <section id="kontakt" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Kontakt"
          title={
            <>
              Hör av dig –{" "}
              <span className="text-gold-gradient">vi hjälper dig</span>
            </>
          }
          description="Ring, mejla eller besök vår verkstad. Vi svarar snabbt och hjälper dig hitta rätt lösning."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Kontaktinfo */}
          <div className="grid gap-4">
            {cards.map((card, i) => (
              <Reveal
                key={card.label}
                delayIndex={i}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <card.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </div>
                  <a
                    href={card.href}
                    target={card.icon === MapPin ? "_blank" : undefined}
                    rel={card.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="truncate font-medium text-foreground transition-colors hover:text-gold"
                  >
                    {card.value}
                  </a>
                </div>
              </Reveal>
            ))}

            {/* Öppettider */}
            <Reveal
              delayIndex={3}
              className="rounded-2xl border border-white/10 bg-card/50 p-5"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="size-5 text-gold" />
                <span className="font-medium">Öppettider</span>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {contact.openingHours.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{row.days}</dt>
                    <dd className="font-medium text-foreground">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <Button asChild className="mt-5 w-full">
                <a href="#boka">Boka tid nu</a>
              </Button>
            </Reveal>
          </div>

          {/* Karta */}
          <Reveal
            delayIndex={1}
            className="overflow-hidden rounded-2xl border border-white/10 shadow-card"
          >
            <iframe
              title={`Karta till ${siteConfig.name}`}
              src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.3] contrast-110"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
