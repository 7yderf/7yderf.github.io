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

      <!-- Fondo blanco, como la referencia: no lleva superficie propia. -->
      <figure class="sc-figure mt-4 overflow-hidden rounded-3xl">
        <video
          class="mix-blend-multiply block w-full scale-105"
          src="/videos/porque-hermes.mp4"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
        />
      </figure>

      <!-- Cadena de nodos: n cajas de ancho segun su contenido con n-1
           conectores intercalados, mismo interleave que ProcessCta
           (v-if="i < n - 1" omite el conector tras el ultimo). Las cajas llevan
           grow-0 porque sc-section trae flex-grow:1 y sin eso se estiran hasta
           llenar la fila y empujan la ultima al renglon siguiente. -->
      <article class="sc-article mt-8 w-full flex-wrap items-center justify-center gap-y-4">
        <template v-for="(node, i) in nodes" :key="node.label">
          <div
            class="sc-section grow-0 rounded-xl px-10 py-4"
            :class="i === 1 ? 'bg-violet' : 'bg-surface-2'"
          >
            <span
              class="text-center text-base font-bold"
              :class="i === 1 ? 'text-text-invert' : 'text-deep-ink'"
            >{{ node.label }}</span>
          </div>

          <span
            v-if="i < nodes.length - 1"
            class="hidden shrink-0 items-center lg-2:flex"
            aria-hidden="true"
          >
            <span class="h-px w-10 bg-line-2" />
            <span class="h-2 w-2 shrink-0 rounded-full bg-violet" />
            <span class="h-px w-10 bg-line-2" />
          </span>
        </template>
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
