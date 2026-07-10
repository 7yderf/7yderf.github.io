<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto max-w-2xl text-center font-secondary text-deep-ink">
      {{ t('strategic.titlePre') }}
      <span class="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{{ t('strategic.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 max-w-4xl text-center">{{ t('strategic.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
      <section
        v-for="item in items"
        :key="item.title"
        class="sc-section rounded-2xl border border-line-3 bg-gradient-to-b from-primary-soft/60 to-accent-soft/40 p-6"
      >
        <div class="service-icon flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-primary-light to-primary-dark text-text-invert">
          <Icon :icon="item.icon" width="24" height="24" />
        </div>
        <h3 class="mt-4 font-secondary text-deep-ink">{{ item.title }}</h3>
        <p class="mt-2 text-sm text-ink-3">{{ item.description }}</p>
        <a href="#" class="mt-3 inline-flex items-center gap-1 font-secondary text-sm font-bold text-primary hover:underline">
          {{ item.link }} →
        </a>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface StrategicText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()

const icons = [
  'mdi:message-text-outline',
  'mdi:cog-outline',
  'mdi:headset',
  'mdi:account-arrow-right-outline',
  'mdi:monitor-dashboard',
]
const texts = useLocalizedItems<StrategicText>('strategic.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>

<style scoped>
/* Bevel interno del icono: borde inset claro arriba + sombra abajo = volumen 3D */
.service-icon {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    inset 0 2px 2px rgba(255, 255, 255, 0.38),
    inset 0 -3px 4px rgba(0, 0, 0, 0.18);
}
</style>
