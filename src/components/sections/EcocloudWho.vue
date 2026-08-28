<!-- EcocloudWho.vue — Zona 4. "¿Para quien es?": panel lavanda, todo centrado
     y apilado (titulo, texto con segmento en negrita, CTA, imagen abajo) - a
     diferencia de HsmcsWho que es 2 columnas, aca el mockup no tiene columna
     de texto/media separadas, todo vive en un solo eje central.

     bodyStrong va marcado en negrita via 3 claves (Pre/Strong/Post) en vez de
     **markdown** partido en segmentos alternos -mismo mecanismo que
     CaasOnePlace, aca con un solo segmento en negrita en vez de varios-.

     Video propio (Fredy 2026-08-27): 16:9, fondo solido que coincide pixel a
     pixel con --color-brand-violet-soft (230,225,255 medido contra E5E1F9 del
     token) -diseñado a proposito para fundirse con este panel sin tarjeta ni
     mix-blend, a diferencia del video del hero (ver EcocloudHero.vue). Se
     agranda respecto al placeholder anterior (20rem) porque el mockup lo
     muestra como pieza central grande, no un icono chico bajo el texto. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl bg-brand-violet-soft p-10 text-center lg-2:p-16">
      <h2 class="max-w-2xl font-secondary font-bold text-deep-ink">{{ t('ecoCloud.who.title') }}</h2>
      <p class="max-w-2xl text-xl text-text">
        {{ t('ecoCloud.who.bodyPre') }}<strong class="font-bold">{{ t('ecoCloud.who.bodyStrong') }}</strong>{{ t('ecoCloud.who.bodyPost') }}
      </p>

      <NuxtLink :to="localePath('/contact')" class="btn-primary mt-2">
        {{ t('ecoCloud.who.cta') }}
      </NuxtLink>

      <video
        class="mt-6 block w-full max-w-2xl object-contain"
        src="/videos/ecosistema-cloud-quien-es.mp4"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
