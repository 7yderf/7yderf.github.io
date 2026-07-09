<template>
  <section class="sc-section w-full px-4 py-16 lg:px-8">
    <div class="sc-article mx-auto w-full max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-accent to-primary p-8 text-text-invert md:flex-row md:p-14">
      <Icon icon="mdi:account-voice" class="shrink-0 text-text-invert/90" width="140" height="140" />
      <div class="text-center md:text-left">
        <h2 class="font-secondary">{{ t('finalCta.title') }}</h2>
        <p class="mt-3 max-w-xl text-text-invert/85">{{ t('finalCta.subtitle') }}</p>
        <a
          href="#"
          class="mt-6 inline-block rounded-full bg-bg-second px-8 py-3.5 font-secondary font-bold text-primary shadow-flat transition-shadow hover:shadow-card"
        >
          {{ t('finalCta.cta') }} →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { t } = useI18n()
</script>
