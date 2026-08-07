<!-- HsmFinalCta.vue — Zona 11. Cierre de la pagina. Copia la forma de
     FinalCta.vue (panel con gradiente crema, titular en gradiente violeta →
     naranja, CTA centrado) con su propio copy; no se reutiliza el componente
     del home porque aquel lee t('finalCta.*') fijo. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-cream to-bg-second p-8 text-center lg-2:p-16">
      <p class="max-w-xl text-center text-lg font-medium text-accent">{{ t('hsm.finalCta.eyebrow') }}</p>

      <h2 class="text-center font-secondary font-bold text-accent">
        {{ t('hsm.finalCta.titlePre') }}<br>
        {{ t('hsm.finalCta.titlePost') }}
      </h2>

      <!-- Sin btn-pill: la referencia usa el radio base del boton (8px), no el
           pill. El color va por --btn-color en vez de una variante nueva. -->
      <NuxtLink
        :to="localePath('/contact')"
        class="btn-custom mt-2"
        :style="{ '--btn-color': 'var(--color-primary)' }"
      >
        {{ t('hsm.finalCta.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
