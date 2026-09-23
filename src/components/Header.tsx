"use client";

import Link from "next/link";
import { useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { precio } from "@/lib/formato";
import { MARCA } from "@/lib/config";

const LINKS = [
  { href: "/", texto: "Inicio" },
  { href: "/armar", texto: "Armá tu PC" },
  { href: "/productos", texto: "Productos" },
  { href: "/admin", texto: "Panel" },
];

export function Header() {
  const { unidades, total, listo } = useTienda();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borde bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 min-w-0" aria-label={MARCA.nombre}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-foreground text-sm font-black text-background">
            BF
          </span>
          <span className="titulo-display truncate text-sm sm:text-lg">{MARCA.nombre}</span>
        </Link>

        <nav className="ml-4 hidden gap-6 text-sm md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-tenue transition-colors hover:text-foreground"
            >
              {l.texto}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            href="/carrito"
            className="flex h-9 items-center gap-2 rounded-md border border-borde bg-superficie px-3 text-sm transition-colors hover:border-acento"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden tabular-nums sm:inline">{listo ? precio(total) : precio(0)}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-acento text-[11px] font-bold text-acento-contraste tabular-nums">
              {listo ? unidades : 0}
            </span>
          </Link>

          <ThemeToggle />

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1 md:hidden"
            onClick={() => setAbierto((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${abierto ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${abierto ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${abierto ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {abierto && (
        <div className="border-t border-borde px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setAbierto(false)}
                className="text-tenue transition-colors hover:text-foreground"
              >
                {l.texto}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
