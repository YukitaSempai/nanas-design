# Nanas Design

Sitio de Nanas Design: flores artesanales hechas con cintas y telas.

## Desarrollo local

1. Instala Node.js 20.19 o superior.
2. En la terminal integrada de VS Code, ejecuta `npm install`.
3. Ejecuta `npm run dev` y abre [http://localhost:3000](http://localhost:3000).

Next.js Fast Refresh actualiza la página al guardar archivos `.tsx`, `.ts` o `.css`. Guarda el proyecto en VS Code y deja el servidor de desarrollo corriendo para ver los cambios mientras trabajas.

## Stack preparado

- Next.js 15, React 19 y TypeScript.
- Tailwind CSS 4, componentes compatibles con shadcn/ui, Lucide y Framer Motion.
- Prisma con esquema PostgreSQL listo para productos, consultas y pedidos.
- Variables de entorno de ejemplo para Clerk, Cloudinary, Stripe, Mercado Pago y Resend en `.env.example`.
- Imágenes locales en `public/img` para servirlas y optimizarlas con Next Image.

Las cuentas, claves API, webhooks, modelo de catálogo y flujos de pago deben configurarse antes de activar autenticación, persistencia, carga de archivos o pagos reales. Copia `.env.example` a `.env` y completa los valores de las cuentas que decidas usar.

## Despliegue

El proyecto está configurado para exportación estática de Next.js y Cloudflare Pages: `npm run build` genera el directorio `out/`. En Cloudflare Pages, usa el comando de build `npm run build` y el directorio de salida `out`. Al estar conectado al repositorio Git, Pages vuelve a desplegar cada push a la rama de producción. Las funciones que necesiten servidor (base de datos, autenticación y pagos) requieren cambiar a Cloudflare Workers o a Vercel.

## Estructura

```
app/                   páginas y estilos globales
components/            navegación, animaciones y botón UI
lib/                   utilidades compartidas
prisma/schema.prisma   modelos de base de datos
public/img/            fotografías del sitio
```
