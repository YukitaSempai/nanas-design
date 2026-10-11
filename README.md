# Nanas Design

Sitio web de **Nanas Design**, emprendimiento de arreglos florales artesanales
hechos con cintas y telas (flores eternas).

## Estado actual

- Sitio **estático** de una sola página (landing).
- HTML + CSS + JavaScript en un solo archivo (`index.html`).
- Sin backend, sin base de datos, sin proceso de build.

## Tecnologías

- HTML5 / CSS3 / JavaScript (vanilla)
- [Bootstrap 5.3.3](https://getbootstrap.com/) (CDN, solo para el grid)
- [Google Fonts](https://fonts.google.com/) — Playfair Display + Nunito

## Estructura

```
.
├── index.html   # Toda la página (HTML + CSS + JS embebidos)
├── img/         # Imágenes locales del sitio
└── .gitignore
```

## Desarrollo local

No requiere instalación de dependencias. Sirve la carpeta con cualquier
servidor estático:

```bash
python -m http.server 8123
```

Luego abre http://127.0.0.1:8123 en el navegador.

## Despliegue

Pensado para **Cloudflare Pages** (hosting estático gratuito) mediante
despliegue por Git. Sin build: directorio de salida = raíz del repositorio.

## Próximos pasos (no implementados todavía)

- Enlazar botones de contacto (WhatsApp, Instagram, email).
- Menú móvil funcional (hamburger).
- Reemplazar imágenes placeholder de Unsplash por fotos reales.
- Optimizar el peso de las imágenes.
- Backend, autenticación y base de datos (etapa futura).
