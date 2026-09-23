/**
 * Configuración de la marca y de los canales de venta.
 *
 * ⚠️ TEMPLATE / DEMO: el número de WhatsApp es de ejemplo. Reemplazar WHATSAPP
 * por el número real del cliente cuando lo pase, y actualizar TEL_VISIBLE con
 * el mismo número escrito lindo. También cambiar MARCA.nombre por el nombre real.
 *
 * Formato: código de país + área sin el 0 + 9 + número sin el 15.
 * Ej: 11 5619-9449  ->  5491156199449
 */
export const WHATSAPP = "5491100000000";

/** El mismo número que WHATSAPP, escrito para mostrar en pantalla. */
export const TEL_VISIBLE = "+54 9 11 0000-0000";

export const MARCA = {
  nombre: "ByteForce Computer",
  tagline: "Computadoras, notebooks y armado a medida",
  descripcion:
    "Armamos tu PC a medida, vendemos notebooks y periféricos, y te asesoramos según tu uso y presupuesto. Coordinamos todo por WhatsApp, con envíos a todo el país.",
  ubicacion: "Tu Ciudad, Argentina",
  direccion: "Tu Dirección 1234",
  instagram: "",
  facebook: "",
  tiktok: "",
  email: "contacto@byteforce.example",
} as const;

/**
 * Subcarpeta desde la que se sirve el sitio ("/byteforce-computer" en GitHub
 * Pages, vacío en local y con dominio propio). La define el workflow de deploy.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * URL pública del sitio. La necesitan las etiquetas de compartir (WhatsApp,
 * Google) porque exigen direcciones absolutas.
 */
export const SITIO = process.env.NEXT_PUBLIC_SITIO ?? "http://localhost:3000";
