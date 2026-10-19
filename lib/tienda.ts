/**
 * Base de datos de la tienda Nanas Design.
 *
 * Fase 1: solo estructura. Los arrays están vacíos a propósito;
 * el catálogo se poblará en una etapa futura.
 *
 * Pasos previstos:
 * - 1. Catálogo: agregar productos y servicios con sus imágenes,
 *      nombres, descripciones y precios.
 * - 2. Categorías y filtros: pobler `storeCategories` y filtrar por `category`.
 * - 3. Selección y carrito: usar `id` para seleccionar ítems y calcular totales.
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
  /** Descripción breve. */
  description: string;
  /** Ruta de la imagen (p. ej. "/img/07.png"). */
  image: string;
  /** id de la `StoreCategory` a la que pertenece. */
  category: string;
  /** Precio en USD. */
  price: number;
  /** Etiqueta alternativa de precio, p. ej. "Desde $18" o "A medida". */
  priceLabel?: string;
};

export const storeCategories: StoreCategory[] = [];

export const storeItems: StoreItem[] = [];
