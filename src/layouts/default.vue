<template>
  <div class="isolate flex min-h-screen flex-col bg-bg-second font-primary text-text">
    <!-- Fondo decorativo: glow naranja difuminado, fijo, asomando ~40% por la izquierda.
         -z-10 + isolate en el root: queda sobre el fondo blanco y bajo el contenido. -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10"
      style="background: radial-gradient(90rem 90rem at -5% 90%, rgba(255, 122, 77, 0.22), transparent 62%);"
    ></div>

    <!-- Announcement bar -->
    <div class="w-full bg-gradient-to-r from-accent to-primary-light px-4 py-2.5 text-text-invert">
      <p class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-2 text-center text-sm">
        <Icon icon="mdi:alert-circle-outline" class="hidden shrink-0 sm:block" width="18" height="18" />
        <strong class="font-semibold">{{ t('announcement.text') }}</strong>
        <a href="#" class="underline underline-offset-2">{{ t('announcement.cta') }} →</a>
      </p>
    </div>

    <!-- Header / Nav -->
    <header class="sc-header sticky top-0 z-40 flex-col border-b border-line bg-bg-second/95 backdrop-blur">
      <nav class="sc-nav mx-auto w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <NuxtLink :to="localePath('/')" class="shrink-0">
          <img src="/images/logo-conecta.png" alt="CONECTA" class="h-6 w-auto">
        </NuxtLink>

        <ul class="hidden items-center gap-8 font-secondary text-sm font-medium text-text lg:flex">
          <li><NuxtLink :to="`${localePath('/')}#soluciones`" class="hover:text-primary">{{ t('nav.solutions') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#fabricantes`" class="hover:text-primary">{{ t('nav.vendors') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#industrias`" class="hover:text-primary">{{ t('nav.industries') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#recursos`" class="hover:text-primary">{{ t('nav.resources') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#nosotros`" class="hover:text-primary">{{ t('nav.about') }}</NuxtLink></li>
        </ul>

        <div class="flex items-center gap-3">
          <LanguageSwitcher />
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('nav.cta') }} →
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="sc-footer flex-col border-t border-line bg-bg-second">
      <div class="sc-article mx-auto flex w-full max-w-7xl flex-wrap gap-10 px-4 py-7 lg:px-8 lg-2:py-14">
        <div class="min-w-[16rem] grow-[2] basis-64">
          <img src="/images/logo-conecta.png" alt="CONECTA" class="h-6 w-auto">
          <p class="mt-3 max-w-xs font-secondary text-sm text-ink-3">{{ t('footer.tagline') }}</p>
        </div>

        <div v-for="column in footerColumns" :key="column.title" class="min-w-[10rem] grow basis-40">
          <h3 class="font-secondary text-sm font-bold text-deep-ink">{{ column.title }}</h3>
          <ul class="mt-4 flex flex-col gap-3 font-secondary text-sm text-ink-3">
            <li v-for="link in column.links" :key="link">
              <a href="#" class="hover:text-primary">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div class="min-w-[10rem] grow basis-40">
          <h3 class="font-secondary text-sm font-bold text-deep-ink">{{ t('footer.contact.title') }}</h3>
          <ul class="mt-4 flex flex-col gap-3 font-secondary text-sm text-ink-3">
            <li>
              {{ t('footer.contact.emailLabel') }}:
              <a :href="`mailto:${t('footer.contact.email')}`" class="hover:text-primary">{{ t('footer.contact.email') }}</a>
            </li>
            <li>
              {{ t('footer.contact.phoneLabel') }}:
              <a :href="`tel:${t('footer.contact.phone').replace(/\s+/g, '')}`" class="hover:text-primary">{{ t('footer.contact.phone') }}</a>
            </li>
            <li>{{ t('footer.contact.address') }}</li>
          </ul>

          <div class="mt-5 flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-line text-deep-ink hover:border-primary hover:text-primary"
            >
              <Icon :icon="social.icon" width="18" height="18" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-line">
        <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 font-secondary text-sm text-ink-3 md:flex-row lg:px-8">
          <p>© {{ year }} Conecta. {{ t('footer.rights') }}</p>
          <div class="flex gap-6">
            <NuxtLink :to="localePath('/privacy')" class="hover:text-primary">{{ t('footer.privacy') }}</NuxtLink>
            <a href="#" class="hover:text-primary">{{ t('footer.terms') }}</a>
            <a href="#" class="hover:text-primary">{{ t('footer.security') }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const localePath = useLocalePath()
const { t } = useI18n()

const year = new Date().getFullYear()

const complianceLinks = useLocalizedStrings('footer.compliance.links', 4)

// Compañía y Soluciones ocultas por ahora (pedido explícito) — las traducciones
// siguen en i18n/locales, solo falta agregarlas de vuelta a este array.
const footerColumns = computed(() => [
  { title: t('footer.compliance.title'), links: complianceLinks.value },
])

const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', href: 'https://www.linkedin.com/company/conectamx/' },
  { name: 'TikTok', icon: 'simple-icons:tiktok', href: 'https://www.tiktok.com/@conectamx_soluciones' },
  { name: 'Instagram', icon: 'mdi:instagram', href: 'https://www.instagram.com/conectamx_soluciones/' },
  { name: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/ConectaSolucionesMX' },
]
</script>
