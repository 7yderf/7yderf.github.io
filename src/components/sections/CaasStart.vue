<!-- CaasStart.vue — Zona 9. Cinco pasos con una barra de progreso que los cruza.

     La barra NO vive dentro de las cards: es un elemento absoluto sobre la fila
     completa, porque tiene que atravesarlas de lado a lado. Su tramo lleno se
     deriva del numero de pasos ya cubiertos sobre el total, asi que agregar o
     quitar un paso reajusta la proporcion sin tocar el CSS.

     Los iconos ya vienen con su estado horneado: los de los pasos cubiertos
     estan en violeta fuerte y los pendientes en violeta claro. Por eso el
     componente no les aplica opacidad — hacerlo apagaria dos veces los
     primeros. El texto si cambia, porque ahi el estado no viene del asset. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">
      {{ t('caas.start.titlePre') }}<br>
      {{ t('caas.start.titlePost') }}
    </h2>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-8 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.start.cta') }}
      </NuxtLink>
    </div>

    <div class="relative mx-auto mt-12 w-full max-w-6xl">
      <article class="sc-article w-full flex-wrap items-stretch gap-4">
        <div
          v-for="(step, i) in steps"
          :key="step.label"
          class="sc-section flex min-w-[16rem] grow flex-col items-center rounded-2xl bg-surface-2 px-5 pb-8 pt-8"
          :style="{ flexBasis: cell }"
        >
          <img
            :src="step.icon"
            alt=""
            aria-hidden="true"
            class="h-14 w-14 object-contain"
            loading="lazy"
            decoding="async"
          >

          <!-- El hueco reserva el alto que ocupa la barra encima -->
          <span class="h-14" aria-hidden="true" />

          <span
            class="font-secondary text-3xl font-bold leading-none"
            :class="i < covered ? 'text-brand-violet' : 'text-primary-soft'"
          >{{ String(i + 1).padStart(2, '0') }}</span>
          <span
            class="mt-2 text-center text-base"
            :class="i < covered ? 'text-deep-ink' : 'text-ink-3'"
          >{{ step.label }}</span>
        </div>
      </article>

      <!-- Barra que cruza las cinco cards. Solo se dibuja cuando estan en una
           sola fila: al envolver, una linea recta las cruzaria en diagonal. -->
      <div
        class="pointer-events-none absolute left-6 right-6 hidden h-2 rounded-full bg-line lg-2:block"
        style="top: 12.4rem"
        aria-hidden="true"
      >
        <div class="h-full rounded-full bg-brand-violet" :style="{ width: filled }" />
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

// Pasos ya cubiertos en la referencia. Gobierna a la vez el tramo lleno de la
// barra y que numeros y etiquetas van encendidos: una sola fuente de verdad.
const covered = 2

const cell = computed(() => `${100 / steps.value.length}%`)
const filled = computed(() => `${(covered / steps.value.length) * 100}%`)
</script>
