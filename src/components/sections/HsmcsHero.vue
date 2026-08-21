<!-- HsmcsHero.vue — Zona 1 de /hsm-control-security. Mismo patron de 2 columnas
     que HsmHero (eyebrow+h1+subtitle+CTA colapsando por flex-wrap+basis+min-w,
     pattern:visual-dos-columnas-responsive), sin la fila de logos de
     fabricantes que si lleva HsmHero -el mockup de esta pagina no la incluye-.

     PLACEHOLDER: sin recurso propio todavia. Se reusa el video de
     escudo.mp4 (mismo tratamiento que HsmHero) hasta que llegue el arte de la
     "caja/boveda" del mockup. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center text-center md:items-start md:text-left">
        <p class="text-sm font-medium text-ink-3">{{ t('hsmcs.hero.eyebrow') }}</p>
        <h1 class="hero mt-2 font-secondary text-deep-ink">
          {{ t('hsmcs.hero.titlePre') }}<br>
          {{ t('hsmcs.hero.titleHighlight') }}
        </h1>
        <p class="mt-5 max-w-md text-ink-3">{{ t('hsmcs.hero.subtitle') }}</p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
            {{ t('hsmcs.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-primary-soft">
          <video
            class="mix-blend-multiply block aspect-[4/3] w-full scale-105 object-cover"
            src="/videos/escudo.mp4"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
          />
        </figure>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
