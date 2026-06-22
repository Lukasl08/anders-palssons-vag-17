"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Embers } from "@/components/fx/embers";
import { customerTypes } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  customerType: string;
  knifeCount: string;
  date: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  customerType: "",
  knifeCount: "",
  date: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Ange ditt namn.";
  if (!values.phone.trim()) {
    errors.phone = "Ange ditt telefonnummer.";
  } else if (!/^[0-9+\s()-]{6,}$/.test(values.phone.trim())) {
    errors.phone = "Ange ett giltigt telefonnummer.";
  }
  if (!values.email.trim()) {
    errors.email = "Ange din e-post.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ange en giltig e-postadress.";
  }
  if (!values.customerType) errors.customerType = "Välj typ av kund.";
  if (values.knifeCount && Number(values.knifeCount) < 1) {
    errors.knifeCount = "Ange minst 1 kniv.";
  }
  return errors;
}

export function BookingForm() {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "success">(
    "idle"
  );

  const today = new Date().toISOString().split("T")[0];

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    // Simulerad inskickning. Koppla in din backend/e-posttjänst här
    // (t.ex. en route handler i app/api/booking/route.ts).
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setValues(initialState);
  }

  return (
    <section id="boka" className="relative overflow-hidden py-24 sm:py-32">
      <Embers className="z-0 opacity-40" density={32} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-ember-fade opacity-60" />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Vänster: säljande text */}
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Boka slipning"
            title={
              <>
                Boka din knivslipning{" "}
                <span className="text-gold-gradient">idag</span>
              </>
            }
            description="Fyll i formuläret så återkommer vi med bekräftelse och en kostnadsfri offert. Snabbt, enkelt och utan förpliktelser."
          />

          <ul className="mt-8 space-y-4">
            {[
              "Svar inom 24 timmar på vardagar",
              "Kostnadsfri offert anpassad efter dig",
              "Hämtning och leverans vid behov",
              "Volymrabatter för verksamheter",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground/85">
                <CheckCircle2 className="size-5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="glass mt-8 flex items-center gap-3 p-4 text-sm text-muted-foreground">
            <ShieldCheck className="size-5 shrink-0 text-gold" />
            Dina uppgifter används endast för att hantera din förfrågan.
          </div>
        </Reveal>

        {/* Höger: formulär / bekräftelse */}
        <Reveal delayIndex={1}>
          <div className="glass relative rounded-3xl p-6 shadow-card sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-gold/10 text-gold"
                  >
                    <CheckCircle2 className="size-10" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                    Tack för din bokning!
                  </h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Vi har tagit emot din förfrågan och återkommer med
                    bekräftelse och offert så snart som möjligt – vanligtvis inom
                    24 timmar.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setStatus("idle")}
                  >
                    Skicka en till förfrågan
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-1">
                    <Label htmlFor="name">Namn *</Label>
                    <Input
                      id="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      placeholder="Förnamn Efternamn"
                      autoComplete="name"
                    />
                    {errors.name && <FieldError msg={errors.name} />}
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="company">Företag</Label>
                    <Input
                      id="company"
                      value={values.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="(valfritt)"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="phone">Telefonnummer *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      placeholder="070-123 45 67"
                      autoComplete="tel"
                    />
                    {errors.phone && <FieldError msg={errors.phone} />}
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="email">E-post *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      placeholder="namn@exempel.se"
                      autoComplete="email"
                    />
                    {errors.email && <FieldError msg={errors.email} />}
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="customerType">Typ av kund *</Label>
                    <Select
                      id="customerType"
                      value={values.customerType}
                      onChange={(e) => update("customerType", e.target.value)}
                      aria-invalid={!!errors.customerType}
                    >
                      <option value="" disabled>
                        Välj…
                      </option>
                      {customerTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </Select>
                    {errors.customerType && (
                      <FieldError msg={errors.customerType} />
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="knifeCount">Antal knivar</Label>
                    <Input
                      id="knifeCount"
                      type="number"
                      min={1}
                      value={values.knifeCount}
                      onChange={(e) => update("knifeCount", e.target.value)}
                      aria-invalid={!!errors.knifeCount}
                      placeholder="t.ex. 12"
                    />
                    {errors.knifeCount && <FieldError msg={errors.knifeCount} />}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="date">Önskat datum</Label>
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={values.date}
                      onChange={(e) => update("date", e.target.value)}
                      className="[color-scheme:dark]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="message">Meddelande</Label>
                    <Textarea
                      id="message"
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Berätta gärna om dina knivar eller särskilda önskemål…"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Skickar…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Skicka bokningsförfrågan
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Eller ring oss direkt på{" "}
                      <a
                        href={siteConfig.contact.phoneHref}
                        className="font-medium text-gold hover:underline"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs text-red-400"
    >
      {msg}
    </motion.p>
  );
}
