<!-- EcocloudHero.vue — Zona 1 de /ecosistema-cloud. Mismo patron de 2 columnas
     que HsmHero/HsmcsHero, sin eyebrow -el mockup de esta pagina no lo trae,
     el h1 arranca directo-.

     PLACEHOLDER: sin recurso propio todavia. Se reusa post-quantica.webp
     (nube+llave) hasta que llegue el arte real. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center md:items-start md:text-left">
        <h1 class="hero font-secondary text-deep-ink">
          {{ t('ecoCloud.hero.titlePre') }}<br>
          {{ t('ecoCloud.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-ink-3">{{ t('ecoCloud.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
            {{ t('ecoCloud.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-primary-soft p-10">
          <img
            src="/images/caas/post-quantica.webp"
            alt=""
            aria-hidden="true"
            class="block w-full object-contain"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
