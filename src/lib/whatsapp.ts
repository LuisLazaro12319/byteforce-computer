import { MARCA, WHATSAPP } from "@/lib/config";
import { precio } from "@/lib/formato";
import type { LineaResuelta } from "@/context/TiendaContext";
import type { Producto } from "@/lib/types";

/** Arma el texto del pedido y devuelve el link de WhatsApp ya listo. */
export function linkPedido(lineas: LineaResuelta[], total: number): string {
  const detalle = lineas
    .map((l) => {
      const cantidad = l.cantidad > 1 ? `x${l.cantidad} ` : "";
      const encabezado = `• ${cantidad}${l.nombre}`;
      const sub = l.detalle ? `\n  ${l.detalle}` : "";
      return `${encabezado}${sub}\n  ${precio(l.subtotal)}`;
    })
    .join("\n\n");

  const unidades = lineas.reduce((acc, l) => acc + l.cantidad, 0);

  const mensaje =
    `¡Hola ${MARCA.nombre}! Quiero hacer un *pedido*\n\n` +
    `${detalle}\n\n` +
    `Total: *${precio(total)}* (${unidades} ${unidades === 1 ? "ítem" : "ítems"})\n\n` +
    `Quedo atento para coordinar pago y envío.`;

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/** Link para consultar por un producto puntual, desde la ficha. */
export function linkConsulta(producto: Producto): string {
  const mensaje = `¡Hola ${MARCA.nombre}! Quería consultar por *${producto.nombre}*.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/** Link genérico para el botón flotante y el header. */
export function linkConsultaGeneral(): string {
  const mensaje = `¡Hola ${MARCA.nombre}! Quería hacer una consulta 😊`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}
