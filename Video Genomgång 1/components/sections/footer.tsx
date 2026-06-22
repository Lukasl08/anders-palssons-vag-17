"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site.config";

const services = [
  "Restauranger",
  "Skolkök",
  "Storkök",
  "Catering",
  "Privatpersoner",
];

export function Footer() {
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-card/30">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Varumärke */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-gold-gradient text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 17 L16 5 L20 9 L8 21 Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M16 5 L20 9" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: social.facebook, label: "Facebook" },
                { icon: Instagram, href: social.instagram, label: "Instagram" },
                { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-foreground/70 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Snabblänkar */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Snabblänkar
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tjänster */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Tjänster
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#tjanster"
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Kontakt
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={contact.phoneHref} className="hover:text-gold">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={contact.emailHref} className="hover:text-gold">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {contact.address}
                  <br />
                  {contact.zip} {contact.addressCity}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Alla rättigheter förbehållna.
          </p>
          <p>
            Knivslipning i {siteConfig.city} · Restaurang · Storkök · Privat
          </p>
        </div>
      </div>
    </footer>
  );
}
