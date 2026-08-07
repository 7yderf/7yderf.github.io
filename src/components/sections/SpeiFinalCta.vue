<!-- SpeiFinalCta.vue — Zona 11. Cierre en banda naranja full-width. Difiere del
     cierre de la vista HSM, que era una card crema con titular en gradiente:
     aqui el acento ocupa toda la franja y el texto va invertido encima. -->
<template>
  <section class="sc-section w-full bg-accent px-4 py-16 lg:px-8 lg-2:py-20">
    <div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <p class="max-w-xl text-center text-sm font-medium text-text-invert/90">{{ t('spei.finalCta.eyebrow') }}</p>

      <h2 class="text-center font-secondary font-bold text-text-invert">
        {{ t('spei.finalCta.titlePre') }}<br>
        {{ t('spei.finalCta.titlePost') }}
      </h2>

      <!-- Boton claro sobre el naranja: el color va por --btn-color/--btn-text,
           que es el mecanismo de color por instancia del proyecto. -->
      <NuxtLink
        :to="localePath('/contact')"
        class="btn-custom btn-pill mt-2"
        :style="{ '--btn-color': 'var(--bg-second-color)', '--btn-text': 'var(--deep-ink-color)' }"
      >
        {{ t('spei.finalCta.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
