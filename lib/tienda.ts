/**
 * Base de datos de la tienda Nanas Design.
 *
 * Negocio: Florista y tienda de regalos (compras y ventas minoristas).
 * - Horario de atención: 9:00 am – 10:00 pm
 * - Ubicación: Aragua, Venezuela (emprendimiento sin local físico todavía)
 * - Entregas locales en Maracay y zonas céntricas de Aragua
 * - Envíos a todo el territorio venezolano por empresas de encomiendas
 *   (MRW, Zoom y otras alternativas según la ubicación del cliente)
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

/**
 * Información de envíos — cobertura nacional.
 *
 * La tienda no se limita a una ciudad: envía a cualquier estado de Venezuela
 * mediante empresas de encomiendas. Maracay se conserva como referencia de
 * entregas locales, nunca como límite geográfico del servicio.
 */
export const storeShipping = {
  /** Alcance mostrado en la interfaz. */
  coverage: "Todo Venezuela",
  /** Empresas de encomiendas disponibles (se confirman según la ubicación). */
  carriers: ["MRW", "Zoom"],
  /** Ciudad de referencia para las entregas locales. */
  localReference: "Maracay",
} as const;

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
 * Organización: colección → catálogo → categoría → imágenes.
 * Una colección (por ejemplo, "Combo San Valentín") puede reunir varios catálogos
 * numerados, y cada catálogo contiene sus categorías. Esto permite agregar
 * catálogos nuevos sin tocar la interfaz.
 *
 * Una imagen puede ser:
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
  /** Identificador único de la imagen (prefijado con el catálogo para evitar colisiones). */
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

/** Categoría (subcategoría) dentro de un catálogo. */
export type StoreSubcategory = {
  id: string;
  label: string;
  media: StoreMedia[];
};

/** Catálogo visual dentro de una colección (por ejemplo, "Catálogo 1"). */
export type StoreCatalog = {
  id: string;
  label: string;
  /** Imagen de portada del catálogo. */
  cover?: string;
  categories: StoreSubcategory[];
};

/** Colección visual (por ejemplo, "Combo San Valentín"). */
export type StoreCollection = {
  id: string;
  label: string;
  description?: string;
  /** Imagen de portada mostrada en el selector de colecciones. */
  cover?: string;
  /** Catálogos que componen la colección. */
  catalogs: StoreCatalog[];
};

/** Rutas públicas de la colección "Combo San Valentín" (respetan la carpeta del cliente). */
const comboSanValentinPath = "/img/combo san Valentín";
const catalogo1Path = `${comboSanValentinPath}/catologo 1 rosas y tulipanes`;
const catalogo2Path = `${comboSanValentinPath}/catalogo 2 girasoles, ramos maquillaje`;
const catalogo3Path = `${comboSanValentinPath}/catalogo 3 ramos gomitas y personalizados`;
const catalogo4Path = `${comboSanValentinPath}/catalogo 4`;

/** Rutas públicas de la colección "Combo Flores Amarillas" (respetan las carpetas del cliente). */
const comboFloresAmarillasPath = "/img/combo flores amarillas";
const floresAmarillas1Path = `${comboFloresAmarillasPath}/flores amarillas`;
const floresAmarillas2Path = `${comboFloresAmarillasPath}/flores amarillas edicion limitada`;
const floresAmarillas21sPath = `${comboFloresAmarillasPath}/flores amarillas 21s/temporada 2026`;

/** Rutas públicas de las colecciones individuales (una carpeta por colección). */
const bouquetPath = "/img/bouquet";
const buchonesPath = "/img/buchones";
const cajaBombonesPath = "/img/caja con bombones";
const tulipanesEternosPath = "/img/tulipanes eternos";

export const storeCollections: StoreCollection[] = [
  {
    id: "combo-san-valentin",
    label: "Combo San Valentín",
    description: "Selección especial de San Valentín organizada en tres catálogos: rosas y tulipanes; girasoles, ramos y maquillaje; y ramos temáticos con gomitas y personalizados. Cada imagen puede mostrar una opción o varias.",
    cover: `${catalogo1Path}/bouquets/1.jpg`,
    catalogs: [
      {
        id: "catalogo-1-rosas-tulipanes",
        label: "Catálogo 1: Rosas y tulipanes",
        cover: `${catalogo1Path}/bouquets/1.jpg`,
        categories: [
          {
            id: "bouquets",
            label: "Bouquets",
            media: [
              { id: "c1-bouquets-1", src: `${catalogo1Path}/bouquets/1.jpg`, alt: "Bouquet del Catálogo 1, Combo San Valentín" },
              { id: "c1-bouquets-2", src: `${catalogo1Path}/bouquets/2.jpg`, alt: "Bouquet del Catálogo 1, Combo San Valentín" },
            ],
          },
          {
            id: "mini-buchones",
            label: "Mini buchones",
            media: [
              { id: "c1-mini-buchones-1", src: `${catalogo1Path}/mini buchones/3.jpg`, alt: "Mini buchón del Catálogo 1, Combo San Valentín" },
              { id: "c1-mini-buchones-2", src: `${catalogo1Path}/mini buchones/4.jpg`, alt: "Mini buchón del Catálogo 1, Combo San Valentín" },
            ],
          },
          {
            id: "buchones-propuesta",
            label: "Buchones de propuesta",
            media: [
              { id: "c1-buchones-propuesta-1", src: `${catalogo1Path}/buchones de propuesta/5.jpg`, alt: "Buchón de propuesta del Catálogo 1, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-buchones",
            label: "Ramos buchones",
            media: [
              { id: "c1-ramos-buchones-1", src: `${catalogo1Path}/ramos buchones/6.jpg`, alt: "Ramo buchón del Catálogo 1, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-personalizados",
            label: "Ramos personalizados",
            media: [
              { id: "c1-ramos-personalizados-1", src: `${catalogo1Path}/ramos personalizados/7.jpg`, alt: "Ramo personalizado del Catálogo 1, Combo San Valentín" },
              { id: "c1-ramos-personalizados-2", src: `${catalogo1Path}/ramos personalizados/8.jpg`, alt: "Ramo personalizado del Catálogo 1, Combo San Valentín" },
            ],
          },
          {
            id: "tulipanes",
            label: "Tulipanes",
            media: [
              { id: "c1-tulipanes-1", src: `${catalogo1Path}/tulipanes/9.jpg`, alt: "Tulipanes del Catálogo 1, Combo San Valentín" },
            ],
          },
        ],
      },
      {
        id: "catalogo-2-girasoles-ramos-maquillaje",
        label: "Catálogo 2: Girasoles, ramos y maquillaje",
        cover: `${catalogo2Path}/girasoles/1.jpg`,
        categories: [
          {
            id: "girasoles",
            label: "Girasoles",
            media: [
              { id: "c2-girasoles-1", src: `${catalogo2Path}/girasoles/1.jpg`, alt: "Girasoles del Catálogo 2, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-de-mariposas",
            label: "Ramos de mariposas",
            media: [
              { id: "c2-ramos-mariposas-1", src: `${catalogo2Path}/ramos de mariposas/2.jpg`, alt: "Ramo de mariposas del Catálogo 2, Combo San Valentín" },
            ],
          },
          {
            id: "ramo-de-maquillajes",
            label: "Ramo de maquillajes",
            media: [
              { id: "c2-ramo-maquillajes-1", src: `${catalogo2Path}/ramo de maquillajes/3.jpg`, alt: "Ramo de maquillajes del Catálogo 2, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-con-peluches",
            label: "Ramos con peluches",
            media: [
              { id: "c2-ramos-peluches-1", src: `${catalogo2Path}/ramos con peluches/4.jpg`, alt: "Ramo con peluches del Catálogo 2, Combo San Valentín" },
              { id: "c2-ramos-peluches-2", src: `${catalogo2Path}/ramos con peluches/5.jpg`, alt: "Ramo con peluches del Catálogo 2, Combo San Valentín" },
              { id: "c2-ramos-peluches-3", src: `${catalogo2Path}/ramos con peluches/6.jpg`, alt: "Ramo con peluches del Catálogo 2, Combo San Valentín" },
              { id: "c2-ramos-peluches-4", src: `${catalogo2Path}/ramos con peluches/7.jpg`, alt: "Ramo con peluches del Catálogo 2, Combo San Valentín" },
            ],
          },
          {
            id: "cajas-personalizadas",
            label: "Cajas personalizadas",
            media: [
              { id: "c2-cajas-personalizadas-1", src: `${catalogo2Path}/cajas personalizadas/8.jpg`, alt: "Caja personalizada del Catálogo 2, Combo San Valentín" },
              { id: "c2-cajas-personalizadas-2", src: `${catalogo2Path}/cajas personalizadas/9.jpg`, alt: "Caja personalizada del Catálogo 2, Combo San Valentín" },
            ],
          },
        ],
      },
      {
        id: "catalogo-3-ramos-gomitas-personalizados",
        label: "Catálogo 3: Ramos gomitas y personalizados",
        cover: `${catalogo3Path}/ramos tematicos/1.jpg`,
        categories: [
          {
            id: "ramos-tematicos",
            label: "Ramos temáticos",
            media: [
              { id: "c3-ramos-tematicos-1", src: `${catalogo3Path}/ramos tematicos/1.jpg`, alt: "Ramo temático del Catálogo 3, Combo San Valentín" },
              { id: "c3-ramos-tematicos-2", src: `${catalogo3Path}/ramos tematicos/2.jpg`, alt: "Ramo temático del Catálogo 3, Combo San Valentín" },
              { id: "c3-ramos-tematicos-3", src: `${catalogo3Path}/ramos tematicos/3.jpg`, alt: "Ramo temático del Catálogo 3, Combo San Valentín" },
              { id: "c3-ramos-tematicos-4", src: `${catalogo3Path}/ramos tematicos/4.jpg`, alt: "Ramo temático del Catálogo 3, Combo San Valentín" },
              { id: "c3-ramos-tematicos-5", src: `${catalogo3Path}/ramos tematicos/5.jpg`, alt: "Ramo temático del Catálogo 3, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-de-limpiapipas",
            label: "Ramos de limpiapipas",
            media: [
              { id: "c3-ramos-limpiapipas-1", src: `${catalogo3Path}/ramos de limpiapipas/6.jpg`, alt: "Ramo de limpiapipas del Catálogo 3, Combo San Valentín" },
            ],
          },
          {
            id: "rosas-y-girasoles",
            label: "Rosas y girasoles",
            media: [
              { id: "c3-rosas-girasoles-1", src: `${catalogo3Path}/rosas y girasoles/7.jpg`, alt: "Rosas y girasoles del Catálogo 3, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-de-gomitas",
            label: "Ramos de gomitas",
            media: [
              { id: "c3-ramos-gomitas-1", src: `${catalogo3Path}/ramos de gomitas/8.jpg`, alt: "Ramo de gomitas del Catálogo 3, Combo San Valentín" },
            ],
          },
        ],
      },
      {
        id: "catalogo-4-flores-y-regalos",
        label: "Catálogo 4: Flores y regalos",
        cover: `${catalogo4Path}/flores individuales/1.jpg`,
        categories: [
          {
            id: "flores-individuales",
            label: "Flores individuales",
            media: [
              { id: "c4-flores-individuales-1", src: `${catalogo4Path}/flores individuales/1.jpg`, alt: "Flores individuales del Catálogo 4, Combo San Valentín" },
            ],
          },
          {
            id: "gorras-y-hotweels",
            label: "Gorras y hotweels",
            media: [
              { id: "c4-gorras-hotweels-1", src: `${catalogo4Path}/gorras y hotweels/1.jpg`, alt: "Gorras y hotweels del Catálogo 4, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-con-fotos",
            label: "Ramos con fotos",
            media: [
              { id: "c4-ramos-con-fotos-1", src: `${catalogo4Path}/ramos con fotos/1.jpg`, alt: "Ramo con fotos del Catálogo 4, Combo San Valentín" },
            ],
          },
          {
            id: "ramos-de-chucherias",
            label: "Ramos de chucherías",
            media: [
              { id: "c4-ramos-chucherias-1", src: `${catalogo4Path}/ramos de chucherias/1.jpg`, alt: "Ramo de chucherías del Catálogo 4, Combo San Valentín" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "combo-flores-amarillas",
    label: "Combo Flores Amarillas",
    description: "Selección de flores amarillas organizada en tres catálogos: flores amarillas, flores amarillas 21s y edición limitada. Cada imagen puede mostrar una opción o varias.",
    cover: `${floresAmarillas1Path}/ramo de 7 rosas/1.jpg`,
    catalogs: [
      {
        id: "catalogo-flores-amarillas",
        label: "Catálogo: Flores amarillas",
        cover: `${floresAmarillas1Path}/ramo de 7 rosas/1.jpg`,
        categories: [
          {
            id: "ramo-de-7-rosas",
            label: "Ramo de 7 rosas",
            media: [
              { id: "fa1-ramo-7-rosas-1", src: `${floresAmarillas1Path}/ramo de 7 rosas/1.jpg`, alt: "Ramo de 7 rosas del Combo Flores Amarillas" },
            ],
          },
          {
            id: "girasoles-mariposa",
            label: "Girasoles mariposa",
            media: [
              { id: "fa1-girasoles-mariposa-1", src: `${floresAmarillas1Path}/girasoles mariposa/2.jpg`, alt: "Girasoles mariposa del Combo Flores Amarillas" },
            ],
          },
          {
            id: "girasoles-gigantes-medianos",
            label: "Girasoles gigantes y medianos",
            media: [
              { id: "fa1-girasoles-gigantes-1", src: `${floresAmarillas1Path}/girasoles gigantes y medianos ramos/3.jpg`, alt: "Girasoles gigantes y medianos del Combo Flores Amarillas" },
              { id: "fa1-girasoles-gigantes-2", src: `${floresAmarillas1Path}/girasoles gigantes y medianos ramos/4.jpg`, alt: "Girasoles gigantes y medianos del Combo Flores Amarillas" },
            ],
          },
          {
            id: "ramo-de-rosas",
            label: "Ramo de rosas",
            media: [
              { id: "fa1-ramo-rosas-1", src: `${floresAmarillas1Path}/ramo de rosas/5.jpg`, alt: "Ramo de rosas del Combo Flores Amarillas" },
            ],
          },
          {
            id: "rosas-con-flor-centrada",
            label: "Rosas con flor centrada",
            media: [
              { id: "fa1-rosas-flor-centrada-1", src: `${floresAmarillas1Path}/rosas con flor centrada/6.jpg`, alt: "Rosas con flor centrada del Combo Flores Amarillas" },
            ],
          },
          {
            id: "ramos-combinados",
            label: "Ramos combinados",
            media: [
              { id: "fa1-ramos-combinados-1", src: `${floresAmarillas1Path}/ramos combinados/7.jpg`, alt: "Ramo combinado del Combo Flores Amarillas" },
            ],
          },
          {
            id: "tulipanes",
            label: "Tulipanes",
            media: [
              { id: "fa1-tulipanes-1", src: `${floresAmarillas1Path}/tulipanes/8.jpg`, alt: "Tulipanes del Combo Flores Amarillas" },
            ],
          },
          {
            id: "flores-individuales",
            label: "Flores individuales",
            media: [
              { id: "fa1-flores-individuales-1", src: `${floresAmarillas1Path}/flores individuales/9.jpg`, alt: "Flores individuales del Combo Flores Amarillas" },
            ],
          },
        ],
      },
      {
        id: "catalogo-flores-amarillas-21s",
        label: "Catálogo: Flores amarillas 21s",
        cover: `${floresAmarillas21sPath}/flores con mariposas/1.jpg`,
        categories: [
          {
            id: "flores-con-mariposas",
            label: "Flores con mariposas",
            media: [
              { id: "fa21-flores-mariposas-1", src: `${floresAmarillas21sPath}/flores con mariposas/1.jpg`, alt: "Flores con mariposas del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "flores-de-limpiapipas",
            label: "Flores de limpiapipas",
            media: [
              { id: "fa21-flores-limpiapipas-1", src: `${floresAmarillas21sPath}/flores de limpiapipas/1.jpg`, alt: "Flores de limpiapipas del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "girasoles-eternos",
            label: "Girasoles eternos",
            media: [
              { id: "fa21-girasoles-eternos-1", src: `${floresAmarillas21sPath}/girasoles eternos/1.jpg`, alt: "Girasoles eternos del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "lirio-rapunzel",
            label: "Lirio Rapunzel",
            media: [
              { id: "fa21-lirio-rapunzel-1", src: `${floresAmarillas21sPath}/lirio rapunzel/1.jpg`, alt: "Lirio Rapunzel del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "ramos-van-gogh",
            label: "Ramos Van Gogh",
            media: [
              { id: "fa21-ramos-van-gogh-1", src: `${floresAmarillas21sPath}/ramos van gogh/1.jpg`, alt: "Ramo Van Gogh del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "rosas-eternas",
            label: "Rosas eternas",
            media: [
              { id: "fa21-rosas-eternas-1", src: `${floresAmarillas21sPath}/rosas eternas/1.jpg`, alt: "Rosas eternas del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
          {
            id: "tulipanes-eternos",
            label: "Tulipanes eternos",
            media: [
              { id: "fa21-tulipanes-eternos-1", src: `${floresAmarillas21sPath}/tulipanes eternos/1.jpg`, alt: "Tulipanes eternos del Combo Flores Amarillas (temporada 2026)" },
            ],
          },
        ],
      },
      {
        id: "catalogo-edicion-limitada",
        label: "Catálogo: Edición limitada",
        cover: `${floresAmarillas2Path}/maxi girasol/1.jpg`,
        categories: [
          {
            id: "maxi-girasol",
            label: "Maxi girasol",
            media: [
              { id: "fa2-maxi-girasol-1", src: `${floresAmarillas2Path}/maxi girasol/1.jpg`, alt: "Maxi girasol del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "buchon-sunny",
            label: "Buchón Sunny",
            media: [
              { id: "fa2-buchon-sunny-1", src: `${floresAmarillas2Path}/buchon sunny/2.jpg`, alt: "Buchón Sunny del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "mini-buchon",
            label: "Mini buchón",
            media: [
              { id: "fa2-mini-buchon-1", src: `${floresAmarillas2Path}/mini buchon/3.jpg`, alt: "Mini buchón del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "girasol-gigante-mariposa",
            label: "Girasol gigante mariposa",
            media: [
              { id: "fa2-girasol-gigante-mariposa-1", src: `${floresAmarillas2Path}/girasol gigante mariposa/4.jpg`, alt: "Girasol gigante mariposa del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "bouquet-atardecer",
            label: "Bouquet atardecer",
            media: [
              { id: "fa2-bouquet-atardecer-1", src: `${floresAmarillas2Path}/bouquet atardecer/5.jpg`, alt: "Bouquet atardecer del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "ramo-mixto",
            label: "Ramo mixto",
            media: [
              { id: "fa2-ramo-mixto-1", src: `${floresAmarillas2Path}/ramo mixto/6.jpg`, alt: "Ramo mixto del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "lirio-rapunzel",
            label: "Lirio Rapunzel",
            media: [
              { id: "fa2-lirio-rapunzel-1", src: `${floresAmarillas2Path}/lirio rapunzel/7.jpg`, alt: "Lirio Rapunzel del Combo Flores Amarillas (edición limitada)" },
            ],
          },
          {
            id: "margarita-gerberas",
            label: "Margarita gerberas",
            media: [
              { id: "fa2-margarita-gerberas-1", src: `${floresAmarillas2Path}/margarita gerberas/8.jpg`, alt: "Margarita gerberas del Combo Flores Amarillas (edición limitada)" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bouquet",
    label: "Bouquet",
    description: "Bouquets de rosas eternas. Cada imagen puede mostrar una opción o varias.",
    cover: `${bouquetPath}/bouquet de rosas eternas/1.jpg`,
    catalogs: [
      {
        id: "catalogo-bouquet",
        label: "Bouquet",
        cover: `${bouquetPath}/bouquet de rosas eternas/1.jpg`,
        categories: [
          {
            id: "bouquet-de-rosas-eternas",
            label: "Bouquet de rosas eternas",
            media: [
              { id: "bq-rosas-eternas-1", src: `${bouquetPath}/bouquet de rosas eternas/1.jpg`, alt: "Bouquet de rosas eternas" },
              { id: "bq-rosas-eternas-2", src: `${bouquetPath}/bouquet de rosas eternas/2.jpg`, alt: "Bouquet de rosas eternas" },
              { id: "bq-rosas-eternas-3", src: `${bouquetPath}/bouquet de rosas eternas/3.jpg`, alt: "Bouquet de rosas eternas" },
              { id: "bq-rosas-eternas-4", src: `${bouquetPath}/bouquet de rosas eternas/4.jpg`, alt: "Bouquet de rosas eternas" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "buchones",
    label: "Buchones",
    description: "Buchones de cumpleaños y ramos buchones. Cada imagen puede mostrar una opción o varias.",
    cover: `${buchonesPath}/buchones de cumpleaños/1.jpg`,
    catalogs: [
      {
        id: "catalogo-buchones",
        label: "Buchones",
        cover: `${buchonesPath}/buchones de cumpleaños/1.jpg`,
        categories: [
          {
            id: "buchones-de-cumpleanos",
            label: "Buchones de cumpleaños",
            media: [
              { id: "bu-cumpleanos-1", src: `${buchonesPath}/buchones de cumpleaños/1.jpg`, alt: "Buchón de cumpleaños" },
              { id: "bu-cumpleanos-2", src: `${buchonesPath}/buchones de cumpleaños/2.jpg`, alt: "Buchón de cumpleaños" },
              { id: "bu-cumpleanos-3", src: `${buchonesPath}/buchones de cumpleaños/3.jpg`, alt: "Buchón de cumpleaños" },
              { id: "bu-cumpleanos-4", src: `${buchonesPath}/buchones de cumpleaños/4.jpg`, alt: "Buchón de cumpleaños" },
              { id: "bu-cumpleanos-5", src: `${buchonesPath}/buchones de cumpleaños/5.jpg`, alt: "Buchón de cumpleaños" },
              { id: "bu-cumpleanos-6", src: `${buchonesPath}/buchones de cumpleaños/6.jpg`, alt: "Buchón de cumpleaños" },
            ],
          },
          {
            id: "ramos-buchones-2",
            label: "Ramos buchones 2",
            media: [
              { id: "bu-ramos-2-1", src: `${buchonesPath}/ramos buchones 2/1.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-2", src: `${buchonesPath}/ramos buchones 2/2.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-3", src: `${buchonesPath}/ramos buchones 2/3.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-4", src: `${buchonesPath}/ramos buchones 2/4.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-5", src: `${buchonesPath}/ramos buchones 2/5.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-6", src: `${buchonesPath}/ramos buchones 2/6.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-7", src: `${buchonesPath}/ramos buchones 2/7.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-8", src: `${buchonesPath}/ramos buchones 2/8.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-9", src: `${buchonesPath}/ramos buchones 2/9.jpg`, alt: "Ramo buchón" },
              { id: "bu-ramos-2-10", src: `${buchonesPath}/ramos buchones 2/10.jpg`, alt: "Ramo buchón" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "caja-con-bombones",
    label: "Caja con bombones",
    description: "Caja corazón con dedicatoria. Cada imagen puede mostrar una opción o varias.",
    cover: `${cajaBombonesPath}/caja corazon con dedicatoria/1.jpg`,
    catalogs: [
      {
        id: "catalogo-caja-con-bombones",
        label: "Caja con bombones",
        cover: `${cajaBombonesPath}/caja corazon con dedicatoria/1.jpg`,
        categories: [
          {
            id: "caja-corazon-con-dedicatoria",
            label: "Caja corazón con dedicatoria",
            media: [
              { id: "cb-caja-corazon-1", src: `${cajaBombonesPath}/caja corazon con dedicatoria/1.jpg`, alt: "Caja corazón con dedicatoria" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tulipanes-eternos",
    label: "Tulipanes eternos",
    description: "Tulipanes eternos: ramo de 3, ramo de 6 y tulipán en maceta. Cada imagen puede mostrar una opción o varias.",
    cover: `${tulipanesEternosPath}/ramo 3 tulipanes eternos/1.jpg`,
    catalogs: [
      {
        id: "catalogo-tulipanes-eternos",
        label: "Tulipanes eternos",
        cover: `${tulipanesEternosPath}/ramo 3 tulipanes eternos/1.jpg`,
        categories: [
          {
            id: "ramo-3-tulipanes-eternos",
            label: "Ramo 3 tulipanes eternos",
            media: [
              { id: "te-ramo-3-1", src: `${tulipanesEternosPath}/ramo 3 tulipanes eternos/1.jpg`, alt: "Ramo de 3 tulipanes eternos" },
            ],
          },
          {
            id: "ramo-de-6-tulipanes",
            label: "Ramo de 6 tulipanes",
            media: [
              { id: "te-ramo-6-1", src: `${tulipanesEternosPath}/ramo de 6 tulipanes/1.jpg`, alt: "Ramo de 6 tulipanes" },
            ],
          },
          {
            id: "tulipan-en-maceta",
            label: "Tulipán en maceta",
            media: [
              { id: "te-maceta-1", src: `${tulipanesEternosPath}/tulipan en maceta/1.jpg`, alt: "Tulipán en maceta" },
            ],
          },
        ],
      },
    ],
  },
];
