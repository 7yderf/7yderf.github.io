<!-- SpeiShared.vue — Zona 9. Banda azul full-width con el compromiso de
     acompanamiento. Usa --color-info-soft, el unico token nuevo de esta vista. -->
<template>
  <section class="sc-section w-full bg-info-soft px-4 py-16 lg:px-8 lg-2:py-24">
    <div class="mx-auto w-full max-w-3xl">
      <h2 class="text-center font-secondary font-bold text-deep-ink">{{ t('spei.shared.title') }}</h2>
      <p class="mt-5 text-center text-ink-3">{{ t('spei.shared.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
