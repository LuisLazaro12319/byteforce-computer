"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BASE_PATH } from "@/lib/config";

/**
 * Banners del carrusel del inicio. Cada imagen ya trae su propio texto y
 * marcas incrustados — este componente solo las hace rotar, no superpone
 * nada arriba.
 */
const SLIDES = [
  { archivo: "hero/slide-asus-rog.jpg", alt: "ASUS Gaming Powerhouse — placas, refrigeración, gráficas y periféricos" },
  { archivo: "hero/slide-amd-ff16.jpg", alt: "AMD Ryzen y Radeon — llevate Final Fantasy XVI de regalo" },
];

const INTERVALO_MS = 6000;

export function HeroCarousel() {
  const [actual, setActual] = useState(0);

  const siguiente = useCallback(() => {
    setActual((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(siguiente, INTERVALO_MS);
    return () => clearInterval(id);
  }, [siguiente]);

  return (
    <div className="relative w-full overflow-hidden border-b border-borde bg-background">
      <div className="relative aspect-[1899/489] w-full">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.archivo}
            src={`${BASE_PATH}/${slide.archivo}`}
            alt={slide.alt}
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ${i === actual ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setActual((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Banner anterior"
        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 sm:left-4"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={siguiente}
        aria-label="Siguiente banner"
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 sm:right-4"
      >
        ›
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.archivo}
            type="button"
            onClick={() => setActual(i)}
            aria-label={`Ir al banner ${i + 1}`}
            aria-current={i === actual}
            className={`h-2 rounded-full transition-all ${i === actual ? "w-6 bg-acento" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
