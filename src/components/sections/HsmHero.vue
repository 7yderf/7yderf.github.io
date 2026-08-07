<!-- HsmHero.vue — Zona 1 de /hardware-criptografico. Dos columnas: texto (logos de
     fabricantes + eyebrow + titular + CTA) y media sobre card lavanda.
     Colapso por ancho disponible (flex-wrap + basis + min-w), no por viewport
     — pattern:visual-dos-columnas-responsive. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center md:items-start md:text-left">
        <!-- Fabricantes que respaldan la plataforma: silueta monocroma, sin marquesina -->
        <div class="flex flex-wrap items-center justify-center gap-8 md:justify-start">
          <img
            v-for="logo in logos"
            :key="logo.src"
            :src="logo.src"
            :alt="logo.alt"
            class="h-6 w-auto object-contain opacity-40 grayscale"
            loading="lazy"
            decoding="async"
          >
        </div>

        <p class="mt-10 text-sm font-medium text-ink-3">{{ t('hsm.hero.eyebrow') }}</p>
        <h1 class="hero mt-2 font-secondary text-deep-ink">
          {{ t('hsm.hero.titlePre') }}<br>
          {{ t('hsm.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-ink-3">{{ t('hsm.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
            {{ t('hsm.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-primary-soft">
          <!-- scale-105 + object-cover recorta el filo negro que traen los videos;
               mismo tratamiento que FeatureCards.vue -->
          <video
            class="mix-blend-multiply block aspect-[4/3] w-full scale-105 object-cover"
            src="/videos/escudo.mp4"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
          />
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Fabricantes de HSM certificado (public/logos) — subconjunto del strip del home.
const logos = [
  { src: '/logos/thales.svg', alt: 'Thales' },
  { src: '/logos/utimaco.svg', alt: 'Utimaco' },
  { src: '/logos/entrust.svg', alt: 'Entrust' },
]
</script>
