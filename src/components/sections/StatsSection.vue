<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto text-center text-3xl font-secondary text-deep-ink">
      {{ t('stats.titlePre') }} <span class="text-accent">{{ t('stats.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 max-w-2xl text-ink-3 text-center">{{ t('stats.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
      <section
        v-for="(stat, i) in items"
        :key="stat.label"
        class="sc-section flex flex-col items-center rounded-2xl border border-line-3 bg-gradient-to-br p-6 text-center"
        :class="i % 2 === 0 ? 'from-primary-soft/50 to-accent-soft/30' : 'from-accent-soft/50 to-primary-soft/30'"
      >
        <Icon :icon="stat.icon" class="text-deep-ink" width="36" height="36" />
        <h3 class="mt-3 font-secondary text-4xl font-extrabold text-deep-ink">{{ stat.value }}</h3>
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
