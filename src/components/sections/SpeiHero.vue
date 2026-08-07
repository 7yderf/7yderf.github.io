<!-- SpeiHero.vue — Zona 1 de /infraestructura-spei. Dos columnas: marca + eyebrow
     + titular + CTA a la izquierda, media sobre card azul a la derecha.
     Colapso por ancho disponible (flex-wrap + basis + min-w), no por viewport
     — pattern:visual-dos-columnas-responsive.
     PLACEHOLDER: el video sale de public/videos del home hasta tener el arte
     propio de SPEI. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center md:items-start md:text-left">
        <span class="font-secondary text-lg font-bold tracking-wide text-primary">{{ t('spei.hero.brand') }}</span>
        <p class="mt-2 text-center text-sm font-medium text-ink-3 md:text-left">{{ t('spei.hero.eyebrow') }}</p>

        <h1 class="hero mt-2 text-center font-secondary text-deep-ink md:text-left">
          {{ t('spei.hero.titlePre') }}<br>
          {{ t('spei.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-center text-ink-3 md:text-left">{{ t('spei.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
            {{ t('spei.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-info-soft">
          <!-- scale-105 + object-cover recorta el filo negro que traen los videos -->
          <video
            class="mix-blend-multiply block aspect-[4/3] w-full scale-105 object-cover"
            src="/videos/pagos.mp4"
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
