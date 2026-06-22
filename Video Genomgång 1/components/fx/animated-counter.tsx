"use client";

import * as React from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** Slutvärde som visas, t.ex. "120 000+", "4,9", "15+". */
  value: string;
  className?: string;
  durationMs?: number;
}

/** Räknar upp talet i en sträng när det scrollas in i vy. */
export function AnimatedCounter({
  value,
  className,
  durationMs = 1600,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(value);

  // Dela upp i prefix / numerisk del / suffix
  const match = value.match(/([^\d]*)([\d\s.,]+)(.*)/);
  const prefix = match?.[1] ?? "";
  const numberStr = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";
  const decimals = numberStr.includes(",") ? 1 : 0;
  const target = parseFloat(numberStr.replace(/\s/g, "").replace(",", "."));

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!inView || Number.isNaN(target)) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      const formatted = current
        .toLocaleString("sv-SE", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
        .replace(/ /g, " ");
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs, decimals, prefix, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
