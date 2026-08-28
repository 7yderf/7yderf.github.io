<!-- SpeiHero.vue — Zona 1 de /infraestructura-spei. Dos columnas: marca + eyebrow
     + titular + CTA a la izquierda, media sobre card azul a la derecha.
     Colapso por ancho disponible (flex-wrap + basis + min-w), no por viewport
     — pattern:visual-dos-columnas-responsive.
     PLACEHOLDER: el video sale de public/videos del home hasta tener el arte
     propio de SPEI.

     min-[769px]: y NO md: en el bloque de texto+CTA -mismo defecto que
     HsmSupport.vue/SpeiOperate.vue/EcocloudHero.vue documentan: el reset
     global (style.scss) es max-width:768px (768 incluido) y el md: de
     Tailwind es min-width:768px (768 TAMBIEN incluido), asi que con md: ambos
     rangos se pisan exactamente en 768px. Corregido al verificar los
     acuerdos de responsive del proyecto en toda la web (Fredy, 2026-08-27). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center min-[769px]:items-start min-[769px]:text-left">
        <!-- La marca es el logo real de public/logos, el mismo que usa el strip
             de fabricantes del home; atenuado como en la referencia. -->
        <span class="text-center text-xs font-medium text-ink-3 min-[769px]:text-left">{{ t('spei.hero.trustedBy') }}</span>
        <img
          src="/logos/hermes.svg"
          :alt="t('spei.hero.brandAlt')"
          class="mt-1 h-6 w-auto object-contain opacity-45 grayscale"
        >

        <p class="mt-8 text-center text-base font-medium text-text min-[769px]:text-left">{{ t('spei.hero.eyebrow') }}</p>

        <h1 class="hero mt-2 text-center font-secondary text-deep-ink min-[769px]:text-left">
          {{ t('spei.hero.titlePre') }}<br>
          {{ t('spei.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-center text-2xl font-medium text-text min-[769px]:text-left">{{ t('spei.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 min-[769px]:justify-start">
          <!-- Radio base del boton: la referencia no usa pildora aqui. -->
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('spei.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-info-soft">
          <!-- Sin aspect fijo: el video declara su propia proporcion. La escala
               no participa del layout, asi que el figure mide el alto natural y
               recorta el 5% sobrante — que es lo que se lleva el filo negro. -->
          <video
            class="mix-blend-multiply block w-full scale-105"
            src="/videos/monedas.mp4"
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
