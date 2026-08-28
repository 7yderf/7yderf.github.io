<!-- HsmDataLocation.vue — Zona 3. Dos columnas sobre fondo crema: media a la
     izquierda, texto + CTA a la derecha. Mismo fondo `bg-cream` que
     IndustriesGrid para alternar el ritmo de la pagina.

     min-[769px]: y NO md: en el bloque de texto -mismo defecto que
     HsmSupport.vue/SpeiOperate.vue/EcocloudHero.vue documentan: el reset
     global (style.scss) es max-width:768px (768 incluido) y el md: de
     Tailwind es min-width:768px (768 TAMBIEN incluido), asi que con md: ambos
     rangos se pisan exactamente en 768px. Corregido al verificar los
     acuerdos de responsive del proyecto en toda la web (Fredy, 2026-08-27). -->
<template>
  <section class="sc-section w-full bg-cream px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-6xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section min-w-[26rem] basis-[32rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl">
          <!-- scale-105 + object-cover recorta el filo negro del video (FeatureCards.vue) -->
          <video
            class="mix-blend-multiply block aspect-[4/3] w-full scale-105 object-cover"
            src="/videos/boveda.mp4"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
          />
        </figure>
      </div>

      <div class="sc-section flex min-w-[26rem] basis-[30rem] flex-col items-center text-center min-[769px]:items-start min-[769px]:text-left">
        <h2 class="font-secondary text-deep-ink">
          <span class="font-bold">{{ t('hsm.dataLocation.titlePre') }}</span><br>
          <span class="font-bold">{{ t('hsm.dataLocation.titleHighlight') }}</span>
        </h2>
        <p class="mt-5 max-w-md text-ink-3">{{ t('hsm.dataLocation.description') }}</p>
        <NuxtLink
          :to="localePath('/contact')"
          class="btn-custom btn-pill mt-8"
          :style="{ '--btn-color': 'var(--color-primary)' }"
        >
          {{ t('hsm.dataLocation.cta') }} →
        </NuxtLink>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
