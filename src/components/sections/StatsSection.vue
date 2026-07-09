<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      {{ t('stats.titlePre') }} <span class="text-accent">{{ t('stats.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 max-w-2xl text-ink-3">{{ t('stats.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 w-full max-w-5xl flex-wrap justify-center gap-4">
      <section
        v-for="stat in items"
        :key="stat.label"
        class="sc-section w-[calc(50%-0.5rem)] rounded-2xl border border-line-3 bg-gradient-to-b from-primary-soft/50 to-accent-soft/30 p-6 sm:w-[calc(25%-0.75rem)]"
      >
        <Icon :icon="stat.icon" class="mx-auto text-deep-ink" width="28" height="28" />
        <p class="mt-3 font-secondary text-3xl font-extrabold text-deep-ink">{{ stat.value }}</p>
        <p class="mt-1 text-sm text-ink-3">{{ stat.label }}</p>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface StatText {
  value: string
  label: string
}

const { t } = useI18n()

const icons = ['mdi:account-group-outline', 'mdi:briefcase-outline', 'mdi:cog-outline', 'mdi:earth']
const texts = useLocalizedItems<StatText>('stats.items', icons.length, ['value', 'label'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
