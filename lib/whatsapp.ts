/**
 * Integración con WhatsApp — punto único del flujo de pedidos.
 *
 * El sitio ya funcionaba redirigiendo a WhatsApp con `wa.me`, y ese
 * comportamiento se conserva. Aquí centralizamos el número y la construcción
 * del mensaje para reutilizarlo en todos los componentes (catálogo, colecciones,
 * portada) sin repetir URLs a mano.
 */

/** Número de WhatsApp de Nanas Design (sin "+", con código de país). */
export const WHATSAPP_NUMBER = "584128985585";

/** Construye un enlace de WhatsApp con un mensaje preparado. */
export function whatsappUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensaje para pedir un producto concreto del catálogo.
 * Ej.: "Hola, me interesa Ramo vaquita".
 */
export function productOrderMessage(productName: string) {
  return `Hola, me interesa ${productName}`;
}

/**
 * Mensaje para consultar una colección, catálogo o categoría (útil para imágenes
 * tipo collage, donde una sola imagen reúne varios productos y aún no conviene
 * comprometerse con un nombre o precio inventado).
 */
export function collectionInquiryMessage(collection: string, category?: string, catalog?: string) {
  const detail = [catalog, category].filter(Boolean).join(" · ");
  return detail
    ? `Hola, me interesa un producto de la colección "${collection}" (${detail})`
    : `Hola, me interesa un producto de la colección "${collection}"`;
}

/**
 * Mensaje para conocer las opciones de envío según la ubicación del cliente
 * (estado o ciudad). El costo y la empresa se acuerdan en el mismo chat.
 */
export function shippingInquiryMessage(destination: string) {
  return destination
    ? `Hola, quiero consultar las opciones de envío para ${destination}`
    : "Hola, quiero consultar las opciones de envío disponibles";
}
