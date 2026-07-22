// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: 'src',

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        // .ico = fallback legacy (navegadores/UIs viejas). Reemplazar
        // public/favicon.ico por uno generado desde public/images/favicon-source.png
        // (multi-size 16/32/48) cuando este listo — mientras tanto sigue
        // siendo el icono default de Nuxt.
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // PNG standalone — lo que usan los navegadores modernos en la practica
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Poppins (fuente del sitio) + Roboto Mono vía Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Roboto+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },

  css: [
    '@/assets/tailwind.css',
    '@/assets/scss/style.scss',
    'sweetalert2/dist/sweetalert2.min.css',
  ],

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/scripts',
  ],

  components: [{ path: '~/components', pathPrefix: false }],

  pinia: {
    storesDirs: ['./src/stores/**'],
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    locales: [
      { code: 'es', language: 'es-MX', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
    },
  },

  // @nuxtjs/seo: sitemap, robots, og-image, schema.org.
  // robots: indexable solo con NODE_ENV=production (default del módulo).
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Conecta',
  },

  // Generación dinámica de imágenes OG desactivada (requiere renderer extra);
  // la og:image se define estática con useSeoMeta.
  ogImage: {
    enabled: false,
  },

  // GTM solo se registra si hay container ID en el entorno
  ...(process.env.NUXT_PUBLIC_GTM_CONTAINER_ID
    ? {
        scripts: {
          registry: {
            googleTagManager: { id: process.env.NUXT_PUBLIC_GTM_CONTAINER_ID },
          },
        },
      }
    : {}),

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
      gtmContainerId: process.env.NUXT_PUBLIC_GTM_CONTAINER_ID || '',
    },
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          // El SCSS heredado usa @import/map-get (sintaxis pre-Dart Sass 3).
          // Silenciado hasta migrar a @use/@forward.
          silenceDeprecations: ['import', 'global-builtin'],
        },
      },
    },
  },

  vue: {
    compilerOptions: {
      // Swiper Element se usa como web component (<swiper-container>, <swiper-slide>)
      isCustomElement: (tag) => tag.startsWith('swiper-'),
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
    },
  },
})
