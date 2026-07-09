<template>
  <section class="sc-section w-full px-4 pb-16 lg:px-8">
    <div class="mx-auto flex w-full max-w-3xl flex-col items-center rounded-3xl bg-surface-2 p-8 text-center md:p-12">
      <Icon icon="mdi:compass-outline" class="mb-4 text-accent" width="64" height="64" />
      <h2 class="mx-auto text-center font-secondary text-deep-ink">{{ t('finder.title') }}</h2>

      <form class="mt-8 flex w-full flex-col gap-2 sm:flex-row" @submit.prevent>
        <div class="flex flex-1 items-center gap-2 rounded-full bg-bg-second px-5 py-3.5 shadow-flat">
          <Icon icon="mdi:magnify" class="shrink-0 text-primary" width="20" height="20" />
          <input
            type="text"
            :placeholder="t('finder.placeholder')"
            class="w-full bg-transparent text-sm text-text placeholder:text-ink-3 focus:outline-none"
          >
        </div>
        <button
          type="submit"
          class="whitespace-nowrap rounded-full bg-primary px-8 py-3.5 font-secondary font-bold text-text-invert shadow-flat transition-shadow hover:shadow-card"
        >
          {{ t('finder.submit') }}
        </button>
      </form>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-full border border-line-2 bg-bg-second px-4 py-1.5 font-secondary text-sm text-ink-3"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const tags = useLocalizedStrings('finder.tags', 4)
</script>
