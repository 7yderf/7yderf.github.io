<!-- CaasFinalCta.vue — Zona 11. Cierre en banda violeta de marca a todo lo ancho,
     con el boton en claro sobre el fondo saturado. -->
<template>
  <section class="sc-section w-full bg-brand-violet px-4 py-16 lg:px-8 lg-2:py-24">
    <div class="mx-auto flex w-full max-w-4xl flex-col items-center gap-4">
      <p class="max-w-2xl text-center text-lg text-text-invert/90">{{ t('caas.finalCta.eyebrow') }}</p>

      <h2 class="text-center font-secondary font-bold text-text-invert">{{ t('caas.finalCta.title') }}</h2>

      <!-- Boton claro sobre el violeta: el color va por --btn-color/--btn-text,
           que es el mecanismo de color por instancia del proyecto. -->
      <div class="mt-4 flex w-full justify-center">
        <NuxtLink
          :to="localePath('/contact')"
          class="btn-custom"
          :style="{ '--btn-color': 'var(--color-bg-second)', '--btn-text': 'var(--color-brand-violet)' }"
        >
          {{ t('caas.finalCta.cta') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
