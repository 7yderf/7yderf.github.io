<!-- SpeiStats.vue — Zona 8. Cuatro metricas separadas por filete vertical.
     Calca la forma de StatsSection.vue del home (flex-wrap + divide-x), con
     otra piel: cifra en naranja sobre fondo claro en vez de blanco sobre
     gradiente.
     El divide-x se aplica solo desde lg-2: al envolver, el filete quedaria
     colgando al inicio de la fila nueva sin separar nada. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.stats.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('spei.stats.subtitle') }}</p>

    <div class="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-center gap-y-8 lg-2:divide-x lg-2:divide-line">
      <div v-for="stat in items" :key="stat.label" class="min-w-[16rem] flex-1 px-6">
        <p class="text-center font-secondary text-4xl font-extrabold text-accent">{{ stat.value }}</p>
        <p class="mt-2 text-center text-sm font-medium text-ink-3">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface StatText {
  value: string
  label: string
}

const { t } = useI18n()

const items = useLocalizedItems<StatText>('spei.stats.items', 4, ['value', 'label'])
</script>
