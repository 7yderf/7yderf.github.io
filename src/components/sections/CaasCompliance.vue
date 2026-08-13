<!-- CaasCompliance.vue — Zona 8. Panel crema: texto y CTA a la izquierda, captura
     del tablero a la derecha. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center overflow-hidden rounded-3xl bg-cream-soft">
      <div class="sc-section flex min-w-[28rem] grow basis-[30rem] flex-col items-start p-10 lg-2:p-16">
        <h2 class="font-secondary font-bold text-deep-ink">
          {{ t('caas.compliance.titlePre') }}<br>
          {{ t('caas.compliance.titlePost') }}
        </h2>
        <p class="mt-5 max-w-sm text-xl text-text">{{ t('caas.compliance.body') }}</p>

        <div class="mt-8 flex justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('caas.compliance.cta') }}
          </NuxtLink>
        </div>
      </div>

      <figure class="sc-figure min-w-[28rem] grow basis-[34rem] p-10 lg-2:py-16 lg-2:pr-16">
        <img
          src="/images/caas/cumplir.webp"
          alt=""
          aria-hidden="true"
          class="block w-full rounded-2xl object-contain"
          loading="lazy"
          decoding="async"
        >
      </figure>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
