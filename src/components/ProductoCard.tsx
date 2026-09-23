import Link from "next/link";
import { ProductoMedia } from "@/components/ProductoMedia";
import { CintaAgotado } from "@/components/CintaAgotado";
import { CintaOferta } from "@/components/CintaOferta";
import { precio } from "@/lib/formato";
import type { Producto } from "@/lib/types";

export function ProductoCard({ producto }: { producto: Producto }) {
  const ahorro = producto.precioAnterior ? producto.precioAnterior - producto.precio : 0;

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-borde bg-superficie transition-colors hover:border-acento/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <ProductoMedia producto={producto} />
        </div>
        {producto.sinStock && <CintaAgotado />}
        {producto.oferta && !producto.sinStock && <CintaOferta />}
        {ahorro > 0 && !producto.sinStock && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
            −{Math.round((ahorro / (producto.precioAnterior ?? producto.precio)) * 100)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="text-sm leading-snug font-medium">{producto.nombre}</h3>

        <div className="mt-auto pt-1.5">
          <p className="titulo-display text-base text-acento">{precio(producto.precio)}</p>
          {producto.precioAnterior && (
            <p className="text-xs text-tenue">
              <s className="opacity-60">{precio(producto.precioAnterior)}</s>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
