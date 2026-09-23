"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { PARTES } from "@/data/armador";
import { precio } from "@/lib/formato";

export function Armador() {
  const { agregarArmado } = useTienda();
  const [elegidas, setElegidas] = useState<number[]>(() => PARTES.map(() => 0));
  const [agregado, setAgregado] = useState(false);

  const seleccion = useMemo(
    () => PARTES.map((parte, i) => ({ parte, opcion: parte.opciones[elegidas[i]] })),
    [elegidas],
  );

  const total = useMemo(() => seleccion.reduce((acc, s) => acc + s.opcion.precio, 0), [seleccion]);

  function elegir(indiceCategoria: number, indiceOpcion: number) {
    setElegidas((actuales) => actuales.map((v, i) => (i === indiceCategoria ? indiceOpcion : v)));
    setAgregado(false);
  }

  function handleAgregar() {
    const nombre = "PC Armada a medida";
    const detalle = seleccion.map((s) => s.opcion.nombre).join(" + ");
    agregarArmado({ nombre, detalle, precioUnitario: total });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 4000);
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col gap-5">
        {PARTES.map((parte, i) => (
          <div key={parte.key} className="rounded-xl border border-borde bg-superficie p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-acento">{parte.label}</h3>
            <div className="grid gap-2">
              {parte.opciones.map((opcion, j) => (
                <button
                  key={opcion.nombre}
                  type="button"
                  onClick={() => elegir(i, j)}
                  aria-pressed={elegidas[i] === j}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    elegidas[i] === j ? "border-acento bg-acento/10" : "border-borde hover:border-tenue"
                  }`}
                >
                  <span>{opcion.nombre}</span>
                  <span className="font-semibold text-acento">{precio(opcion.precio)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-borde bg-superficie p-6 lg:sticky lg:top-24">
        <h3 className="titulo-display border-b border-borde pb-4 text-xl">Tu armado</h3>

        <ul className="mt-4 space-y-2.5 text-sm">
          {seleccion.map(({ parte, opcion }) => (
            <li key={parte.key} className="flex items-baseline justify-between gap-3 border-b border-dashed border-borde pb-2.5">
              <span className="text-tenue">{parte.label}</span>
              <span className="text-right">{opcion.nombre}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-baseline justify-between border-t border-borde pt-4">
          <span className="text-tenue">Total</span>
          <span className="titulo-display text-2xl text-acento">{precio(total)}</span>
        </div>

        <button
          type="button"
          onClick={handleAgregar}
          className="mt-5 w-full rounded-md bg-acento px-6 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          + Agregar armado al pedido
        </button>

        {agregado && (
          <Link
            href="/carrito"
            className="mt-3 block rounded-md border border-acento px-6 py-3 text-center text-sm font-medium text-acento"
          >
            ✓ Agregado · Ir a mi pedido
          </Link>
        )}

        <p className="mt-4 text-center text-xs text-tenue">
          Podés armar varias PCs y sumarlas todas al mismo pedido.
        </p>
      </aside>
    </div>
  );
}
