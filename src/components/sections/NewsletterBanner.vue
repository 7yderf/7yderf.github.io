<template>
  <section id="recursos" class="sc-section w-full scroll-mt-24 px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="sc-article mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-8 rounded-3xl bg-[#865BDA] p-6 md:justify-between lg-2:p-12">
      <div class="flex items-center justify-center grow-1">
        <img
          src="/images/tendencias-ciberseguridad-2026.png"
          alt="Whitepaper: Tendencias en Ciberseguridad 2026"
          class="w-56 object-contain md:w-96 m-auto "
        >
      </div>
      <div class="max-w-md">
        <h2 class="font-secondary text-text-invert">{{ t('newsletter.title') }}</h2>
        <p class="mt-4 text-text-invert/85">{{ t('newsletter.subtitle') }}</p>
        <NuxtLink :to="localePath('/contact')" class="btn-custom mt-6" :style="{ '--btn-color': '#3B1E73' }">
          {{ t('newsletter.cta') }} →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
