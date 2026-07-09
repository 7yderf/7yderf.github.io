<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      {{ t('features.titlePre') }} <span class="text-primary">{{ t('features.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 max-w-2xl text-ink-3">{{ t('features.subtitle') }}</p>

    <div class="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-8 text-left">
      <article
        v-for="(item, i) in items"
        :key="item.title"
        class="sc-article flex-col items-center gap-8 rounded-3xl border border-line-3 bg-bg-second p-8 shadow-flat md:flex-row"
        :class="i % 2 === 1 ? 'md:flex-row-reverse' : ''"
      >
        <div class="flex aspect-[4/3] w-full shrink-0 items-center justify-center rounded-2xl bg-primary-soft md:w-2/5">
          <Icon :icon="item.icon" class="text-primary" width="72" height="72" />
        </div>
        <div class="sc-section">
          <h3 class="font-secondary text-deep-ink">{{ item.title }}</h3>
          <p class="mt-3 text-ink-3">{{ item.description }}</p>
          <a
            href="#"
            class="mt-4 inline-flex items-center gap-1 font-secondary font-bold hover:underline"
            :class="i === 1 ? 'text-accent' : 'text-primary'"
          >
            {{ item.link }} →
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface FeatureText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()

const icons = ['mdi:lock-outline', 'mdi:credit-card-wireless-outline', 'mdi:cloud-outline']
const texts = useLocalizedItems<FeatureText>('features.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
