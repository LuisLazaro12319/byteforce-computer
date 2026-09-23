"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProducto } from "@/data/productos";
import type { ItemCarrito } from "@/lib/types";

const CLAVE_CARRITO = "byteforce.carrito";

export type LineaResuelta = {
  tipo: "producto" | "armado";
  nombre: string;
  detalle?: string;
  slug?: string;
  cantidad: number;
  unitario: number;
  subtotal: number;
  sinStock?: boolean;
};

type Tienda = {
  items: ItemCarrito[];
  lineas: LineaResuelta[];
  unidades: number;
  total: number;
  agregarProducto: (slug: string, cantidad?: number) => void;
  agregarArmado: (armado: { nombre: string; detalle: string; precioUnitario: number }) => void;
  cambiarCantidad: (indice: number, cantidad: number) => void;
  quitar: (indice: number) => void;
  vaciar: () => void;
  /** false hasta que se leyó localStorage: evita mismatch de hidratación. */
  listo: boolean;
};

const TiendaContext = createContext<Tienda | null>(null);

export function TiendaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  // Restaurar del navegador una sola vez, ya montado el componente.
  //
  // localStorage no existe cuando se genera el HTML, así que el primer
  // render tiene que salir vacío en el servidor y en el cliente. Si
  // leyéramos el carrito antes, el HTML y el navegador no coincidirían y
  // React tiraría error de hidratación.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage bloqueado o JSON corrupto: arrancamos vacío.
    }
    setListo(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!listo) return;
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  }, [items, listo]);

  const agregarProducto = useCallback((slug: string, cantidad = 1) => {
    setItems((actuales) => {
      const indice = actuales.findIndex((i) => i.tipo === "producto" && i.slug === slug);
      if (indice === -1) return [...actuales, { tipo: "producto", slug, cantidad }];
      const copia = [...actuales];
      const linea = copia[indice];
      if (linea.tipo === "producto") {
        copia[indice] = { ...linea, cantidad: linea.cantidad + cantidad };
      }
      return copia;
    });
  }, []);

  const agregarArmado = useCallback(
    (armado: { nombre: string; detalle: string; precioUnitario: number }) => {
      setItems((actuales) => [
        ...actuales,
        {
          tipo: "armado",
          id: `armado-${Date.now()}`,
          nombre: armado.nombre,
          detalle: armado.detalle,
          precioUnitario: armado.precioUnitario,
          cantidad: 1,
        },
      ]);
    },
    [],
  );

  const cambiarCantidad = useCallback((indice: number, cantidad: number) => {
    setItems((actuales) =>
      cantidad <= 0
        ? actuales.filter((_, i) => i !== indice)
        : actuales.map((item, i) => (i === indice ? { ...item, cantidad } : item)),
    );
  }, []);

  const quitar = useCallback((indice: number) => {
    setItems((actuales) => actuales.filter((_, i) => i !== indice));
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const lineas = useMemo<LineaResuelta[]>(() => {
    return items.flatMap((item): LineaResuelta[] => {
      if (item.tipo === "producto") {
        const producto = getProducto(item.slug);
        if (!producto) return []; // producto dado de baja después de guardarse
        return [
          {
            tipo: "producto",
            nombre: producto.nombre,
            slug: producto.slug,
            cantidad: item.cantidad,
            unitario: producto.precio,
            subtotal: producto.precio * item.cantidad,
            sinStock: producto.sinStock,
          },
        ];
      }
      return [
        {
          tipo: "armado",
          nombre: item.nombre,
          detalle: item.detalle,
          cantidad: item.cantidad,
          unitario: item.precioUnitario,
          subtotal: item.precioUnitario * item.cantidad,
        },
      ];
    });
  }, [items]);

  const unidades = useMemo(() => lineas.reduce((acc, l) => acc + l.cantidad, 0), [lineas]);
  const total = useMemo(() => lineas.reduce((acc, l) => acc + l.subtotal, 0), [lineas]);

  const valor: Tienda = {
    items,
    lineas,
    unidades,
    total,
    agregarProducto,
    agregarArmado,
    cambiarCantidad,
    quitar,
    vaciar,
    listo,
  };

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>;
}

export function useTienda(): Tienda {
  const ctx = useContext(TiendaContext);
  if (!ctx) throw new Error("useTienda debe usarse dentro de <TiendaProvider>");
  return ctx;
}
