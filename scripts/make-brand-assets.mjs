/**
 * Genera los assets de marca (logotipo optimizado + iconos de pestaña)
 * a partir del archivo fuente entregado por el cliente.
 *
 * Fuente:  img/01.png  →  logotipo de Nanas Design (PNG con transparencia).
 * Salida:  public/brand/
 *   logo.png             logotipo optimizado para header y footer
 *   icon-32.png          icono de pestaña (32×32)
 *   icon-48.png          icono de pestaña (48×48)
 *   icon-192.png         icono grande (192×192)
 *   apple-touch-icon.png 180×180 con fondo crema (iOS no admite transparencia)
 *
 * Se ejecuta automáticamente con `predev` y `prebuild`. Si el cliente entrega un
 * logotipo nuevo, basta con reemplazar img/01.png y volver a compilar: no hace
 * falta tocar el código.
 */
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "img", "01.png");
const outDir = path.join(root, "public", "brand");

/** Ancho del logotipo optimizado para header/footer. */
const LOGO_WIDTH = 768;
/** Tamaño de los iconos cuadrados de pestaña. */
const ICON_SIZES = [32, 48, 192];
/** Fondo de relleno donde la transparencia no está soportada (iOS). */
const SOLID_BACKGROUND = "#fbf8f4";

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(source))) {
    console.warn("[brand-assets] No existe img/01.png; se omite la generación del logotipo.");
    return;
  }

  await mkdir(outDir, { recursive: true });

  // Logotipo optimizado: conserva la transparencia original.
  await sharp(source)
    .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logo.png"));

  // Iconos cuadrados: el arte se centra sobre un lienzo transparente.
  const square = (size) =>
    sharp(source).resize({
      width: size,
      height: size,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

  for (const size of ICON_SIZES) {
    await square(size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(outDir, `icon-${size}.png`));
  }

  // iOS convierte la transparencia en negro: se usa el crema de la marca.
  await square(180)
    .flatten({ background: SOLID_BACKGROUND })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "apple-touch-icon.png"));

  const meta = await sharp(path.join(outDir, "logo.png")).metadata();
  console.log(
    `[brand-assets] Logotipo e iconos generados en public/brand/ (logo.png ${meta.width}×${meta.height}).`,
  );
}

main().catch((error) => {
  console.error("[brand-assets] Error al generar los assets de marca:", error);
  process.exit(1);
});
