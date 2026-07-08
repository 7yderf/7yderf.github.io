# frt-cnct-web

Landing page construida con **Nuxt 4**. Base configurada con el estándar visual de Tailwind y el sistema de inputs portado desde `tesseracto-front`.

## Stack

| Área | Herramienta |
|---|---|
| Framework | Nuxt 4 (SSR/SSG, `srcDir: 'src'`) |
| Estilos | Tailwind CSS v4 (config CSS-first en `src/assets/tailwind.css`) + SCSS global |
| Formularios | vee-validate 4 + yup (`src/components/inputs/`) |
| Data fetching | @tanstack/vue-query con hidratación SSR (`src/plugins/vue-query.ts`) |
| Estado | Pinia (`src/stores/`) |
| i18n | @nuxtjs/i18n — `es` (default) + `en`, locales en `i18n/locales/` |
| SEO | @nuxtjs/seo (sitemap, robots, schema.org) + `useSeoMeta` |
| Analytics | @nuxt/scripts (GTM vía `NUXT_PUBLIC_GTM_CONTAINER_ID`) |
| Carrusel | Swiper Element (web components, plugin `swiper.client.ts`) |
| Galería | lightGallery v2 (componente global `<VLightgallery>`) |
| Alertas | sweetalert2 (`useAlerts()` composable) |
| Iconos | @iconify/vue |

## Comandos

```bash
npm run dev        # desarrollo (http://localhost:3000)
npm run build      # build SSR
npm run generate   # sitio estático (.output/public)
npm run preview    # previsualizar build
npm run lint       # eslint (lint:fix para autocorregir)
```

## Configuración

Copiar `.env.example` a `.env`. En producción es obligatorio definir `NUXT_PUBLIC_SITE_URL` (canonical, sitemap, hreflang).

## Notas

- **Node**: se requiere Node 22+ (declarado en `engines` de `package.json`).
- **lightGallery** se usa bajo licencia GPLv3 (`licenseKey: '0000-0000-000-0000'`); para uso comercial cerrado se requiere licencia de pago.
- **Fuentes**: Jost es self-hosted (`public/fonts/`); DM Sans y Roboto Mono se cargan de Google Fonts (ver `nuxt.config.ts`).
- La página `src/pages/index.vue` es una demo que ejercita todo el stack — sustituir por el contenido real.
