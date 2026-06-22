"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site.config";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
      <span className="grid size-9 place-items-center rounded-lg bg-gold-gradient text-black shadow-glow">
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
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-liquid",
        scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-0 pt-0"
      )}
    >
      <nav
        className={cn(
          "container flex h-[68px] items-center justify-between transition-all duration-500 ease-liquid",
          scrolled
            ? "glass !rounded-full px-5 shadow-liquid sm:px-6"
            : "h-[72px] rounded-none border-transparent bg-transparent"
        )}
      >
        <Logo />

        {/* Desktop-länkar */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
          >
            <Phone className="size-4" />
            {siteConfig.contact.phone}
          </a>
          <Button asChild size="sm">
            <a href="#boka">Boka nu</a>
          </Button>
        </div>

        {/* Mobil-knappar */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobil-meny */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-3 px-1">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center gap-2 px-3 text-sm font-medium text-foreground/80"
                >
                  <Phone className="size-4 text-gold" />
                  {siteConfig.contact.phone}
                </a>
                <Button asChild size="lg" className="w-full">
                  <a href="#boka" onClick={() => setOpen(false)}>
                    Boka nu
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
