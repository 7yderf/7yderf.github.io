<template>
  <section class="w-full bg-[linear-gradient(73.81deg,_#F6791F_10.65%,_#AD51F3_72.21%,_#6D48FF_117.68%)] px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <h2 class="mx-auto text-center text-3xl font-secondary text-text-invert">
      <span class="font-normal">{{ t('stats.titlePre') }}</span><br>
      <span class="font-bold">{{ t('stats.titleHighlight') }}</span>
    </h2>

    <div class="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-center divide-x divide-white/25">
      <div v-for="stat in items" :key="stat.label" class="min-w-[140px] flex-1 px-6">
        <h3 class="text-center font-secondary text-4xl font-extrabold text-text-invert">{{ stat.value }}</h3>
        <p class="mt-1 text-center text-sm text-text-invert/80">{{ stat.label }}</p>
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

const texts = useLocalizedItems<StatText>('stats.items', 4, ['value', 'label'])
const items = computed(() => texts.value)
</script>
