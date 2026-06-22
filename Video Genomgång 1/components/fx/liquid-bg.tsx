"use client";

/**
 * Liquid Glass-bakgrund: mjuka, morphande iridescenta blobbar som långsamt
 * flyter bakom hela sidan. Ger den "flytande glas"-ambians som hela
 * designsystemet vilar på. Rent dekorativ + respekterar reduced-motion
 * (morph-animationen stoppas globalt via prefers-reduced-motion i globals.css).
 */
export function LiquidBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Gyllene huvudblob */}
      <div className="animate-morph absolute -left-[12%] top-[6%] h-[42vw] w-[42vw] bg-gold-500/20 opacity-70 blur-[110px] [animation-duration:22s]" />
      {/* Stål/iridescent blob */}
      <div className="animate-morph absolute right-[-10%] top-[34%] h-[38vw] w-[38vw] bg-steel-300/15 opacity-60 blur-[120px] [animation-delay:-6s] [animation-duration:26s]" />
      {/* Varm ember-glöd nedtill */}
      <div className="animate-morph absolute bottom-[-8%] left-[28%] h-[40vw] w-[40vw] bg-ember-500/12 opacity-60 blur-[130px] [animation-delay:-12s] [animation-duration:30s]" />
      {/* Subtil iridescent slöja som glider */}
      <div className="animate-sheen-pan absolute inset-0 bg-iridescent bg-[length:300%_300%] opacity-[0.05] mix-blend-screen" />
    </div>
  );
}
