<!-- SpeiStages.vue — Zona 4. Tres filas apiladas sobre la MISMA reticula de 7
     fracciones iguales: las dos de los extremos solo dan aire, las 5 del medio
     son las etapas. Asi el titulo, su tramo de ilustracion y su lista caen
     siempre en la misma columna.

       fila A  titulos + flecha que baja
       fila B  ilustracion: BN de base y la version a color recortada en bandas
       fila C  listas de pasos

     La fila B sube con un margen negativo para montarse bajo la A: eso es lo
     que permite que las flechas entren en la ilustracion en vez de morir en el
     borde. La fila A va en un plano superior para que la flecha se vea encima.

     La ilustracion NO se recorta en archivos: es una sola imagen a color
     instanciada 5 veces, cada una con su clip-path. El navegador la descarga
     una vez, la alineacion sale gratis (mismo lienzo, mismo object-contain) y
     los limites de banda son numeros editables, no arte reexportado.

     La seleccion cruza las tres filas, asi que vive en un estado del componente
     y no en un :hover de CSS: un :hover no alcanza de una fila hermana a otra. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-2xl text-center font-secondary font-bold bg-gradient-to-r from-accent to-[#865BDA] bg-clip-text text-transparent">
      {{ t('spei.stages.titlePre') }}<br>
      {{ t('spei.stages.titlePost') }}
    </h2>

    <div class="hidden lg-2:block">
    <div class="mx-auto mt-12 w-full max-w-7xl" @mouseleave="active = null">
      <!-- Fila A — titulos. Cada celda apila el titulo arriba y deja que la
           flecha crezca hasta el borde inferior, asi todas terminan en la misma
           linea aunque los titulos arranquen a distinta altura. -->
      <div class="relative z-10 hidden min-h-[15rem] w-full lg-2:flex">
        <span class="shrink-0" :style="{ width: cell }" />
        <div
          v-for="(stage, i) in stages"
          :key="`title-${i}`"
          class="flex shrink-0 flex-col px-3"
          :style="{ width: cell }"
          @mouseenter="active = i"
        >
          <div :style="{ paddingTop: `${titleOffsets[i]}rem` }">
            <span
              class="block text-xs font-bold uppercase tracking-wide transition-colors duration-200"
              :class="active === i ? 'text-accent' : 'text-ink-3'"
            >{{ stage.stage }}</span>
            <span
              class="mt-1 block font-secondary text-base font-bold leading-snug transition-colors duration-200"
              :class="active === i ? 'text-deep-ink' : 'text-ink-3'"
            >{{ stage.title }}</span>
          </div>

          <span class="mt-3 flex flex-1 flex-col items-center" aria-hidden="true">
            <span
              class="w-px flex-1 transition-colors duration-200"
              :class="active === i ? 'bg-accent' : 'bg-line-2'"
            />
            <span
              class="h-1.5 w-1.5 rotate-45 border-b border-r transition-colors duration-200"
              :class="active === i ? 'border-accent' : 'border-line-2'"
            />
          </span>
        </div>
        <span class="shrink-0" :style="{ width: cell }" />
      </div>

      <!-- Fila B — ilustracion. Las imagenes van en absolute y no reciben
           puntero; las zonas sensibles son las 7 celdas de arriba. -->
      <div class="relative w-full lg-2:-mt-10" :style="{ aspectRatio: '2500 / 809' }">
        <img
          src="/images/spei/etapas-bn.webp"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 h-full w-full object-contain"
        >
        <img
          v-for="(stage, i) in stages"
          :key="`band-${i}`"
          src="/images/spei/etapas-color.webp"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
          :style="{ clipPath: bands[i], opacity: active === i ? 1 : 0 }"
        >

        <div class="absolute inset-0 hidden lg-2:flex">
          <span class="shrink-0" :style="{ width: cell }" />
          <span
            v-for="(stage, i) in stages"
            :key="`hit-${i}`"
            class="shrink-0"
            :style="{ width: cell }"
            @mouseenter="active = i"
          />
          <span class="shrink-0" :style="{ width: cell }" />
        </div>
      </div>

      <!-- Fila C — listas de pasos, en la misma reticula. -->
      <div class="hidden w-full lg-2:flex">
        <span class="shrink-0" :style="{ width: cell }" />
        <div
          v-for="(stage, i) in stages"
          :key="`steps-${i}`"
          class="shrink-0 px-3"
          :style="{ width: cell }"
          @mouseenter="active = i"
        >
          <ul class="flex flex-col gap-3">
            <li v-for="step in stage.steps" :key="step">
              <span
                class="text-sm font-semibold leading-snug transition-colors duration-200"
                :class="active === i ? 'text-deep-ink' : 'text-ink-3'"
              >{{ step }}</span>
            </li>
          </ul>
        </div>
        <span class="shrink-0" :style="{ width: cell }" />
      </div>
    </div>
    </div>

    <div class="lg-2:hidden mt-12">
      <SpeiStagesCarousel :stages="stages" :columns="COLUMNS" />
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

const active = ref<number | null>(null)

// 7 fracciones iguales: 1 de aire + 5 etapas + 1 de aire.
const COLUMNS = computed(() => stages.value.length + 2)
const cell = computed(() => `${100 / COLUMNS.value}%`)

// Cada banda descubre su fraccion de la ilustracion. Se derivan del mismo
// conteo que la reticula, asi que banda y celda no se pueden desincronizar.
const bands = computed(() =>
  stages.value.map((_, i) => {
    const left = ((i + 1) / COLUMNS.value) * 100
    const right = 100 - ((i + 2) / COLUMNS.value) * 100
    return `inset(0 ${right.toFixed(4)}% 0 ${left.toFixed(4)}%)`
  }),
)

// Altura de arranque de cada titulo, en rem. Es direccion de arte medida sobre
// la referencia: sigue la silueta del terreno y no se puede derivar. La flecha
// se estira sola hasta el borde de la fila, asi que solo hay que ajustar esto.
const titleOffsets = [4.5, 2.5, 0, 2, 5]
</script>
