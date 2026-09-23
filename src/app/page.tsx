import Link from "next/link";
import { productos } from "@/data/productos";
import { ComoFunciona } from "@/components/ComoFunciona";
import { HeroCarousel } from "@/components/HeroCarousel";
import { DestacadosSemana } from "@/components/DestacadosSemana";
import { linkConsultaGeneral } from "@/lib/whatsapp";

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

      {/* HERO: carrusel de banners, sin texto superpuesto */}
      <HeroCarousel />

      {/* CINTA */}
      <div className="overflow-hidden bg-acento py-3 text-black select-none">
        <div className="animate-marquee-loop flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-wider">
          {[...TEXTOS_CINTA, ...TEXTOS_CINTA, ...TEXTOS_CINTA].map((texto, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{texto}</span>
              <span className="text-xs text-black/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* DESTACADOS DE LA SEMANA */}
      <DestacadosSemana productos={destacados} />

      {/* ARMADOR TEASER */}
      <section className="border-b border-borde bg-superficie/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-acento font-semibold">La más pedida</p>
            <h2 className="titulo-display mt-2 text-3xl sm:text-4xl">Armá tu PC a medida</h2>
            <p className="mt-3 max-w-xl text-tenue">
              Elegí tu plataforma (Intel o AMD) y armá tu equipo paso a paso: procesador, placa, memoria, video,
              almacenamiento, fuente, gabinete, refrigeración, monitor y periféricos. El total se actualiza solo.
            </p>
          </div>
          <Link
            href="/armar"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-acento px-8 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] active:scale-95"
          >
            Ir al armador →
          </Link>
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
