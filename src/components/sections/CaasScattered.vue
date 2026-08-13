<!-- CaasScattered.vue — Zona 3. Panel crema con la animacion de llaves y el CTA
     MONTADO sobre ella.

     El boton no va debajo de la animacion sino dentro de su caja: se le da un
     margen superior negativo para que suba sobre el media, y el contenedor de
     la animacion queda en un plano inferior para que el boton reciba el clic.
     Se resuelve con margen negativo y no con posicionamiento absoluto porque
     asi el boton sigue participando del flujo: la seccion reserva su alto y
     nada se solapa cuando el ancho cambia. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="mx-auto w-full max-w-7xl rounded-3xl bg-cream-soft px-6 py-16 lg-2:px-12">
      <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold bg-gradient-to-r from-accent to-brand-violet bg-clip-text text-transparent">
        {{ t('caas.scattered.title') }}
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-center text-xl font-medium text-text">{{ t('caas.scattered.subtitle') }}</p>

      <figure class="sc-figure relative z-0 mx-auto mt-8 max-w-4xl overflow-hidden">
        <video
          class="mix-blend-multiply block w-full scale-105"
          src="/videos/llaves-dispersas.mp4"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
        />
      </figure>

      <!-- El margen negativo sube el boton dentro de la caja de la animacion.
           relative + z-10 lo dejan por encima del media, que va en z-0. -->
      <div class="relative z-10 -mt-24 flex w-full justify-center lg-2:-mt-28">
        <NuxtLink :to="localePath('/contact')" class="btn-primary">
          {{ t('caas.scattered.cta') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
