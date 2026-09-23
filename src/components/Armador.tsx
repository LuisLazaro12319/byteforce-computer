"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { PARTES } from "@/data/armador";
import { precio } from "@/lib/formato";
import type { Plataforma } from "@/lib/types";

const ICONOS: Record<string, React.ReactNode> = {
  cpu: <path d="M8 8h8v8H8zM4 9h2M4 13h2M18 9h2M18 13h2M9 4v2M13 4v2M9 18v2M13 18v2" />,
  mobo: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M8 4v3M14 4v3M8 17v3M4 9h3M4 14h3M17 8h3" /></>,
  ram: <><rect x="3" y="9" width="18" height="7" rx="1" /><path d="M6 9V6M10 9V6M14 9V6M18 9V6" /></>,
  storage: <><rect x="5" y="4" width="14" height="16" rx="1" /><circle cx="12" cy="16" r="1.5" /><path d="M8 8h8" /></>,
  gpu: <><rect x="3" y="8" width="16" height="9" rx="1" /><circle cx="7.5" cy="12.5" r="2" /><circle cx="13.5" cy="12.5" r="2" /><path d="M19 11h2v4h-2" /></>,
  psu: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  case: <><rect x="6" y="3" width="12" height="18" rx="1" /><path d="M9 7h.01M9 11h6" /></>,
  refrigeracion: <><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /><circle cx="12" cy="12" r="2.5" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M9 20h6M12 16v4" /></>,
  perifericos: <><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 11v2M11 11v2M15 11v2" /></>,
};

const PASOS = PARTES.map((p) => ({ ...p, icono: ICONOS[p.key] }));

export function Armador() {
  const { agregarArmado } = useTienda();
  const [pasoActivo, setPasoActivo] = useState(0);
  const [plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [elegidas, setElegidas] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(PARTES.map((p) => [p.key, null])),
  );
  const [agregado, setAgregado] = useState(false);

  const parte = PASOS[pasoActivo];
  const faltaPlataforma = parte.requierePlataforma && plataforma === null;

  const opcionesVisibles = useMemo(() => {
    let opciones = parte.opciones;
    if (parte.requierePlataforma && plataforma) {
      opciones = opciones.filter((o) => o.plataforma === plataforma);
    }
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      opciones = opciones.filter((o) => o.nombre.toLowerCase().includes(q));
    }
    return opciones;
  }, [parte, plataforma, busqueda]);

  function irAlSiguiente() {
    setBusqueda("");
    setPasoActivo((i) => Math.min(i + 1, PASOS.length - 1));
  }

  function elegir(nombre: string) {
    setElegidas((actuales) => ({ ...actuales, [parte.key]: nombre }));
    setAgregado(false);
    irAlSiguiente();
  }

  function omitirPaso() {
    setElegidas((actuales) => ({ ...actuales, [parte.key]: null }));
    irAlSiguiente();
  }

  function cambiarPlataforma() {
    setPlataforma(null);
    setElegidas((actuales) => ({ ...actuales, cpu: null, mobo: null }));
  }

  const resumen = PARTES.flatMap((p) => {
    const nombreElegido = elegidas[p.key];
    if (!nombreElegido) return [];
    const opcion = p.opciones.find((o) => o.nombre === nombreElegido);
    if (!opcion) return [];
    return [{ label: p.label, nombre: opcion.nombre, precio: opcion.precio }];
  });
  const total = resumen.reduce((s, r) => s + r.precio, 0);

  function handleAgregar() {
    const detalle = resumen.map((r) => r.nombre).join(" + ");
    agregarArmado({ nombre: "PC Armada a medida", detalle, precioUnitario: total });
    setAgregado(true);
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* SIDEBAR: pasos */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-tenue">Pasos para tu PC</h3>
        <nav className="flex flex-col rounded-xl border border-borde bg-superficie">
          {PASOS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPasoActivo(i)}
              className={`flex items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors ${
                i === pasoActivo
                  ? "border-acento bg-white/5 font-semibold text-foreground"
                  : "border-transparent text-tenue hover:text-foreground"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                {p.icono}
              </svg>
              <span className="min-w-0 flex-1">
                <span className="block truncate">{p.label}</span>
                {elegidas[p.key] && (
                  <span className="block truncate text-xs font-normal text-tenue">✓ {elegidas[p.key]}</span>
                )}
              </span>
            </button>
          ))}
        </nav>

        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-tenue">Resumen de compra</h3>
        <div className="rounded-xl border border-borde bg-superficie p-4">
          {resumen.length === 0 ? (
            <p className="text-sm text-tenue">No has seleccionado componentes.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {resumen.map((r) => (
                <li key={r.label} className="flex justify-between gap-3">
                  <span className="text-tenue">{r.label}</span>
                  <span className="text-right">{precio(r.precio)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex items-baseline justify-between border-t border-borde pt-3">
            <span className="text-sm text-tenue">Total estimado</span>
            <span className="titulo-display text-xl text-acento">{precio(total)}</span>
          </div>
          <button
            type="button"
            onClick={handleAgregar}
            disabled={resumen.length === 0}
            className="mt-4 w-full rounded-md bg-acento px-5 py-3 text-sm font-semibold text-acento-contraste transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Agregar armado al pedido
          </button>
          {agregado && (
            <Link
              href="/carrito"
              className="mt-3 block rounded-md border border-acento px-5 py-2.5 text-center text-sm font-medium text-acento"
            >
              ✓ Agregado · Ir a mi pedido
            </Link>
          )}
        </div>
      </aside>

      {/* PANEL: paso activo */}
      <div>
        {faltaPlataforma ? (
          <div>
            <h3 className="titulo-display text-lg">Selecciona tu plataforma</h3>
            <p className="mt-1 text-sm text-tenue">
              Elegí si deseás armar tu equipo con Intel o AMD, para filtrar los componentes compatibles.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(["Intel", "AMD"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlataforma(p)}
                  className="flex h-40 flex-col items-center justify-center gap-3 rounded-xl border border-borde bg-superficie text-lg font-bold transition-colors hover:border-acento"
                >
                  <span className="titulo-display text-2xl">{p}</span>
                  <span className="text-xs font-normal text-tenue">Ver opciones {p}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="titulo-display text-lg">{parte.label}</h3>
              <span className="rounded-full border border-borde px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-tenue">
                Opcional
              </span>
              {parte.requierePlataforma && (
                <button
                  type="button"
                  onClick={cambiarPlataforma}
                  className="ml-auto rounded-md border border-borde px-3 py-1.5 text-xs font-semibold text-tenue transition-colors hover:border-acento hover:text-foreground"
                >
                  ↻ Cambiar plataforma
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-tenue">
              Este paso es opcional. Elegí un componente o tocá &quot;Omitir este paso&quot; para continuar.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o marca..."
                className="min-w-[220px] flex-1 rounded-md border border-borde bg-superficie px-4 py-2.5 text-sm outline-none focus:border-acento"
              />
              <button
                type="button"
                onClick={omitirPaso}
                className="shrink-0 rounded-md border border-borde px-4 py-2.5 text-sm font-semibold text-tenue transition-colors hover:border-acento hover:text-foreground"
              >
                Omitir este paso →
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {opcionesVisibles.map((o) => {
                const elegida = elegidas[parte.key] === o.nombre;
                return (
                  <div
                    key={o.nombre}
                    className={`flex flex-col overflow-hidden rounded-xl border bg-superficie transition-colors ${
                      elegida ? "border-acento" : "border-borde"
                    }`}
                  >
                    <div className="flex aspect-square items-center justify-center bg-[repeating-linear-gradient(135deg,var(--superficie)_0_10px,var(--background)_10px_20px)]">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-tenue">
                        {parte.icono}
                      </svg>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3.5">
                      <p className="text-sm font-medium leading-snug">{o.nombre}</p>
                      <p className="titulo-display mt-auto text-base text-acento">{precio(o.precio)}</p>
                      <button
                        type="button"
                        onClick={() => elegir(o.nombre)}
                        className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                          elegida ? "bg-acento text-acento-contraste" : "border border-borde text-foreground hover:border-acento"
                        }`}
                      >
                        {elegida ? "✓ Seleccionado" : "Seleccionar +"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {opcionesVisibles.length === 0 && (
              <p className="mt-10 text-center text-sm text-tenue">No hay opciones que coincidan con la búsqueda.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
