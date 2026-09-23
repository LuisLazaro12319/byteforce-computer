"use client";

import { useEffect, useState } from "react";

const CLAVE_TEMA = "byteforce.tema";

export function ThemeToggle() {
  const [esOscuro, setEsOscuro] = useState(true);

  // Lee el tema real del <html> (ya lo puso el script inline de layout.tsx
  // antes del primer render, para evitar el flash de tema incorrecto).
  useEffect(() => {
    setEsOscuro(document.documentElement.getAttribute("data-theme") !== "light");
  }, []);

  function alternar() {
    const nuevoEsOscuro = !esOscuro;
    setEsOscuro(nuevoEsOscuro);
    if (nuevoEsOscuro) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    try {
      localStorage.setItem(CLAVE_TEMA, nuevoEsOscuro ? "dark" : "light");
    } catch {
      // localStorage bloqueado: el toggle igual funciona, solo no se recuerda.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? "Cambiar a modo día" : "Cambiar a modo noche"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-borde text-tenue transition-colors hover:border-acento hover:text-foreground"
    >
      {esOscuro ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
