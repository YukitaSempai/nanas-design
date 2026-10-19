# Identidad visual y catálogo de la tienda

Guía breve para saber **qué recursos faltan** y **dónde se integran** sin
reconstruir nada.

---

## 1. Identidad visual (pendiente del cliente)

### 1.1 Logotipo
- **Qué enviar:** el logo en alta resolución y con fondo transparente. El texto
  dibujado a mano "Nana.Design" funciona mejor como **SVG vectorial**; si viene
  como imagen, usar PNG con transparencia.
- **Dónde colocarlo:** `public/brand/` (por ejemplo `public/brand/logo.svg`).
- **Cómo activarlo:** en `lib/brand.ts`, reemplazar `logo: null` por:
  ```ts
  logo: {
    src: "/brand/logo.svg",        // fondos claros
    srcLight: "/brand/logo-light.svg", // opcional, fondos oscuros (footer)
    width: 320,                     // ancho real del archivo
    height: 80,                     // alto real del archivo
    alt: "Nanas Design",
  },
  ```
- Mientras `logo` sea `null`, el sitio dibuja el logotipo tipográfico actual
  (idéntico al de hoy). El componente que lo resuelve es
  `components/brand-logo.tsx` y ya se usa en el header y el footer.

### 1.2 Tipografía
- **Qué enviar:** los archivos de fuente (preferible `.woff2`) para títulos,
  textos y, si aplica, el logotipo.
- **Dónde colocarlos:** `app/fonts/` (para `next/font/local`) o `public/fonts/`.
- **Cómo activarlos:** hoy las familias se definen en `app/globals.css`:
  ```css
  --brand-font-heading: "Cormorant Garamond", "Bodoni MT", Georgia, serif;
  --brand-font-body: "DM Sans", "Aptos", Arial, sans-serif;
  --brand-font-logo: var(--brand-font-heading);
  ```
  Basta reemplazar esas variables. Como toda la web ya usa
  `var(--brand-font-heading)` y `var(--brand-font-body)`, el cambio se propaga
  solo. (Recomendado a futuro: cargar las fuentes con `next/font/local` y apuntar
  las variables a ese resultado.)

### 1.3 Paleta de color
- **Qué enviar:** los 5 tonos de la marca (idealmente en hexadecimal).
- **Dónde se integran:** `app/globals.css`, bloque `--nana-1` … `--nana-5`:
  ```css
  --nana-1: #392c35; /* textos principales */
  --nana-2: #704c62; /* acento de marca */
  --nana-3: #a77e88; /* acento suave */
  --nana-4: #e4c9ce; /* rosa */
  --nana-5: #fbf8f4; /* fondo */
  ```
  Estos cinco valores ya están expuestos como utilidades de Tailwind
  (`bg-nana-2`, `text-nana-1`, etc.) para el trabajo nuevo.
- **Nota:** el diseño actual todavía usa valores hexadecimales directos en los
  componentes (identidad vigente). Cuando llegue la paleta definitiva, se migran
  esos valores a los tokens de forma progresiva, sin tocar la estructura.

---

## 2. Imágenes y catálogo

### 2.1 Carpeta de imágenes
- El cliente agrega las fotos en la carpeta **`img/`** de la raíz, respetando su
  organización por colecciones y categorías (por ejemplo
  `img/combo san Valentín/catologo 1 rosas y tulipanes/bouquets/`).
- Los recursos se copian a `public/img/` automáticamente antes de `npm run dev`
  y `npm run build` (script `scripts/sync-images.mjs`). También se puede forzar
  con `npm run images:sync`.
- En el código, las imágenes se referencian con la ruta pública `/img/...`.

### 2.2 Colecciones (imágenes individuales y collages)
Se definen en `lib/tienda.ts` → `storeCollections`.

- `individual`: la imagen muestra **un** producto.
- `collage`: la imagen reúne **varios** productos y precios.
- sin `format`: queda como referencia de catálogo (se consulta por WhatsApp sin
  inventar nombre ni precio).

Ejemplo para clasificar una imagen:
```ts
{ id: "bouquets-1", src: `${path}/bouquets/1.jpg`, alt: "Bouquet de rosas",
  format: "collage", products: ["Ramo de 13 rosas con cinta", "Bouquet de tulipanes"] }
```

**Pendiente del cliente (por imagen):** confirmar si es `individual` o `collage`,
y cuando sea un collage, el nombre, el precio y la descripción de cada producto.

### 2.3 Productos individuales comprables
Se definen en `lib/tienda.ts` → `storeItems` (tipo `StoreItem`), con nombre,
descripción, imagen, categoría, precio o etiqueta de precio. Se muestran en el
catálogo de la tienda y, los marcados con `featured: true`, en la portada.

---

## 3. Pedidos por WhatsApp (ya activo)

- Todo el flujo pasa por `lib/whatsapp.ts` (`whatsappUrl`, `productOrderMessage`,
  `collectionInquiryMessage`), con el número `584128985585`.
- El catálogo abre WhatsApp con el nombre real del producto.
- Las colecciones abren WhatsApp indicando colección y categoría (útil para
  collages, donde aún no hay un producto único confirmado).
- El paso siguiente (cuando existan variantes/personalizaciones) es ampliar el
  mensaje por producto. No se reemplaza el mecanismo actual.
