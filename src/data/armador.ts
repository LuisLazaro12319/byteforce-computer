import type { CategoriaParte } from "@/lib/types";

/**
 * Piezas y precios del armador. Precios de ejemplo — ajustar por el
 * cliente real cuando tengamos su lista de proveedores.
 */
export const PARTES: CategoriaParte[] = [
  {
    key: "cpu",
    label: "Procesador",
    requierePlataforma: true,
    opciones: [
      { nombre: "AMD Ryzen 5 5600", precio: 320000, plataforma: "AMD" },
      { nombre: "AMD Ryzen 7 5700X", precio: 410000, plataforma: "AMD" },
      { nombre: "AMD Ryzen 9 7900X", precio: 780000, plataforma: "AMD" },
      { nombre: "Intel Core i5-12400F", precio: 340000, plataforma: "Intel" },
      { nombre: "Intel Core i5-13600KF", precio: 520000, plataforma: "Intel" },
      { nombre: "Intel Core i7-13700F", precio: 690000, plataforma: "Intel" },
    ],
  },
  {
    key: "mobo",
    label: "Placa madre",
    requierePlataforma: true,
    opciones: [
      { nombre: "A520M (AM4)", precio: 110000, plataforma: "AMD" },
      { nombre: "B550M (AM4)", precio: 130000, plataforma: "AMD" },
      { nombre: "B650M (AM5)", precio: 180000, plataforma: "AMD" },
      { nombre: "B660M (LGA1700)", precio: 150000, plataforma: "Intel" },
      { nombre: "Z790 (LGA1700)", precio: 260000, plataforma: "Intel" },
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
    key: "storage",
    label: "Almacenamiento (SSD/HDD)",
    opciones: [
      { nombre: "SSD NVMe 500GB", precio: 65000 },
      { nombre: "SSD NVMe 1TB", precio: 110000 },
      { nombre: "SSD NVMe 1TB + HDD 1TB", precio: 165000 },
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
    key: "psu",
    label: "Fuente de poder",
    opciones: [
      { nombre: "550W 80+ Bronze", precio: 90000 },
      { nombre: "650W 80+ Bronze", precio: 115000 },
      { nombre: "750W 80+ Gold", precio: 160000 },
    ],
  },
  {
    key: "case",
    label: "Case / Gabinete",
    opciones: [
      { nombre: "Gamer ARGB Media Torre", precio: 95000 },
      { nombre: "Gamer ARGB Full Torre", precio: 130000 },
      { nombre: "Básico Micro-ATX", precio: 60000 },
    ],
  },
  {
    key: "refrigeracion",
    label: "Refrigeración",
    opciones: [
      { nombre: "Cooler Aire Stock", precio: 0 },
      { nombre: "Cooler Aire Tower 120mm", precio: 45000 },
      { nombre: "Water Cooler AIO 240mm", precio: 135000 },
    ],
  },
  {
    key: "monitor",
    label: "Monitor",
    opciones: [
      { nombre: "Monitor 24\" 100Hz IPS", precio: 210000 },
      { nombre: "Monitor Gamer 27\" 165Hz", precio: 340000 },
      { nombre: "Monitor 27\" 4K 60Hz", precio: 480000 },
    ],
  },
  {
    key: "perifericos",
    label: "Teclado / Mouse / Auricular",
    opciones: [
      { nombre: "Combo Teclado + Mouse Gamer RGB", precio: 65000 },
      { nombre: "Auricular Gamer 7.1", precio: 58000 },
      { nombre: "Combo Teclado + Mouse + Auricular", precio: 110000 },
    ],
  },
];
