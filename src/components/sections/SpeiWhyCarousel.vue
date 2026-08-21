<!-- SpeiWhyCarousel.vue — Carrusel movil (<585px) de SpeiWhy.vue.
     Arbol independiente del flujo de escritorio (etiquetas + video + fila de
     nodos con conectores): SpeiWhy lo muestra/oculta por display segun ancho
     en vez de intentar reacomodar el mismo arbol. Mismo patron Swiper Element
     que HsmOrgCarousel.vue/SpeiStagesCarousel.vue.

     Cada slide combina un paso del flujo (icono propio + su etiqueta) con el
     nodo del sistema que lo protagoniza (Core Bancario/Hermes/BANXICO 2.0) -
     los dos array (flow, nodes) vienen ya alineados 1:1 por indice desde el
     componente padre, misma correspondencia visual que sugiere la referencia
     de escritorio (icono arriba de su nodo). Los iconos (Fredy los proveyo
     puntuales para este caso, no son un recorte de una imagen compartida como
     en SpeiStages) incluyen su propia flecha/campana -se usan tal cual, sin
     recortarlos mas. -->
<template>
  <swiper-container
    ref="swiperEl"
    class="why-swiper block"
    init="false"
    slides-per-view="auto"
    space-between="16"
    :keyboard="true"
    :speed="500"
    :center-insufficient-slides="true"
  >
    <swiper-slide v-for="step in steps" :key="step.label">
      <article class="why-card flex h-full flex-col items-center rounded-2xl bg-surface-2 p-6 text-center">
        <img
          :src="step.icon"
          alt=""
          aria-hidden="true"
          class="h-24 w-24 object-contain"
          loading="lazy"
          decoding="async"
        >
        <span class="mt-4 text-xs font-medium text-ink-3">{{ step.label }}</span>

        <span
          class="mt-4 rounded-xl px-6 py-3 text-sm font-bold"
          :class="step.isCore ? 'bg-violet text-text-invert' : 'bg-surface-3 text-deep-ink'"
        >{{ step.node }}</span>
      </article>
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  flow: { label: string }[]
  nodes: { label: string }[]
}>()

const swiperEl = useSwiperInit()

// Un icono propio por paso, provisto puntualmente para este carrusel -no un
// recorte de una imagen compartida, cada paso es un archivo independiente.
const icons = [
  '/images/spei/porque-recepcion.webp',
  '/images/spei/porque-proceso.webp',
  '/images/spei/porque-envio.webp',
]

const steps = computed(() =>
  props.flow.map((leg, i) => ({
    label: leg.label,
    icon: icons[i],
    node: props.nodes[i]?.label ?? '',
    isCore: i === 1,
  })),
)
</script>

<!-- Sin scope: Swiper mueve los slides a su propio arbol y el atributo de
     scoping no alcanza a los descendientes que el componente reubica. -->
<style>
.why-swiper swiper-slide {
  height: auto;
  width: 16rem;
}
</style>
