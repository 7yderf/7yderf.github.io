<template>
  <section id="industrias" class="sc-section w-full scroll-mt-24 bg-cream px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary text-deep-ink">
      <span class="font-bold">{{ t('industries.titlePre') }}</span><br>
      <span class="font-normal">{{ t('industries.titleHighlight') }}</span>
    </h2>

    <div class="sc-article mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-stretch gap-6 text-center">
      <div v-for="item in items" :key="item.name" class="sc-section flex min-w-[16rem] grow basis-64 flex-col">
        <div class="aspect-square w-full overflow-hidden rounded-2xl bg-bg-second p-4 shadow-[0_12px_28px_-10px_rgba(23,23,20,0.12)]">
          <img
            :src="item.image"
            :alt="item.name"
            class="h-full w-full rounded-xl object-cover"
            loading="lazy"
            decoding="async"
          >
        </div>
        <h3 class="mt-5 text-center font-secondary text-deep-ink">{{ item.name }}</h3>
        <p class="mx-auto mt-4 max-w-xs text-center text-sm font-medium text-ink-3">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IndustryText {
  name: string
  description: string
}

const { t } = useI18n()

// Ilustraciones por industria, en el orden en que aparecen (public/images/industries)
const images = [
  '/images/industries/fintech.webp',
  '/images/industries/banca.webp',
  '/images/industries/aseguradoras.webp',
  '/images/industries/gobierno.webp',
  '/images/industries/ecommerce.webp',
  '/images/industries/salud.webp',
]
const texts = useLocalizedItems<IndustryText>('industries.items', images.length, ['name', 'description'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, image: images[i] })))
</script>
