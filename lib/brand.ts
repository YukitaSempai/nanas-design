/**
 * Identidad de marca de Nanas Design — punto único de configuración.
 *
 * Aquí vive lo que el cliente irá entregando: el logotipo en alta resolución y,
 * más adelante, referencias a las fuentes personalizadas. Los colores se
 * configuran en `app/globals.css` (paleta de 5 tonos `--nana-1` … `--nana-5`).
 *
 * Mientras no existan los recursos definitivos, `logo` permanece en `null` y el
 * sitio dibuja el logotipo tipográfico actual (sin cambios visuales).
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
  /** Logotipo definitivo. Reemplazar cuando el cliente entregue el archivo. */
  logo: null as BrandLogo | null,
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
