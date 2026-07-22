<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-cream to-bg-second p-8 lg-2:p-16">
      <h2 class="text-center font-secondary italic bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
        {{ t('finalCta.titlePre') }}<br>
        {{ t('finalCta.titlePost') }}
      </h2>
      <p class=" text-center text-ink-3">{{ t('finalCta.subtitle') }}</p>
      <NuxtLink :to="localePath('/contact')" class="btn-custom" :style="{ '--btn-color': 'var(--primary-light-color)' }">
        {{ t('finalCta.cta') }} →
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
