export type Categoria =
  | "computadoras"
  | "notebooks"
  | "monitores"
  | "perifericos"
  | "sillas"
  | "componentes";

export type Producto = {
  slug: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  precio: number;
  /** Precio de lista antes del descuento, si está en oferta. */
  precioAnterior?: number;
  /** Viñetas cortas de ficha técnica, se muestran en la ficha del producto. */
  especificaciones: string[];
  destacado?: boolean;
  oferta?: boolean;
  sinStock?: boolean;
};

export type Plataforma = "Intel" | "AMD";

/** Una parte elegible dentro de una categoría del armador (ej. una placa de video puntual). */
export type OpcionParte = {
  nombre: string;
  precio: number;
  /** Solo en procesador/placa madre: a qué plataforma pertenece, para filtrar. */
  plataforma?: Plataforma;
};

/** Una categoría de pieza del armador (ej. "Procesador"), con sus opciones. */
export type CategoriaParte = {
  key: string;
  label: string;
  /** Si true, antes de listar opciones hay que elegir Intel o AMD (filtra las opciones). */
  requierePlataforma?: boolean;
  opciones: OpcionParte[];
};

export type ItemCarrito =
  | { tipo: "producto"; slug: string; cantidad: number }
  | {
      tipo: "armado";
      id: string;
      nombre: string;
      detalle: string;
      precioUnitario: number;
      cantidad: number;
    };
