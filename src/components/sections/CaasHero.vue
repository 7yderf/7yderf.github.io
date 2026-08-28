<!-- CaasHero.vue — Zona 1 de /cripto-as-a-service. Dos columnas: marca, eyebrow,
     titular y CTA a la izquierda; media sobre card rosa a la derecha.
     Colapso por ancho disponible (flex-wrap + basis + min-w), no por viewport.

     El titulo es una sola clave (antes Pre/Mid/Post partido en 3 lineas): al
     acortarse ya no necesita el salto forzado. El fragmento que salio del
     titulo ("con tu hardware o con el nuestro") se movio al subtitulo como
     segmento en negrita via subtitlePre/subtitleStrong/subtitlePost + strong
     -mismo mecanismo que EcocloudWho.vue (ver decision:2:20: partir la frase
     en claves por idioma es fragil, e inyectar markup desde i18n abre una via
     de inyeccion).

     min-[769px]: y NO md: en el bloque de texto+CTA -mismo defecto que
     HsmSupport.vue/SpeiOperate.vue/EcocloudHero.vue documentan: el reset
     global (style.scss) es max-width:768px (768 incluido) y el md: de
     Tailwind es min-width:768px (768 TAMBIEN incluido), asi que con md: ambos
     rangos se pisan exactamente en 768px. Corregido al verificar los
     acuerdos de responsive del proyecto en toda la web (Fredy, 2026-08-27). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center gap-10 lg-2:gap-16">
      <div class="sc-section flex min-w-[28rem] basis-[36rem] flex-col items-center text-center min-[769px]:items-start min-[769px]:text-left">
        <img
          src="/logos/tesseract.svg"
          :alt="t('caas.hero.brandAlt')"
          class="h-7 w-auto object-contain opacity-45 grayscale"
        >

        <p class="mt-8 text-center text-base font-medium text-text min-[769px]:text-left">{{ t('caas.hero.eyebrow') }}</p>

        <h1 class="hero mt-3 text-center font-secondary text-deep-ink min-[769px]:text-left">
          {{ t('caas.hero.title') }}
        </h1>

        <p class="mt-5 max-w-md text-center text-2xl font-medium text-text min-[769px]:text-left">
          {{ t('caas.hero.subtitlePre') }}<strong class="font-bold">{{ t('caas.hero.subtitleStrong') }}</strong>{{ t('caas.hero.subtitlePost') }}
        </p>

        <!-- El boton va envuelto en un flex container: .btn-* es display:flex con
             max-width:inherit, asi que suelto en un bloque se estira al 100%. -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 min-[769px]:justify-start">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('caas.hero.cta') }}
          </NuxtLink>
        </div>
      </div>

      <div class="sc-section min-w-[28rem] basis-[38rem]">
        <figure class="sc-figure overflow-hidden rounded-3xl bg-brand-blush">
          <!-- aspect-[4/3] + object-cover iguala el figure al de HsmHero.vue,
               que es la referencia de tamaño para los heroes de esta franja de
               paginas -confirmado por Fredy-. El video de aca (controla-
               criptografia.mp4) es 1:1 en origen, no 4:3, asi que forzar el
               marco recorta arriba/abajo -mismo mecanismo de recorte que ya
               usaba HsmHero.vue sobre su propio video.

               object-[50%_65%] en vez del centro por defecto (50% 50%): con
               centro parejo, el recorte le comia el aro de la llave arriba y
               las puntas de los dedos abajo a la vez -verificado extrayendo
               varios frames crudos del propio video (la llave rota en el
               loop, el margen superior real sobre ella varia entre ~195 y
               ~275px de 1080, el margen inferior sobre la mano se mantiene
               mas ajustado, ~140-180px). 65% recarga el recorte hacia arriba
               (mas margen se saca de la llave, que sobra) y deja mas aire
               abajo (donde la mano casi no tenia margen de sobra). -->
          <video
            class="mix-blend-multiply block aspect-[4/3] w-full scale-105 object-cover object-[50%_65%]"
            src="/videos/controla-criptografia.mp4"
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
