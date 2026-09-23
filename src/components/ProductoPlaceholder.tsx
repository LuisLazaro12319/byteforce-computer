import type { Categoria } from "@/lib/types";

/**
 * Ilustración de referencia mientras no haya fotos reales del producto.
 * Cuando lleguen las fotos, este componente se reemplaza por <Image /> y
 * no hay que tocar nada más.
 */
const ICONOS: Record<Categoria, React.ReactNode> = {
  computadoras: (
    <>
      <rect x="8" y="10" width="14" height="18" rx="1.5" />
      <rect x="26" y="10" width="14" height="34" rx="1.5" />
      <path d="M8 33h14" />
    </>
  ),
  notebooks: (
    <>
      <rect x="8" y="12" width="32" height="20" rx="1.5" />
      <path d="M4 36h40" />
    </>
  ),
  monitores: (
    <>
      <rect x="6" y="10" width="36" height="22" rx="1.5" />
      <path d="M18 38h12M24 32v6" />
    </>
  ),
  perifericos: (
    <>
      <rect x="6" y="15" width="36" height="20" rx="4" />
      <path d="M16 22v4M24 22v4M32 22v4" />
    </>
  ),
  sillas: (
    <>
      <path d="M12 8h24" />
      <path d="M14 8v16h20V8" />
      <path d="M12 40l2-16M36 40l-2-16M12 40h24" />
    </>
  ),
  componentes: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M16 6v6M24 6v6M32 6v6M16 36v6M24 36v6M32 36v6M6 16h6M6 24h6M6 32h6M36 16h6M36 24h6M36 32h6" />
    </>
  ),
};

export function ProductoPlaceholder({ categoria, nombre }: { categoria: Categoria; nombre: string }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[repeating-linear-gradient(135deg,var(--superficie)_0_10px,var(--background)_10px_20px)]"
      role="img"
      aria-label={`${nombre} — imagen de referencia`}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-2/5 w-2/5 text-acento/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {ICONOS[categoria]}
      </svg>
      <span className="pointer-events-none absolute bottom-2 right-2.5 text-[9px] font-medium uppercase tracking-widest text-tenue/70">
        sin foto
      </span>
    </div>
  );
}
