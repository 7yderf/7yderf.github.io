<!-- SpeiOperate.vue — Zona 5. Cuatro capacidades en cards con link al pie.
     Riel de IndustriesGrid: el numero de columnas lo decide el ancho
     disponible, no un breakpoint. Con basis-96 caen dos por fila en escritorio,
     que es la reticula 2x2 de la referencia.
     PLACEHOLDER: los iconos son de @iconify/vue hasta tener el set propio. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.operate.title') }}</h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('spei.operate.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 w-full max-w-5xl flex-wrap items-stretch gap-6">
      <section
        v-for="item in items"
        :key="item.title"
        class="sc-section flex min-w-[26rem] grow basis-96 flex-col rounded-2xl bg-surface-2 p-8"
      >
        <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-second">
          <Icon :icon="item.icon" class="text-primary" width="26" height="26" />
        </span>
        <h3 class="mt-6 font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ item.title }}</h3>
        <p class="mt-3 text-sm font-medium text-ink-3">{{ item.description }}</p>

        <NuxtLink
          :to="localePath('/contact')"
          class="mt-6 flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          {{ item.link }} →
        </NuxtLink>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface OperateText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const icons = [
  'mdi:eye-outline',
  'mdi:file-document-check-outline',
  'mdi:shield-alert-outline',
  'mdi:calendar-check-outline',
]
const texts = useLocalizedItems<OperateText>('spei.operate.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
