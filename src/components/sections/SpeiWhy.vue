<!-- SpeiWhy.vue — Zona 6. Flujo Core Bancario -> Hermes -> Banxico 2.0.
     Dos rieles alineados: arriba las etiquetas del trayecto y abajo los nodos.
     Aqui las etiquetas son TANTAS COMO los nodos (1:1), asi que ambas filas
     usan celdas de 100/n y NO llevan las medias celdas del riel de HsmSteps —
     esas solo aplican cuando los conectores son n-1 y deben caer entre centro
     y centro. Con 3 etiquetas y medias celdas, la fila sumaria 133%.
     PLACEHOLDER: el diagrama sale de public/videos del home hasta tener el
     arte propio. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.why.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('spei.why.subtitle') }}</p>

    <div class="mx-auto mt-12 w-full max-w-5xl">
      <div class="hidden w-full items-end lg-2:flex">
        <span
          v-for="leg in flow"
          :key="leg.label"
          class="shrink-0 px-4 text-center text-xs font-medium text-ink-3"
          :style="{ width: cell }"
        >{{ leg.label }}</span>
      </div>

      <figure class="sc-figure mt-4 overflow-hidden rounded-3xl bg-surface-2">
        <video
          class="mix-blend-multiply block aspect-[16/6] w-full scale-105 object-cover"
          src="/videos/nube-hibrida.mp4"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
        />
      </figure>

      <article class="sc-article mt-6 w-full flex-wrap justify-center gap-4">
        <div
          v-for="(node, i) in nodes"
          :key="node.label"
          class="sc-section flex min-w-[16rem] grow flex-col items-center rounded-xl px-5 py-4"
          :class="i === 1 ? 'bg-primary text-text-invert' : 'bg-surface-2'"
          :style="{ flexBasis: cell }"
        >
          <span
            class="text-center text-sm font-bold"
            :class="i === 1 ? 'text-text-invert' : 'text-deep-ink'"
          >{{ node.label }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FlowText {
  label: string
}

const { t } = useI18n()

const nodes = useLocalizedItems<FlowText>('spei.why.nodes', 3, ['label'])
const flow = useLocalizedItems<FlowText>('spei.why.flow', 3, ['label'])

const cell = computed(() => `${100 / nodes.value.length}%`)
</script>
