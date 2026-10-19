/**
 * Base de datos de la tienda Nanas Design.
 *
 * Negocio: Florista y tienda de regalos (compras y ventas minoristas).
 * - Horario de atención: 9:00 am – 10:00 pm
 * - Ubicación: Aragua, Venezuela (emprendimiento sin local físico todavía)
 * - Entregas semanales en zonas céntricas de Maracay y zonas cercanas
 *
 * Catálogo poblado con los productos REALES de la portada (nombres,
 * descripciones, precios e imágenes originales). La portada y la tienda
 * comparten estos mismos datos desde un único lugar.
 *
 * Pasos previstos:
 * - Agregar más productos/servicios aquí (con sus imágenes reales).
 * - Categorías: poblar `storeCategories`; los filtros ya leen de este array.
 * - Colecciones visuales (imágenes individuales y collages): `storeCollections`.
 * - Carrito de compras y proceso de compra (etapa futura).
 */

/** Horario de atención de la tienda. */
export const storeSchedule = "9:00 am – 10:00 pm";

/** Ubicación del emprendimiento en Google Maps (Aragua, Venezuela). */
export const storeMapsUrl = "https://www.google.com/maps/search/Aragua%2C%20Venezuela/@10.0636,-67.2848,17z?hl=es";

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

/* ────────────────────────────────────────────────────────────────────────── *
 * Colecciones visuales
 *
 * Una colección agrupa categorías (subcategorías) y cada categoría contiene
 * imágenes. Una imagen puede ser:
 * - `individual`: muestra un solo producto.
 * - `collage`:    reúne varios productos (con sus precios) en una sola imagen.
 * - sin `format`: todavía no se ha clasificado (se muestra como referencia de
 *   catálogo y se consulta por WhatsApp sin inventar nombre ni precio).
 *
 * Los archivos viven en `img/` (carpeta que mantiene el cliente) y se copian a
 * `public/img/` con `npm run images:sync` (automático en dev/build).
 *
 * PENDIENTE DEL CLIENTE: confirmar, por imagen, si es `individual` o `collage`,
 * el nombre de cada producto, su precio y su descripción. Cuando un collage
 * muestre productos concretos, se pueden listar en `products`.
 * ────────────────────────────────────────────────────────────────────────── */

/** Formato visual de una imagen del catálogo. */
export type StoreMediaFormat = "individual" | "collage";

export type StoreMedia = {
  /** Identificador único de la imagen. */
  id: string;
  /** Ruta pública de la imagen servida desde `public/img`. */
  src: string;
  /** Texto alternativo accesible y descriptivo. */
  alt: string;
  /** Formato visual. Si se omite, queda pendiente de clasificar. */
  format?: StoreMediaFormat;
  /** Productos que aparecen dentro de un collage (cuando se conozcan). */
  products?: string[];
  /** Nota breve mostrada en la visor/ficha de la imagen. */
  note?: string;
};

/** Categoría (subcategoría) dentro de una colección. */
export type StoreSubcategory = {
  id: string;
  label: string;
  media: StoreMedia[];
};

/** Colección visual (por ejemplo, "Combo San Valentín"). */
export type StoreCollection = {
  id: string;
  label: string;
  description?: string;
  /** Imagen de portada mostrada en el selector de colecciones. */
  cover?: string;
  categories: StoreSubcategory[];
};

/** Prefijo público de la primera colección recibida del cliente. */
const comboSanValentinPath = "/img/combo san Valentín/catologo 1 rosas y tulipanes";

export const storeCollections: StoreCollection[] = [
  {
    id: "combo-san-valentin",
    label: "Combo San Valentín",
    description: "Selección especial de San Valentín: bouquets, buchones y tulipanes pensados para regalar. Cada imagen puede mostrar una opción o varias.",
    cover: `${comboSanValentinPath}/bouquets/1.jpg`,
    categories: [
      {
        id: "bouquets",
        label: "Bouquets",
        media: [
          { id: "bouquets-1", src: `${comboSanValentinPath}/bouquets/1.jpg`, alt: "Bouquet de la colección Combo San Valentín" },
          { id: "bouquets-2", src: `${comboSanValentinPath}/bouquets/2.jpg`, alt: "Bouquet de la colección Combo San Valentín" },
        ],
      },
      {
        id: "mini-buchones",
        label: "Mini buchones",
        media: [
          { id: "mini-buchones-1", src: `${comboSanValentinPath}/mini buchones/3.jpg`, alt: "Mini buchón de la colección Combo San Valentín" },
          { id: "mini-buchones-2", src: `${comboSanValentinPath}/mini buchones/4.jpg`, alt: "Mini buchón de la colección Combo San Valentín" },
        ],
      },
      {
        id: "buchones-propuesta",
        label: "Buchones de propuesta",
        media: [
          { id: "buchones-propuesta-1", src: `${comboSanValentinPath}/buchones de propuesta/5.jpg`, alt: "Buchón de propuesta de la colección Combo San Valentín" },
        ],
      },
      {
        id: "ramos-buchones",
        label: "Ramos buchones",
        media: [
          { id: "ramos-buchones-1", src: `${comboSanValentinPath}/ramos buchones/6.jpg`, alt: "Ramo buchón de la colección Combo San Valentín" },
        ],
      },
      {
        id: "ramos-personalizados",
        label: "Ramos personalizados",
        media: [
          { id: "ramos-personalizados-1", src: `${comboSanValentinPath}/ramos personalizados/7.jpg`, alt: "Ramo personalizado de la colección Combo San Valentín" },
          { id: "ramos-personalizados-2", src: `${comboSanValentinPath}/ramos personalizados/8.jpg`, alt: "Ramo personalizado de la colección Combo San Valentín" },
        ],
      },
      {
        id: "tulipanes",
        label: "Tulipanes",
        media: [
          { id: "tulipanes-1", src: `${comboSanValentinPath}/tulipanes/9.jpg`, alt: "Tulipanes de la colección Combo San Valentín" },
        ],
      },
    ],
  },
];
