import type { Categoria, Producto } from "@/lib/types";

/**
 * Catálogo de ejemplo. Precios y specs inventados — reemplazar por el
 * catálogo real del cliente cuando lo tengamos.
 */
export const productos: Producto[] = [
  {
    slug: "pc-inicial",
    nombre: "PC Armada Inicial",
    categoria: "computadoras",
    descripcion:
      "Equipo listo para tareas de oficina, estudio y navegación. Silenciosa y con arranque rápido gracias al SSD.",
    especificaciones: ["AMD Ryzen 3", "8GB RAM DDR4", "SSD 240GB", "Gabinete con fuente incluida"],
    precio: 480000,
    destacado: true,
  },
  {
    slug: "pc-gamer-ryzen5",
    nombre: "PC Gamer Ryzen 5 / RTX 3050",
    categoria: "computadoras",
    descripcion: "Para jugar en 1080p con buenos cuadros por segundo, sin gastar de más.",
    especificaciones: ["AMD Ryzen 5 5600", "16GB RAM DDR4", "RTX 3050 8GB", "SSD NVMe 500GB"],
    precio: 950000,
    destacado: true,
  },
  {
    slug: "pc-gamer-i5-4060",
    nombre: "PC Gamer Pro Core i5 / RTX 4060",
    categoria: "computadoras",
    descripcion: "Rendimiento parejo en 1440p y buena base para crecer a futuro.",
    especificaciones: ["Intel Core i5-12400F", "16GB RAM DDR4", "RTX 4060 8GB", "SSD NVMe 1TB"],
    precio: 1350000,
    oferta: true,
    precioAnterior: 1450000,
    destacado: true,
  },
  {
    slug: "note-advance",
    nombre: "Notebook Advance Celeron",
    categoria: "notebooks",
    descripcion: "Liviana y compacta, ideal para trámites, mensajería y trabajo básico.",
    especificaciones: ["Intel Celeron N4500", "8GB RAM", "256GB SSD", "14\" HD"],
    precio: 590000,
  },
  {
    slug: "note-i5-512",
    nombre: "Notebook Core i5 / 512GB",
    categoria: "notebooks",
    descripcion: "Buen equilibrio entre potencia y portabilidad para trabajo diario.",
    especificaciones: ["Intel Core i5", "8GB RAM", "512GB SSD", "15.6\" Full HD"],
    precio: 820000,
    destacado: true,
  },
  {
    slug: "note-gamer-ryzen7",
    nombre: "Notebook Gamer Ryzen 7 / RTX 3050",
    categoria: "notebooks",
    descripcion: "Para jugar y editar sin quedarte pegado al escritorio.",
    especificaciones: ["AMD Ryzen 7", "16GB RAM", "RTX 3050 6GB", "SSD 512GB", "144Hz"],
    precio: 1650000,
    destacado: true,
  },
  {
    slug: "monitor-24-100hz",
    nombre: "Monitor 24\" 100Hz IPS",
    categoria: "monitores",
    descripcion: "Full HD con buena fluidez para uso diario y juegos casuales.",
    especificaciones: ["24\" IPS", "1920x1080", "100Hz", "1ms respuesta"],
    precio: 210000,
  },
  {
    slug: "monitor-27-165hz",
    nombre: "Monitor Gamer 27\" 165Hz",
    categoria: "monitores",
    descripcion: "Pensado para shooters y juegos competitivos.",
    especificaciones: ["27\" IPS", "1920x1080", "165Hz", "1ms respuesta"],
    precio: 340000,
    oferta: true,
    precioAnterior: 380000,
    destacado: true,
  },
  {
    slug: "combo-teclado-mouse",
    nombre: "Combo Teclado + Mouse Gamer RGB",
    categoria: "perifericos",
    descripcion: "Teclado mecánico y mouse con luces RGB configurables.",
    especificaciones: ["Switches mecánicos", "RGB configurable", "Mouse 6400 DPI"],
    precio: 65000,
  },
  {
    slug: "auricular-71",
    nombre: "Auricular Gamer 7.1 con Micrófono",
    categoria: "perifericos",
    descripcion: "Sonido envolvente y micrófono con cancelación de ruido básica.",
    especificaciones: ["Sonido 7.1 virtual", "Micrófono desmontable", "Almohadillas de espuma"],
    precio: 58000,
  },
  {
    slug: "webcam-1080p",
    nombre: "Cámara Web Full HD 1080p",
    categoria: "perifericos",
    descripcion: "Para videollamadas y streaming con buena nitidez.",
    especificaciones: ["1080p 30fps", "Micrófono integrado", "Clip universal"],
    precio: 45000,
    sinStock: true,
  },
  {
    slug: "silla-gamer",
    nombre: "Silla Gamer Ergonómica Reclinable",
    categoria: "sillas",
    descripcion: "Apoyo lumbar y cervical, reclinable hasta 160°.",
    especificaciones: ["Reclinable 90°-160°", "Apoyabrazos 3D", "Base de metal"],
    precio: 280000,
    destacado: true,
  },
  {
    slug: "ssd-nvme-1tb",
    nombre: "SSD NVMe 1TB",
    categoria: "componentes",
    descripcion: "Para ampliar almacenamiento o acelerar un equipo con disco rígido.",
    especificaciones: ["1TB", "NVMe PCIe", "Lectura hasta 3500MB/s"],
    precio: 110000,
  },
  {
    slug: "memoria-16gb",
    nombre: "Memoria RAM 16GB DDR4 3200MHz",
    categoria: "componentes",
    descripcion: "Kit de 2x8GB para mejorar la fluidez general del equipo.",
    especificaciones: ["16GB (2x8)", "DDR4 3200MHz"],
    precio: 85000,
  },
];

export const CATEGORIAS: { id: Categoria; nombre: string }[] = [
  { id: "computadoras", nombre: "Computadoras" },
  { id: "notebooks", nombre: "Notebooks" },
  { id: "monitores", nombre: "Monitores" },
  { id: "perifericos", nombre: "Periféricos" },
  { id: "sillas", nombre: "Sillas" },
  { id: "componentes", nombre: "Componentes" },
];

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}
