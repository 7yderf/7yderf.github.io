<!-- EcocloudWho.vue — Zona 4. "¿Para quien es?": panel lavanda, todo centrado
     y apilado (titulo, texto con segmento en negrita, CTA, imagen abajo) - a
     diferencia de HsmcsWho que es 2 columnas, aca el mockup no tiene columna
     de texto/media separadas, todo vive en un solo eje central.

     bodyStrong va marcado en negrita via 3 claves (Pre/Strong/Post) en vez de
     **markdown** partido en segmentos alternos -mismo mecanismo que
     CaasOnePlace, aca con un solo segmento en negrita en vez de varios-.

     PLACEHOLDER: el mockup trae una caja/candado 3D propia; se reusa
     post-quantica.webp -mismo criterio que el resto de esta pagina-. -->
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

      <img
        src="/images/caas/post-quantica.webp"
        alt=""
        aria-hidden="true"
        class="mt-6 w-full max-w-[20rem] object-contain"
        loading="lazy"
        decoding="async"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
