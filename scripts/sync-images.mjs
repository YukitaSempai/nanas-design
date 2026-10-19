/**
 * Sincroniza los recursos de imagen desde ./img hacia ./public/img.
 *
 * ¿Por qué? El cliente agrega las fotos y los collages en la carpeta `img/`
 * de la raíz (ahí mantiene su organización por colecciones y categorías), pero
 * Next.js solo puede servir archivos que viven en `public/`. Este script copia
 * el contenido respetando la estructura de carpetas, sin borrar nada de
 * `public/img` (es una copia aditiva).
 *
 * Se ejecuta automáticamente antes de `npm run dev` y `npm run build`
 * (ver scripts `predev` y `prebuild` en package.json). También puede correrse
 * a mano con `npm run images:sync`.
 */
import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "img");
const target = path.join(root, "public", "img");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(source))) {
    console.log("[sync-images] No existe la carpeta ./img, nada que sincronizar.");
    return;
  }
  await mkdir(target, { recursive: true });
  // `force` sobrescribe si cambió el archivo; `errorOnExist: false` mantiene
  // los archivos que ya viven en public/img (por ejemplo, los existentes).
  await cp(source, target, { recursive: true, force: true, errorOnExist: false });
  console.log("[sync-images] Recursos sincronizados: img/ -> public/img/");
}

main().catch((error) => {
  console.error("[sync-images] Error al sincronizar las imágenes:", error);
  process.exit(1);
});
