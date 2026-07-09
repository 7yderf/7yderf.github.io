<template>
  <section class="sc-section flex-col items-center bg-gradient-to-b from-primary-soft via-primary-soft/40 to-transparent px-4 py-16 text-center lg:px-8">
    <div class="mx-auto flex w-full max-w-3xl flex-col items-center">
      <Icon icon="mdi:robot-outline" class="mb-8 text-primary" width="140" height="140" />

      <h1 class="hero font-secondary text-deep-ink">
        {{ t('hero.titlePre') }} <span class="text-accent">{{ t('hero.titleHighlight') }}</span>
      </h1>
      <p class="mt-5 max-w-2xl text-lg text-ink-3">{{ t('hero.subtitle') }}</p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#"
          class="rounded-full bg-primary px-8 py-3.5 font-secondary font-bold text-text-invert shadow-flat transition-shadow hover:shadow-card"
        >
          {{ t('hero.ctaPrimary') }} →
        </a>
        <a
          href="#"
          class="rounded-full border border-line-2 bg-bg-second px-8 py-3.5 font-secondary font-bold text-text hover:bg-surface-2"
        >
          {{ t('hero.ctaSecondary') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { t } = useI18n()
</script>
