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
        <NuxtLink :to="localePath('/')" class="font-secondary text-xl font-bold text-deep-ink">
          CONECTA
        </NuxtLink>

        <ul class="hidden items-center gap-8 font-secondary text-sm font-medium text-text lg:flex">
          <li><a href="#" class="hover:text-primary">{{ t('nav.solutions') }}</a></li>
          <li><a href="#" class="hover:text-primary">{{ t('nav.services') }}</a></li>
          <li><a href="#" class="hover:text-primary">{{ t('nav.vendors') }}</a></li>
          <li><a href="#" class="hover:text-primary">{{ t('nav.industries') }}</a></li>
          <li><a href="#" class="hover:text-primary">{{ t('nav.resources') }}</a></li>
          <li><a href="#" class="hover:text-primary">{{ t('nav.about') }}</a></li>
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
          <div class="font-secondary text-xl font-bold text-deep-ink">CONECTA</div>
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
      </div>

      <div class="border-t border-line">
        <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 font-secondary text-sm text-ink-3 md:flex-row lg:px-8">
          <p>© {{ year }} Conecta. {{ t('footer.rights') }}</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-primary">{{ t('footer.privacy') }}</a>
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

const companyLinks = useLocalizedStrings('footer.company.links', 4)
const solutionsLinks = useLocalizedStrings('footer.solutions.links', 4)
const complianceLinks = useLocalizedStrings('footer.compliance.links', 4)

const footerColumns = computed(() => [
  { title: t('footer.company.title'), links: companyLinks.value },
  { title: t('footer.solutions.title'), links: solutionsLinks.value },
  { title: t('footer.compliance.title'), links: complianceLinks.value },
])
</script>
