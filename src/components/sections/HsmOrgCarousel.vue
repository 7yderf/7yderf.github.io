<!-- HsmOrgCarousel.vue — Carrusel movil (<991px) de las cards de HsmOrgMosaic.
     Arbol independiente del abanico de escritorio: HsmOrgMosaic muestra uno u
     otro por display segun breakpoint en vez de reordenar el mismo arbol.
     Mismo patron Swiper Element que SpeiIntelligence.vue (slides-per-view=auto,
     init diferido via useSwiperInit). Solo cards -el copy vive en HsmOrgMosaic,
     debajo de este carrusel. -->
<template>
  <swiper-container
    ref="swiperEl"
    class="org-swiper block"
    init="false"
    slides-per-view="auto"
    space-between="16"
    :keyboard="true"
    :speed="600"
  >
    <swiper-slide v-for="item in items" :key="item.label">
      <HsmOrgCard :image="item.image" :label="item.label" />
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
defineProps<{
  items: { image: string, label: string }[]
}>()

const swiperEl = useSwiperInit()
</script>

<!-- Sin scope: Swiper mueve los slides a su propio arbol y el atributo de
     scoping no alcanza a los descendientes que el componente reubica. -->
<style>
/* Ancho del slide = ancho de la card (HsmOrgCard topa en max-w-[19rem]), no un
   porcentaje del contenedor: con slides-per-view="auto" el numero de cards
   visibles + el asomo de la siguiente los decide este ancho, y si el slide es
   mas ancho que la card, el sobrante queda como margen vacio en vez de dejar
   asomar la card siguiente -eso rompia el indicio de "hay mas para deslizar". */
.org-swiper swiper-slide {
  height: auto;
  width: 19rem;
}
</style>
