"use client";

import { useState } from "react";
import Link from "next/link";
import { productos, CATEGORIAS } from "@/data/productos";
import { PARTES } from "@/data/armador";
import { precio } from "@/lib/formato";
import { MARCA, TEL_VISIBLE } from "@/lib/config";

const WA_CONTACTO = "5491100000000";

type Vista = "inicio" | "productos" | "categorias" | "armador" | "config";

const NAV: { id: Vista; nombre: string; icono: string }[] = [
  { id: "inicio", nombre: "Inicio", icono: "🏠" },
  { id: "productos", nombre: "Productos", icono: "🖥️" },
  { id: "categorias", nombre: "Categorías", icono: "🗂️" },
  { id: "armador", nombre: "Armador de PC", icono: "🧩" },
  { id: "config", nombre: "Configuración", icono: "⚙️" },
];

function Campo({ label, valor, placeholder, area = false }: { label: string; valor?: string; placeholder?: string; area?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-tenue">{label}</label>
      {area ? (
        <textarea
          rows={3}
          disabled
          defaultValue={valor}
          placeholder={placeholder}
          className="w-full cursor-not-allowed resize-none rounded-lg border border-borde bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-tenue/60"
        />
      ) : (
        <input
          disabled
          defaultValue={valor}
          placeholder={placeholder}
          className="w-full cursor-not-allowed rounded-lg border border-borde bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-tenue/60"
        />
      )}
    </div>
  );
}

function CheckMock({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <label className="flex cursor-not-allowed items-center gap-2 text-sm">
      <input type="checkbox" disabled defaultChecked={checked} className="h-4 w-4 accent-[var(--acento)]" />
      {label}
    </label>
  );
}

function Bloqueado() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button disabled className="cursor-not-allowed rounded-md bg-borde px-5 py-2.5 text-sm font-semibold text-tenue">
        🔒 Guardar
      </button>
      <span className="text-xs text-tenue">Disponible cuando actives tu plan de panel</span>
    </div>
  );
}

function Acciones({ agotado = false }: { agotado?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="cursor-not-allowed rounded-md border border-borde bg-background px-2.5 py-1 text-xs font-medium text-tenue">✏️ Editar</span>
      {agotado ? (
        <span className="cursor-not-allowed rounded-md border border-emerald-800 bg-emerald-950 px-2.5 py-1 text-xs font-medium text-emerald-400">✅ Reponer</span>
      ) : (
        <span className="cursor-not-allowed rounded-md border border-red-900 bg-red-950 px-2.5 py-1 text-xs font-medium text-red-400">🔴 Marcar agotado</span>
      )}
      <span className="cursor-not-allowed rounded-md border border-borde bg-background px-2.5 py-1 text-xs font-medium text-tenue">🗑️ Eliminar</span>
    </div>
  );
}

export function AdminPanel() {
  const [vista, setVista] = useState<Vista>("inicio");
  const tituloVista = NAV.find((n) => n.id === vista)!.nombre;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-acento px-4 py-2.5 text-center text-sm font-semibold text-black">
        ℹ️ Vista previa del panel — así lo manejarías vos. La edición en vivo se activa al confirmar tu plan.
      </div>

      <div className="flex">
        <aside
          className="hidden w-60 shrink-0 flex-col bg-[#111114] p-5 text-white md:flex"
          style={{ minHeight: "calc(100vh - 44px)" }}
        >
          <div className="titulo-display mb-8 text-lg text-acento">{MARCA.nombre}</div>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setVista(n.id)}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  vista === n.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <span>{n.icono}</span> {n.nombre}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-white/60">
            <b className="text-white">Modo vista previa.</b> Así verías tu panel para editar el sitio vos mismo, sin depender de nadie.
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
          <div className="mb-5 flex gap-2 overflow-x-auto md:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setVista(n.id)}
                className={`shrink-0 rounded-md px-3.5 py-1.5 text-sm font-medium ${
                  vista === n.id ? "bg-acento text-black" : "border border-borde bg-superficie text-tenue"
                }`}
              >
                {n.nombre}
              </button>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="titulo-display text-2xl">{tituloVista}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-acento/15 px-3 py-1 text-xs font-semibold text-acento">
              👁️ Vista previa
            </span>
          </div>

          {vista === "inicio" && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { lbl: "Visitas al sitio", val: "142", ex: "Ej. últimos 30 días" },
                  { lbl: "Consultas por WhatsApp", val: "27", ex: "Ej. últimos 30 días" },
                  {
                    lbl: "Productos publicados",
                    val: String(productos.length),
                    ex: `En ${CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)).length} categorías`,
                  },
                ].map((s) => (
                  <div key={s.lbl} className="rounded-xl border border-borde bg-superficie p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-tenue">{s.lbl}</div>
                    <div className="titulo-display mt-1 text-3xl text-acento">{s.val}</div>
                    <div className="mt-0.5 text-xs text-tenue">{s.ex}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-borde bg-superficie p-6">
                <h2 className="mb-4 text-base font-semibold">Resumen</h2>
                <div className="divide-y divide-borde text-sm">
                  <div className="flex justify-between py-2.5">
                    <span>🖥️ Productos activos</span>
                    <b>{productos.length}</b>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span>🏷️ Destacados en la home</span>
                    <b>{productos.filter((p) => p.destacado).length}</b>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span>📦 Sin stock</span>
                    <b>{productos.filter((p) => p.sinStock).length}</b>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-white to-neutral-400 p-7 text-black">
                <div>
                  <h3 className="text-lg font-bold">¿Te gustaría manejar tu tienda así?</h3>
                  <p className="mt-1 text-sm text-black/70">
                    Activamos el panel real para que edites productos, precios, el armador y el inicio, vos mismo.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${WA_CONTACTO}?text=${encodeURIComponent("Hola! Vi la vista previa del panel de la tienda y quiero saber más")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md bg-black px-5 py-3 text-sm font-bold text-white"
                >
                  💬 Consultar
                </a>
              </div>
            </div>
          )}

          {vista === "productos" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-superficie p-6">
                <h2 className="mb-4 text-base font-semibold">Agregar producto</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo label="Nombre" placeholder="Ej: Monitor Gamer 27&quot; 165Hz" />
                  <Campo label="Precio" placeholder="$ 0" />
                  <div className="sm:col-span-2">
                    <Campo label="Descripción" area placeholder="Ficha técnica, características..." />
                  </div>
                  <div className="flex flex-wrap items-end gap-5">
                    <CheckMock label="Destacar en la home" checked />
                    <CheckMock label="Oferta" />
                    <CheckMock label="Sin stock" />
                  </div>
                </div>
                <Bloqueado />
              </div>

              <div className="rounded-xl border border-borde bg-superficie p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">Productos cargados</h2>
                  <span className="cursor-not-allowed rounded-md bg-acento/90 px-3 py-1.5 text-xs font-semibold text-black">
                    + Agregar producto
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="border-b border-borde text-xs uppercase tracking-wide text-tenue">
                      <tr>
                        <th className="py-2.5 pr-3 font-medium">Producto</th>
                        <th className="py-2.5 pr-3 font-medium">Categoría</th>
                        <th className="py-2.5 pr-3 font-medium">Precio</th>
                        <th className="py-2.5 pr-3 font-medium">Estado</th>
                        <th className="py-2.5 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borde">
                      {[...productos]
                        .sort((a, b) => (b.sinStock ? 1 : 0) - (a.sinStock ? 1 : 0))
                        .slice(0, 8)
                        .map((p) => (
                          <tr key={p.slug}>
                            <td className="py-2.5 pr-3 font-medium">{p.nombre}</td>
                            <td className="py-2.5 pr-3 text-tenue">{CATEGORIAS.find((c) => c.id === p.categoria)?.nombre}</td>
                            <td className="py-2.5 pr-3 font-semibold">{precio(p.precio)}</td>
                            <td className="py-2.5 pr-3">
                              {p.sinStock ? (
                                <span className="rounded-full bg-red-950 px-2 py-0.5 text-xs font-semibold text-red-400">Agotado</span>
                              ) : (
                                <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-400">Publicado</span>
                              )}
                            </td>
                            <td className="py-2.5">
                              <Acciones agotado={p.sinStock} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {vista === "categorias" && (
            <div className="rounded-xl border border-borde bg-superficie p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold">Categorías</h2>
                <span className="cursor-not-allowed rounded-md bg-acento/90 px-3 py-1.5 text-xs font-semibold text-black">
                  + Agregar categoría
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[440px] text-left text-sm">
                  <thead className="border-b border-borde text-xs uppercase tracking-wide text-tenue">
                    <tr>
                      <th className="py-2.5 pr-3 font-medium">Categoría</th>
                      <th className="py-2.5 pr-3 font-medium">Productos</th>
                      <th className="py-2.5 pr-3 font-medium">Estado</th>
                      <th className="py-2.5 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borde">
                    {CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)).map((c) => (
                      <tr key={c.id}>
                        <td className="py-2.5 pr-3 font-medium">{c.nombre}</td>
                        <td className="py-2.5 pr-3 text-tenue">{productos.filter((p) => p.categoria === c.id).length}</td>
                        <td className="py-2.5 pr-3">
                          <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-400">Publicado</span>
                        </td>
                        <td className="py-2.5">
                          <Acciones />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {vista === "armador" && (
            <div className="space-y-5">
              <p className="text-sm text-tenue">
                Estas son las piezas y precios que se muestran en <Link href="/armar" className="text-acento hover:underline">Armá tu PC</Link>.
              </p>
              {PARTES.map((parte) => (
                <div key={parte.key} className="rounded-xl border border-borde bg-superficie p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold">{parte.label}</h2>
                    <span className="cursor-not-allowed rounded-md bg-acento/90 px-3 py-1.5 text-xs font-semibold text-black">
                      + Agregar opción
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-sm">
                      <thead className="border-b border-borde text-xs uppercase tracking-wide text-tenue">
                        <tr>
                          <th className="py-2 pr-3 font-medium">Opción</th>
                          <th className="py-2 pr-3 font-medium">Precio</th>
                          <th className="py-2 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-borde">
                        {parte.opciones.map((o) => (
                          <tr key={o.nombre}>
                            <td className="py-2 pr-3">{o.nombre}</td>
                            <td className="py-2 pr-3 font-semibold">{precio(o.precio)}</td>
                            <td className="py-2">
                              <Acciones />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <Bloqueado />
            </div>
          )}

          {vista === "config" && (
            <div className="rounded-xl border border-borde bg-superficie p-6">
              <h2 className="mb-4 text-base font-semibold">Datos del negocio</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Nombre de la marca" valor={MARCA.nombre} />
                <Campo label="WhatsApp" valor={TEL_VISIBLE} />
                <Campo label="Envíos" valor="A todo el país" />
                <Campo label="Rubro" valor="Computación" />
                <div className="sm:col-span-2">
                  <Campo label="Descripción" area valor={MARCA.descripcion} />
                </div>
              </div>
              <Bloqueado />
            </div>
          )}

          <p className="mt-8 text-center text-xs text-tenue">
            <Link href="/" className="underline underline-offset-4 hover:text-foreground">
              ← Volver a la tienda
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
