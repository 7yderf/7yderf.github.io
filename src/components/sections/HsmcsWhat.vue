<!-- HsmcsWhat.vue — Zona 2. "¿Que es?": captura de la plataforma a la
     izquierda, texto + CTA a la derecha. Mismo riel de 2 columnas que
     CaasCompliance (figure min-w-[28rem] basis-[40rem], texto min-w-[28rem]
     basis-[30rem]) -orden invertido respecto a esa referencia: la real de
     Fredy (Cripto As a Service_HSMCS.png, 2026-08-28) trae la imagen primero,
     confirmado comparando a alta resolucion contra el estado anterior donde
     el texto iba primero.

     Imagen real (que-es.webp, el mockup de 2 ventanas de navegador apiladas
     con la UI real de la plataforma -login + dashboard-) reemplaza el
     placeholder cumplir.webp. Fondo de la seccion pasa de blanco a
     bg-cream-soft, confirmado por muestreo de pixel exacto contra la
     referencia (254,253,249 = --color-cream-soft #FFFDF9).

     CORREGIDO (Fredy, 2026-08-28): faltaba el acuerdo de centrado movil ya
     establecido en 9+ archivos del proyecto (items-center + reset global de
     text-align, min-[769px]:items-start en desktop) -se me paso al tocar
     este archivo en la misma tarea. Ademas la imagen se veia chica en
     movil: causa real, no supuesta -el reset global (style.scss:363-371)
     topa CUALQUIER <img> sin la clase object-cover a max-height:150px bajo
     768px ("para que las ilustraciones sueltas no se vean enormes"); esta
     imagen usa object-contain (no puede ser object-cover, recortaria el
     mockup -trim confirmo que el contenido visible toca el borde del
     canvas, no hay margen transparente que sacrificar). !max-h-none
     (important, la unica forma de ganarle a una regla de stylesheet mas
     especifica que una utilidad suelta) devuelve el alto libre; el ancho
     sigue en w-full, escala proporcional hacia abajo como pidio. -->
<template>
  <section class="sc-section w-full bg-cream-soft px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <figure class="sc-figure min-w-[28rem] grow basis-[40rem] p-6 lg-2:py-10 lg-2:pl-10">
        <img
          src="/images/hsmcs/que-es.webp"
          alt=""
          aria-hidden="true"
          class="block w-full rounded-2xl object-contain !max-h-none"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div class="sc-section flex min-w-[28rem] basis-[30rem] flex-col items-center text-center min-[769px]:items-start min-[769px]:text-left">
        <h2 class="font-secondary font-bold text-deep-ink">{{ t('hsmcs.what.title') }}</h2>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.what.body1') }}</p>
        <p class="mt-5 max-w-md text-xl text-text">{{ t('hsmcs.what.body2') }}</p>

        <div class="mt-8 flex justify-center min-[769px]:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('hsmcs.what.cta') }}
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
