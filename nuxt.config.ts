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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // DM Sans + Roboto Mono vía Google Fonts (Jost es self-hosted, ver scss/style.scss)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Roboto+Mono:wght@400;500&display=swap',
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
      routes: ['/'],
    },
  },
})
