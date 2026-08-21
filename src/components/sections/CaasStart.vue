<!-- CaasStart.vue — Zona 9. Cinco pasos con una barra de progreso que los cruza.

     Estado: en reposo TODO va apagado -ningun paso cubierto- y se enciende
     acumulando desde el paso 1 hasta el paso alcanzado, con una barra que
     "carga" el tramo cubierto (transition en el fill, no un salto).

     Dos arboles, dos fuentes de estado -ya NO comparten un solo ref, porque
     sus disparadores son de naturaleza distinta:
       - >=925px: fila horizontal. El disparador es discreto -mouseenter por
         card- y se apaga con mouseleave en TODA la fila (igual que
         SpeiStages.vue, ver consulta a decision:4:15). Gobierna `active` y
         de ahi `coveredDesktop`.
       - <925px: pila vertical con la barra a la izquierda. El disparador es
         la posicion de scroll, no un evento discreto: cada card se enciende
         cuando su centro cruza una linea de referencia a media pantalla,
         sin necesidad de tocarla -Fredy: "en la medida en que bajamos la
         pantalla las cards se deben ir iluminando". Gobierna `scrollCovered`,
         medido en cada scroll (throttleado a un frame con rAF) contra los
         refs de las 5 cards. Es bidireccional: si el usuario sube de nuevo,
         las cards por debajo de la linea vuelven a apagarse -es una barra de
         PROGRESO ligada a la posicion real, no una revelacion de una sola vez.
     Un solo ref para los dos arboles ya no aplica: un indice de hover no
     tiene sentido para scroll continuo, y viceversa. Gatillo propio en cada
     arbol -uno oculto por breakpoint nunca recibe el evento del otro (misma
     trampa que documenta decision:4:15).
     El breakpoint es 925px porque el wrap real de la fila -medido en vivo,
     min-w-[18rem] x5 + gap-4 dentro de max-w-6xl- cae exactamente en 924px:
     no es un numero redondo elegido a ojo, es el punto donde el layout de
     escritorio ya se rompe solo.

     Los iconos vienen en un solo tono fijo (fill fijo en el propio SVG, no
     currentColor): el apagado/encendido lo aplica el componente por
     opacidad (opacity-40/100, mismo convenio que los logos atenuados de
     *Hero.vue), no el asset.

     basis-[18%] en vez de un 100/N% calculado: con exactamente 5 piezas y
     gap-4 (16px), 5 x 20% ya consume el 100% del contenedor ANTES de contar
     los 4 huecos — el mismo mecanismo que el genoma ya tiene documentado como
     causa de columnas que saltan (case:frt-cnct-columnas-saltan-por-calc).
     18% deja el hueco para que el propio flex-shrink absorba esa diferencia
     sin necesidad de envolver; 19% no alcanzaba a dejar margen suficiente y
     seguia envolviendo la quinta pieza — el diagnostico de que faltaba
     margen era correcto, el numero exacto se ajusto probando en vivo, no
     calculando de antemano. Es un valor fijo, no derivado del conteo: si el
     numero de pasos cambia alguna vez, hay que recalcularlo a mano junto con
     el resto de esta seccion (iconos, barra, texto). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">
      {{ t('caas.start.titlePre') }}<br>
      {{ t('caas.start.titlePost') }}
    </h2>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. Solo en
         >=925px: en <925px el CTA se mueve al final de la pila (ver mas abajo),
         no se duplica arriba tambien. -->
    <div class="mt-8 hidden w-full justify-center min-[925px]:flex">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.start.cta') }}
      </NuxtLink>
    </div>

    <!-- >=925px — fila horizontal, barra que la cruza de lado a lado. -->
    <div class="hidden min-[925px]:block">
      <div class="relative mx-auto mt-12 w-full max-w-6xl" @mouseleave="active = null">
        <article class="sc-article w-full flex-wrap items-stretch gap-4">
          <div
            v-for="(step, i) in steps"
            :key="step.label"
            class="sc-section flex min-w-[18rem] basis-[18%] grow flex-col items-center rounded-2xl bg-surface-2 px-5 pb-8 pt-8"
            @mouseenter="active = i"
          >
            <img
              :src="step.icon"
              alt=""
              aria-hidden="true"
              class="h-14 w-14 object-contain transition-opacity duration-300"
              :class="i < coveredDesktop ? 'opacity-100' : 'opacity-40'"
              loading="lazy"
              decoding="async"
            >

            <!-- El hueco reserva el alto que ocupa la barra encima -->
            <span class="h-14" aria-hidden="true" />

            <span
              class="font-secondary text-3xl font-bold leading-none transition-colors duration-200"
              :class="i < coveredDesktop ? 'text-brand-violet' : 'text-primary-soft'"
            >{{ String(i + 1).padStart(2, '0') }}</span>
            <span
              class="mt-2 text-center text-base transition-colors duration-200"
              :class="i < coveredDesktop ? 'text-deep-ink' : 'text-ink-3'"
            >{{ step.label }}</span>
          </div>
        </article>

        <!-- Barra que cruza las cinco cards. El arbol entero ya vive detras
             de min-[925px], asi que la fila nunca envuelve aqui adentro -no
             hace falta un hidden/block propio ademas del de arriba. -->
        <div
          class="pointer-events-none absolute left-6 right-6 h-2 rounded-full bg-line"
          style="top: 12.4rem"
          aria-hidden="true"
        >
          <div class="h-full rounded-full bg-brand-violet transition-[width] duration-500 ease-out" :style="{ width: filledDesktop }" />
        </div>
      </div>
    </div>

    <!-- <925px — pila vertical, barra a la izquierda, CTA al final. El
         encendido lo mueve el scroll (ver script), no un click: no hay
         @click aqui a proposito. -->
    <div class="min-[925px]:hidden">
      <div class="relative mx-auto mt-12 flex w-full max-w-lg gap-5">
        <div class="relative w-2 shrink-0 self-stretch" aria-hidden="true">
          <div class="absolute inset-y-2 left-1/2 w-1 -translate-x-1/2 rounded-full bg-line" />
          <div
            class="absolute left-1/2 top-2 w-1 -translate-x-1/2 rounded-full bg-brand-violet transition-[height] duration-500 ease-out"
            :style="{ height: filledMobile }"
          />
        </div>

        <div class="flex flex-1 flex-col gap-4">
          <div
            v-for="(step, i) in steps"
            :key="step.label"
            :ref="(el) => setMobileCardRef(el, i)"
            class="flex w-full items-center gap-4 rounded-2xl bg-surface-2 px-5 py-5"
          >
            <img
              :src="step.icon"
              alt=""
              aria-hidden="true"
              class="h-12 w-12 shrink-0 object-contain transition-opacity duration-300"
              :class="i < scrollCovered ? 'opacity-100' : 'opacity-40'"
              loading="lazy"
              decoding="async"
            >
            <span class="flex flex-col">
              <span
                class="font-secondary text-2xl font-bold leading-none transition-colors duration-200"
                :class="i < scrollCovered ? 'text-brand-violet' : 'text-primary-soft'"
              >{{ String(i + 1).padStart(2, '0') }}</span>
              <span
                class="mt-1 text-base transition-colors duration-200"
                :class="i < scrollCovered ? 'text-deep-ink' : 'text-ink-3'"
              >{{ step.label }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="mt-8 flex w-full justify-center">
        <NuxtLink :to="localePath('/contact')" class="btn-primary">
          {{ t('caas.start.cta') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface StepText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const icons = [
  '/images/caas/icons/1.svg',
  '/images/caas/icons/2.svg',
  '/images/caas/icons/3.svg',
  '/images/caas/icons/4.svg',
  '/images/caas/icons/5.svg',
]
const texts = useLocalizedItems<StepText>('caas.start.steps', icons.length, ['label'])
const steps = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))

// >=925px — hover discreto. Paso senalado ahora mismo; null = reposo.
const active = ref<number | null>(null)
const coveredDesktop = computed(() => (active.value === null ? 0 : active.value + 1))
const filledDesktop = computed(() => `${(coveredDesktop.value / steps.value.length) * 100}%`)

// <925px — scroll continuo. `scrollCovered` es cuantas cards ya cruzaron la
// linea de referencia (mitad de pantalla), recalculado en cada scroll contra
// la posicion real de cada card -no un contador que solo sube: si el usuario
// sube la pantalla, las cards por debajo de la linea vuelven a apagarse.
const mobileCardEls: (HTMLElement | null)[] = []
function setMobileCardRef(el: Element | { $el?: Element } | null, i: number) {
  mobileCardEls[i] = (el as HTMLElement) ?? null
}

const scrollCovered = ref(0)
const filledMobile = computed(() => `${(scrollCovered.value / steps.value.length) * 100}%`)

function updateScrollCovered() {
  const line = window.innerHeight / 2
  let count = 0
  for (const el of mobileCardEls) {
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top + rect.height / 2 < line) count++
  }
  scrollCovered.value = count
}

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateScrollCovered()
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  updateScrollCovered()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>
