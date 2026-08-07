<!-- HsmBeyond.vue — Zona 7. Dos bloques: la card naranja (PQC) ocupa la columna
     izquierda completa con la imagen ARRIBA del texto, y la columna derecha
     apila dos cards horizontales que alternan el lado de la imagen —
     lavanda con imagen a la izquierda, gris con imagen a la derecha.
     Dentro de cada card horizontal, imagen y texto colapsan por ancho
     disponible (flex-wrap + grow + basis), no por breakpoint. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('hsm.beyond.title') }}</h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('hsm.beyond.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 w-full max-w-6xl flex-wrap items-stretch gap-6">
      <section class="sc-section flex min-w-[28rem] basis-[36rem] flex-col rounded-3xl bg-accent p-5">
        <figure class="sc-figure overflow-hidden rounded-2xl">
          <img
            src="/images/mas-que-hsm/pqc.png"
            alt=""
            aria-hidden="true"
            class="aspect-[7/8] w-full object-cover"
            loading="lazy"
            decoding="async"
          >
        </figure>
        <h3 class="mt-6 font-secondary text-2xl font-bold leading-tight text-text-invert">{{ t('hsm.beyond.pqcTitle') }}</h3>
        <p class="mt-3 text-sm font-medium text-text-invert/90">{{ t('hsm.beyond.pqcDescription') }}</p>
      </section>

      <div class="sc-section flex min-w-[30rem] basis-[62rem] flex-col gap-6">
        <article class="sc-article flex-wrap items-center gap-6 rounded-3xl bg-primary-soft p-5">
          <figure class="sc-figure min-w-[22rem] grow basis-72 overflow-hidden rounded-2xl">
            <img
              src="/images/mas-que-hsm/seguridad-fisica.png"
              alt=""
              aria-hidden="true"
              class="aspect-square w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </figure>
          <section class="sc-section min-w-[22rem] grow basis-72">
            <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ t('hsm.beyond.physicalTitle') }}</h3>
            <p class="mt-3 text-sm font-medium text-ink-3">{{ t('hsm.beyond.physicalDescription') }}</p>
          </section>
        </article>

        <article class="sc-article flex-wrap items-center gap-6 rounded-3xl bg-surface-2 p-5">
          <section class="sc-section min-w-[22rem] grow basis-72">
            <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ t('hsm.beyond.deployTitle') }}</h3>
            <p class="mt-3 text-sm font-medium text-ink-3">{{ t('hsm.beyond.deployDescription') }}</p>
          </section>
          <figure class="sc-figure min-w-[22rem] grow basis-72 overflow-hidden rounded-2xl">
            <img
              src="/images/mas-que-hsm/flexibilidad.png"
              alt=""
              aria-hidden="true"
              class="aspect-square w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </figure>
        </article>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
