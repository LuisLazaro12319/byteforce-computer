import Link from "next/link";
import { productos } from "@/data/productos";
import { ProductoCard } from "@/components/ProductoCard";
import { ComoFunciona } from "@/components/ComoFunciona";
import { linkConsultaGeneral } from "@/lib/whatsapp";

const BENEFICIOS = [
  { titulo: "ENVÍOS", sub: "TODO EL PAÍS" },
  { titulo: "GARANTÍA", sub: "POR ESCRITO" },
  { titulo: "ARMADO", sub: "EN EL DÍA" },
];

const TEXTOS_CINTA = [
  "ARMÁ TU PC A MEDIDA",
  "ENVÍOS A TODO EL PAÍS",
  "GARANTÍA ESCRITA",
  "ASESORAMIENTO REAL",
  "PAGÁ Y COORDINÁ POR WHATSAPP",
];

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-borde bg-[radial-gradient(circle_at_82%_20%,rgba(255,87,34,0.16),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(255,87,34,0.08),transparent_40%)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-acento/40 bg-acento/10 px-3 py-1 text-xs font-semibold text-acento">
              <span className="h-2 w-2 rounded-full bg-acento animate-pulse" /> ENVÍOS A TODO EL PAÍS · GARANTÍA ESCRITA
            </div>

            <h1 className="titulo-display mt-5 text-5xl leading-[0.95] sm:text-7xl">
              ARMÁ LA PC <span className="text-acento">QUE REALMENTE QUERÉS</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-tenue sm:text-lg">
              Computadoras, notebooks, periféricos y componentes. Elegí cada pieza, mirá el total en el momento y
              cerramos tu compra por WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/armar"
                className="inline-flex h-12 items-center justify-center rounded-md bg-acento px-7 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                Armar mi PC →
              </Link>
              <Link
                href="/productos"
                className="inline-flex h-12 items-center justify-center rounded-md border border-borde px-7 text-sm font-bold uppercase tracking-wide transition-colors hover:border-acento"
              >
                Ver catálogo
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-borde pt-6">
              {BENEFICIOS.map((b) => (
                <div key={b.titulo}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-tenue">{b.titulo}</p>
                  <p className="text-xs font-black uppercase tracking-wide text-foreground">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CINTA */}
      <div className="overflow-hidden bg-acento py-3 text-white select-none">
        <div className="animate-marquee-loop flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-wider">
          {[...TEXTOS_CINTA, ...TEXTOS_CINTA, ...TEXTOS_CINTA].map((texto, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{texto}</span>
              <span className="text-xs text-white/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ARMADOR TEASER */}
      <section className="border-b border-borde bg-superficie/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-acento font-semibold">La más pedida</p>
            <h2 className="titulo-display mt-2 text-3xl sm:text-4xl">Armá tu PC a medida</h2>
            <p className="mt-3 max-w-xl text-tenue">
              Elegí procesador, placa, memoria, video, almacenamiento, fuente y gabinete. El total se actualiza solo
              y podés sumarlo directo a tu pedido.
            </p>
          </div>
          <Link
            href="/armar"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-acento px-8 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Ir al armador →
          </Link>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-acento">El catálogo</p>
              <h2 className="titulo-display text-3xl sm:text-4xl">Destacados</h2>
            </div>
            <Link href="/productos" className="shrink-0 text-sm font-bold uppercase tracking-wider text-tenue transition-colors hover:text-acento">
              Ver todo ↗
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {destacados.map((producto) => (
              <ProductoCard key={producto.slug} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      <ComoFunciona />

      {/* CTA FINAL */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-borde bg-[radial-gradient(circle_at_50%_0%,rgba(255,87,34,0.18),transparent_60%)] p-10 text-center sm:p-16">
          <h2 className="titulo-display text-3xl sm:text-5xl">¿Necesitás asesoramiento?</h2>
          <p className="mx-auto mt-4 max-w-xl text-tenue">
            Contanos para qué vas a usar la PC y tu presupuesto. Te recomendamos la mejor combinación de piezas.
          </p>
          <a
            href={linkConsultaGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-[#25D366] px-8 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] active:scale-95"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
