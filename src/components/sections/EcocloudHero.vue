<!-- EcocloudHero.vue — Zona 1 de /ecosistema-cloud. Mismo patron de 2 columnas
     que HsmHero/HsmcsHero, sin eyebrow -el mockup de esta pagina no lo trae,
     el h1 arranca directo-.

     Video propio (nube+llave, Fredy 2026-08-27): 1:1 en origen, fondo blanco
     opaco -no transparente-, mismo criterio que CaasHero.vue: mix-blend-multiply
     quita esa base blanca para que se lea como parte de la tarjeta en vez de
     una imagen encimada.

     min-[769px]: y NO md: en el bloque de texto+CTA -mismo defecto que
     HsmSupport.vue/SpeiOperate.vue documentan: el reset global (style.scss)
     es max-width:768px (768 incluido) y el md: de Tailwind es min-width:768px
     (768 TAMBIEN incluido), asi que con md: ambos rangos se pisan exactamente
     en 768px -el texto vuelve a quedar centrado un pixel antes de que el
     reset lo suelte, aunque items-start/justify-start ya movieron la caja.
     Confirmado por captura en 768px exacto (Fredy, 2026-08-27, pidio
     verificar que los acuerdos de responsive del proyecto estuvieran
     aplicados en esta pagina). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center min-[769px]:items-start min-[769px]:text-left">
        <h1 class="hero font-secondary text-deep-ink">
          {{ t('ecoCloud.hero.titlePre') }}<br>
          {{ t('ecoCloud.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-ink-3">{{ t('ecoCloud.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 min-[769px]:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
            {{ t('ecoCloud.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-primary-soft p-10">
          <video
            class="mix-blend-multiply block aspect-square w-full object-contain"
            src="/videos/ecosistema-cloud-hero.mp4"
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
