"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  driftPhase: number;
  life: number;
  maxLife: number;
  hue: number;
}

interface EmbersProps {
  className?: string;
  /** Antal samtidiga gnistor (skalas efter ytan). */
  density?: number;
  /** Intensitet 0–1 som styr opacitet/storlek. */
  intensity?: number;
}

/**
 * Lätt canvas-baserad eld/gnist-effekt. Glödande partiklar stiger uppåt likt
 * gnistor från en smedja. Pausar utanför vy och respekterar reduced-motion.
 */
export function Embers({
  className,
  density = 60,
  intensity = 1,
}: EmbersProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Non-null-alias så att typerna behålls inuti animationsloopens closures.
    const view = canvas;
    const g = ctx;
    const parent = view.parentElement;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let raf = 0;
    let running = true;

    function spawn(initial = false): Ember {
      const maxLife = 120 + Math.random() * 160;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10,
        size: 0.6 + Math.random() * 2.2,
        speedY: 0.25 + Math.random() * 0.85,
        drift: 0.2 + Math.random() * 0.7,
        driftPhase: Math.random() * Math.PI * 2,
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        hue: 18 + Math.random() * 26, // orange → gult
      };
    }

    function resize() {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.width = width * dpr;
      view.height = height * dpr;
      view.style.width = `${width}px`;
      view.style.height = `${height}px`;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((density * Math.min(width, 1400)) / 1000);
      embers = Array.from({ length: count }, () => spawn(true));
    }

    function frame() {
      if (!running) return;
      g.clearRect(0, 0, width, height);
      g.globalCompositeOperation = "lighter";

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += 1;
        e.y -= e.speedY;
        e.driftPhase += 0.02;
        e.x += Math.sin(e.driftPhase) * e.drift * 0.4;

        const lifeRatio = e.life / e.maxLife;
        const fade = Math.sin(lifeRatio * Math.PI); // tänds och slocknar
        const alpha = Math.max(0, fade) * 0.9 * intensity;

        const r = e.size * (1 + fade * 0.6);
        const grad = g.createRadialGradient(e.x, e.y, 0, e.x, e.y, r * 3);
        grad.addColorStop(0, `hsla(${e.hue}, 100%, 70%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${e.hue - 6}, 100%, 55%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${e.hue - 10}, 100%, 50%, 0)`);
        g.fillStyle = grad;
        g.beginPath();
        g.arc(e.x, e.y, r * 3, 0, Math.PI * 2);
        g.fill();

        // ljus kärna
        g.fillStyle = `hsla(${e.hue + 10}, 100%, 85%, ${alpha})`;
        g.beginPath();
        g.arc(e.x, e.y, r * 0.5, 0, Math.PI * 2);
        g.fill();

        if (e.life >= e.maxLife || e.y < -10) {
          embers[i] = spawn(false);
        }
      }
      g.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
