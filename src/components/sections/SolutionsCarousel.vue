<!-- SolutionsCarousel.vue — usa Swiper Element (swiper-container). Los items "upcoming"
     se muestran atenuados, igual que en el diseño de referencia (landing.jpg). -->
<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      {{ t('carousel.titlePre') }} <span class="text-primary">{{ t('carousel.titleHighlight') }}</span>
    </h2>

    <div class="relative mx-auto mt-12 w-full max-w-5xl">
      <swiper-container
        class="block"
        slides-per-view="3"
        space-between="16"
        navigation="true"
      >
        <swiper-slide v-for="item in allItems" :key="item.label">
          <div class="flex flex-col items-center gap-3 py-2" :class="item.upcoming ? 'opacity-40' : ''">
            <div class="flex h-24 w-24 items-center justify-center rounded-full bg-primary-soft">
              <Icon :icon="item.icon" class="text-primary" width="40" height="40" />
            </div>
            <span class="font-secondary text-sm font-semibold text-deep-ink">{{ item.label }}</span>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface CarouselText {
  label: string
}

const { t } = useI18n()

const activeIcons = ['mdi:bank-outline', 'mdi:cellphone-wireless', 'mdi:shield-check-outline']
const upcomingIcons = ['mdi:city-variant-outline', 'mdi:cart-outline', 'mdi:heart-pulse']

const activeTexts = useLocalizedItems<CarouselText>('carousel.active', activeIcons.length, ['label'])
const upcomingTexts = useLocalizedItems<CarouselText>('carousel.upcoming', upcomingIcons.length, ['label'])

const allItems = computed(() => [
  ...activeTexts.value.map((text, i) => ({ ...text, icon: activeIcons[i], upcoming: false })),
  ...upcomingTexts.value.map((text, i) => ({ ...text, icon: upcomingIcons[i], upcoming: true })),
])
</script>
