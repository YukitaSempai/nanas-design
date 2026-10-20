# Identidad visual y catálogo de la tienda

Guía breve para saber **qué recursos faltan** y **dónde se integran** sin
reconstruir nada.

---

## 1. Identidad visual

### 1.1 Logotipo ✅ integrado
- **Fuente:** el cliente entrega el archivo en **`img/01.png`** (PNG con
  transparencia). Ese es el logotipo del negocio.
- **Generación automática:** `scripts/make-brand-assets.mjs` crea versiones
  optimizadas en `public/brand/` antes de `dev` y `build`:
  - `logo.png` (768 px de ancho) → header y footer.
  - `icon-32.png`, `icon-48.png`, `icon-192.png` → icono de pestaña.
  - `apple-touch-icon.png` (180 px, fondo crema porque iOS no admite alfa).
- **Configuración:** `lib/brand.ts` → `brand.logo`. El componente
  `components/brand-logo.tsx` lo usa en header y footer.
- **Para cambiar el logotipo:** basta con reemplazar `img/01.png` y recompilar
  (`npm run build`). No hay que tocar código.
- `public/brand/` está en `.gitignore` porque es un archivo generado.

> Nota de contraste: el logotipo actual es de tono lavanda claro. En el footer
> oscuro destaca bien; en el header crema es más suave. Si el cliente entrega una
> variante oscura o un SVG, se integra en `brand.logo.src` / `srcLight`.

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
