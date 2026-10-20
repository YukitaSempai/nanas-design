/**
 * Identidad de marca de Nanas Design — punto único de configuración.
 *
 * Aquí vive lo que el cliente irá entregando: el logotipo en alta resolución y,
 * más adelante, referencias a las fuentes personalizadas. Los colores se
 * configuran en `app/globals.css` (paleta de 5 tonos `--nana-1` … `--nana-5`).
 *
 * El logotipo se genera automáticamente desde `img/01.png` (archivo fuente del
 * cliente) mediante `scripts/make-brand-assets.mjs`, que crea versiones
 * optimizadas en `public/brand/` (logo e iconos de pestaña). Para cambiar el
 * logotipo basta con reemplazar `img/01.png` y recompilar.
 */

export type BrandLogo = {
  /** Ruta pública del logotipo para fondos claros (p. ej. "/brand/logo.svg"). */
  src: string;
  /** Variante opcional para fondos oscuros (footer). Si no se indica, usa `src`. */
  srcLight?: string;
  /** Ancho intrínseco del archivo (para respetar proporciones). */
  width: number;
  /** Alto intrínseco del archivo. */
  height: number;
  /** Texto alternativo accesible. */
  alt: string;
};

export const brand = {
  name: "Nanas Design",
  /** Correo oficial del negocio. */
  email: "nanasdesign00700@gmail.com",
  /**
   * Logotipo del negocio (entregado por el cliente en `img/01.png`).
   * Se usa en el header, el footer y como icono de pestaña.
   */
  logo: {
    src: "/brand/logo.png",
    /** Ancho y alto intrínsecos del archivo generado (768×668). */
    width: 768,
    height: 668,
    alt: "Nanas Design",
  } as BrandLogo | null,
  /**
   * Familias tipográficas. Se definen como variables CSS en `app/globals.css`
   * (`--brand-font-heading`, `--brand-font-body`, `--brand-font-logo`) para poder
   * intercambiarlas cuando lleguen las fuentes personalizadas.
   */
  fonts: {
    heading: "var(--brand-font-heading)",
    body: "var(--brand-font-body)",
    logo: "var(--brand-font-logo)",
  },
};
