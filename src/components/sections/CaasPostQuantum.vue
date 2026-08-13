<!-- CaasPostQuantum.vue — Zona 7. Banda lavanda: render a la izquierda, texto y
     CTA a la derecha. Las dos columnas colapsan por ancho disponible. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center overflow-hidden rounded-3xl bg-brand-violet-soft">
      <figure class="sc-figure min-w-[28rem] grow basis-[34rem]">
        <img
          src="/images/caas/post-quantica.webp"
          alt=""
          aria-hidden="true"
          class="block w-full object-contain"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div class="sc-section flex min-w-[28rem] grow basis-[30rem] flex-col items-start p-10 lg-2:p-16">
        <h2 class="font-secondary font-bold text-deep-ink">
          {{ t('caas.postQuantum.titlePre') }}<br>
          {{ t('caas.postQuantum.titlePost') }}
        </h2>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('caas.postQuantum.body') }}</p>

        <div class="mt-8 flex justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('caas.postQuantum.cta') }}
          </NuxtLink>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
