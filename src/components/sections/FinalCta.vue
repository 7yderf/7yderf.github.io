<template>
  <!-- Banner full-width (edge-to-edge). El gradiente vive en la seccion; la chica
       va absolute a la izquierda y el texto en la mitad derecha. -->
  <section class="sc-section w-full overflow-hidden bg-gradient-to-r from-accent to-primary text-text-invert">
    <div class="relative mx-auto flex min-h-80 w-full max-w-7xl items-center px-4 py-10 lg:px-8">
      <img
        src="/images/chica.webp"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute bottom-0 left-0 hidden h-full w-auto md:block"
      >
      <div class="w-full md:ml-auto md:w-1/2">
        <h2 class="font-secondary">{{ t('finalCta.title') }}</h2>
        <p class="mt-4 max-w-md text-text-invert/85">{{ t('finalCta.subtitle') }}</p>
        <a
          href="#"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-bg-second px-8 py-3.5 font-secondary font-bold text-primary shadow-flat transition-shadow hover:shadow-card"
        >
          {{ t('finalCta.cta') }} →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
