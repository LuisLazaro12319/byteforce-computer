import type { CategoriaParte } from "@/lib/types";

/**
 * Piezas y precios del armador. Precios de ejemplo — ajustar por el
 * cliente real cuando tengamos su lista de proveedores.
 */
export const PARTES: CategoriaParte[] = [
  {
    key: "cpu",
    label: "Procesador",
    opciones: [
      { nombre: "AMD Ryzen 5 5600", precio: 320000 },
      { nombre: "Intel Core i5-12400F", precio: 340000 },
      { nombre: "AMD Ryzen 7 5700X", precio: 410000 },
    ],
  },
  {
    key: "mobo",
    label: "Placa madre",
    opciones: [
      { nombre: "A520M (AM4)", precio: 110000 },
      { nombre: "B550M (AM4)", precio: 130000 },
      { nombre: "B660M (LGA1700)", precio: 150000 },
    ],
  },
  {
    key: "ram",
    label: "Memoria RAM",
    opciones: [
      { nombre: "16GB (2x8) DDR4 3200MHz", precio: 85000 },
      { nombre: "32GB (2x16) DDR4 3200MHz", precio: 160000 },
      { nombre: "16GB (2x8) DDR5 5200MHz", precio: 120000 },
    ],
  },
  {
    key: "gpu",
    label: "Tarjeta de video",
    opciones: [
      { nombre: "RTX 3050 8GB", precio: 420000 },
      { nombre: "Radeon RX 6600 8GB", precio: 480000 },
      { nombre: "RTX 4060 8GB", precio: 650000 },
    ],
  },
  {
    key: "storage",
    label: "Almacenamiento",
    opciones: [
      { nombre: "SSD NVMe 500GB", precio: 65000 },
      { nombre: "SSD NVMe 1TB", precio: 110000 },
      { nombre: "SSD NVMe 1TB + HDD 1TB", precio: 165000 },
    ],
  },
  {
    key: "psu",
    label: "Fuente",
    opciones: [
      { nombre: "550W 80+ Bronze", precio: 90000 },
      { nombre: "650W 80+ Bronze", precio: 115000 },
      { nombre: "750W 80+ Gold", precio: 160000 },
    ],
  },
  {
    key: "case",
    label: "Gabinete",
    opciones: [
      { nombre: "Gamer ARGB Media Torre", precio: 95000 },
      { nombre: "Gamer ARGB Full Torre", precio: 130000 },
      { nombre: "Básico Micro-ATX", precio: 60000 },
    ],
  },
];
