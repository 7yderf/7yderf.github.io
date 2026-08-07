<!-- SpeiStages.vue — Zona 4. Ilustracion isometrica del recorrido y, debajo, una
     columna por etapa con sus pasos.

     El ancho de columna se deriva del numero de etapas (100/n) en vez de
     escribirse a mano, igual que el riel de HsmSteps: si el copy cambia de
     cinco etapas a seis, el reparto se mantiene solo. Las columnas envuelven
     por min-width cuando el porcentaje ya no alcanza.

     PLACEHOLDER: la ilustracion sale de public/videos del home hasta tener el
     arte isometrico propio de SPEI. -->
<template>
  <section class="sc-section w-full bg-cream px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-2xl text-center font-secondary font-bold bg-gradient-to-r from-accent to-[#865BDA] bg-clip-text text-transparent">
      {{ t('spei.stages.titlePre') }}<br>
      {{ t('spei.stages.titlePost') }}
    </h2>

    <div class="mx-auto mt-12 w-full max-w-6xl">
      <figure class="sc-figure overflow-hidden rounded-3xl">
        <video
          class="mix-blend-multiply block aspect-[16/7] w-full scale-105 object-cover"
          src="/videos/home-animation.mp4"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
        />
      </figure>

      <article class="sc-article mt-10 w-full flex-wrap items-start gap-y-10">
        <div
          v-for="stage in stages"
          :key="stage.stage"
          class="sc-section flex min-w-[18rem] grow flex-col px-3"
          :style="{ flexBasis: column }"
        >
          <span class="text-xs font-bold uppercase tracking-wide text-primary">{{ stage.stage }}</span>
          <span class="mt-2 font-secondary text-base font-bold leading-snug text-deep-ink">{{ stage.title }}</span>

          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="step in stage.steps" :key="step" class="flex items-start gap-2">
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-3" aria-hidden="true" />
              <span class="text-xs font-medium text-ink-3">{{ step }}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Pasos por etapa, en orden. El conteo vive aqui porque useLocalizedItems solo
// resuelve un nivel de indice; el anidado se arma con las mismas rutas t()
// indexadas que usa ese composable (tm() volcaria el AST compilado).
const stepsPerStage = [3, 3, 4, 2, 3]

const stages = computed(() =>
  stepsPerStage.map((count, i) => ({
    stage: t(`spei.stages.items.${i}.stage`),
    title: t(`spei.stages.items.${i}.title`),
    steps: Array.from({ length: count }, (_, j) => t(`spei.stages.items.${i}.steps.${j}`)),
  })),
)

const column = computed(() => `${100 / stages.value.length}%`)
</script>
