import Image from "next/image";
import { ProductoPlaceholder } from "@/components/ProductoPlaceholder";
import type { Producto } from "@/lib/types";

export function ProductoMedia({ producto }: { producto: Producto }) {
  if (producto.imagen) {
    return (
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover"
      />
    );
  }

  return <ProductoPlaceholder categoria={producto.categoria} nombre={producto.nombre} />;
}
