<template>
  <section class="sc-section w-full px-4 py-20 lg:px-8">
    <div class="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-3xl bg-surface-2 p-8 text-center md:p-12">
      <img
        src="/images/fox.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute left-1/2 top-0 w-28 -translate-x-1/2 -translate-y-1/2"
      >
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
        <button type="submit" class="btn-primary btn-pill">
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
