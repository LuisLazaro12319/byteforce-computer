"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProductoCard } from "@/components/ProductoCard";
import type { Producto } from "@/lib/types";

export function DestacadosSemana({ productos }: { productos: Producto[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function mover(direccion: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direccion * 460, behavior: "smooth" });
  }

  return (
    <section className="border-b border-borde px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-borde pb-3">
          <h2 className="titulo-display text-xl sm:text-2xl">Destacados de la semana</h2>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/productos" className="hidden text-xs font-bold uppercase tracking-wider text-tenue transition-colors hover:text-acento sm:inline">
              Ver todo ↗
            </Link>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Ver anteriores"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-borde text-tenue transition-colors hover:border-acento hover:text-foreground"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Ver siguientes"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-borde text-tenue transition-colors hover:border-acento hover:text-foreground"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="[-ms-overflow-style:none] [scrollbar-width:none] mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {productos.map((producto) => (
            <div key={producto.slug} className="w-[180px] shrink-0 snap-start sm:w-[220px]">
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
