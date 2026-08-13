<!-- CaasHero.vue — Zona 1 de /cripto-as-a-service. Dos columnas: marca, eyebrow,
     titular y CTA a la izquierda; media sobre card rosa a la derecha.
     Colapso por ancho disponible (flex-wrap + basis + min-w), no por viewport. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[36rem] flex-col items-center text-center md:items-start md:text-left">
        <img
          src="/logos/tesseract.svg"
          :alt="t('caas.hero.brandAlt')"
          class="h-7 w-auto object-contain opacity-45 grayscale"
        >

        <p class="mt-8 text-center text-base font-medium text-text md:text-left">{{ t('caas.hero.eyebrow') }}</p>

        <h1 class="hero mt-3 text-center font-secondary text-deep-ink md:text-left">
          {{ t('caas.hero.titlePre') }}<br>
          {{ t('caas.hero.titleMid') }}<br>
          {{ t('caas.hero.titlePost') }}
        </h1>

        <p class="mt-5 max-w-md text-center text-2xl font-medium text-text md:text-left">{{ t('caas.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('caas.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-brand-blush">
          <!-- Sin aspect fijo: el video declara su propia proporcion. La escala no
               participa del layout, asi que el figure mide el alto natural y
               recorta el 5% sobrante, que es donde vive el filo. -->
          <video
            class="mix-blend-multiply block w-full scale-105"
            src="/videos/controla-criptografia.mp4"
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
</script>
