<template>
  <section class="sc-section w-full px-4 py-4 lg:px-8">
    <div class="sc-article mx-auto w-full max-w-7xl flex-wrap items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-primary-soft via-bg-second to-accent-soft p-8 md:p-12">
      <div class="flex min-w-[240px] flex-1 basis-72 flex-col items-center gap-4 text-center md:items-start md:text-left">
        <h2 class="font-secondary text-3xl leading-tight text-deep-ink">{{ t('process.title') }}</h2>
        <a href="#" class="btn-primary">
          {{ t('process.cta') }} →
        </a>
      </div>

      <div class="flex min-w-[240px] flex-1 basis-72 flex-nowrap items-start justify-center gap-3">
        <template v-for="(step, i) in steps" :key="step.label">
          <div class="flex w-24 flex-col items-center gap-2 text-center">
            <img :src="step.icon" alt="" aria-hidden="true" class="h-16 w-16 object-contain">
            <span class="font-secondary text-xs font-semibold text-deep-ink">{{ step.label }}</span>
          </div>
          <div
            v-if="i < steps.length - 1"
            class="hidden h-16 shrink-0 items-center sm:flex"
          >
            <img src="/icons/arrow.webp" alt="" aria-hidden="true" class="w-6 object-contain">
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

// Iconos por paso (public/icons), en orden secuencial
const icons = ['/icons/1.webp', '/icons/2.webp', '/icons/3.webp', '/icons/4.webp']
const texts = useLocalizedItems<StepText>('process.steps', icons.length, ['label'])
const steps = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
