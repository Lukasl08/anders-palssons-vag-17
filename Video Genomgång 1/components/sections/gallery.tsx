"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, MoveHorizontal, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryImages, type GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ----------------------- Före/efter jämförelse-slider --------------------- */
function BeforeAfter({
  item,
  rounded = true,
}: {
  item: GalleryItem;
  rounded?: boolean;
}) {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const move = React.useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, x)));
  }, []);

  React.useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      move(clientX);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [move]);

  return (
    <div
      ref={ref}
      className={cn(
        "group/ba relative aspect-[4/3] w-full select-none overflow-hidden",
        rounded && "rounded-2xl"
      )}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
    >
      {/* Efter (botten) */}
      <Image
        src={item.after}
        alt={`${item.title} – efter slipning`}
        fill
        sizes="(max-width: 768px) 90vw, 45vw"
        className="object-cover"
      />
      <span className="absolute bottom-3 right-3 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-black">
        Efter
      </span>

      {/* Före (klippt) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={item.before}
          alt={`${item.title} – före slipning`}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          Före
        </span>
      </div>

      {/* Handtag */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-gold"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-background text-gold shadow-glow">
          <MoveHorizontal className="size-4" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Galleri -------------------------------- */
export function Gallery() {
  const [active, setActive] = React.useState<GalleryItem | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="galleri" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Galleri"
          title={
            <>
              Se skillnaden –{" "}
              <span className="text-gold-gradient">före & efter</span>
            </>
          }
          description="Dra i reglaget för att jämföra. Klicka för att förstora och zooma in på resultatet."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {galleryImages.map((item, i) => (
            <Reveal
              key={item.id}
              delayIndex={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-3 transition-colors hover:border-gold/30"
            >
              <BeforeAfter item={item} />
              <div className="flex items-center justify-between px-2 pt-3">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  aria-label={`Förstora ${item.title}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Expand className="size-3.5" />
                  Förstora
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card">
                {/* Zoom-effekt vid hover på bilden */}
                <div className="group/zoom overflow-hidden">
                  <div className="transition-transform duration-500 ease-out group-hover/zoom:scale-110">
                    <BeforeAfter item={active} rounded={false} />
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {active.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Håll muspekaren över bilden för att zooma.
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Stäng"
                className="absolute -right-2 -top-2 grid size-10 place-items-center rounded-full border border-white/10 bg-background text-foreground transition-colors hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
