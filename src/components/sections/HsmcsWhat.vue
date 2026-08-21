<!-- HsmcsWhat.vue — Zona 2. "¿Que es?": texto + CTA a la izquierda, captura de
     la plataforma a la derecha. Mismo riel de 2 columnas que CaasCompliance
     (texto min-w-[28rem] basis-[30rem], figure min-w-[28rem] basis-[40rem]).

     PLACEHOLDER: el mockup muestra 2 ventanas de navegador apiladas con la UI
     real de la plataforma (login + dashboard) - recurso que no existe todavia
     como asset aislado. Se reusa cumplir.webp (ya es una captura de tablero)
     hasta que llegue el arte real. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[30rem] flex-col items-start">
        <h2 class="font-secondary font-bold text-deep-ink">{{ t('hsmcs.what.title') }}</h2>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.what.body1') }}</p>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.what.body2') }}</p>

        <div class="mt-8 flex justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('hsmcs.what.cta') }}
          </NuxtLink>
        </div>
      </div>

      <figure class="sc-figure min-w-[28rem] grow basis-[40rem] p-6 lg-2:py-10 lg-2:pr-10">
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
