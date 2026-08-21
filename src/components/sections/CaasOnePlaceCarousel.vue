<!-- CaasOnePlaceCarousel.vue — Carrusel movil (<1072px) de CaasOnePlace.vue.
     Arbol independiente del arreglo de escritorio: CaasOnePlace lo muestra/
     oculta por display segun ancho. Mismo patron Swiper Element que
     HsmOrgCarousel.vue/SpeiWhyCarousel.vue.

     La card es CaasOnePlaceCard, la MISMA pieza que usa el arreglo de
     escritorio -no una version aparte que pueda divergir en color o forma.
     Sin hover en touch, se ve siempre en su estado de reposo (el mismo que
     desktop antes de pasar el mouse).

     El ancho del slide copia la CONFIGURACION de SpeiIntelligence.vue -no su
     estilo visual, solo el mecanismo-: porcentaje del contenedor escalonado
     en los breakpoints nombrados del proyecto (sm/md), no un px ni un rem
     fijo. Un ancho fijo (probado antes, en px o en rem) queda angosto en la
     franja alta del rango activo del carrusel (hasta 1071px) porque no
     aprovecha el espacio de sobra que ya hay ahi; el porcentaje si escala con
     el viewport disponible. -->
<template>
  <swiper-container
    ref="swiperEl"
    class="one-place-swiper block"
    init="false"
    slides-per-view="auto"
    space-between="16"
    :keyboard="true"
    :speed="500"
    :center-insufficient-slides="true"
  >
    <swiper-slide v-for="card in cards" :key="card.title">
      <CaasOnePlaceCard :card="card" />
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
interface OnePlaceCard {
  title: string
  subtitle: string
  link: string
  href: string
  items: string[][]
}

defineProps<{
  cards: OnePlaceCard[]
}>()

const swiperEl = useSwiperInit()
</script>

<!-- Sin scope: Swiper mueve los slides a su propio arbol y el atributo de
     scoping no alcanza a los descendientes que el componente reubica. -->
<style>
.one-place-swiper swiper-slide {
  height: auto;
  width: 80%;
}

@media screen and (min-width: 535px) {
  .one-place-swiper swiper-slide {
    width: 55%;
  }
}

@media screen and (min-width: 768px) {
  .one-place-swiper swiper-slide {
    width: 38%;
  }
}
</style>
