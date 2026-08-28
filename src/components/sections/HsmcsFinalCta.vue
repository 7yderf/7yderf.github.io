<!-- HsmcsFinalCta.vue — Zona 5, cierre. Copia la forma de FinalCta.vue (panel
     con gradiente crema, titular en gradiente violeta -> naranja via
     bg-clip-text, CTA centrado) con su propio copy -no se reutiliza el
     componente del home porque aquel lee t('finalCta.*') fijo.

     btn-primary (naranja, el mismo boton solido que el resto del sitio) en
     vez de btn-custom con --btn-color:primary (violeta) -confirmado contra
     la referencia real: el boton de esta seccion es naranja, no violeta,
     igual que cualquier otro CTA del proyecto. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-cream to-bg-second p-8 text-center lg-2:p-16">
      <p class="max-w-xl text-center text-lg font-medium text-ink-3">{{ t('hsmcs.finalCta.eyebrow') }}</p>

      <h2 class="text-center font-secondary italic bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
        {{ t('hsmcs.finalCta.titlePre') }}<br>
        {{ t('hsmcs.finalCta.titleHighlight') }}
      </h2>

      <NuxtLink :to="localePath('/contact')" class="btn-primary mt-2">
        {{ t('hsmcs.finalCta.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
