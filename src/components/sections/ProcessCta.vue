<template>
  <section class="sc-section w-full px-4 py-4 lg:px-8">
    <div class="sc-article mx-auto w-full max-w-5xl flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-primary-soft via-bg-second to-accent-soft p-8 md:flex-row md:p-12">
      <div class="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        <h2 class="font-secondary text-deep-ink">{{ t('process.title') }}</h2>
        <a href="#" class="btn-primary">
          {{ t('process.cta') }} →
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <template v-for="(step, i) in steps" :key="step.label">
          <div class="flex w-24 flex-col items-center gap-2 text-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl shadow-flat"
              :class="[stepBg[i % stepBg.length], stepText[i % stepText.length]]"
            >
              <Icon :icon="step.icon" width="28" height="28" />
            </div>
            <span class="font-secondary text-xs font-semibold text-deep-ink">{{ step.label }}</span>
          </div>
          <Icon
            v-if="i < steps.length - 1"
            icon="mdi:arrow-right"
            class="hidden shrink-0 text-ink-3 sm:block"
            width="20"
            height="20"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface StepText {
  label: string
}

const { t } = useI18n()

const icons = ['mdi:earth', 'mdi:infinity', 'mdi:bank', 'mdi:account-group']
const texts = useLocalizedItems<StepText>('process.steps', icons.length, ['label'])
const steps = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))

const stepBg = ['bg-primary-light', 'bg-primary-dark', 'bg-accent', 'bg-bg-second']
const stepText = ['text-text-invert', 'text-text-invert', 'text-text-invert', 'text-primary']
</script>
