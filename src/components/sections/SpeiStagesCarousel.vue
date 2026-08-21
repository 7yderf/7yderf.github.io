<!-- SpeiStagesCarousel.vue — Carrusel movil (<991px) de SpeiStages.vue.
     Arbol independiente del hover de escritorio: SpeiStages lo muestra/oculta
     por display segun breakpoint en vez de intentar disparar el hover con
     otro evento. Mismo patron Swiper Element que HsmOrgCarousel.vue.

     El tramo de ilustracion de cada slide reutiliza la MISMA imagen ancha
     compartida que el desktop (una sola descarga, cacheada entre ambos
     arboles) en vez de recortarla en archivos aparte: se posiciona en
     absolute con un ancho de columns*100% y un left de -(index+1)*100%,
     el mismo calculo de fraccion de columna que ya usan los clip-path de
     "bands" en el componente de escritorio -banda y celda no se pueden
     desincronizar porque nacen del mismo COLUMNS. -->
<template>
  <swiper-container
    ref="swiperEl"
    class="stages-swiper block"
    init="false"
    slides-per-view="auto"
    space-between="0"
    :keyboard="true"
    :speed="500"
  >
    <swiper-slide v-for="(stage, i) in stages" :key="stage.title">
      <article class="stage-card flex h-full flex-col overflow-hidden rounded-2xl bg-surface-2">
        <div class="relative w-full overflow-hidden" :style="{ aspectRatio: cellAspectRatio }">
          <img
            src="/images/spei/etapas-color.webp"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute max-w-none object-cover"
            :style="{ top: 0, left: `${-(i + 1) * 100}%`, width: `${columns * 100}%`, height: '100%' }"
          >
        </div>

        <div class="flex flex-1 flex-col p-6">
          <span class="text-xs font-bold uppercase tracking-wide text-accent">{{ stage.stage }}</span>
          <h3 class="mt-1 font-secondary text-lg font-bold leading-snug text-deep-ink">{{ stage.title }}</h3>

          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="step in stage.steps" :key="step">
              <span class="text-sm font-semibold leading-snug text-ink-3">{{ step }}</span>
            </li>
          </ul>
        </div>
      </article>
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  stages: { stage: string, title: string, steps: string[] }[]
  columns: number
}>()

const swiperEl = useSwiperInit()

// Region de columna en la imagen fuente (2500x809): cada celda es 1/columns
// del ancho total, alto completo -mismo recorte que el clip-path de bands.
const cellAspectRatio = computed(() => `${2500 / props.columns} / 809`)
</script>

<!-- Sin scope: Swiper mueve los slides a su propio arbol y el atributo de
     scoping no alcanza a los descendientes que el componente reubica. -->
<style>
.stages-swiper swiper-slide {
  height: auto;
  width: 24rem;
}
</style>
