"use client";

import Link from "next/link";
import { useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { ProductoPlaceholder } from "@/components/ProductoPlaceholder";
import { CintaAgotado } from "@/components/CintaAgotado";
import { CintaOferta } from "@/components/CintaOferta";
import { precio } from "@/lib/formato";
import { linkConsulta } from "@/lib/whatsapp";
import type { Producto } from "@/lib/types";

export function FichaProducto({ producto }: { producto: Producto }) {
  const { agregarProducto } = useTienda();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  function handleAgregar() {
    if (producto.sinStock) return;
    agregarProducto(producto.slug, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  }

  return (
    <div className="mt-6 grid gap-10 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-borde">
        {producto.sinStock && <CintaAgotado />}
        {producto.oferta && !producto.sinStock && <CintaOferta />}
        <div className="aspect-[4/3]">
          <ProductoPlaceholder categoria={producto.categoria} nombre={producto.nombre} />
        </div>
      </div>

      <div>
        <h1 className="titulo-display text-3xl sm:text-4xl">{producto.nombre}</h1>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="titulo-display text-3xl text-acento">{precio(producto.precio)}</span>
          {producto.precioAnterior && <s className="text-tenue">{precio(producto.precioAnterior)}</s>}
        </div>

        <p className="mt-4 leading-relaxed text-tenue">{producto.descripcion}</p>

        {producto.especificaciones.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm">
            {producto.especificaciones.map((e) => (
              <li key={e} className="flex gap-2.5 text-tenue">
                <span className="text-acento">✓</span> {e}
              </li>
            ))}
          </ul>
        )}

        {producto.sinStock ? (
          <div className="mt-8 rounded-xl border border-borde bg-superficie p-5">
            <p className="font-medium">Sin stock por el momento</p>
            <p className="mt-1 text-sm text-tenue">Consultanos y te avisamos cuando vuelva.</p>
            <a
              href={linkConsulta(producto)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-md border border-borde px-5 py-2.5 text-sm transition-colors hover:border-acento"
            >
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-medium">Cantidad</h3>
              <div className="inline-flex items-center rounded-md border border-borde">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="px-4 py-2 text-lg text-tenue hover:text-foreground"
                  aria-label="Restar uno"
                >
                  −
                </button>
                <span className="w-12 text-center tabular-nums">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => c + 1)}
                  className="px-4 py-2 text-lg text-tenue hover:text-foreground"
                  aria-label="Sumar uno"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAgregar}
                className="rounded-md bg-acento px-7 py-3.5 text-sm font-semibold text-acento-contraste transition-opacity hover:opacity-90"
              >
                Agregar — {precio(producto.precio * cantidad)}
              </button>

              {agregado && (
                <Link
                  href="/carrito"
                  className="rounded-md border border-acento px-7 py-3.5 text-center text-sm font-medium text-acento"
                >
                  ✓ Agregado · Ir a mi pedido
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
