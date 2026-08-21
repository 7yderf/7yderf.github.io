<!-- EcocloudFinalCta.vue — Zona 5, cierre. Mismo patron que HsmcsFinalCta.vue
     (copia de FinalCta.vue) con su propio copy. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-cream to-bg-second p-8 text-center lg-2:p-16">
      <p class="max-w-xl text-center text-lg font-medium text-ink-3">{{ t('ecoCloud.finalCta.eyebrow') }}</p>

      <h2 class="text-center font-secondary italic bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
        {{ t('ecoCloud.finalCta.titlePre') }}<br>
        {{ t('ecoCloud.finalCta.titleHighlight') }}
      </h2>

      <NuxtLink :to="localePath('/contact')" class="btn-custom mt-2" :style="{ '--btn-color': 'var(--color-primary)' }">
        {{ t('ecoCloud.finalCta.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
