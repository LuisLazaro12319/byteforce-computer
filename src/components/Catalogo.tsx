"use client";

import { useMemo, useState } from "react";
import { CATEGORIAS } from "@/data/productos";
import { ProductoCard } from "@/components/ProductoCard";
import type { Categoria, Producto } from "@/lib/types";

type Filtro = Categoria | "todos" | "ofertas";

export function Catalogo({ productos }: { productos: Producto[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const hayOfertas = useMemo(() => productos.some((p) => p.oferta), [productos]);

  const categorias = useMemo(
    () => CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)),
    [productos],
  );

  const visibles = useMemo(() => {
    if (filtro === "todos") return productos;
    if (filtro === "ofertas") return productos.filter((p) => p.oferta);
    return productos.filter((p) => p.categoria === filtro);
  }, [productos, filtro]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        <BotonFiltro activo={filtro === "todos"} onClick={() => setFiltro("todos")}>
          Todos
        </BotonFiltro>
        {hayOfertas && (
          <BotonFiltro activo={filtro === "ofertas"} onClick={() => setFiltro("ofertas")}>
            🔥 Ofertas
          </BotonFiltro>
        )}
        {categorias.map((c) => (
          <BotonFiltro key={c.id} activo={filtro === c.id} onClick={() => setFiltro(c.id)}>
            {c.nombre}
          </BotonFiltro>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {visibles.map((producto) => (
          <ProductoCard key={producto.slug} producto={producto} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-16 text-center text-tenue">No hay productos en esta categoría todavía.</p>
      )}
    </>
  );
}

function BotonFiltro({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        activo
          ? "border-acento bg-acento text-acento-contraste"
          : "border-borde text-tenue hover:border-tenue hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
