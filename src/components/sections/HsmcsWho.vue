<!-- HsmcsWho.vue — Zona 4. "¿Para quien es?": panel lavanda, texto+CTA a la
     izquierda, media a la derecha. Mismo patron que CaasCompliance (texto
     primero, figure despues, filas basis-[30rem]/basis-[40rem]).

     PLACEHOLDER: el mockup muestra una foto de laptop en escritorio oscuro -
     no hay fotografia asi en el proyecto todavia. Se reusa post-quantica.webp
     (ya vive en un panel lavanda equivalente en CaasPostQuantum). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center overflow-hidden rounded-3xl bg-brand-violet-soft">
      <div class="sc-section flex min-w-[28rem] grow basis-[30rem] flex-col items-start p-10 lg-2:p-16">
        <h2 class="font-secondary font-bold text-deep-ink">{{ t('hsmcs.who.title') }}</h2>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.who.body') }}</p>

        <div class="mt-8 flex justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('hsmcs.who.cta') }}
          </NuxtLink>
        </div>
      </div>

      <figure class="sc-figure min-w-[28rem] grow basis-[40rem] p-6 lg-2:py-10 lg-2:pr-10">
        <img
          src="/images/caas/post-quantica.webp"
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
