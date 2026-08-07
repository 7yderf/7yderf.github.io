<!-- HsmSteps.vue — Zona 8. Dos rieles apilados: arriba los arcos conectores,
     abajo los pasos numerados.

     El riel de arcos abre y cierra con MEDIA celda. Con n pasos de ancho 100/n,
     sus centros caen en 50/n, 150/n, 250/n... — asi que un arco de ancho 100/n
     precedido por un hueco de 50/n arranca justo en el centro del paso 1 y
     termina en el del paso 2. Por eso los anchos se derivan del numero de pasos
     y no van escritos a mano: si el copy cambia de 5 a 6, la alineacion se
     mantiene sola.

     Los arcos se ocultan cuando los pasos dejan de caber en una sola fila: ahi
     conectarian celdas que ya no estan una al lado de la otra. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-2xl text-center font-secondary text-deep-ink">
      <span class="font-normal">{{ t('hsm.steps.titlePre') }}</span><br>
      <span class="font-bold">{{ t('hsm.steps.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('hsm.steps.subtitle') }}</p>

    <div class="mx-auto mt-12 w-full max-w-4xl">
      <div class="hidden w-full items-end lg-2:flex" aria-hidden="true">
        <span class="shrink-0" :style="{ width: halfCell }" />
        <img
          v-for="i in steps.length - 1"
          :key="i"
          src="/images/flecha.png"
          alt=""
          class="block shrink-0"
          :style="{ width: cell }"
          loading="lazy"
          decoding="async"
        >
        <span class="shrink-0" :style="{ width: halfCell }" />
      </div>

      <div class="sc-article w-full flex-wrap justify-center gap-y-10">
        <div
          v-for="(step, i) in steps"
          :key="step.label"
          class="flex min-w-[14rem] grow flex-col items-center gap-2 text-center"
          :style="{ flexBasis: cell }"
        >
          <span class="font-secondary text-5xl font-bold leading-none text-deep-ink">{{ i + 1 }}</span>
          <span class="text-sm font-bold text-ink-4">{{ step.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface StepText {
  label: string
}

const { t } = useI18n()

const steps = useLocalizedItems<StepText>('hsm.steps.items', 5, ['label'])

const cell = computed(() => `${100 / steps.value.length}%`)
const halfCell = computed(() => `${50 / steps.value.length}%`)
</script>
