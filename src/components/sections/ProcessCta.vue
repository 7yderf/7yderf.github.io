<template>
  <section class="sc-section w-full px-4 py-12 lg:px-8 lg-2:py-24">
    <div class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center justify-between gap-8 rounded-3xl bg-[linear-gradient(89.78deg,_#865BDA_0.19%,_#240F4E_115.48%)] p-6 lg-2:p-12">
      <div class="flex min-w-[240px] flex-1 basis-72 flex-col items-center gap-4 text-center md:items-start md:text-left">
        <h2 class="font-secondary text-3xl leading-tight text-text-invert">{{ t('process.title') }}</h2>
        <NuxtLink :to="localePath('/contact')" class="btn-custom" :style="{ '--btn-color': '#3B1E73' }">
          {{ t('process.cta') }} →
        </NuxtLink>
      </div>

      <div class="flex min-w-[240px] flex-1 basis-72 flex-nowrap items-start justify-center gap-3">
        <template v-for="(step, i) in steps" :key="step.label">
          <div class="flex w-24 flex-col items-center gap-2 text-center">
            <img :src="step.icon" alt="" aria-hidden="true" class="h-[7rem] w-[7rem] object-contain">
            <span class="font-secondary text-xs font-semibold text-text-invert">{{ step.label }}</span>
          </div>
          <div
            v-if="i < steps.length - 1"
            class="hidden h-[7rem] shrink-0 items-center sm:flex"
          >
            <img src="/icons/arrow.webp" alt="" aria-hidden="true" class="w-[3rem] object-contain brightness-0 invert">
          </div>
        </template>
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

// Iconos por paso (public/icons), en orden secuencial
const icons = ['/icons/1.webp', '/icons/2.webp', '/icons/3.webp', '/icons/4.webp']
const texts = useLocalizedItems<StepText>('process.steps', icons.length, ['label'])
const steps = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
