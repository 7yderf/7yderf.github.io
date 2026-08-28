<!-- HsmcsWho.vue — Zona 4. "¿Para quien es?": panel lavanda, texto+CTA a la
     izquierda, media a la derecha. Mismo patron que CaasCompliance (texto
     primero, figure despues, filas basis-[30rem]/basis-[40rem]).

     Foto real (para-quien-es.webp, Fredy 2026-08-28): laptop en escritorio
     oscuro, reemplaza el placeholder post-quantica.webp. object-cover (no
     contain, a diferencia del placeholder) porque es una FOTO que debe
     llenar su recuadro -distinto de un render 3D flotante con margen, que
     es lo que object-contain servia bien-, con aspect-[3/2] (relacion
     nativa del archivo) para que el recorte sea predecible. De paso, esta
     imagen ya escapa sola el tope de max-height:150px que el reset global
     aplica en movil (style.scss:363-371, EXCLUYE object-cover a proposito).

     CORREGIDO (Fredy, 2026-08-28): faltaba el acuerdo de centrado movil ya
     establecido en 9+ archivos del proyecto -se me paso al tocar este
     archivo en la misma tarea, igual que en HsmcsWhat.vue. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center overflow-hidden rounded-3xl bg-brand-violet-soft">
      <div class="sc-section flex min-w-[28rem] grow basis-[30rem] flex-col items-center p-10 text-center min-[769px]:items-start min-[769px]:text-left lg-2:p-16">
        <h2 class="font-secondary font-bold text-deep-ink">{{ t('hsmcs.who.title') }}</h2>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.who.body') }}</p>

        <div class="mt-8 flex justify-center min-[769px]:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('hsmcs.who.cta') }}
          </NuxtLink>
        </div>
      </div>

      <figure class="sc-figure min-w-[28rem] grow basis-[40rem] p-6 lg-2:py-10 lg-2:pr-10">
        <img
          src="/images/hsmcs/para-quien-es.webp"
          alt=""
          aria-hidden="true"
          class="block aspect-[3/2] w-full rounded-2xl object-cover"
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
