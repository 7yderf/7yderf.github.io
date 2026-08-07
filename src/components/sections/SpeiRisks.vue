<!-- SpeiRisks.vue — Zona 2. Cuatro riesgos en fila + CTA centrado.
     Riel responsive de IndustriesGrid: flex-wrap + grow + basis.
     PLACEHOLDER: los iconos son de @iconify/vue hasta tener el set propio. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-6xl flex-wrap items-start gap-8">
      <div
        v-for="risk in risks"
        :key="risk.label"
        class="sc-section flex min-w-[18rem] grow basis-56 flex-col items-center gap-4 px-4"
      >
        <Icon :icon="risk.icon" class="text-primary" width="28" height="28" />
        <p class="max-w-xs text-center text-sm font-medium text-ink-3">{{ risk.label }}</p>
      </div>
    </article>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-12 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
        {{ t('spei.risks.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface RiskText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const icons = [
  'mdi:server-network-off',
  'mdi:bank-outline',
  'mdi:clock-alert-outline',
  'mdi:rocket-launch-outline',
]
const texts = useLocalizedItems<RiskText>('spei.risks.items', icons.length, ['label'])
const risks = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
