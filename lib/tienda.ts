/**
 * Base de datos de la tienda Nanas Design.
 *
 * Catálogo poblado con los productos REALES de la portada (nombres,
 * descripciones, precios e imágenes originales). La portada y la tienda
 * comparten estos mismos datos desde un único lugar.
 *
 * Pasos previstos:
 * - Agregar más productos/servicios aquí (con sus imágenes reales).
 * - Categorías: pobler `storeCategories`; los filtros ya leen de este array.
 * - Carrito de compras y proceso de compra (etapa futura).
 */

export type StoreKind = "producto" | "servicio";

export type StoreCategory = {
  /** Identificador único usado por los filtros. */
  id: string;
  /** Nombre visible de la categoría. */
  label: string;
};

export type StoreItem = {
  /** Identificador único, usado como key y en el carrito. */
  id: string;
  /** Distingue productos de servicios. */
  kind: StoreKind;
  /** Nombre visible del ítem. */
  name: string;
  /** Etiqueta de vitrina, p. ej. "Un favorito". */
  tag?: string;
  /** Descripción breve. */
  description: string;
  /** Ruta de la imagen (p. ej. "/img/07.png"). */
  image: string;
  /** id de la `StoreCategory` a la que pertenece. */
  category: string;
  /** Precio en USD. Omitir cuando el precio es "A medida". */
  price?: number;
  /** Etiqueta alternativa de precio, p. ej. "Desde $18" o "A medida". */
  priceLabel?: string;
  /** Marca los productos que se muestran en la portada. */
  featured?: boolean;
};

export const storeCategories: StoreCategory[] = [
  { id: "ramos", label: "Ramos" },
  { id: "arreglos", label: "Arreglos" },
  { id: "cajas", label: "Cajas" },
];

export const storeItems: StoreItem[] = [
  { id: "ramo-fresitas", kind: "producto", name: "Ramo iluminado de fresitas", tag: "Un favorito", description: "Un bouquet lleno de luz, pequeños detalles y ternura para celebrar a alguien especial.", image: "/img/07.png", category: "ramos", price: 18, priceLabel: "Desde $18", featured: true },
  { id: "arreglo-mixto", kind: "producto", name: "Arreglo mixto con peluche", tag: "Hecho para ti", description: "Flores, un globo y ese detalle inesperado que convierte un día en recuerdo.", image: "/img/08.png", category: "arreglos", price: 65, priceLabel: "Desde $65", featured: true },
  { id: "box-rosas", kind: "producto", name: "Box de rosas y bombones", tag: "Colección especial", description: "Una caja de rosas y sabores para regalar un momento que se queda contigo.", image: "/img/09.webp", category: "cajas", priceLabel: "A medida", featured: true },
  { id: "ramo-polaroid", kind: "producto", name: "Ramo de fotos Polaroid", tag: "Personalizable", description: "Tus flores favoritas acompañadas de fotografías para volver a mirar.", image: "/img/27.png", category: "ramos", price: 15, priceLabel: "Desde $15", featured: true },
  { id: "ramo-vaquita", kind: "producto", name: "Ramo vaquita", tag: "Un toque divertido", description: "Color y encanto para cumpleaños, celebraciones y regalos inolvidables.", image: "/img/39.jpg", category: "ramos", price: 10, priceLabel: "Desde $10", featured: true },
];
